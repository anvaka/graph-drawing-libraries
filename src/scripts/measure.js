/**
 * Measures how large a graph each library takes before it freezes the tab, so
 * that the performance test asks the visitor only when a freeze is likely
 * (see app/guard.js).
 *
 *   npm run measure                        # all libraries
 *   npm run measure -- kieler_elkjs        # only these example folders
 *
 * Every run is a fresh Chrome with one demo page, its processor slowed down
 * SLOWDOWN times. The script asks the page a trivial question again and again. The
 * page cannot answer while the library keeps its thread busy: a question
 * without an answer for FROZEN_MS is a frozen tab.
 *
 * A library gets square grids of growing size, up to the smallest one that is
 * too large for it, and graphs of the picker, small to large, up to one that
 * is too large.
 *
 * All runs go to data/measurements.json. data/limits.json is made from them:
 * for every library, the smallest graph that froze the tab.
 *
 * It needs Chrome. Set CHROME_PATH if it is not in a usual place.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { launchChrome, serveWebsite } from './chrome.js';

// The computer of a visitor is slower than the one that measures
const SLOWDOWN = 4;
// A tab that is silent for this long on that slower computer is what we ask
// about. Shorter stalls are a nuisance, not a reason to stop the visitor.
const FROZEN_MS = 10000;
// Sides of the square grids, from 1,160 nodes and links to 479,200: each grid
// is about one and a half times larger than the one before
const SIDES = Array.from({ length: 16 }, (_, i) => Math.round(20 * Math.pow(400 / 20, i / 15)));
// A library climbs them in steps of this many, then tries the grids of the
// last step. Some libraries throw an error on a large graph or draw nothing, so
// that a large grid which went well says little about the smaller ones.
const STEP = 3;
// Graphs of the picker, small to large
const GRAPHS = [
  'Chess openings', 'US counties', 'Languages of the world',
  'Barabasi-Albert (20k)', 'English nouns (WordNet)', 'Barabasi-Albert (100k)'
];

// A library that does not freeze the tab is watched at least this long after it got the graph...
const MIN_WATCH_MS = 10000;
// ...then until it had no stall of STALL_MS for this long...
const QUIET_MS = 5000;
const STALL_MS = 1000;
// ...but not longer than this
const MAX_WATCH_MS = 30000;
// A demo has this long to load the graph and give it to the library
const LOAD_MS = 60000;
// A run that takes longer than this is a Chrome that hangs: it is started again
const DEADLINE_MS = LOAD_MS + MAX_WATCH_MS + 30000;
const LAUNCH_MS = 30000;
const ATTEMPTS = 3;
// When no run ends for this long, something hangs: the script stops with an error
const SILENCE_MS = 5 * 60 * 1000;
const POLL_MS = 100;
// A slowed down tab leaves most of its processor core idle
const BROWSERS = Math.max(2, Math.floor(availableParallelism() * 0.75));

const measurementsFile = new URL('../data/measurements.json', import.meta.url);
const limitsFile = new URL('../data/limits.json', import.meta.url);
const libraries = JSON.parse(await readFile(new URL('../data/libraries.json', import.meta.url), 'utf8'));

const requested = process.argv.slice(2);
const unknown = requested.filter(example => !libraries.some(library => library.example === example));
if (unknown.length) {
  console.error(`No such example: ${unknown.join(', ')}`);
  process.exit(1);
}

const started = Date.now();
let free = BROWSERS;
const waiting = [];
let lastRun = Date.now();
setInterval(() => {
  if (Date.now() - lastRun < SILENCE_MS) return;
  console.error('No run has ended for too long, giving up');
  process.exit(1);
}, 10000).unref();
const server = await serveWebsite();
const measured = libraries.map(library => library.example).filter(example => !requested.length || requested.includes(example));
const runs = [];

// Grids of all libraries at once. Graphs of the picker go one graph after
// another, so that a library does not get a graph larger than one it did not draw.
const grids = inParallel(measured, climb);
let left = measured;
for (const name of GRAPHS) {
  const tooLarge = await inParallel(left, async example => isTooLarge(await measure(example, name, `graph=${encodeURIComponent(name)}`)));
  left = left.filter((example, i) => !tooLarge[i]);
}
await grids;
await server.close();

// Runs of the libraries that were not measured this time stay as they were
const kept = (await readPrevious()).filter(run => !measured.includes(run.library));
const isGrid = run => run.graph.startsWith('grid ');
const all = [...kept, ...runs.filter(run => run.outcome !== 'no graph')].sort((a, b) =>
  a.library.localeCompare(b.library) || isGrid(b) - isGrid(a) || (a.nodes + a.links) - (b.nodes + b.links));

await writeJSON(measurementsFile, { slowdown: SLOWDOWN, frozenMs: FROZEN_MS, runs: all });
await writeJSON(limitsFile, { slowdown: SLOWDOWN, frozenMs: FROZEN_MS, libraries: limitsOf(all) });
console.log(`Saved ${runs.length} runs in ${Math.round((Date.now() - started) / 1000)} seconds`);
process.exit(0);

/** Grids of growing size up to the smallest one that is too large */
async function climb(example) {
  const tooLarge = async index => {
    const side = SIDES[index];
    const run = await measure(example, `grid ${side}x${side}`, `graph=grid&n=${side}&m=${side}`);
    if (run.outcome === 'no graph') throw new Error(`${example} did not get a ${run.graph}`);
    return isTooLarge(run);
  };

  // Grids up to `ok` are fine, the one at `over` is not
  let ok = -1;
  let over = SIDES.length;
  for (let index = 0; index < SIDES.length; index += STEP) {
    if (await tooLarge(index)) {
      over = index;
      break;
    }
    ok = index;
  }

  while (over < SIDES.length && over - ok > 1) {
    const middle = Math.floor((ok + over) / 2);
    if (await tooLarge(middle)) over = middle;
    else ok = middle;
  }
}

/**
 * One library, one graph. Resolves to the record of the run, where `outcome` is
 * - 'ok': the tab was never silent for FROZEN_MS;
 * - 'froze': it was, and the run ended there;
 * - 'failed': the library threw an error, as some do on a graph that is too
 *   large for them: nothing is drawn, the tab is fine;
 * - 'crashed': the page died;
 * - 'no graph': the demo did not give a graph to the library in LOAD_MS.
 */
async function measure(example, graph, query) {
  await browserIsFree();
  try {
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      // Once in a few hundred times Chrome starts and never says that it is ready
      const launch = launchChrome();
      const browser = await withTimeout(LAUNCH_MS, launch.catch(() => null));
      if (!browser) launch.then(late => late.process()?.kill('SIGKILL'), () => {});
      const seen = browser && await withTimeout(DEADLINE_MS, watch(browser, `examples/${example}/02.perf/index.html?${query}`).catch(() => null));
      // A browser with a stuck page may not close on its own
      if (browser && !await withTimeout(5000, browser.close().then(() => true, () => true))) browser.process()?.kill('SIGKILL');

      if (seen) {
        const run = { library: example, graph, ...seen };
        runs.push(run);
        lastRun = Date.now();
        console.log(`${example} ${graph}: ${run.outcome}, longest ${run.longest} ms, busy ${run.busy}`);
        return run;
      }
      console.warn(`${example} ${graph}: Chrome did not answer, attempt ${attempt} of ${ATTEMPTS}`);
    }
    throw new Error(`Could not measure ${example} on ${graph}`);
  } finally {
    browserIsDone();
  }
}

/** Rejects when Chrome fails before the library got the graph: that is not the library's doing */
async function watch(browser, path) {
  const page = await browser.newPage();
  let crashed = false;
  let failed = false;
  page.on('error', () => { crashed = true; });
  page.on('pageerror', () => { failed = true; });
  browser.on('disconnected', () => { crashed = true; });

  // The page says when the library gets the graph (see runSuite.js). A call of
  // this function arrives at once, even when the library then keeps the thread.
  let gotGraph;
  const graphReady = new Promise(resolve => { gotGraph = resolve; });
  await page.exposeFunction('graphReadyForMeasure', detail => gotGraph({ at: Date.now(), ...detail }));
  await page.evaluateOnNewDocument(() => {
    const mark = performance.mark.bind(performance);
    performance.mark = (name, options) => {
      if (name === 'graph-ready') window.graphReadyForMeasure(options.detail);
      return mark(name, options);
    };
  });
  await page.setViewport({ width: 1280, height: 800 });
  await page.emulateCPUThrottling(SLOWDOWN);
  page.goto(server.address + path, { timeout: 0 }).catch(() => {});

  const ready = await withTimeout(LOAD_MS, graphReady);
  if (!ready) return { nodes: null, links: null, outcome: 'no graph', longest: 0, busy: null };

  let outcome = null;
  let longest = 0;
  let stalled = 0;
  let lastStall = ready.at;
  let now = ready.at;

  while (!outcome) {
    const sent = Date.now();
    const answered = await withTimeout(FROZEN_MS, page.evaluate(() => true).catch(() => false));
    now = Date.now();
    const wait = now - sent;
    longest = Math.max(longest, wait);
    if (wait >= POLL_MS) stalled += wait;
    if (wait >= STALL_MS) lastStall = now;

    const watched = now - ready.at;
    if (answered === false || crashed) outcome = 'crashed';
    else if (!answered) outcome = 'froze';
    else if (failed) outcome = 'failed';
    else if (watched >= MAX_WATCH_MS || (watched >= MIN_WATCH_MS && now - lastStall >= QUIET_MS)) outcome = 'ok';
    else await sleep(POLL_MS);
  }

  return {
    nodes: ready.nodes,
    links: ready.links,
    outcome,
    // The longest time without an answer (a run ends at FROZEN_MS), and the
    // share of the watched time without one
    longest,
    busy: Number((stalled / Math.max(1, now - ready.at)).toFixed(2))
  };
}

/** Only BROWSERS runs at a time: more of them would slow each other down */
function browserIsFree() {
  if (free > 0) {
    free -= 1;
    return Promise.resolve();
  }
  return new Promise(resolve => waiting.push(resolve));
}

function browserIsDone() {
  const next = waiting.shift();
  if (next) next();
  else free += 1;
}

function inParallel(items, job) {
  return Promise.all(items.map(job));
}

function isFreeze(run) {
  return run.outcome === 'froze' || run.outcome === 'crashed';
}

function isTooLarge(run) {
  return isFreeze(run) || run.outcome === 'failed';
}

/**
 * For every library: `ok` is the size, nodes and links together, of the
 * largest graph that it drew while all smaller ones went well too. `froze` is
 * the size of the smallest graph that froze the tab, `failed` is the same for
 * a library that threw an error on a graph smaller than that.
 */
function limitsOf(all) {
  const limits = {};
  for (const { example } of libraries) {
    const sized = all.filter(run => run.library === example && run.nodes !== null)
      .map(run => ({ ...run, size: run.nodes + run.links }))
      .sort((a, b) => a.size - b.size);
    if (!sized.length) continue;

    const over = sized.find(isTooLarge);
    const below = sized.filter(run => !over || run.size < over.size);
    const froze = sized.find(isFreeze);
    limits[example] = { ok: below.length ? below[below.length - 1].size : 0 };
    if (froze) limits[example].froze = froze.size;
    if (over && over.outcome === 'failed') limits[example].failed = over.size;
  }
  return limits;
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(measurementsFile, 'utf8')).runs;
  } catch {
    return [];
  }
}

function writeJSON(file, value) {
  return writeFile(file, JSON.stringify(value, null, 2) + '\n');
}

/** Resolves to what the promise does, or to undefined when it takes longer than `ms` */
function withTimeout(ms, promise) {
  let timer;
  const timeout = new Promise(resolve => { timer = setTimeout(resolve, ms); });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

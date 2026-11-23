/**
 * Guardrails of the performance test: a library that is too slow for a graph
 * freezes the whole tab, the toolbar included.
 *
 * There are no limits per library here, those would be opinions and depend on
 * the computer. The browser remembers what it has seen instead:
 *
 * - how large the largest graph was that a library drew while the tab stayed
 *   responsive. A much larger graph is not started until the visitor agrees;
 * - the smallest graph on which a library froze the tab. Graphs of that size
 *   and larger are not started until the visitor agrees.
 *
 * The size of a graph is the number of its nodes and links together.
 */

/** Every library is trusted with graphs of this size */
export const FLOOR = 3000;
/** ...and with graphs this many times larger than the largest that went well */
export const STEP = 5;
/** A tab that does not respond for this long is frozen */
export const FREEZE_MS = 5000;
/** A run that stayed responsive for this long went well */
export const SETTLE_MS = 6000;

const SEEN = 'graph-drawing-libraries:seen';
const RUNNING = 'graph-drawing-libraries:running';

/**
 * Why the visitor should be asked before `library` gets a graph of this size:
 * `{reason: 'froze', froze}`, `{reason: 'large', largest}`, or null to go on.
 */
export function whyAsk(library, nodes, links, storage = browserStorage()) {
  const size = nodes + links;
  const seen = read(storage, SEEN)[library] || {};

  if (seen.froze && size >= seen.froze.size) return { reason: 'froze', froze: seen.froze };

  const largest = seen.ok || 0;
  if (size > FLOOR && size > STEP * largest) return { reason: 'large', largest };
  return null;
}

/** The library drew the graph of `run` and the tab stayed responsive */
export function recordOk(run, storage = browserStorage()) {
  update(storage, run.library, seen => {
    seen.ok = Math.max(seen.ok || 0, sizeOf(run));
    // It froze on a graph of this size before, but not anymore
    if (seen.froze && seen.froze.size <= sizeOf(run)) delete seen.froze;
  });
}

/**
 * The library froze the tab for `ms` on the graph of `run`. `ms` is null when
 * nobody saw the end of it: the tab was closed while the library had the graph.
 */
export function recordFreeze(run, ms, storage = browserStorage()) {
  update(storage, run.library, seen => {
    const smaller = seen.froze && seen.froze.size < sizeOf(run);
    if (!smaller) seen.froze = { size: sizeOf(run), ms };
  });
}

/**
 * `run` is `{library, nodes, links, t}`: the library gets the graph now.
 * The note outlives a tab that froze for good, readRunning() finds it later.
 */
export function markRunning(run, storage = browserStorage()) {
  write(storage, RUNNING, run);
}

export function readRunning(storage = browserStorage()) {
  const run = read(storage, RUNNING);
  return run.library ? run : null;
}

export function clearRunning(storage = browserStorage()) {
  try {
    storage?.removeItem(RUNNING);
  } catch {
    // Without storage there are no guardrails, the test itself still works
  }
}

function sizeOf(run) {
  return run.nodes + run.links;
}

function update(storage, library, change) {
  const all = read(storage, SEEN);
  const seen = all[library] || {};
  change(seen);
  all[library] = seen;
  write(storage, SEEN, all);
}

function read(storage, key) {
  try {
    const value = JSON.parse(storage?.getItem(key));
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function write(storage, key, value) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Private windows and full storage: go on without remembering
  }
}

function browserStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

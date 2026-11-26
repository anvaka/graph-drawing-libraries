/**
 * Takes a picture of every library drawing the same graph, saves the pictures
 * to the `screenshots` folder of the repository and rebuilds the wall of them
 * in README.md.
 *
 *   npm run screenshots                      # all libraries
 *   npm run screenshots -- kieler_elkjs      # only these example folders
 *
 * It needs Chrome. Set CHROME_PATH if it is not in a usual place.
 *
 * Layouts start from random positions, so a picture differs from run to run.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { launchChrome, serveWebsite } from './chrome.js';

// The graph in the pictures, as the query of the performance test
const GRAPH = 'graph=grid&n=10&m=10';
const GRAPH_NAME = '10×10 grid';
// How long a library has to lay the graph out before the picture is taken
const SECONDS = 10;
// Demos are drawn at this size, and saved at half of it: the wall shows them
// at 200px, this keeps them sharp on high density screens.
const VIEW = { width: 800, height: 600, deviceScaleFactor: 0.5 };
const CAPTION_HEIGHT = 52;
const WEBSITE = 'https://anvaka.github.io/graph-drawing-libraries/';

const libraries = JSON.parse(await readFile(new URL('../data/libraries.json', import.meta.url), 'utf8'));
const screenshots = new URL('../../screenshots/', import.meta.url);
const readme = new URL('../../README.md', import.meta.url);

const requested = process.argv.slice(2);
const unknown = requested.filter(example => !libraries.some(library => library.example === example));
if (unknown.length) {
  console.error(`No such example: ${unknown.join(', ')}`);
  process.exit(1);
}

await mkdir(screenshots, { recursive: true });

const server = await serveWebsite();

const queue = libraries.filter(library => !requested.length || requested.includes(library.example));
// A few at a time, each in a browser of its own: every layout gets a processor
// core, and no demo is a background tab, where Chrome pauses animation frames
await Promise.all([1, 2, 3].map(async () => {
  const browser = await launchChrome();
  const page = await browser.newPage();

  for (let library = queue.shift(); library; library = queue.shift()) {
    await writeFile(new URL(`${library.example}.png`, screenshots), await framed(page, library, await capture(page, library)));
    console.log(`Saved ${library.example}.png`);
  }
  await browser.close();
}));

await server.close();

await writeFile(readme, withWall(await readFile(readme, 'utf8')));
console.log('Updated README.md');
process.exit(0);

async function capture(page, library) {
  const onError = error => console.warn(`${library.example}: ${error.message}`);
  page.on('pageerror', onError);
  await page.setViewport(VIEW);
  await page.goto(`${server.address}examples/${library.example}/02.perf/index.html?${GRAPH}`, { waitUntil: 'load' });
  await new Promise(resolve => setTimeout(resolve, SECONDS * 1000));
  const picture = await page.screenshot({ encoding: 'base64' });
  page.off('pageerror', onError);
  return picture;
}

/** Puts the name of the library under its picture */
async function framed(page, library, picture) {
  const [owner, name] = library.repo.split('/');
  const width = VIEW.width * VIEW.deviceScaleFactor;
  const height = VIEW.height * VIEW.deviceScaleFactor;

  await page.setViewport({ width, height: height + CAPTION_HEIGHT, deviceScaleFactor: 1 });
  await page.setContent(`
    <body style="margin: 0; background: #fff">
      <img src="data:image/png;base64,${picture}" width="${width}" height="${height}" style="display: block">
      <div style="box-sizing: border-box; height: ${CAPTION_HEIGHT}px; padding: 0 14px; border-top: 2px solid #d1d9e0;
          background: #f6f8fa; color: #1f2328; font: 600 26px/${CAPTION_HEIGHT - 2}px -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
        <span style="color: #59636e; font-weight: 400">${owner}/</span>${name}
      </div>
      <div style="position: fixed; inset: 0; border: 2px solid #d1d9e0"></div>
    </body>`);
  return page.screenshot();
}

/** Replaces the wall of pictures in the text of README.md */
function withWall(text) {
  const start = '<!-- wall:start -->';
  const end = '<!-- wall:end -->';
  const from = text.indexOf(start);
  const to = text.indexOf(end);
  if (from < 0 || to < from) throw new Error(`README.md has no ${start} ... ${end} to put the wall in`);

  const tiles = libraries.map(library => {
    const demo = `${WEBSITE}performance/?lib=${encodeURIComponent(library.example)}&amp;${GRAPH.replaceAll('&', '&amp;')}`;
    return `<a href="${demo}"><img src="screenshots/${library.example}.png" width="200" alt="${library.repo}" title="${library.repo}: run the demo"></a>`;
  });

  return text.slice(0, from) + [
    start,
    '<!-- "npm run screenshots" in src writes this block, do not edit it by hand -->',
    `The same ${GRAPH_NAME}, ${SECONDS} seconds after each library started to draw it. Click a picture to run the demo:`,
    '',
    '<p>',
    ...tiles,
    '</p>',
    ''
  ].join('\n') + text.slice(to);
}

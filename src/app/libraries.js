/**
 * The list of libraries (data/libraries.json) merged with their GitHub
 * statistics (data/stats.json, produced by `npm run stats`) and with what we
 * measured about them (data/limits.json, produced by `npm run measure`).
 */
import libraries from '../data/libraries.json';
import limits from '../data/limits.json';
import stats from '../data/stats.json';

const statsByRepo = new Map(stats.libraries.map(record => [record.repo, record]));

export const generated = stats.generated;

// Demos that were renamed or merged. ngraph is not listed on its own anymore
// (VivaGraph 1.0 is built from its modules), and vis lives on as vis-network.
const movedExamples = {
  anvaka_ngraph: 'anvaka_VivaGraphJS',
  almende_vis: 'visjs_vis-network'
};

/** The folder of a demo today, for links that were made before it moved */
export function currentExample(example) {
  return movedExamples[example] || example;
}

/** Where the demo of a library lives, relative to the home page */
export function demoAddress(example) {
  return `performance/?lib=${encodeURIComponent(example)}`;
}

export default libraries.map(library => ({
  name: library.repo,
  url: `https://github.com/${library.repo}`,
  license: library.license,
  ...statsByRepo.get(library.repo),
  // GitHub draws :dizzy: as a picture, here it would stay a word
  description: statsByRepo.get(library.repo)?.description?.replace(/:[a-z0-9_+-]+:\s*/g, ''),
  // Folder name inside public/examples, when we have demos for the library
  example: library.example,
  // The largest graph, nodes and links together, that the library drew in the
  // measurements while the tab stayed responsive
  responsive: limits.libraries[library.example]?.ok,
  // The smallest graph that froze the tab there. Missing for a library that never did.
  froze: limits.libraries[library.example]?.froze,
  // The smallest graph that ended with an error of the library instead of a
  // drawing, when that happened below any freeze
  failed: limits.libraries[library.example]?.failed
}));

/** How the measurements were made: a computer `slowdown` times slower, silent for `frozenMs` */
export const measurement = { slowdown: limits.slowdown, frozenMs: limits.frozenMs };

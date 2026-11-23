/**
 * The list of libraries (data/libraries.json) merged with their GitHub
 * statistics (data/stats.json, produced by `npm run stats`).
 */
import libraries from '../data/libraries.json';
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

export default libraries.map(library => ({
  name: library.repo,
  url: `https://github.com/${library.repo}`,
  license: library.license,
  ...statsByRepo.get(library.repo),
  // Folder name inside public/examples, when we have demos for the library
  example: library.example
}));

/**
 * Loads a graph of the performance test by its name from graphs.js.
 *
 * Graphs of the ngraph.forcelayout demo are not copied here: the generated
 * ones are built by the same code, the files are downloaded from the deployed
 * demo, and the matrices from the same SuiteSparse mirror that the demo uses.
 */
import createGraph from 'ngraph.graph';
import generators from 'ngraph.generators';
import { BENCHMARK, customSizeOf, describeGraph, sizeArguments } from './graphs.js';

const DEMO_GRAPHS = 'https://anvaka.github.io/ngraph.forcelayout/graphs/';
const SUITESPARSE_MIRROR = 'https://s3.amazonaws.com/yasiv_uf/out/';

const SUITESPARSE_CREDIT = { text: 'SuiteSparse Matrix Collection, CC BY 4.0', href: 'https://sparse.tamu.edu/about' };
const MISERABLES_CREDIT = { text: 'D. E. Knuth, The Stanford GraphBase', href: 'https://www-cs-faculty.stanford.edu/~knuth/sgb.html' };
const BENCHMARK_CREDIT = {
  text: 'the layout benchmark set of ngraph.forcelayout',
  href: 'https://github.com/anvaka/ngraph.forcelayout/tree/main/demo/public/graphs'
};

/** Graphs of a fixed size that are built in the browser */
export const generated = {
  'Miserables': () => generators.miserables(),
  'Binary': () => generators.balancedBinTree(10),
  'Grid 100x100 (10k)': () => generators.grid(100, 100),
  'Binary tree (8k)': () => generators.balancedBinTree(12),
  'Watts-Strogatz (10k)': () => generators.wattsStrogatz(10000, 6, 0.05),
  'Barabasi-Albert (20k)': () => barabasiAlbert(20000, 2),
  'Barabasi-Albert (100k)': () => barabasiAlbert(100000, 2),
  'Scale-free tree (10k)': () => barabasiAlbert(10000, 1),
  'Cube 20x20x20 (8k)': () => generators.grid3(20, 20, 20),
  'Groups 8x250 (2k)': () => plantedGroups(8, 250),
  'Many pieces (300)': () => manyPieces(300)
};

/** Graphs with real names, by their file in the `data` folder of the demo */
export const labelled = {
  'London Underground': 'london-underground',
  'Countries': 'countries',
  'Mammals (WordNet)': 'wordnet-mammals',
  'Chess openings': 'chess-openings',
  'US counties': 'us-counties',
  'Languages of the world': 'languages',
  'Metros of the world': 'world-metros',
  'English nouns (WordNet)': 'wordnet-nouns'
};

/**
 * Resolves with `{graph, about, credit}`: an ngraph.graph, a sentence about
 * it, and `{text, href}` that the license of its data asks to show (or null).
 *
 * `query` is a URLSearchParams with the arguments of graphs whose size the
 * visitor chooses.
 */
export default async function loadGraph(name, query = new URLSearchParams()) {
  const about = describeGraph(name);

  const custom = customSizeOf(name);
  if (custom) {
    return { graph: generators[custom.name](...sizeArguments(custom, query)), about, credit: null };
  }
  if (generated[name]) {
    return { graph: generated[name](), about, credit: name === 'Miserables' ? MISERABLES_CREDIT : null };
  }
  if (labelled[name]) return fromLabelledFile(await fetchJSON(`${DEMO_GRAPHS}data/${labelled[name]}.json`));
  if (name.startsWith(BENCHMARK)) {
    const file = await fetchJSON(`${DEMO_GRAPHS}${name.slice(BENCHMARK.length)}.json`);
    return { graph: fromBenchmarkFile(file), about, credit: BENCHMARK_CREDIT };
  }
  if (name.includes('/')) {
    // The mirror names the file index.js, but it holds JSON
    const matrix = await fetchJSON(`${SUITESPARSE_MIRROR}${name}/index.js`);
    return { graph: fromMatrix(matrix), about, credit: SUITESPARSE_CREDIT };
  }
  throw new Error(`Unknown graph "${name}"`);
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

/**
 * The file is {about, source, license, fields, nodes: [[...fields]], links: [from, to, ...]}.
 * Node rows hold `fields` in order: "id" (or else the row number) is the node
 * id, the other fields become node.data. Links refer to rows.
 */
function fromLabelledFile(file) {
  const graph = createGraph();
  const idAt = file.fields.indexOf('id');
  const ids = file.nodes.map((row, index) => (idAt < 0 ? index : row[idAt]));

  file.nodes.forEach((row, index) => {
    const data = {};
    file.fields.forEach((field, at) => {
      // Fields that start with "_" only color nodes in the demo
      if (at !== idAt && field[0] !== '_' && row[at] != null) data[field] = row[at];
    });
    graph.addNode(ids[index], data);
  });
  for (let i = 0; i + 1 < file.links.length; i += 2) {
    graph.addLink(ids[file.links[i]], ids[file.links[i + 1]]);
  }

  return {
    graph,
    // The sentences after the first one explain the colors of the demo
    about: (file.about || '').split(/(?<=\.)\s/)[0],
    credit: creditOf(file)
  };
}

function creditOf(file) {
  if (!file.license) return null;
  // The notice that the license of WordNet asks for is kept next to the data
  if (/^WordNet/.test(file.license)) {
    return { text: 'WordNet 3.0, © Princeton University', href: `${DEMO_GRAPHS}data/WORDNET-LICENSE.txt` };
  }
  const url = /https?:\/\/[^\s)]+/.exec(file.source || '');
  return { text: file.license, href: url ? url[0] : '' };
}

/** The file is {n, edges: [from, to, from, to, ...]} with node ids 0..n-1 */
function fromBenchmarkFile({ n, edges }) {
  const graph = createGraph();
  // Some benchmark graphs have isolated nodes, which a list of links alone would drop
  for (let i = 0; i < n; i++) graph.addNode(i);
  for (let i = 0; i + 1 < edges.length; i += 2) graph.addLink(edges[i], edges[i + 1]);
  return graph;
}

function fromMatrix({ links, recordsPerEdge }) {
  const graph = createGraph();
  for (let i = 0; i < links.length - 1; i += recordsPerEdge) {
    graph.addLink(links[i], links[i + 1]);
  }
  return graph;
}

// Preferential attachment: each new node links to `m` existing nodes, picked
// proportionally to their degree. Gives a few large hubs.
function barabasiAlbert(n, m) {
  const random = seededRandom(42);
  const graph = createGraph();
  const endpoints = [];
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j < i; j++) {
      graph.addLink(i, j);
      endpoints.push(i, j);
    }
  }
  for (let i = m + 1; i < n; i++) {
    const targets = new Set();
    while (targets.size < m) targets.add(endpoints[Math.floor(random() * endpoints.length)]);
    targets.forEach(target => {
      graph.addLink(i, target);
      endpoints.push(i, target);
    });
  }
  return graph;
}

// Groups of `size` nodes: each node links to 3 random nodes of its own group,
// and about one node in eight also links to a random node anywhere.
function plantedGroups(groups, size) {
  const random = seededRandom(7);
  const pick = n => Math.floor(random() * n);
  const graph = createGraph();
  for (let u = 0; u < groups * size; u++) graph.addNode(u, { group: Math.floor(u / size) });
  for (let u = 0; u < groups * size; u++) {
    const group = Math.floor(u / size);
    for (let k = 0; k < 3; k++) {
      const v = group * size + pick(size);
      if (v !== u) graph.addLink(u, v);
    }
    if (random() < 0.12) graph.addLink(u, pick(groups * size));
  }
  return graph;
}

// Separate pieces of very different sizes (8 to 400 nodes): each is a random
// tree with a few extra links that make loops.
function manyPieces(count) {
  const random = seededRandom(42);
  const pick = n => Math.floor(random() * n);
  const graph = createGraph();
  let next = 0;
  for (let p = 0; p < count; p++) {
    const size = 2 + Math.floor(400 / (1 + pick(60)));
    const base = next;
    next += size;
    for (let i = 1; i < size; i++) graph.addLink(base + i, base + pick(i));
    for (let k = 0; k < size / 10; k++) {
      const a = base + pick(size);
      const b = base + pick(size);
      if (a !== b) graph.addLink(a, b);
    }
  }
  return graph;
}

// The same sequence on every run, so that a generated graph is always the same graph
function seededRandom(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

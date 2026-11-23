/**
 * Graphs that the performance test can render, in the groups of the picker.
 *
 * All but the last group are the graphs of the ngraph.forcelayout demo
 * (https://anvaka.github.io/ngraph.forcelayout/) under the same names, so a
 * graph looks up the same in both places. Keep them in sync with its
 * demo/src/lib/getAvailableGraphs.js. loadGraph.js knows where each comes from.
 */
import graphTypes, { queryNames } from './graphTypes.js';

export const BENCHMARK = 'Benchmark: ';

export const defaultGraph = 'Miserables';

export const graphGroups = [
  {
    label: 'Real graphs, with names',
    graphs: [
      'Mammals (WordNet)',
      'London Underground',
      'Countries',
      'Miserables',
      'Chess openings',
      'US counties',
      'Languages of the world',
      'Metros of the world'
    ]
  },
  {
    label: 'Large',
    graphs: ['English nouns (WordNet)']
  },
  {
    label: 'Generated: speed and shape tests',
    graphs: [
      'Binary',
      'Grid 100x100 (10k)',
      'Binary tree (8k)',
      'Scale-free tree (10k)',
      'Watts-Strogatz (10k)',
      'Barabasi-Albert (20k)',
      'Barabasi-Albert (100k)',
      'Cube 20x20x20 (8k)',
      'Groups 8x250 (2k)',
      'Many pieces (300)'
    ]
  },
  {
    label: 'SuiteSparse matrices: grids and meshes',
    graphs: ['HB/blckhole', 'HB/lshp1882', 'Bai/dw256A', 'HB/dwt_419', 'HB/plat1919', 'Nasa/barth5']
  },
  {
    label: 'SuiteSparse matrices: rings, tubes and solids',
    graphs: ['Gset/G11', 'Pothen/sphere3']
  },
  {
    label: 'SuiteSparse matrices: chains',
    graphs: ['GHS_indef/laser', 'Bai/olm1000']
  },
  {
    label: 'SuiteSparse matrices: trees',
    graphs: ['HB/1138_bus', 'Bai/qh882', 'Hamm/add32']
  },
  {
    label: 'SuiteSparse matrices: hubs and stars',
    graphs: ['HB/fs_541_1', 'Meszaros/gams30a', 'JGD_Homology/cis-n4c6-b15', 'Rajat/rajat14']
  },
  {
    label: 'SuiteSparse matrices: groups',
    graphs: ['HB/west0497', 'LPnetlib/lp_share2b', 'LPnetlib/lp_ship12s', 'Pajek/SmallW']
  },
  {
    label: 'SuiteSparse matrices: many pieces',
    graphs: ['Pajek/CSphd', 'Bai/tols2000', 'Barabasi/NotreDame_yeast', 'JGD_SPG/08blocks', 'HB/dwt_512']
  },
  {
    label: 'SuiteSparse matrices: real networks',
    graphs: [
      'Pajek/USpowerGrid',
      'Pajek/USAir97',
      'Pajek/Erdos02',
      'MathWorks/Harvard500',
      'Sandia/oscil_dcop_01',
      'Pajek/dictionary28'
    ]
  },
  {
    label: 'SuiteSparse matrices: blobs',
    graphs: ['Gset/G43', 'HB/bcsstk02']
  },
  {
    label: 'Layout benchmark of ngraph.forcelayout',
    graphs: [
      'starOfStars', 'megaStars', 'hubLeaves5k', 'EVA', 'paTree3k', 'yeast', 'sciMet', 'erdos992',
      'CSphd', 'protein', 'caterpillars', 'forest5k', 'gridIsolates', 'npmMix4', 'communities',
      'sbm8x50', 'grid20', 'binTree8', 'cliqueCircle', 'ba500', 'er1000', 'rgg1500', 'powerGrid', 'java'
    ].map(id => BENCHMARK + id)
  },
  {
    label: 'Generated: choose the size',
    graphs: graphTypes.map(graphType => graphType.name)
  }
];

// Nodes per graph, so the picker can say how big a graph is before it loads.
// Generated graphs say it in their name.
const nodeCounts = {
  'Mammals (WordNet)': 1165,
  'London Underground': 269,
  'Countries': 252,
  'Miserables': 77,
  'Chess openings': 3866,
  'US counties': 3144,
  'Languages of the world': 13090,
  'Metros of the world': 15758,
  'English nouns (WordNet)': 74241,
  'Binary': 2047,
  'HB/blckhole': 2121,
  'HB/lshp1882': 1882,
  'Bai/dw256A': 512,
  'HB/dwt_419': 419,
  'HB/plat1919': 1919,
  'Nasa/barth5': 15606,
  'Gset/G11': 800,
  'Pothen/sphere3': 258,
  'GHS_indef/laser': 3002,
  'Bai/olm1000': 1000,
  'HB/1138_bus': 1138,
  'Bai/qh882': 882,
  'Hamm/add32': 4960,
  'HB/fs_541_1': 541,
  'Meszaros/gams30a': 531,
  'JGD_Homology/cis-n4c6-b15': 920,
  'Rajat/rajat14': 180,
  'HB/west0497': 497,
  'LPnetlib/lp_share2b': 162,
  'LPnetlib/lp_ship12s': 2869,
  'Pajek/SmallW': 233,
  'Pajek/CSphd': 1882,
  'Bai/tols2000': 2000,
  'Barabasi/NotreDame_yeast': 1846,
  'JGD_SPG/08blocks': 300,
  'HB/dwt_512': 511,
  'Pajek/USpowerGrid': 4941,
  'Pajek/USAir97': 332,
  'Pajek/Erdos02': 5534,
  'MathWorks/Harvard500': 500,
  'Sandia/oscil_dcop_01': 426,
  'Pajek/dictionary28': 39327,
  'Gset/G43': 1000,
  'HB/bcsstk02': 66,
  'Benchmark: starOfStars': 4795,
  'Benchmark: megaStars': 7237,
  'Benchmark: hubLeaves5k': 5000,
  'Benchmark: EVA': 7253,
  'Benchmark: paTree3k': 3000,
  'Benchmark: yeast': 2284,
  'Benchmark: sciMet': 2729,
  'Benchmark: erdos992': 5094,
  'Benchmark: CSphd': 1882,
  'Benchmark: protein': 2031,
  'Benchmark: caterpillars': 3760,
  'Benchmark: forest5k': 5000,
  'Benchmark: gridIsolates': 1800,
  'Benchmark: npmMix4': 14009,
  'Benchmark: communities': 360,
  'Benchmark: sbm8x50': 400,
  'Benchmark: grid20': 400,
  'Benchmark: binTree8': 511,
  'Benchmark: cliqueCircle': 96,
  'Benchmark: ba500': 500,
  'Benchmark: er1000': 998,
  'Benchmark: rgg1500': 1500,
  'Benchmark: powerGrid': 4941,
  'Benchmark: java': 1538
};

const descriptions = {
  'Miserables': 'Characters of Victor Hugo’s Les Misérables, linked when they appear in the same chapter.',
  'Binary': 'A balanced binary tree.',
  'Grid 100x100 (10k)': 'A 100 x 100 grid.',
  'Binary tree (8k)': 'A balanced binary tree of 8k nodes.',
  'Watts-Strogatz (10k)': 'A small-world ring (Watts-Strogatz).',
  'Barabasi-Albert (20k)': 'Preferential attachment (Barabási-Albert): a few big hubs.',
  'Barabasi-Albert (100k)': 'Preferential attachment (Barabási-Albert), 100k nodes: a speed test.',
  'Scale-free tree (10k)': 'A tree grown by preferential attachment.',
  'Cube 20x20x20 (8k)': 'A 20 x 20 x 20 lattice.',
  'Groups 8x250 (2k)': 'Eight groups of 250 nodes, linked mostly within the group.',
  'Many pieces (300)': '300 separate pieces of very different sizes.'
};

const names = new Set(graphGroups.flatMap(group => group.graphs));

/** The graph that a `?graph=` value asks for; unknown values give the default one */
export function resolveGraphName(requested) {
  if (names.has(requested)) return requested;
  // Links from the time when Les Misérables was one of the generators
  if (requested === 'miserables') return 'Miserables';
  return defaultGraph;
}

/** Generator and its arguments if the visitor chooses the size of this graph */
export function customSizeOf(name) {
  return graphTypes.find(graphType => graphType.name === name);
}

/**
 * Arguments of a graph whose size the visitor chooses (see `customSizeOf`):
 * numbers from the query string, or the defaults where it has none.
 */
export function sizeArguments(custom, query) {
  return custom.params.map((param, index) => {
    const number = Number.parseFloat(query.get(queryNames[index]));
    return Number.isNaN(number) ? param.value : number;
  });
}

/** 'Mammals (WordNet) · 1.2k': the name with its size, unless the name already says it */
export function graphTitle(name) {
  const count = nodeCounts[name];
  if (!count || /\(\d+k?\)$/.test(name)) return name;
  return `${name} · ${formatCount(count)}`;
}

export function nodeCountOf(name) {
  return nodeCounts[name] || 0;
}

/**
 * What can be said about a graph before it is loaded. Graphs with real names
 * describe themselves in their files, see loadGraph.js.
 */
export function describeGraph(name) {
  const custom = customSizeOf(name);
  if (custom) return custom.description;
  if (descriptions[name]) return descriptions[name];
  if (name.startsWith(BENCHMARK)) return 'One of the graphs that the layout benchmark of ngraph.forcelayout uses.';
  if (name.includes('/')) {
    return 'A sparse matrix from the SuiteSparse Matrix Collection; its pattern is drawn as a graph (a node per row, a link per nonzero).';
  }
  return 'A real graph with named nodes, the same as in the ngraph.forcelayout demo.';
}

/** Adds every graph to a <select>, grouped the way `graphGroups` is */
export function fillGraphSelect(select, selected) {
  graphGroups.forEach(group => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;
    group.graphs.forEach(name => {
      optgroup.append(new Option(graphTitle(name), name, false, name === selected));
    });
    select.append(optgroup);
  });
}

function formatCount(count) {
  if (count < 1000) return String(count);
  if (count < 10000) return `${Math.round(count / 100) / 10}k`;
  return `${Math.round(count / 1000)}k`;
}

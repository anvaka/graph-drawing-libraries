/**
 * Graphs of a size that the visitor chooses. `name` is a generator from
 * ngraph.generators, `params` are its arguments in the call order: `label`
 * names an argument next to its input, `description` explains it. The graphs
 * of a fixed size are listed in graphs.js.
 */
export default [{
  name: 'ladder',
  description: 'Ladder graph is a graph in form of ladder.',
  params: [{ name: 'n', label: 'Steps', description: 'Number of steps in the ladder', value: 10 }]
}, {
  name: 'circularLadder',
  description: 'A ladder closed into a ring.',
  params: [{ name: 'n', label: 'Steps', description: 'Number of steps in the ladder', value: 10 }]
}, {
  name: 'complete',
  description: 'Complete graph Kn: every node is connected to every other node.',
  params: [{ name: 'n', label: 'Nodes', description: 'Number of nodes in the graph', value: 10 }]
}, {
  name: 'completeBipartite',
  description: 'Complete bipartite graph Kn,m. Each node in the first partition is connected to all nodes in the second partition.',
  params: [
    { name: 'n', label: 'First part', description: 'Number of nodes in the first partition', value: 10 },
    { name: 'm', label: 'Second part', description: 'Number of nodes in the second partition', value: 10 }
  ]
}, {
  name: 'path',
  description: 'Path graph: nodes connected in a single line.',
  params: [{ name: 'n', label: 'Nodes', description: 'Number of nodes in the path', value: 10 }]
}, {
  name: 'grid',
  description: 'Grid graph: rows and columns of nodes, each linked to its neighbors.',
  params: [
    { name: 'n', label: 'Rows', description: 'Number of rows', value: 10 },
    { name: 'm', label: 'Columns', description: 'Number of columns', value: 10 }
  ]
}, {
  name: 'grid3',
  description: '3D grid: rows, columns and levels of nodes, each linked to its neighbors.',
  params: [
    { name: 'n', label: 'Rows', description: 'Number of rows', value: 10 },
    { name: 'm', label: 'Columns', description: 'Number of columns', value: 10 },
    { name: 'z', label: 'Levels', description: 'Number of levels', value: 10 }
  ]
}, {
  name: 'balancedBinTree',
  description: 'Balanced binary tree.',
  params: [{ name: 'n', label: 'Levels', description: 'Number of levels in the tree', value: 10 }]
}, {
  name: 'noLinks',
  description: 'Graph with no links.',
  params: [{ name: 'n', label: 'Nodes', description: 'Number of nodes in the graph', value: 10 }]
}, {
  name: 'cliqueCircle',
  description: 'A circular graph with cliques instead of individual nodes.',
  params: [
    { name: 'cliqueCount', label: 'Cliques', description: 'Number of cliques inside the circle', value: 10 },
    { name: 'cliqueSize', label: 'Clique size', description: 'Number of nodes inside each clique', value: 10 }
  ]
}, {
  name: 'wattsStrogatz',
  description: 'Watts-Strogatz small-world graph.',
  params: [
    { name: 'n', label: 'Nodes', description: 'The number of nodes', value: 100 },
    { name: 'k', label: 'Neighbors', description: 'Each node is connected to k nearest neighbors in ring topology', value: 20 },
    { name: 'p', label: 'Rewiring probability', description: 'The probability of rewiring each edge', value: 0.1 }
  ]
}];

/**
 * Generator arguments travel in the query string under these names, by
 * position: the first argument is `n`, the second is `m`, the third is `k`.
 */
export const queryNames = ['n', 'm', 'k'];

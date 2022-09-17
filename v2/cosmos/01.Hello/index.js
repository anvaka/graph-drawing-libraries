import { Graph } from '@cosmograph/cosmos'

const columns = 10;
const rows = 10;

const nodes = []
for (var x = 0; x < columns; x++) {
  for (var y = 0; y < rows; y++) {
    nodes.push({
      id: x + y * columns
    });
  }
}

const links = []
for (var x = 0; x < columns; x++) {
  for (var y = 0; y < rows; y++) {
    if (x + 1 < columns) links.push({source: x + y * columns, target: x + 1 + y * columns, value: 1});
    if (y + 1 < rows)    links.push({source: x + y * columns, target: x + (y + 1) * columns, value: 1});
  }
}

const canvas = document.querySelector('#container')
  // simulation: {
  //   linkDistance: 1,
  //   linkSpring: 2,
  //   repulsion: 0.1,
  //   gravity: 0.1,
  //   decay: 10000
  // },
const config = {
  backgroundColor: "#151515",
  nodeSize: 3,
  nodeColor: "#984040",
  linkWidth: 0.1,
  linkColor: "#8C8C8C",
  linkArrows: false,

  simulation: {
    repulsion: 0.5,
  },
  renderLinks: true,
  events: {
    onClick: node => { console.log('Clicked node: ', node) },
  },
}

const graph = new Graph(canvas, config)

graph.setData(nodes, links)
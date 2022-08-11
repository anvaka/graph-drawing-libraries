import Graph from 'graphology';
import Sigma from 'sigma';
import forceAtlas2 from 'graphology-layout-forceatlas2';

const container = document.getElementById('sigma-container');

const graph = new Graph();
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    graph.addNode(`${x}${y}`, {
      // Have to pass x/y or get NaNs
      x: Math.random(), 
      y: Math.random(), 
      size: (x + y) + 1, 
      label: `Node ${x} ${y}`, 
      color: "blue" 
    });
  }
}

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    if (x + 1 < 10) graph.addEdge(`${x}${y}`, `${x + 1}${y}`);
    if (y + 1 < 10) graph.addEdge(`${x}${y}`, `${x}${y + 1}`);
  }
}

// Assign the positions to the nodes:
forceAtlas2.assign(graph, {iterations: 50});

const renderer = new Sigma(graph, container);
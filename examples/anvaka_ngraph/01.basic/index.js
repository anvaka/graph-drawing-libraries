// Create graph:
var graph = require('ngraph.graph')();
graph.addLink(1, 2);
graph.addLink(1, 3);
graph.addLink(2, 4);
graph.addLink(2, 5);

// And render it
var nthree = require('ngraph.three');
var graphics = nthree(graph);

graphics.run(); // begin animation loop

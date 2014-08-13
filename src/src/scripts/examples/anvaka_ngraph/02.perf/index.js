var runSuite = require('../../../performance/index.js');
runSuite(function(graph) {
  // And render it
  var nthree = require('ngraph.three');
  var graphics = nthree(graph);

  graphics.run(); // begin animation loop
});

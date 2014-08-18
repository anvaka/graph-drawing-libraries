/**
 * This module generates ngraph graph based on query string paramenters. Then it
 * let subscribers to be invoked when graph is generated.
 */
module.exports = runSuite;

function runSuite(graphReadyCallback) {
  var query = require('query-string').parse(window.location.search.substring(1));
  var graph = getGraphFromQueryString(query);
  graphReadyCallback(graph);
}

function getGraphFromQueryString(query) {
  var graphGenerators = require('ngraph.generators');
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(getNumber(query.n), getNumber(query.m), getNumber(query.k));
}

function getNumber(string, defaultValue) {
  var number = parseFloat(string);
  return (typeof number === 'number') && !isNaN(number) ? number : (defaultValue || 10);
}

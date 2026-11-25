import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import generators from 'ngraph.generators';
import graphTypes, { queryNames } from '../app/graphTypes.js';
import { BENCHMARK, customSizeOf, graphGroups, nodeCountOf, resolveGraphName } from '../app/graphs.js';
import loadGraph, { generated, labelled } from '../app/loadGraph.js';

const readJSON = name => JSON.parse(readFileSync(new URL(`../data/${name}`, import.meta.url), 'utf8'));
const libraries = readJSON('libraries.json');
const stats = readJSON('stats.json');

test('every library has a demo', () => {
  // A library that cannot be run here is not listed: the list is for comparing
  for (const library of libraries) {
    assert.ok(library.example, `${library.repo} has no example folder`);
  }
});

test('every example has basic and performance pages', () => {
  const examples = libraries.filter(library => library.example);
  assert.ok(examples.length > 0);

  for (const { example } of examples) {
    for (const page of ['01.basic', '02.perf']) {
      const file = new URL(`../public/examples/${example}/${page}/index.html`, import.meta.url);
      assert.ok(existsSync(file), `${example}/${page}/index.html is missing`);
    }
  }
});

test('every library has statistics', () => {
  const known = new Set(stats.libraries.map(record => record.repo));
  for (const { repo } of libraries) {
    assert.ok(known.has(repo), `${repo} is not in stats.json, run "npm run stats"`);
  }
});

test('graph types match ngraph.generators', () => {
  for (const graphType of graphTypes) {
    assert.equal(typeof generators[graphType.name], 'function', `${graphType.name} generator does not exist`);
    assert.ok(graphType.params.length <= queryNames.length);

    const graph = generators[graphType.name](...graphType.params.map(param => param.value));
    assert.ok(graph.getNodesCount() > 0, `${graphType.name} produced an empty graph`);
  }
});

test('every graph of the picker has a source', () => {
  const names = graphGroups.flatMap(group => group.graphs);
  assert.equal(new Set(names).size, names.length, 'a graph is listed twice');

  for (const name of names) {
    const known = customSizeOf(name) || generated[name] || labelled[name] ||
      name.startsWith(BENCHMARK) || name.includes('/');
    assert.ok(known, `loadGraph.js cannot load "${name}"`);
    assert.equal(resolveGraphName(name), name);
  }
});

test('generated graphs have the size that the picker shows', async () => {
  for (const name of Object.keys(generated)) {
    const { graph } = await loadGraph(name);
    assert.ok(graph.getLinksCount() > 0, `${name} has no links`);

    // Either the list of sizes or the name itself ("Grid 100x100 (10k)") says it.
    // "Many pieces (300)" counts pieces, not nodes.
    const thousands = /\((\d+)k\)$/.exec(name);
    const expected = nodeCountOf(name) || (thousands && thousands[1] * 1000);
    if (!expected) continue;

    const actual = graph.getNodesCount();
    assert.ok(Math.abs(actual - expected) <= expected * 0.05, `${name} has ${actual} nodes, expected about ${expected}`);
  }
});

test('graphs of a chosen size use defaults for missing arguments', async () => {
  const { graph } = await loadGraph('grid', new URLSearchParams({ n: '3' }));
  assert.equal(graph.getNodesCount(), 3 * 10);
});

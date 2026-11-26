import test from 'node:test';
import assert from 'node:assert/strict';
import { clearRunning, markRunning, readRunning, recordFreeze, recordOk, whyAsk } from '../app/guard.js';

function memoryStorage() {
  const items = new Map();
  return {
    getItem: key => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: key => items.delete(key)
  };
}

const run = (library, nodes, links) => ({ library, nodes, links, t: 0 });

// What scripts/measure.js found for a library: the smallest graph that froze the tab
const measured = 6000;

test('a library that never froze in the measurements gets any graph without a question', () => {
  const storage = memoryStorage();
  assert.equal(whyAsk('a', 1e6, 1e6, undefined, storage), null);
});

test('a graph as large as one that froze in the measurements needs a yes', () => {
  const storage = memoryStorage();
  assert.equal(whyAsk('a', 3000, 2999, measured, storage), null);
  assert.deepEqual(whyAsk('a', 3000, 3000, measured, storage), { reason: 'measured', froze: { size: measured } });
});

test('a graph that this browser drew well needs no yes, whatever the measurements say', () => {
  const storage = memoryStorage();
  recordOk(run('a', 4000, 4000), storage);

  assert.equal(whyAsk('a', 4000, 4000, measured, storage), null);
  assert.equal(whyAsk('a', 4000, 4001, measured, storage).reason, 'measured');
  // What one library drew says nothing about another
  assert.equal(whyAsk('b', 4000, 4000, measured, storage).reason, 'measured');
});

test('a graph as large as one that froze the tab needs a yes', () => {
  const storage = memoryStorage();
  recordOk(run('a', 10000, 10000), storage);
  recordFreeze(run('a', 3000, 3000), 12000, storage);

  assert.equal(whyAsk('a', 2000, 2000, undefined, storage), null);
  assert.deepEqual(whyAsk('a', 3000, 3000, undefined, storage), { reason: 'froze', froze: { size: 6000, ms: 12000 } });
  // The smallest graph that froze is the one to remember
  recordFreeze(run('a', 5000, 5000), 30000, storage);
  assert.equal(whyAsk('a', 3000, 3000, undefined, storage).froze.size, 6000);
  // What happened here is told before what we measured
  assert.equal(whyAsk('a', 3000, 3000, measured, storage).reason, 'froze');
});

test('drawing a graph that froze before forgets the freeze', () => {
  const storage = memoryStorage();
  recordFreeze(run('a', 3000, 3000), null, storage);
  assert.equal(whyAsk('a', 3000, 3000, undefined, storage).reason, 'froze');

  recordOk(run('a', 3000, 3000), storage);
  assert.equal(whyAsk('a', 3000, 3000, undefined, storage), null);
});

test('the note about a running library is kept until it is cleared', () => {
  const storage = memoryStorage();
  assert.equal(readRunning(storage), null);

  markRunning(run('a', 1, 2), storage);
  assert.deepEqual(readRunning(storage), run('a', 1, 2));
  clearRunning(storage);
  assert.equal(readRunning(storage), null);
});

test('guardrails remember nothing without storage or with broken records', () => {
  assert.equal(whyAsk('a', 10, 10, undefined, undefined), null);
  recordOk(run('a', 1, 1), undefined);

  const storage = memoryStorage();
  storage.setItem('graph-drawing-libraries:seen', '{not json');
  assert.equal(whyAsk('a', 10, 10, undefined, storage), null);
  // What we measured needs no storage
  assert.equal(whyAsk('a', 3000, 3000, measured, undefined).reason, 'measured');
});

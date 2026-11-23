import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FLOOR, STEP, clearRunning, markRunning, readRunning, recordFreeze, recordOk, whyAsk
} from '../app/guard.js';

function memoryStorage() {
  const items = new Map();
  return {
    getItem: key => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: key => items.delete(key)
  };
}

const run = (library, nodes, links) => ({ library, nodes, links, t: 0 });

test('small graphs start without a question', () => {
  const storage = memoryStorage();
  assert.equal(whyAsk('a', FLOOR / 2, FLOOR / 2, storage), null);
});

test('a graph much larger than anything the library drew needs a yes', () => {
  const storage = memoryStorage();
  assert.deepEqual(whyAsk('a', FLOOR, 1, storage), { reason: 'large', largest: 0 });

  recordOk(run('a', 4000, 4000), storage);
  assert.equal(whyAsk('a', 8000 * STEP, 0, storage), null);
  assert.deepEqual(whyAsk('a', 8000 * STEP, 1, storage), { reason: 'large', largest: 8000 });
  // What one library drew says nothing about another
  assert.deepEqual(whyAsk('b', 4000, 4000, storage), { reason: 'large', largest: 0 });
});

test('a graph as large as one that froze the tab needs a yes', () => {
  const storage = memoryStorage();
  recordOk(run('a', 10000, 10000), storage);
  recordFreeze(run('a', 3000, 3000), 12000, storage);

  assert.equal(whyAsk('a', 2000, 2000, storage), null);
  assert.deepEqual(whyAsk('a', 3000, 3000, storage), { reason: 'froze', froze: { size: 6000, ms: 12000 } });
  // The smallest graph that froze is the one to remember
  recordFreeze(run('a', 5000, 5000), 30000, storage);
  assert.equal(whyAsk('a', 3000, 3000, storage).froze.size, 6000);
});

test('drawing a graph that froze before forgets the freeze', () => {
  const storage = memoryStorage();
  recordFreeze(run('a', 3000, 3000), null, storage);
  assert.equal(whyAsk('a', 3000, 3000, storage).reason, 'froze');

  recordOk(run('a', 3000, 3000), storage);
  assert.equal(whyAsk('a', 3000, 3000, storage), null);
});

test('the note about a running library is kept until it is cleared', () => {
  const storage = memoryStorage();
  assert.equal(readRunning(storage), null);

  markRunning(run('a', 1, 2), storage);
  assert.deepEqual(readRunning(storage), run('a', 1, 2));
  clearRunning(storage);
  assert.equal(readRunning(storage), null);
});

test('guardrails do nothing without storage or with broken records', () => {
  assert.equal(whyAsk('a', 10, 10, undefined), null);
  recordOk(run('a', 1, 1), undefined);

  const storage = memoryStorage();
  storage.setItem('graph-drawing-libraries:seen', '{not json');
  assert.deepEqual(whyAsk('a', FLOOR, FLOOR, storage), { reason: 'large', largest: 0 });
});

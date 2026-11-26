/**
 * Guardrails of the performance test: a library that is too slow for a graph
 * freezes the whole tab, the toolbar included.
 *
 * The visitor is asked before a graph is started only when a freeze is likely:
 *
 * - the library froze a tab for ten seconds or longer on a graph of this size
 *   or smaller when we measured it on a slow computer (data/limits.json, made
 *   by scripts/measure.js);
 * - or it froze this very browser on a graph of this size or smaller.
 *
 * What this browser has seen wins over what we measured: a library that drew a
 * graph here while the tab stayed responsive gets graphs of that size without
 * a question.
 *
 * The size of a graph is the number of its nodes and links together.
 */

/** A tab that does not respond for this long is frozen */
export const FREEZE_MS = 5000;
/** A run that stayed responsive for this long went well */
export const SETTLE_MS = 6000;

const SEEN = 'graph-drawing-libraries:seen';
const RUNNING = 'graph-drawing-libraries:running';

/**
 * Why the visitor should be asked before `library` gets a graph of this size:
 * `{reason: 'froze', froze}` when it froze this browser, `{reason: 'measured',
 * froze}` when it froze in our measurements, or null to go on.
 *
 * `measured` is the `froze` size of the library in data/limits.json, if any.
 * `froze` is `{size, ms}` of the graph that froze this browser (`ms` is null
 * for a tab that never came back), and `{size}` of the one in our measurements.
 */
export function whyAsk(library, nodes, links, measured, storage = browserStorage()) {
  const size = nodes + links;
  const seen = read(storage, SEEN)[library] || {};

  if (seen.froze && size >= seen.froze.size) return { reason: 'froze', froze: seen.froze };
  // This computer is faster than the one of the measurements
  if (size <= (seen.ok || 0)) return null;
  if (measured && size >= measured) return { reason: 'measured', froze: { size: measured } };
  return null;
}

/** The library drew the graph of `run` and the tab stayed responsive */
export function recordOk(run, storage = browserStorage()) {
  update(storage, run.library, seen => {
    seen.ok = Math.max(seen.ok || 0, sizeOf(run));
    // It froze on a graph of this size before, but not anymore
    if (seen.froze && seen.froze.size <= sizeOf(run)) delete seen.froze;
  });
}

/**
 * The library froze the tab for `ms` on the graph of `run`. `ms` is null when
 * nobody saw the end of it: the tab was closed while the library had the graph.
 */
export function recordFreeze(run, ms, storage = browserStorage()) {
  update(storage, run.library, seen => {
    const smaller = seen.froze && seen.froze.size < sizeOf(run);
    if (!smaller) seen.froze = { size: sizeOf(run), ms };
  });
}

/**
 * `run` is `{library, nodes, links, t}`: the library gets the graph now.
 * The note outlives a tab that froze for good, readRunning() finds it later.
 */
export function markRunning(run, storage = browserStorage()) {
  write(storage, RUNNING, run);
}

export function readRunning(storage = browserStorage()) {
  const run = read(storage, RUNNING);
  return run.library ? run : null;
}

export function clearRunning(storage = browserStorage()) {
  try {
    storage?.removeItem(RUNNING);
  } catch {
    // Without storage there are no guardrails, the test itself still works
  }
}

function sizeOf(run) {
  return run.nodes + run.links;
}

function update(storage, library, change) {
  const all = read(storage, SEEN);
  const seen = all[library] || {};
  change(seen);
  all[library] = seen;
  write(storage, SEEN, all);
}

function read(storage, key) {
  try {
    const value = JSON.parse(storage?.getItem(key));
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function write(storage, key, value) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Private windows and full storage: go on without remembering
  }
}

function browserStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

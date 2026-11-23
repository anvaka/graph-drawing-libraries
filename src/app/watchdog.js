/**
 * The part of the guardrails (see guard.js) that lives in the toolbar page:
 * asks the visitor before a graph that may be too large for the library is
 * started, and notices when the library freezes the tab.
 *
 * The demo runs in an iframe of the same origin, so it shares a thread with
 * this page: while the library is busy, timers here do not fire. A timer that
 * comes late by seconds is how a freeze is measured.
 */
import { FREEZE_MS, SETTLE_MS, clearRunning, markRunning, readRunning, recordFreeze, recordOk } from './guard.js';

const BEAT_MS = 250;
// A gap this long is a computer that slept, not a library that worked
const SLEEP_MS = 10 * 60 * 1000;

const numberFormat = new Intl.NumberFormat('en');

/**
 * `runner` is the iframe of the demo, `libraryName` is how the library is
 * called in messages. Call it before the demo is loaded. Returns `{ask}`.
 */
export default function createWatchdog({ runner, libraryName }) {
  const panel = document.querySelector('#guard');
  const panelText = document.querySelector('#guard-text');
  const agree = document.querySelector('#guard-go');
  const notice = document.querySelector('#notice');

  // A note that is still here was left by a tab that froze and was closed
  const unfinished = readRunning();
  if (unfinished) {
    recordFreeze(unfinished, null);
    clearRunning();
  }

  let run = null;
  let lastBeat = Date.now();
  let skipBeat = false;
  let frozenFor = 0;
  let settled = false;
  let stopped = false;

  setInterval(beat, BEAT_MS);

  // Browsers slow timers of hidden tabs down, which looks like a freeze. And a
  // hidden tab can be discarded at any time, which looks like a tab that was
  // closed while frozen. So nothing is measured while the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    skipBeat = true;
    run = run || readRunning();
    if (document.hidden) clearRunning();
    else if (run && !stopped) markRunning(run);
  });

  // Leaving the page while it responds is not a freeze
  window.addEventListener('pagehide', () => {
    if (!skipBeat) measure(Date.now(), lastBeat);
    clearRunning();
  });

  agree.addEventListener('click', () => {
    panel.hidden = true;
    runner.hidden = false;
    runner.contentWindow.postMessage({ source: 'runner', action: 'render' }, window.location.origin);
  });

  return { ask };

  /** The demo waits: `why` is the answer of whyAsk() in guard.js for a graph of this size */
  function ask(why, { nodes, links }) {
    panelText.textContent = explain(why, nodes, links);
    runner.hidden = true;
    panel.hidden = false;
    agree.focus();
  }

  function explain(why, nodes, links) {
    const size = `${format(nodes)} nodes and ${format(links)} links`;
    if (why.reason === 'froze' && why.froze.ms) {
      return `${libraryName} froze this tab for ${seconds(why.froze.ms)} on a graph of ${format(why.froze.size)} nodes and links. This graph has ${size}.`;
    }
    if (why.reason === 'froze') {
      return `The last time ${libraryName} got a graph of ${format(why.froze.size)} nodes and links, the tab was closed before it finished, most likely because it froze. This graph has ${size}.`;
    }
    const largest = why.largest ? ` (the largest so far had ${format(why.largest)} nodes and links)` : '';
    return `This graph has ${size}. ${libraryName} has not drawn a graph this large in this browser yet${largest}. A library that is too slow for a graph freezes the whole tab, this toolbar included.`;
  }

  function beat() {
    const now = Date.now();
    const previous = lastBeat;
    lastBeat = now;

    if (document.hidden) {
      skipBeat = true;
    } else if (skipBeat) {
      // The first beat after the tab was hidden comes late for no reason
      skipBeat = false;
    } else {
      measure(now, previous);
    }
  }

  function measure(now, previous) {
    if (stopped) return;
    // runSuite.js leaves the note right before the library gets the graph
    run = run || readRunning();
    if (!run) return;

    const blocked = now - Math.max(previous, run.t);
    if (blocked >= FREEZE_MS && blocked < SLEEP_MS) {
      showFreeze(blocked);
    } else if (!frozenFor && !settled && now - run.t >= SETTLE_MS) {
      settled = true;
      recordOk(run);
    }
  }

  function showFreeze(ms) {
    frozenFor = Math.max(frozenFor, ms);
    recordFreeze(run, frozenFor);

    const stop = Object.assign(document.createElement('button'), { textContent: 'Stop it' });
    stop.addEventListener('click', () => {
      stopped = true;
      clearRunning();
      runner.src = 'about:blank';
      notice.textContent = `Stopped. ${remembered()}`;
    });
    notice.replaceChildren(`${remembered()} `, stop);
    notice.hidden = false;
  }

  function remembered() {
    return `${libraryName} froze this tab for ${seconds(frozenFor)}. This browser will ask before it gives ${libraryName} a graph this large again.`;
  }
}

function seconds(ms) {
  const value = Math.round(ms / 1000);
  return `${format(value)} second${value === 1 ? '' : 's'}`;
}

function format(number) {
  return numberFormat.format(Number(number) || 0);
}

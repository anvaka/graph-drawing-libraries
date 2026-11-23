/**
 * Loads the graph described by the query string (?graph=grid&n=10&m=10 or
 * ?graph=Miserables) and passes it to the callback. Built as a standalone
 * script that every examples/<library>/02.perf page loads, see
 * vite.runsuite.config.js
 *
 * The callback is always called asynchronously: most graphs are downloaded.
 * Inside of the performance page it can also wait for the visitor to agree,
 * when the graph may be too large for the library, see guard.js
 */
import loadGraph from './loadGraph.js';
import { resolveGraphName } from './graphs.js';
import { markRunning, whyAsk } from './guard.js';

export default function runSuite(graphReadyCallback) {
  const query = new URLSearchParams(window.location.search);
  const name = resolveGraphName(query.get('graph'));

  loadGraph(name, query).then(async ({ graph, about, credit }) => {
    const nodes = graph.getNodesCount();
    const links = graph.getLinksCount();
    // Guardrails need the toolbar to ask the visitor: a demo page opened on
    // its own starts right away
    const library = insideRunner() ? libraryOfThisPage() : null;
    const ask = library ? whyAsk(library, nodes, links) : null;

    tellRunner({ name, about, credit, nodes, links, ask });
    if (ask) await runnerAgrees();
    // If the library never gives the tab back, this note tells the next visit
    if (library && !document.hidden) markRunning({ library, nodes, links, t: Date.now() });

    graphReadyCallback(graph);
  }, error => {
    const message = `Could not load the graph "${name}": ${error.message}`;
    tellRunner({ name, error: message });

    const note = document.createElement('p');
    note.textContent = message;
    note.style.cssText = 'position: relative; margin: 24px; font: 16px/1.5 system-ui, sans-serif;';
    document.body.append(note);
  });
}

function insideRunner() {
  return window.parent !== window;
}

// The page with the toolbar (performance.js) shows what was loaded
function tellRunner(details) {
  if (!insideRunner()) return;
  window.parent.postMessage({ source: 'runSuite', ...details }, window.location.origin);
}

// Resolves when the visitor clicks "Render anyway" in the toolbar page
function runnerAgrees() {
  return new Promise(resolve => {
    window.addEventListener('message', function listen(event) {
      if (event.source !== window.parent || event.origin !== window.location.origin) return;
      if (event.data?.source !== 'runner' || event.data.action !== 'render') return;
      window.removeEventListener('message', listen);
      resolve();
    });
  });
}

// Demo pages live in examples/<library>/02.perf/
function libraryOfThisPage() {
  const folder = /\/examples\/([^/]+)\//.exec(window.location.pathname);
  return folder ? decodeURIComponent(folder[1]) : null;
}

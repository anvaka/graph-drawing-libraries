/**
 * Performance runner: renders the graph from the query string with the chosen
 * library inside of an iframe, and lets visitors switch the library and the
 * graph.
 *
 * Every library is a link to this page with another `lib`: each one gets the
 * same graph and starts in a fresh page.
 */
import libraries, { currentExample } from './libraries.js';
import { queryNames } from './graphTypes.js';
import { customSizeOf, fillGraphSelect, graphTitle, resolveGraphName, sizeArguments } from './graphs.js';
import createWatchdog from './watchdog.js';

const withExamples = libraries.filter(library => library.example);
const query = new URLSearchParams(window.location.search);
// Old links have `owner/name` here, new ones have the example folder name
const requested = currentExample((query.get('lib') || '').replace('/', '_'));
const current = withExamples.find(library => library.example === requested) || withExamples[0];
const graphName = resolveGraphName(query.get('graph'));

const sourceRoot = 'https://github.com/anvaka/graph-drawing-libraries/tree/main/src/public/examples/';
const numberFormat = new Intl.NumberFormat('en');
const runner = document.querySelector('#runner');
const info = document.querySelector('#graph-info');

document.title = `${current.name} draws ${graphName} · We ♥ Graphs`;
showLibrary();
showLibraryList();
showLibrarySwitcher();

const graphSelect = document.querySelector('#graph');
fillGraphSelect(graphSelect, graphName);
graphSelect.addEventListener('change', () => {
  query.set('graph', graphSelect.value);
  // Sizes of the previous graph mean nothing to the new one
  queryNames.forEach(name => query.delete(name));
  window.location.search = query.toString();
});

showSizeForm(customSizeOf(graphName));

info.textContent = `Loading ${graphTitle(graphName)}…`;
window.addEventListener('message', showLoadedGraph);
// Before the demo is loaded: it reads what the watchdog remembers
const watchdog = createWatchdog({ runner, libraryName: current.name });
runner.src = `../examples/${current.example}/02.perf/index.html?${query}`;

// The same graph and the same size, drawn by another library
function addressOf(library) {
  const other = new URLSearchParams(query);
  other.set('lib', library.example);
  return `?${other}`;
}

function showLibrary() {
  const about = element('span', { className: 'about' }, element('strong', {}, current.name));
  if (current.description) about.append(` ${current.description}`);

  document.querySelector('#library-info').append(
    about,
    element('a', { href: current.url }, 'Repository'),
    element('a', { href: `../examples/${current.example}/01.basic/index.html` }, 'Hello world example'),
    element('a', { href: `${sourceRoot}${current.example}` }, 'Code of the demos')
  );
}

function showLibraryList() {
  const items = withExamples.map(library => {
    const [owner, name] = library.name.split('/');
    const link = element('a', { href: addressOf(library) },
      element('span', { className: 'owner' }, `${owner}/`), name
    );
    if (library === current) link.setAttribute('aria-current', 'page');
    return element('li', {}, link);
  });
  document.querySelector('#libraries').append(...items);
  // Short windows scroll the list
  document.querySelector('#libraries [aria-current]').scrollIntoView({ block: 'nearest' });
}

function showLibrarySwitcher() {
  const select = document.querySelector('#library');
  withExamples.forEach(library => {
    select.add(new Option(library.name, library.example, false, library === current));
  });
  select.addEventListener('change', () => {
    query.set('lib', select.value);
    window.location.search = query.toString();
  });

  const position = withExamples.indexOf(current);
  const neighbor = step => withExamples[(position + step + withExamples.length) % withExamples.length];
  [['#previous', -1, 'Previous'], ['#next', 1, 'Next']].forEach(([selector, step, direction]) => {
    const library = neighbor(step);
    Object.assign(document.querySelector(selector), {
      href: addressOf(library),
      title: `${direction} library: ${library.name}`,
      ariaLabel: `${direction} library: ${library.name}`
    });
  });
}

// Graphs of the last group have a size: let the visitor change it right here
function showSizeForm(custom) {
  const form = document.querySelector('#size');
  if (!custom) return;

  const values = sizeArguments(custom, query);
  const inputs = custom.params.map((param, index) => Object.assign(document.createElement('input'), {
    type: 'number',
    min: '0',
    step: 'any',
    required: true,
    value: values[index],
    title: param.description
  }));
  const labels = custom.params.map((param, index) => {
    const label = document.createElement('label');
    label.append(param.label, inputs[index]);
    return label;
  });
  const apply = Object.assign(document.createElement('button'), { textContent: 'Apply' });

  form.append(...labels, apply);
  form.hidden = false;
  // Enter in a field submits too
  form.addEventListener('submit', event => {
    event.preventDefault();
    inputs.forEach((input, index) => query.set(queryNames[index], input.value));
    window.location.search = query.toString();
  });
}

// The demo page reports what it has loaded, see runSuite.js
function showLoadedGraph(event) {
  const details = event.data;
  if (event.source !== runner.contentWindow || event.origin !== window.location.origin) return;
  if (!details || details.source !== 'runSuite') return;

  if (details.error) {
    info.textContent = details.error;
    return;
  }

  const size = `${count(details.nodes, 'node')}, ${count(details.links, 'link')}.`;
  info.replaceChildren([size, details.about].filter(Boolean).join(' '));
  if (details.credit) info.append(' Data: ', creditElement(details.credit), '.');

  // The graph may be too large for the library: the demo waits for the visitor
  if (details.ask) watchdog.ask(details.ask, details);
}

function creditElement({ text, href }) {
  // The address comes from a data file, only let web links through
  if (!/^https?:\/\//.test(href)) return text;

  return element('a', { href }, text);
}

function element(tag, properties = {}, ...children) {
  const created = Object.assign(document.createElement(tag), properties);
  created.append(...children);
  return created;
}

function count(number, noun) {
  return `${numberFormat.format(number)} ${noun}${number === 1 ? '' : 's'}`;
}

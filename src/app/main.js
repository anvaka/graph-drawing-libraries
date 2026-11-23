import libraries, { currentExample, generated } from './libraries.js';
import { queryNames } from './graphTypes.js';
import { customSizeOf, defaultGraph, describeGraph, fillGraphSelect } from './graphs.js';

const sourceRoot = 'https://github.com/anvaka/graph-drawing-libraries/tree/main/src/public/examples/';
const app = document.querySelector('#app');

const columns = [
  { key: 'name', title: 'Library' },
  { key: 'example', title: 'Demo', sortable: false },
  { key: 'stars', title: 'Stars', numeric: true },
  { key: 'forks', title: 'Forks', numeric: true },
  { key: 'created', title: 'Created', date: true },
  { key: 'pushed', title: 'Last push', date: true },
  { key: 'issues', title: 'Open issues', numeric: true, hint: 'Open issues and pull requests' },
  { key: 'license', title: 'License' }
];

const monthFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' });
const dayFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long' });
const numberFormat = new Intl.NumberFormat('en');

// Lives outside of the view, so that the order survives a visit to details
const sort = { key: 'name', descending: false };

window.addEventListener('hashchange', route);
route();

function route() {
  const details = window.location.hash.match(/^#\/library\/(.+)$/);
  const view = details ? renderDetails(currentExample(decodeURIComponent(details[1]))) : renderAll();
  app.replaceChildren(view);
  window.scrollTo(0, 0);
}

function renderAll() {
  const body = h('tbody');
  const headers = columns.map(column => {
    if (column.sortable === false) return h('th', {}, column.title);

    const button = h('button', { type: 'button', title: column.hint || '' }, column.title);
    button.addEventListener('click', () => {
      // Names read best A to Z, numbers and dates are more useful largest first
      sort.descending = sort.key === column.key ? !sort.descending : Boolean(column.numeric || column.date);
      sort.key = column.key;
      update();
    });
    return h('th', { className: column.numeric ? 'numeric' : '' }, button);
  });

  update();

  return h('div', { className: 'container' },
    h('p', { className: 'lead' },
      'A collection of well known graph (network) drawing libraries for JavaScript. Missing one? ',
      h('a', { href: 'https://github.com/anvaka/graph-drawing-libraries/issues' }, 'Open an issue'), '.'
    ),
    h('div', { className: 'table-scroll' },
      h('table', {}, h('thead', {}, h('tr', {}, headers)), body)
    ),
    h('p', { className: 'note' }, `GitHub statistics were collected on ${dayFormat.format(new Date(generated))}.`)
  );

  function update() {
    columns.forEach((column, index) => {
      const order = sort.key !== column.key ? 'none' : sort.descending ? 'descending' : 'ascending';
      headers[index].setAttribute('aria-sort', order);
    });
    body.replaceChildren(...[...libraries].sort(compare).map(renderRow));
  }
}

function compare(a, b) {
  const x = a[sort.key];
  const y = b[sort.key];
  // Libraries without a value stay at the bottom in either direction
  if (x == null || y == null) return (x == null) - (y == null);

  const order = typeof x === 'number' ? x - y : x.localeCompare(y, 'en', { sensitivity: 'base' });
  return sort.descending ? -order : order;
}

function renderRow(library) {
  return h('tr', {}, columns.map(column => {
    const value = library[column.key];
    if (column.key === 'name') {
      return h('td', {},
        h('a', { href: library.url, title: library.description || '' }, library.name),
        library.archived ? h('span', { className: 'badge', title: 'The repository is archived' }, 'archived') : null
      );
    }
    if (column.key === 'example') {
      return h('td', {}, value ? h('a', { href: `#/library/${value}` }, 'demo') : '');
    }
    if (value == null) return h('td', { className: column.numeric ? 'numeric' : '' }, '—');
    if (column.numeric) return h('td', { className: 'numeric' }, numberFormat.format(value));
    if (column.date) {
      const date = new Date(value);
      return h('td', { title: dayFormat.format(date) }, monthFormat.format(date));
    }
    return h('td', {}, value);
  }));
}

function renderDetails(example) {
  const library = libraries.find(candidate => candidate.example === example);
  if (!library) {
    return h('div', { className: 'container' },
      h('h2', {}, 'There is no demo for this library yet'),
      h('p', {}, h('a', { href: '#/all' }, 'See all libraries'))
    );
  }

  const graphSelect = h('select', { id: 'graph-type' });
  fillGraphSelect(graphSelect, defaultGraph);
  const description = h('p', { className: 'help' });
  const params = h('div');
  const renderLink = h('a', { className: 'action' }, 'Render graph');
  let inputs = [];

  graphSelect.addEventListener('change', showGraphType);
  showGraphType();

  return h('div', { className: 'container' },
    h('p', {}, h('a', { href: '#/all' }, '← All libraries')),
    h('h2', {}, library.name),
    library.description ? h('p', {}, library.description) : null,
    h('h3', {}, 'Basic example'),
    h('p', {}, 'Basic example shows how to implement a "hello world" kind of application with this graph drawing library. You can:'),
    h('ul', {},
      h('li', {}, h('a', { href: `examples/${example}/01.basic/index.html` }, 'Run interactive demo')),
      h('li', {}, h('a', { href: `${sourceRoot}${example}/01.basic/` }, 'View the source code'))
    ),
    h('h3', {}, 'Performance'),
    h('p', {}, 'Performance of a library is measured interactively. Choose a graph below and click on the "Render graph" link.'),
    h('form', { className: 'graph-form' },
      h('label', { htmlFor: 'graph-type' }, 'Graph'),
      h('div', {}, graphSelect, description),
      params
    ),
    h('p', {}, renderLink)
  );

  function showGraphType() {
    // Only the graphs of the last group have a size to choose
    const graphParams = customSizeOf(graphSelect.value)?.params || [];
    description.textContent = describeGraph(graphSelect.value);

    inputs = graphParams.map(param => {
      const input = h('input', { type: 'number', step: 'any', min: '0', value: param.value, id: `param-${param.name}` });
      input.addEventListener('input', updateLink);
      return input;
    });
    params.replaceChildren(...graphParams.map((param, index) => h('div', { className: 'param' },
      h('label', { htmlFor: `param-${param.name}` }, param.label),
      h('div', {}, inputs[index], h('p', { className: 'help' }, param.description))
    )));
    updateLink();
  }

  function updateLink() {
    const query = new URLSearchParams({ lib: example, graph: graphSelect.value });
    inputs.forEach((input, index) => query.set(queryNames[index], input.value));
    renderLink.href = `performance/?${query}`;
  }
}

/**
 * Creates a DOM element. Children are strings, nodes, or arrays of them;
 * strings always become text nodes, never markup.
 */
function h(tag, properties = {}, ...children) {
  const element = Object.assign(document.createElement(tag), properties);
  element.append(...children.flat().filter(child => child != null));
  return element;
}

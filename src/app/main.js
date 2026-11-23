import libraries, { currentExample, demoAddress, generated } from './libraries.js';

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

// The order of the list survives a visit to a demo
const SORT = 'graph-drawing-libraries:sort';
const sort = rememberedSort() || { key: 'name', descending: false };

window.addEventListener('hashchange', route);
route();

function route() {
  // Every library used to have a page of its own between the list and the
  // demo. Links to these pages lead straight to the demo now.
  const details = window.location.hash.match(/^#\/library\/(.+)$/);
  const example = details && currentExample(decodeURIComponent(details[1]));
  if (libraries.some(library => library.example && library.example === example)) {
    window.location.replace(demoAddress(example));
    return;
  }

  app.replaceChildren(renderAll());
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
      rememberSort();
      update();
    });
    return h('th', { className: column.numeric ? 'numeric' : '' }, button);
  });

  update();

  return h('div', { className: 'container' },
    h('p', { className: 'lead' },
      'A collection of well known graph (network) drawing libraries for JavaScript. ',
      'Run a demo to watch a library draw a graph: the other libraries are one click away from there, on the same graph. ',
      'Missing a library? ',
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

function rememberedSort() {
  try {
    const { key, descending } = JSON.parse(sessionStorage.getItem(SORT));
    const known = columns.some(column => column.key === key && column.sortable !== false);
    return known ? { key, descending: Boolean(descending) } : null;
  } catch {
    return null;
  }
}

function rememberSort() {
  try {
    sessionStorage.setItem(SORT, JSON.stringify(sort));
  } catch {
    // Without storage the list starts sorted by name every time
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
      if (!value) return h('td', { className: 'muted', title: 'There is no demo of this library here yet' }, '—');
      return h('td', {}, h('a', { className: 'run', href: demoAddress(value) }, 'Run demo'));
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

/**
 * Creates a DOM element. Children are strings, nodes, or arrays of them;
 * strings always become text nodes, never markup.
 */
function h(tag, properties = {}, ...children) {
  const element = Object.assign(document.createElement(tag), properties);
  element.append(...children.flat().filter(child => child != null));
  return element;
}

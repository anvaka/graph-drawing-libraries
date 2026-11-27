import libraries, { currentExample, demoAddress, generated, measurement } from './libraries.js';

const app = document.querySelector('#app');

const columns = [
  // `sortTitle` is how the picker of narrow screens calls the column, `label` is
  // what a card shows before the value, `unit` is a second line of the header
  { key: 'name', title: 'Library', sortTitle: 'Name' },
  {
    key: 'responsive',
    title: 'Largest graph',
    label: 'Largest graph without freezing',
    unit: 'nodes + links, no freeze',
    numeric: true,
    hint: 'The largest graph, nodes and links together, that the library drew in our measurements without freezing the tab'
  },
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
const compactFormat = new Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 2 });
// The meters of the "Largest graph" column are logarithmic: they start at
// a thousand nodes and links, and are full at the largest graph of the measurements
const METER_FROM = 1000;
const largestMeasured = Math.max(...libraries.map(library => library.responsive || 0));

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
    button.addEventListener('click', () => sortBy(column));
    return h('th', { className: column.numeric ? 'numeric' : '' }, button, column.unit ? h('small', {}, column.unit) : null);
  });

  // A narrow screen shows a card for every library and no header to sort with
  const picker = h('select', {}, columns.filter(column => column.sortable !== false)
    .map(column => h('option', { value: column.key }, column.sortTitle || column.title)));
  picker.addEventListener('change', () => sortBy(columns.find(column => column.key === picker.value)));
  const direction = h('button', { type: 'button' });
  direction.addEventListener('click', () => sortBy(columns.find(column => column.key === sort.key)));

  update();

  return h('div', { className: 'container' },
    h('p', { className: 'lead' },
      'A collection of well known graph (network) drawing libraries for JavaScript. ',
      'Run a demo to watch a library draw a graph: the other libraries are one click away from there, on the same graph. ',
      'Missing a library? ',
      h('a', { href: 'https://github.com/anvaka/graph-drawing-libraries/issues' }, 'Open an issue'), '.'
    ),
    h('p', { className: 'note' },
      '"Largest graph" is how large a graph, nodes and links together, a library drew before it froze the tab: ',
      h('a', { href: '#measurements' }, 'how we measured it'), '.'
    ),
    h('div', { className: 'sort-picker' }, h('label', {}, 'Sort by ', picker), direction),
    h('div', { className: 'table-scroll' },
      h('table', {}, h('thead', {}, h('tr', {}, headers)), body)
    ),
    h('p', { className: 'note', id: 'measurements' },
      '"Largest graph" is the largest graph, nodes and links together, that a library drew in ',
      h('a', { href: 'https://github.com/anvaka/graph-drawing-libraries/blob/main/src/data/measurements.json' }, 'our measurements'),
      ` without freezing the tab for ${measurement.frozenMs / 1000} seconds. `,
      `They were made in Chrome on a computer slowed down ${measurement.slowdown} times, with square grids of up to `,
      `${numberFormat.format(largestMeasured)} nodes and links and with graphs of the performance test: a plus is a library that never froze the tab. `,
      'It is about the demos of this website, and says nothing about how good a layout is.'
    ),
    h('p', { className: 'note' }, `GitHub statistics were collected on ${dayFormat.format(new Date(generated))}.`)
  );

  function sortBy(column) {
    // Names read best A to Z, numbers and dates are more useful largest first
    sort.descending = sort.key === column.key ? !sort.descending : Boolean(column.numeric || column.date);
    sort.key = column.key;
    rememberSort();
    update();
  }

  function update() {
    picker.value = sort.key;
    direction.textContent = sort.descending ? '↓' : '↑';
    direction.title = sort.descending ? 'Largest first. Reverse the order' : 'Smallest first. Reverse the order';
    direction.setAttribute('aria-label', direction.title);
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
    const cell = renderCell(library, column);
    // A card of a narrow screen places the cell by the key, and shows the label before the value
    cell.dataset.key = column.key;
    cell.dataset.label = column.label || column.title;
    return cell;
  }));
}

function renderCell(library, column) {
  const value = library[column.key];
  if (column.key === 'name') return libraryCell(library);
  if (value == null) return h('td', { className: column.numeric ? 'numeric' : '' }, '—');
  if (column.key === 'responsive') return responsiveCell(library);
  if (column.numeric) return h('td', { className: 'numeric' }, numberFormat.format(value));
  if (column.date) {
    const date = new Date(value);
    return h('td', { title: dayFormat.format(date) }, monthFormat.format(date));
  }
  return h('td', {}, value);
}

/** The picture, the name and the description of a library: all of them lead to its demo */
function libraryCell(library) {
  const demo = demoAddress(library.example);
  const picture = h('img', {
    src: `thumbnails/${library.example}.png`, alt: '', width: 400, height: 300, loading: 'lazy'
  });

  return h('td', {}, h('div', { className: 'library' },
    // The name next to it is a link to the same place: one of them is enough for a keyboard
    h('a', { className: 'thumbnail', href: demo, tabIndex: -1, ariaHidden: 'true' }, picture),
    h('div', { className: 'about' },
      h('a', { className: 'name', href: demo }, library.name),
      library.archived ? h('span', { className: 'badge', title: 'The repository is archived' }, 'archived') : null,
      library.description ? h('p', { className: 'description' }, library.description) : null,
      h('p', { className: 'actions' },
        h('a', { className: 'run', href: demo }, 'Run demo'),
        h('a', { href: library.url }, 'GitHub')
      )
    )
  ));
}

function responsiveCell(library) {
  const size = `${numberFormat.format(library.responsive)} nodes and links`;
  const { froze, failed } = library;
  const title = failed ? `Drew ${size}. Stopped with an error on ${numberFormat.format(failed)}`
    : froze ? `Drew ${size}. Froze the tab on ${numberFormat.format(froze)}`
      : `Never froze the tab: ${size} was the largest graph we tried`;

  const share = Math.log(Math.max(library.responsive, METER_FROM) / METER_FROM) / Math.log(largestMeasured / METER_FROM);
  const meter = h('span', { className: 'meter' }, h('span'));
  meter.firstChild.style.width = `${Math.round(Math.min(1, share) * 100)}%`;

  return h('td', { className: 'numeric responsive', title },
    compactFormat.format(library.responsive) + (froze || failed ? '' : '+'),
    h('span', { className: 'unit' }, ' nodes + links'), meter
  );
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

const libraries = [
  {name: 'visjs/vis-network', url: 'https://visjs.github.io/vis-network/examples/', license: 'Apache V2.0'},
  {name: 'cytoscape/cytoscape.js', url: 'https://js.cytoscape.org/', license: 'MIT'},
  {name: 'dagrejs/dagre', url: 'https://github.com/dagrejs/dagre', license: 'MIT'},
  {name: 'anvaka/ngraph', url: 'https://github.com/anvaka/ngraph', license: 'MIT'},
  {name: 'anvaka/VivaGraphJS', url: 'https://github.com/anvaka/VivaGraphJS', license: 'BSD3'},
  {name: 'dhotson/springy', url: 'http://getspringy.com/', license: 'MIT'},
  {name: 'fkling/JSNetworkX', url: 'https://github.com/fkling/JSNetworkX', license: 'BSD'},
  {name: 'GraphAlchemist/Alchemy', url: 'https://github.com/GraphAlchemist/Alchemy', license: 'Affero GPL 3'},
  {name: 'jacomyal/sigma.js', url: 'http://sigmajs.org/', license: 'MIT'},
  {name: 'd3/d3-force', url: 'https://github.com/d3/d3-force', license: 'BSD3'},
  {name: 'samizdatco/arbor', url: 'https://github.com/samizdatco/arbor', license: 'MIT'},
  {name: 'strathausen/dracula', url: 'https://github.com/strathausen/dracula', license: 'MIT'},
].sort((a, b) => a.name.localeCompare(b.name));

let container = document.querySelector('#table-container');
let columns = [{
    name: 'Library',
    className: 'name',
    render: l => `<a href='${l.url}' target='_blank'>${l.name}</a>`
  }, {
    name: 'Commits per year',
    request: l => `https://img.shields.io/github/commit-activity/y/${l.name}.json`,
    render: l => Number.parseFloat(l.value)
  }, {
    name: 'Contributors',
    request: l => `https://img.shields.io/github/contributors/${l.name}.json`,
    render: l => Number.parseFloat(l.value)
  }, {
    name: 'Issues',
    request: l => `https://img.shields.io/github/issues/${l.name}.json`,
    render: l => Number.parseFloat(l.value)
  }, {
    name: 'Stars',
    request: l => `https://img.shields.io/github/stars/${l.name}.json`,
    render: l => {
      return l.value;
    }
  },{
    name: 'License',
    render: l => l.license
  }
];

renderColumns(columns);
renderSortedLibraries();

function renderSortedLibraries() {
  clearLibraries();
  libraries.forEach(renderLibrary);
}

function clearLibraries() {
  Array.from(container.querySelectorAll('.library-container')).forEach(row => {
    row.parentElement.removeChild(row);
  });
}

function renderColumns(columns) {
  let header = document.createElement('tr');
  header.classList.add('header')
  header.innerHTML = columns.map((c, idx) => `<td class='column-header' data-column='${idx}'>${c.name}</td>`).join('');
  container.appendChild(header)
}

function renderLibrary(library) {
  let lib = document.createElement('tr');
  lib.classList.add('library-container');

  library.columns = [];

  columns.forEach((column, colIndex) => {
    let td = document.createElement('td');
    if (column.className) td.classList.add(column.className);
    if (library.columns[colIndex] !== undefined) {
        td.innerHTML = library.columns[colIndex];
    } else if (column.request) {
      fetch(column.request(library), {mode: 'cors'})
        .then(x => x.json())
        .then(json => {
          td.innerHTML = library.columns[colIndex] = column.render(json);
        })
    } else {
      td.innerHTML = library.columns[colIndex] = column.render(library);
    }
    lib.appendChild(td);
  });
  container.appendChild(lib)
}
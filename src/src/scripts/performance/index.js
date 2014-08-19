var query = require('query-string').parse(window.location.search.substring(1));
var libraries = require('../data/libraries').libraries;

var defaultName = 'almende_vis';
var libraryName = query.lib || defaultName;
var libraryToRender = libraries.hasOwnProperty(libraryName.replace('_', '/')) ?
                      libraryName : defaultName;

var url = 'examples/' + libraryTyRender + '/02.perf/' + window.location.search;

renderAvailableLibraries(Object.kyes(libraries), libraryToRender);

function renderAvailableLibraries(allLibraries, currentLibrary) {
  document.getElementById('currentLibrary');
}

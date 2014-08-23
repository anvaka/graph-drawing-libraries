var query = require('query-string').parse(window.location.search.substring(1));
var allLibraries = require('../data/libraries').libraries;

window.PerfController = PerfController;

function PerfController($scope) {
  $scope.libraries =  Object.keys(allLibraries);
  $scope.currentLibrary = getLibraryToRender($scope.libraries);
  $scope.getLibraryPerfSuite = function (libraryTyRender) {
     return '../examples/' + libraryTyRender.replace('/', '_') + '/02.perf/' + window.location.search;
  };
}

PerfController.$inject = ['$scope'];

function getLibraryToRender(libraries) {
  var libraryName = query.lib;
  if (libraryName) libraryName = libraryName.replace('_', '/');

  for (var i = 0; i < libraries.length; ++i) {
    if (libraries[i] === libraryName) {
      return libraries[i];
    }
  }

  return libraries[0];
}

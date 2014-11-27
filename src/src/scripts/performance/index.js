/**
 * Performance runner is an html page which renders a nav bar and lets users
 * change current graph drawing library
 */
var qs = require('query-string');
var query = qs.parse(window.location.search.substring(1));
var allLibraries = require('../data/libraries').libraries;
var app = angular.module('perf', []);

app.controller('PerfController', PerfController);

function PerfController($scope) {
  $scope.share = require('../share');
  $scope.libraries =  Object.keys(allLibraries);
  $scope.currentLibrary = getLibraryToRender($scope.libraries);

  // canonical name is a name without `/` symbol
  var canonialName = $scope.currentLibrary.replace('/', '_');
  $scope.libraryUrl = '../examples/' + canonialName + '/02.perf/' + window.location.search;
  $scope.changeGraphUrl = '../#/library/' + canonialName;

  $scope.changeLibrary = function (lib) {
    query.lib = lib;
    window.location.search = '?' + qs.stringify(query);
  };
}

PerfController.$inject = ['$scope'];

function getLibraryToRender(libraries) {
  var libraryName = query.lib;
  if (libraryName) libraryName = libraryName.replace('_', '/');

  for (var i = 0; i < libraries.length; ++i) {
    if (libraries[i] === libraryName) {
      // we need to return exact instance, since ng-options requires equality by
      // reference, not value;
      return libraries[i];
    }
  }

  return libraries[0];
}

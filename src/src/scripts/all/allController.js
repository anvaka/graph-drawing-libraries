require('githuboauth');
require('an').controller(AllController, 'AllController');

var libraries;

function AllController($scope, $http, $location, $timeout) {
  var getLibraries = require('./libraries');
  var timeouts = [];

  if (!libraries) {
    getLibraries($http).then(initLibraries, showError);

    timeouts = [
      $timeout(function() { if (!libraries) $scope.showSecondLoading = true; }, 2000),
      $timeout(function() { if (!libraries) $scope.showThirdLoading = true; }, 6000),
      $timeout(showError, 14000)
    ];
  } else {
    initLibraries(libraries);
  }

  $scope.routeTo = function(library) {
    $location.path(getRoute(library));
  };

  $scope.getRoute = getRoute;

  $scope.sort = {
    name: 'name',
    direction: 1
  };

  $scope.sortBy = function(name) {
    var sort = $scope.sort;
    if (sort.name === name) sort.direction *= -1;
    else sort.direction = 1;

    sort.name = name;

    $scope.libraries.sort(function(a, b) {
      return a[name] < b[name] ? 1 * sort.direction :
        a[name] === b[name] ? 0 : -1 * sort.direction;
    });
  };

  function getRoute(libraryName) {
    return 'library/' + libraryName.replace('/', '_');
  }

  function initLibraries(foundLibraries) {
    $scope.libraries = foundLibraries;
    $scope.loaded = true;
    $scope.showSecondLoading = false;
    $scope.showThirdLoading = false;
    $scope.showErrorLoading = false;

    libraries = foundLibraries;
  }

  function showError() {
    if (!libraries) $scope.showErrorLoading = true;
    timeouts.forEach($timeout.cancel);
  }
}

AllController.$inject = ['$scope', '$http', '$location', '$timeout'];

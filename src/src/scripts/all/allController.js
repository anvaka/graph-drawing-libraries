require('githuboauth');
require('an').controller(AllController, 'AllController');

var libraries;

function AllController($scope, $http, $location) {
  var getLibraries = require('./libraries');

  if (!libraries) {
    getLibraries($http).then(initLibraries);
  } else {
    initLibraries(libraries);
  }

  $scope.routeTo = function (library) {
    $location.path(getRoute(library));
  };

  $scope.getRoute = getRoute; 

  $scope.sort = {
    name: 'name',
    direction: 1
  };

  $scope.sortBy = function (name) {
    var sort = $scope.sort;
    if (sort.name === name) sort.direction *= -1;
    else sort.direction = 1;

    sort.name = name;

    $scope.libraries.sort(function (a, b) {
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
    libraries = foundLibraries;
  }
}

AllController.$inject = ['$scope', '$http', '$location'];

require('githuboauth');
require('an').controller(AllController, 'AllController');

function AllController($scope, $http, $location) {
  var getLibraries = require('./libraries');

  getLibraries($http).then(function(libraries) {
    $scope.libraries = libraries;
    $scope.loaded = true;
  });

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
}

AllController.$inject = ['$scope', '$http', '$location'];

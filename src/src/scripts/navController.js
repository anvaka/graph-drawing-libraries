module.exports = require('an').controller('navController', navController);

function navController($scope, $location) {
  $scope.share = require('./share');
  $scope.$on('$locationChangeSuccess', locationChanged);
  $scope.lastDetailsRoute = '#/library/almende_vis';

  function locationChanged(e, newRoute, oldRoute) {
    var libraryIdx = newRoute.indexOf('#/library/');
    if (libraryIdx !== -1) {
      $scope.currentRoute = 'details';
      $scope.lastDetailsRoute = newRoute.substr(libraryIdx);
    } else {
      $scope.currentRoute = 'all';
    }
  }
}

navController.$inject = ['$scope', '$location'];

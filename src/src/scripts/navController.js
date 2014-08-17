module.exports = require('an').controller('navController', navController);

function navController($scope, $location) {
  var services = {
    twitter: function (url) {
      return 'https://twitter.com/intent/tweet?url=' + decodeURIComponent(url).replace(/#/g, '%23');
    },
    google: function (url) {
      return 'https://plus.google.com/share?url=' + url;
    },
    facebook: function (url) {
      return 'http://www.facebook.com/sharer/sharer.php?u=' + url;
    }
  };

  $scope.share = share;
  $scope.$on('$locationChangeSuccess', locationChanged);
  $scope.lastDetailsRoute = '#/library/almende_vis';

  function share(serviceName, e) {
    var url = encodeURIComponent($location.absUrl());
    window.open(services[serviceName](url), 'Share' + serviceName, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=420,width=600');
    e.preventDefault();
  }

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

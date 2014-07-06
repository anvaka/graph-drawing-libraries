require('an').controller(AppController);

function AppController($scope, $http, $q) {
  var getLibraries = require('./libraries');
  getLibraries($http, $q, [
    'almende/vis',
    'anvaka/ngraph',
    'anvaka/VivaGraphJS',
    'cpettitt/dagre',
    'cytoscape/cytoscape.js',
    'dhotson/springy',
    'fkling/JSNetworkX',
    'jacomyal/sigma.js',
    'mbostock/d3',
    'samizdatco/arbor',
    'strathausen/dracula',
    'uskudnik/GraphGL'
  ]).then(function(libraries) {
    $scope.libraries = libraries;
  });

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
}


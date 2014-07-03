require('an').controller(AppController);

function AppController($scope, $http, $q) {
  var getLibraries = require('./libraries');
  $scope.libraries = getLibraries($http, $q, [
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
  ]);
}


require('githuboauth');
require('an').controller(AppController);

var githubOauth = require('./githubOauthLocal');

function AppController($scope, $http, $q) {
  var getLibraries = require('./libraries');
  getLibraries($http, $q, $scope.$root, [
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

  $scope.$on('githuboauth', updateUrl);
  $scope.github = githubOauth;

  $scope.sort = {
    name: 'name',
    direction: 1
  };

  function updateUrl(e, token) {
    if (!token) return;

    var search = window.location.search;
    if (search && search.indexOf('code=') >= -1)
      // this will refresh the page, it's bad but will only happen once...
      // i don't know how to improve it. Oh why github does not support javascript
      // flow for oauth
      window.location.search = '';
    }
  }

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


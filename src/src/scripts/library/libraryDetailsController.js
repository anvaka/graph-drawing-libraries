require('an').controller(LibraryDetailsController, 'LibraryDetailsController');

function LibraryDetailsController($scope, $routeParams) {
  var libraryName = $routeParams.libraryName;
  $scope.name = libraryName.replace('_', '/');
  $scope.basicExampleUrl = 'examples/' + libraryName + '/01.basic/';
  $scope.basicExampleSrcUrl = 'https://github.com/anvaka/graph-drawing-libraries/tree/master/src/src/scripts/examples/' + libraryName + '/01.basic/';

  $scope.getPerfUrl = function getPerfUrl(graphType) {
    var i = 0;
    // mapping query string to graph generator names
    var names = ['n', 'm', 'k'];
    var params = graphType.params.map(function (param) {
      return names[i++] + '=' + encodeURIComponent(param.value);
    }).join('&');

    return 'performance/?lib=' + libraryName + '&graph=' + graphType.name + '&' + params;
  };

  $scope.graphTypes = require('./supportedGraphTypes')();
  $scope.selectedGraph = $scope.graphTypes[0];
  $scope.graphTypes.forEach(initParams);
}

function initParams(graph) {
  if (graph.name === 'wattsStrogatz') {
    // todo: I need to find better way for this
    graph.params.forEach(initWattsStrogatzParameter);
  } else {
    graph.params.forEach(initOneParameter);
  }
}

function initOneParameter(param) {
  param.value = 10;
}

function initWattsStrogatzParameter(param) {
  if (param.name === 'n') param.value = 100;
  if (param.name === 'k') param.value = 20;
  if (param.name === 'p') param.value = 0.10;
}

LibraryDetailsController.$inject = ['$scope', '$routeParams'];

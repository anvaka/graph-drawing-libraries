require('an').controller(LibraryDetailsController, 'LibraryDetailsController');

function LibraryDetailsController($scope, $routeParams) {
  var libraryName = $routeParams.libraryName;
  $scope.name = libraryName.replace('_', '/');
  $scope.basicExampleUrl = 'examples/' + libraryName + '/01.basic/';
  $scope.basicExampleSrcUrl = 'https://github.com/anvaka/graph-drawing-libraries/tree/master/src/src/scripts/examples/' + libraryName + '/01.basic/';
}

LibraryDetailsController.$inject = ['$scope', '$routeParams'];

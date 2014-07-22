require('an').controller(LibraryDetailsController, 'LibraryDetailsController');

function LibraryDetailsController($scope, $routeParams) {
  $scope.name = $routeParams.libraryName.replace('_', '/');
}

LibraryDetailsController.$inject = ['$scope', '$routeParams'];

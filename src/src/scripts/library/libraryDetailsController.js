require('an').controller(LibraryDetailsController, 'LibraryDetailsController');

function LibraryDetailsController($scope, $routeParams) {
  $scope.name = $routeParams.libraryName;
}

LibraryDetailsController.$inject = ['$scope', '$routeParams'];

require('./all/allController');
require('./library/libraryDetailsController');
var fs = require('fs');

var ngApp = angular.module('src', ['ngRoute']);

ngApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/all', {
        template: fs.readFileSync(__dirname + '/all/all.html', 'utf8'),
        controller: 'AllController'
      }).
      when('/library/:libraryName', {
        template: fs.readFileSync(__dirname + '/library/details.html', 'utf8'),
        controller: 'LibraryDetailsController'
      }).
      otherwise({
        redirectTo: '/all'
      });
  }]);

require('an').flush(ngApp);
angular.bootstrap(document, [ngApp.name]);

module.exports = ngApp;

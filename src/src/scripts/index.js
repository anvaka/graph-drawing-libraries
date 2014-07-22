require('./appController');

var ngApp = angular.module('src', ['ngRoute']);

require('an').flush(ngApp);
angular.bootstrap(document, [ngApp.name]);

module.exports = ngApp;

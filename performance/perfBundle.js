(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
	query-string
	Parse and stringify URL query strings
	https://github.com/sindresorhus/query-string
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';
	var queryString = {};

	queryString.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^\?/, '');

		if (!str) {
			return {};
		}

		return str.trim().split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			ret[parts[0]] = parts[1] === undefined ? null : decodeURIComponent(parts[1]);
			return ret;
		}, {});
	};

	queryString.stringify = function (obj) {
		return obj ? Object.keys(obj).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
		}).join('&') : '';
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = queryString;
	} else {
		window.queryString = queryString;
	}
})();

},{}],2:[function(require,module,exports){
/**
 * Offline data should be auto generated at release step. This will let users
 * without github accounts user the website as well. We should also let them know
 * time when the data was generated.
 * 
 * TODO: should this be part of gh-graph-stats heroku app?
 */
module.exports = {
  generated: 1404587171695, // epoch time when data was generated
  libraries: {
    'almende/vis': {
      license: 'Apache 2.0'
    },
    'anvaka/ngraph': {
      license: 'MIT'
    },
    'anvaka/VivaGraphJS': {
      license: 'BSD 3'
    },
    'cpettitt/dagre': {
      license: 'MIT'
    },
    'cytoscape/cytoscape.js': {
      license: 'LGPL'
    },
    'dhotson/springy': {
      license: 'MIT'
    },
    'fkling/JSNetworkX': {
      license: 'BSD 3'
    },
    'GraphAlchemist/Alchemy': {
      license: 'AGPLv3'
    },
    'jacomyal/sigma.js': {
      license: 'MIT'
    },
    'mbostock/d3': {
      license: 'BSD 3'
    },
    'samizdatco/arbor': {
      license: 'MIT'
    },
    'strathausen/dracula': {
      license: 'MIT'
    }
  }
};

},{}],3:[function(require,module,exports){
/**
 * Performance runner is an html page which renders a nav bar and lets users
 * change current graph drawing library
 */
var qs = require('query-string');
var query = qs.parse(window.location.search.substring(1));
var allLibraries = require('../data/libraries').libraries;
var app = angular.module('perf', []);

app.controller('PerfController', PerfController);

function PerfController($scope) {
  $scope.share = require('../share');
  $scope.libraries =  Object.keys(allLibraries);
  $scope.currentLibrary = getLibraryToRender($scope.libraries);

  // canonical name is a name without `/` symbol
  var canonialName = $scope.currentLibrary.replace('/', '_');
  $scope.libraryUrl = '../examples/' + canonialName + '/02.perf/' + window.location.search;
  $scope.changeGraphUrl = '../#/library/' + canonialName;

  $scope.changeLibrary = function (lib) {
    query.lib = lib;
    window.location.search = '?' + qs.stringify(query);
  };
}

PerfController.$inject = ['$scope'];

function getLibraryToRender(libraries) {
  var libraryName = query.lib;
  if (libraryName) libraryName = libraryName.replace('_', '/');

  for (var i = 0; i < libraries.length; ++i) {
    if (libraries[i] === libraryName) {
      // we need to return exact instance, since ng-options requires equality by
      // reference, not value;
      return libraries[i];
    }
  }

  return libraries[0];
}

},{"../data/libraries":2,"../share":4,"query-string":1}],4:[function(require,module,exports){
module.exports = share;

var services = {
  twitter: function(url) {
    return 'https://twitter.com/intent/tweet?url=' + decodeURIComponent(url).replace(/#/g, '%23');
  },
  google: function(url) {
    return 'https://plus.google.com/share?url=' + url;
  },
  facebook: function(url) {
    return 'http://www.facebook.com/sharer/sharer.php?u=' + url;
  }
};

function share(serviceName, e) {
  var url = encodeURIComponent(window.location.href);
  window.open(services[serviceName](url), 'Share' + serviceName, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=420,width=600');
  e.preventDefault();
}

},{}]},{},[3])
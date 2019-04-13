(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createAngularPrimitive = require('./lib/createAngularPrimitive');

var exposed = ['directive', 'controller', 'filter', 'factory', 'provider', 'service'];
var services = [];

for (var i = 0; i < exposed.length; ++i) {
  var name = exposed[i];
  var primitive = createAngularPrimitive(name);
  exports[name] = primitive.register;
  services.push(primitive);
}

exports.flush = function (module) {
  if (!module) {
    module = angular.module('anModule', []);
  }
  services.forEach(function (x) { x.flush(module); });

  return module;
};

exports.run = function () {
  var module = this.flush();
  angular.bootstrap(document.body, [module.name]);
  return module;
};

},{"./lib/createAngularPrimitive":2}],2:[function(require,module,exports){
var registeredPrimitives = {};

module.exports = function (primitiveName) {
  var handler = registeredPrimitives[primitiveName];
  if (!handler) { 
    registeredPrimitives[primitiveName] = handler = angularPrimitive(primitiveName);
  }

  return handler;
};

function angularPrimitive(primitiveName) {
  var registered = typeof Object.create === 'function' ? Object.create(null) : {};

  return {
    register: register,
    flush: flush
  };

  function register(fn, name) {
    if (name === undefined) {
      name = require('./functionName')(fn);
    }

    // we support symmetrical API.
    if (typeof fn === 'string' && typeof name === 'function') {
      var t = name;
      name = fn;
      fn = t;
    }

    if (!name) {
      throw new Error('Anonymous functions cannot be registered as ' + primitiveName + '. Please provide named function or pass second argument as ' + primitiveName + ' name');
    }

    registered[name] = fn;

    return fn;
  }

  function flush(ngModule) {
    Object.keys(registered).forEach(function (name) {
      ngModule[primitiveName](name, registered[name]);
    });
  }
}

},{"./functionName":3}],3:[function(require,module,exports){
module.exports = function (fun) {
  var funBody = fun.toString();
  var nameMatch = funBody.match(/function\s+(\w+)/);
  return nameMatch && nameMatch[1];
};

},{}],4:[function(require,module,exports){
module.exports = require('an').directive(githuboauth, 'githuboauth');
var Cookies = require('cookies-js');

function githuboauth($http) {
  var rateLimitUnknown = {
    limit: '?',
    remaining: '?',
    reset: '?'
  };

  return {
    restrict: 'ACE',
    replace: true,
    scope: {},
    template: "<div>\n  <div class=\"rate-limit ng-cloak\">\n    <a data-ng-Show=\"isAuthenticated\" data-ng-href=\"https://github.com/{{user.login}}\" class=\"name\">\n      <img height=\"20\" data-ng-src=\"{{user.avatar_url}}\" width=\"20\"></img> {{user.login}}\n    </a>\n    <strong data-ng-hide=\"isAuthenticated\"><a ng-href=\"https://github.com/login/oauth/authorize?client_id={{clientId}}\">Sign in</a></strong>\n  </div>\n  <div class=\"rate-limit-info\">\n    <span data-ng-Hide=\"isAuthenticated\">\n      <i class=\"icon-exclamation-sign sign-in-info text-error\" title=\"You are not signed in to GitHub. GitHub reduces amount of available requests.\"></i>\n    </span>\n    <span>GitHub API rate limit: {{rate.remaining}}/{{rate.limit}}</span>\n  </div>\n</div>\n",
    link: link
  };

  function link($scope, element, attr) {
    var weGotCodeFromGithub = window.location.href.match(/code=([^&#]*)/);
    var cookieName = attr.cookiename || 'accessToken';

    $scope.$on('ratechanged', updateRateLimit);
    $scope.isAuthenticated = Cookies.get(cookieName);
    $scope.clientId = attr.clientid;
    $scope.rate = rateLimitUnknown;

    if ($scope.isAuthenticated) {
      updateUserInfo();
    } else if (weGotCodeFromGithub) {
      tradeCodeForToken(attr.oauthproxy, weGotCodeFromGithub[1]);
    }

    updateRateLimit();


    function updateUserInfo() {
      var accessToken = Cookies.get(cookieName);
      $http.get('https://api.github.com/user?access_token=' + accessToken)
        .success(function(user, code) {
          if (code !== 200) return;
          $scope.user = user;
          notifyWithToken($scope.$root, accessToken);
        });
    }

    function notifyWithToken(scope, token) {
      scope.$broadcast('githuboauth', token);
    }

    function tradeCodeForToken(oauthProxy, code) {
      if (!oauthProxy) throw new Error('javascript based oauth is not supported by github. Please setup oauth proxy. See documentation: https://github.com/anvaka/githuboauth');

      oauthProxy = oauthProxy.replace(/\[(.+?)\]/g, function(match, group) {
        return group === 'code' ? code : match;
      });

      $http.get(oauthProxy)
        .success(function(response, code) {
          if (code !== 200) return;
          if (response && response.token) {
            Cookies.set(cookieName, response.token);
            updateRateLimit();
          }
        });
    }

    function updateRateLimit(rateLimit) {
      if (rateLimit) {
        $scope.rate = rateLimit;
        return;
      }
      var suffix = '';
      var accessToken = Cookies.get(cookieName);
      if (accessToken) {
         suffix = '?access_token=' + accessToken;
      }
      $http.get('https://api.github.com/rate_limit' + suffix)
        .success(function(response, code) {
          if (code !== 200) return;
          $scope.rate = response.rate;
        });
    }
  }

}

githuboauth.$inject = ['$http'];

},{"an":1,"cookies-js":5}],5:[function(require,module,exports){
/*!
 * Cookies.js - 0.4.0
 *
 * Copyright (c) 2014, Scott Hamper
 * Licensed under the MIT license,
 * http://www.opensource.org/licenses/MIT
 */
(function (undefined) {
    'use strict';

    var Cookies = function (key, value, options) {
        return arguments.length === 1 ?
            Cookies.get(key) : Cookies.set(key, value, options);
    };

    // Allows for setter injection in unit tests
    Cookies._document = document;
    Cookies._navigator = navigator;

    Cookies.defaults = {
        path: '/'
    };

    Cookies.get = function (key) {
        if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
            Cookies._renewCache();
        }

        return Cookies._cache[key];
    };

    Cookies.set = function (key, value, options) {
        options = Cookies._getExtendedOptions(options);
        options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

        Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

        return Cookies;
    };

    Cookies.expire = function (key, options) {
        return Cookies.set(key, undefined, options);
    };

    Cookies._getExtendedOptions = function (options) {
        return {
            path: options && options.path || Cookies.defaults.path,
            domain: options && options.domain || Cookies.defaults.domain,
            expires: options && options.expires || Cookies.defaults.expires,
            secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
        };
    };

    Cookies._isValidDate = function (date) {
        return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    };

    Cookies._getExpiresDate = function (expires, now) {
        now = now || new Date();
        switch (typeof expires) {
            case 'number': expires = new Date(now.getTime() + expires * 1000); break;
            case 'string': expires = new Date(expires); break;
        }

        if (expires && !Cookies._isValidDate(expires)) {
            throw new Error('`expires` parameter cannot be converted to a valid Date instance');
        }

        return expires;
    };

    Cookies._generateCookieString = function (key, value, options) {
        key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
        key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
        value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
        options = options || {};

        var cookieString = key + '=' + value;
        cookieString += options.path ? ';path=' + options.path : '';
        cookieString += options.domain ? ';domain=' + options.domain : '';
        cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
        cookieString += options.secure ? ';secure' : '';

        return cookieString;
    };

    Cookies._getCookieObjectFromString = function (documentCookie) {
        var cookieObject = {};
        var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

        for (var i = 0; i < cookiesArray.length; i++) {
            var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

            if (cookieObject[cookieKvp.key] === undefined) {
                cookieObject[cookieKvp.key] = cookieKvp.value;
            }
        }

        return cookieObject;
    };

    Cookies._getKeyValuePairFromCookieString = function (cookieString) {
        // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
        var separatorIndex = cookieString.indexOf('=');

        // IE omits the "=" when the cookie value is an empty string
        separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

        return {
            key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
            value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
        };
    };

    Cookies._renewCache = function () {
        Cookies._cache = Cookies._getCookieObjectFromString(Cookies._document.cookie);
        Cookies._cachedDocumentCookie = Cookies._document.cookie;
    };

    Cookies._areEnabled = function () {
        var testKey = 'cookies.js';
        var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
        Cookies.expire(testKey);
        return areEnabled;
    };

    Cookies.enabled = Cookies._areEnabled();

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return Cookies; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Cookies;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = Cookies;
    } else {
        window.Cookies = Cookies;
    }
})();
},{}],6:[function(require,module,exports){
module.exports = {
  ladder: ladder,
  complete: complete,
  completeBipartite: completeBipartite,
  balancedBinTree: balancedBinTree,
  path: path,
  circularLadder: circularLadder,
  grid: grid,
  grid3: grid3,
  noLinks: noLinks,
  wattsStrogatz: wattsStrogatz
};

var createGraph = require('ngraph.graph');

function ladder(n) {
/**
 * Ladder graph is a graph in form of ladder
 * @param {Number} n Represents number of steps in the ladder
 */
  if (!n || n < 0) {
    throw new Error("Invalid number of nodes");
  }

  var g = createGraph(),
      i;

  for (i = 0; i < n - 1; ++i) {
    g.addLink(i, i + 1);
    // first row
    g.addLink(n + i, n + i + 1);
    // second row
    g.addLink(i, n + i);
    // ladder's step
  }

  g.addLink(n - 1, 2 * n - 1);
  // last step in the ladder;

  return g;
}

function circularLadder(n) {
/**
 * Circular ladder with n steps.
 *
 * @param {Number} n of steps in the ladder.
 */
    if (!n || n < 0) {
        throw new Error("Invalid number of nodes");
    }

    var g = ladder(n);

    g.addLink(0, n - 1);
    g.addLink(n, 2 * n - 1);
    return g;
}

function complete(n) {
/**
 * Complete graph Kn.
 *
 * @param {Number} n represents number of nodes in the complete graph.
 */
  if (!n || n < 1) {
    throw new Error("At least two nodes are expected for complete graph");
  }

  var g = createGraph(),
      i,
      j;

  for (i = 0; i < n; ++i) {
    for (j = i + 1; j < n; ++j) {
      if (i !== j) {
        g.addLink(i, j);
        g.addLink(j, i);
      }
    }
  }

  return g;
}

function completeBipartite (n, m) {
/**
 * Complete bipartite graph K n,m. Each node in the
 * first partition is connected to all nodes in the second partition.
 *
 * @param {Number} n represents number of nodes in the first graph partition
 * @param {Number} m represents number of nodes in the second graph partition
 */
  if (!n || !m || n < 0 || m < 0) {
    throw new Error("Graph dimensions are invalid. Number of nodes in each partition should be greate than 0");
  }

  var g = createGraph(),
      i, j;

  for (i = 0; i < n; ++i) {
    for (j = n; j < n + m; ++j) {
      g.addLink(i, j);
    }
  }

  return g;
}

function path(n) {
/**
 * Path graph with n steps.
 *
 * @param {Number} n number of nodes in the path
 */
  if (!n || n < 0) {
    throw new Error("Invalid number of nodes");
  }

  var g = createGraph(),
      i;

  g.addNode(0);

  for (i = 1; i < n; ++i) {
    g.addLink(i - 1, i);
  }

  return g;
}


function grid(n, m) {
/**
 * Grid graph with n rows and m columns.
 *
 * @param {Number} n of rows in the graph.
 * @param {Number} m of columns in the graph.
 */
  if (n < 1 || m < 1) {
    throw new Error("Invalid number of nodes in grid graph");
  }
  var g = createGraph(),
      i,
      j;
  if (n === 1 && m === 1) {
    g.addNode(0);
    return g;
  }

  for (i = 0; i < n; ++i) {
    for (j = 0; j < m; ++j) {
      var node = i + j * n;
      if (i > 0) { g.addLink(node, i - 1 + j * n); }
      if (j > 0) { g.addLink(node, i + (j - 1) * n); }
    }
  }

  return g;
}

function grid3(n, m, z) {
/**
 * 3D grid with n rows and m columns and z levels.
 *
 * @param {Number} n of rows in the graph.
 * @param {Number} m of columns in the graph.
 * @param {Number} z of levels in the graph.
 */
  if (n < 1 || m < 1 || z < 1) {
    throw new Error("Invalid number of nodes in grid3 graph");
  }
  var g = createGraph(),
      i, j, k;

  if (n === 1 && m === 1 && z === 1) {
    g.addNode(0);
    return g;
  }

  for (k = 0; k < z; ++k) {
    for (i = 0; i < n; ++i) {
      for (j = 0; j < m; ++j) {
        var level = k * n * m;
        var node = i + j * n + level;
        if (i > 0) { g.addLink(node, i - 1 + j * n + level); }
        if (j > 0) { g.addLink(node, i + (j - 1) * n + level); }
        if (k > 0) { g.addLink(node, i + j * n + (k - 1) * n * m ); }
      }
    }
  }

  return g;
}

function balancedBinTree(n) {
/**
 * Balanced binary tree with n levels.
 *
 * @param {Number} n of levels in the binary tree
 */
  if (n < 0) {
    throw new Error("Invalid number of nodes in balanced tree");
  }
  var g = createGraph(),
      count = Math.pow(2, n),
      level;

  if (n === 0) {
    g.addNode(1);
  }

  for (level = 1; level < count; ++level) {
    var root = level,
      left = root * 2,
      right = root * 2 + 1;

    g.addLink(root, left);
    g.addLink(root, right);
  }

  return g;
}

function noLinks(n) {
/**
 * Graph with no links
 *
 * @param {Number} n of nodes in the graph
 */
  if (n < 0) {
    throw new Error("Number of nodes shoul be >= 0");
  }

  var g = createGraph(), i;
  for (i = 0; i < n; ++i) {
    g.addNode(i);
  }

  return g;
}

function wattsStrogatz(n, k, p, seed) {
/**
 * Watts-Strogatz small-world graph.
 *
 * @param {Number} n The number of nodes
 * @param {Number} k Each node is connected to k nearest neighbors in ring topology
 * @param {Number} p The probability of rewiring each edge

 * @see https://github.com/networkx/networkx/blob/master/networkx/generators/random_graphs.py
 */
  if (k >= n) throw new Error('Choose smaller `k`. It cannot be larger than number of nodes `n`');


  var random = require('ngraph.random').random(seed || 42);

  var g = createGraph(), i, to;
  for (i = 0; i < n; ++i) {
    g.addNode(i);
  }

  // connect each node to k/2 neighbors
  var neighborsSize = Math.floor(k/2 + 1);
  for (var j = 1; j < neighborsSize; ++j) {
    for (i = 0; i < n; ++i) {
      to = (j + i) % n;
      g.addLink(i, to);
    }
  }

  // rewire edges from each node
  // loop over all nodes in order (label) and neighbors in order (distance)
  // no self loops or multiple edges allowed
  for (j = 1; j < neighborsSize; ++j) {
    for (i = 0; i < n; ++i) {
      if (random.nextDouble() < p) {
        var from = i;
        to = (j + i) % n;

        var newTo = random.next(n);
        var needsRewire = (newTo === from || g.hasLink(from, newTo));
        if (needsRewire && g.getLinks(from).length === n - 1) {
          // we cannot rewire this node, it has too many links.
          continue;
        }
        // Enforce no self-loops or multiple edges
        while (needsRewire) {
          newTo = random.next(n);
          needsRewire = (newTo === from || g.hasLink(from, newTo));
        }
        var link = g.hasLink(from, to);
        g.removeLink(link);
        g.addLink(from, newTo);
      }
    }
  }

  return g;
}

},{"ngraph.graph":7,"ngraph.random":9}],7:[function(require,module,exports){
/**
 * @fileOverview Contains definition of the core graph object.
 */


/**
 * @example
 *  var graph = require('ngraph.graph')();
 *  graph.addNode(1);     // graph has one node.
 *  graph.addLink(2, 3);  // now graph contains three nodes and one link.
 *
 */
module.exports = function () {
    // Graph structure is maintained as dictionary of nodes
    // and array of links. Each node has 'links' property which
    // hold all links related to that node. And general links
    // array is used to speed up all links enumeration. This is inefficient
    // in terms of memory, but simplifies coding.

    var nodes = {},
        links = [],
        // Hash of multi-edges. Used to track ids of edges between same nodes
        multiEdges = {},
        nodesCount = 0,
        suspendEvents = 0,

        // Accumlates all changes made during graph updates.
        // Each change element contains:
        //  changeType - one of the strings: 'add', 'remove' or 'update';
        //  node - if change is related to node this property is set to changed graph's node;
        //  link - if change is related to link this property is set to changed graph's link;
        changes = [],

        fireGraphChanged = function (graph) {
            graph.fire('changed', changes);
        },

        // Enter, Exit Mofidication allows bulk graph updates without firing events.
        enterModification = function () {
            suspendEvents += 1;
        },

        exitModification = function (graph) {
            suspendEvents -= 1;
            if (suspendEvents === 0 && changes.length > 0) {
                fireGraphChanged(graph);
                changes.length = 0;
            }
        },

        recordNodeChange = function (node, changeType) {
            changes.push({node : node, changeType : changeType});
        },

        recordLinkChange = function (link, changeType) {
            changes.push({link : link, changeType : changeType});
        },
        linkConnectionSymbol = '👉 ';

    var graphPart = {

        /**
         * Adds node to the graph. If node with given id already exists in the graph
         * its data is extended with whatever comes in 'data' argument.
         *
         * @param nodeId the node's identifier. A string or number is preferred.
         *   note: Node id should not contain 'linkConnectionSymbol'. This will break link identifiers
         * @param [data] additional data for the node being added. If node already
         *   exists its data object is augmented with the new one.
         *
         * @return {node} The newly added node or node with given id if it already exists.
         */
        addNode : function (nodeId, data) {
            if (typeof nodeId === 'undefined') {
                throw new Error('Invalid node identifier');
            }

            enterModification();

            var node = this.getNode(nodeId);
            if (!node) {
                // TODO: Should I check for linkConnectionSymbol here?
                node = new Node(nodeId);
                nodesCount++;

                recordNodeChange(node, 'add');
            } else {
                recordNodeChange(node, 'update');
            }

            node.data = data;

            nodes[nodeId] = node;

            exitModification(this);
            return node;
        },

        /**
         * Adds a link to the graph. The function always create a new
         * link between two nodes. If one of the nodes does not exists
         * a new node is created.
         *
         * @param fromId link start node id;
         * @param toId link end node id;
         * @param [data] additional data to be set on the new link;
         *
         * @return {link} The newly created link
         */
        addLink : function (fromId, toId, data) {
            enterModification();

            var fromNode = this.getNode(fromId) || this.addNode(fromId);
            var toNode = this.getNode(toId) || this.addNode(toId);

            var linkId = fromId.toString() + linkConnectionSymbol + toId.toString();
            var isMultiEdge = multiEdges.hasOwnProperty(linkId);
            if (isMultiEdge || this.hasLink(fromId, toId)) {
                if (!isMultiEdge) {
                    multiEdges[linkId] = 0;
                }
                linkId += '@' + (++multiEdges[linkId]);
            }

            var link = new Link(fromId, toId, data, linkId);

            links.push(link);

            // TODO: this is not cool. On large graphs potentially would consume more memory.
            fromNode.links.push(link);
            toNode.links.push(link);

            recordLinkChange(link, 'add');

            exitModification(this);

            return link;
        },

        /**
         * Removes link from the graph. If link does not exist does nothing.
         *
         * @param link - object returned by addLink() or getLinks() methods.
         *
         * @returns true if link was removed; false otherwise.
         */
        removeLink : function (link) {
            if (!link) { return false; }
            var idx = indexOfElementInArray(link, links);
            if (idx < 0) { return false; }

            enterModification();

            links.splice(idx, 1);

            var fromNode = this.getNode(link.fromId);
            var toNode = this.getNode(link.toId);

            if (fromNode) {
                idx = indexOfElementInArray(link, fromNode.links);
                if (idx >= 0) {
                    fromNode.links.splice(idx, 1);
                }
            }

            if (toNode) {
                idx = indexOfElementInArray(link, toNode.links);
                if (idx >= 0) {
                    toNode.links.splice(idx, 1);
                }
            }

            recordLinkChange(link, 'remove');

            exitModification(this);

            return true;
        },

        /**
         * Removes node with given id from the graph. If node does not exist in the graph
         * does nothing.
         *
         * @param nodeId node's identifier passed to addNode() function.
         *
         * @returns true if node was removed; false otherwise.
         */
        removeNode: function (nodeId) {
            var node = this.getNode(nodeId);
            if (!node) { return false; }

            enterModification();

            while (node.links.length) {
                var link = node.links[0];
                this.removeLink(link);
            }

            delete nodes[nodeId];
            nodesCount--;

            recordNodeChange(node, 'remove');

            exitModification(this);

            return true;
        },

        /**
         * Gets node with given identifier. If node does not exist undefined value is returned.
         *
         * @param nodeId requested node identifier;
         *
         * @return {node} in with requested identifier or undefined if no such node exists.
         */
        getNode : function (nodeId) {
            return nodes[nodeId];
        },

        /**
         * Gets number of nodes in this graph.
         *
         * @return number of nodes in the graph.
         */
        getNodesCount : function () {
            return nodesCount;
        },

        /**
         * Gets total number of links in the graph.
         */
        getLinksCount : function () {
            return links.length;
        },

        /**
         * Gets all links (inbound and outbound) from the node with given id.
         * If node with given id is not found null is returned.
         *
         * @param nodeId requested node identifier.
         *
         * @return Array of links from and to requested node if such node exists;
         *   otherwise null is returned.
         */
        getLinks : function (nodeId) {
            var node = this.getNode(nodeId);
            return node ? node.links : null;
        },

        /**
         * Invokes callback on each node of the graph.
         *
         * @param {Function(node)} callback Function to be invoked. The function
         *   is passed one argument: visited node.
         */
        forEachNode : function (callback) {
            if (typeof callback !== 'function') {
                return;
            }
            var node;

            for (node in nodes) {
                if (nodes.hasOwnProperty(node)) {
                    if (callback(nodes[node])) {
                        return; // client doesn't want to proceed. return.
                    }
                }
            }
        },

        /**
         * Invokes callback on every linked (adjacent) node to the given one.
         *
         * @param nodeId Identifier of the requested node.
         * @param {Function(node, link)} callback Function to be called on all linked nodes.
         *   The function is passed two parameters: adjacent node and link object itself.
         * @param oriented if true graph treated as oriented.
         */
        forEachLinkedNode : function (nodeId, callback, oriented) {
            var node = this.getNode(nodeId),
                i,
                link,
                linkedNodeId;

            if (node && node.links && typeof callback === 'function') {
                // Extraced orientation check out of the loop to increase performance
                if (oriented) {
                    for (i = 0; i < node.links.length; ++i) {
                        link = node.links[i];
                        if (link.fromId === nodeId) {
                            callback(nodes[link.toId], link);
                        }
                    }
                } else {
                    for (i = 0; i < node.links.length; ++i) {
                        link = node.links[i];
                        linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;

                        callback(nodes[linkedNodeId], link);
                    }
                }
            }
        },

        /**
         * Enumerates all links in the graph
         *
         * @param {Function(link)} callback Function to be called on all links in the graph.
         *   The function is passed one parameter: graph's link object.
         *
         * Link object contains at least the following fields:
         *  fromId - node id where link starts;
         *  toId - node id where link ends,
         *  data - additional data passed to graph.addLink() method.
         */
        forEachLink : function (callback) {
            var i, length;
            if (typeof callback === 'function') {
                for (i = 0, length = links.length; i < length; ++i) {
                    callback(links[i]);
                }
            }
        },

        /**
         * Suspend all notifications about graph changes until
         * endUpdate is called.
         */
        beginUpdate : function () {
            enterModification();
        },

        /**
         * Resumes all notifications about graph changes and fires
         * graph 'changed' event in case there are any pending changes.
         */
        endUpdate : function () {
            exitModification(this);
        },

        /**
         * Removes all nodes and links from the graph.
         */
        clear : function () {
            var that = this;
            that.beginUpdate();
            that.forEachNode(function (node) { that.removeNode(node.id); });
            that.endUpdate();
        },

        /**
         * Detects whether there is a link between two nodes.
         * Operation complexity is O(n) where n - number of links of a node.
         *
         * @returns link if there is one. null otherwise.
         */
        hasLink : function (fromNodeId, toNodeId) {
            // TODO: Use adjacency matrix to speed up this operation.
            var node = this.getNode(fromNodeId),
                i;
            if (!node) {
                return null;
            }

            for (i = 0; i < node.links.length; ++i) {
                var link = node.links[i];
                if (link.fromId === fromNodeId && link.toId === toNodeId) {
                    return link;
                }
            }

            return null; // no link.
        }
    };

    // Let graph fire events before we return it to the caller.
    var eventify = require('ngraph.events');
    eventify(graphPart);

    return graphPart;
};

// need this for old browsers. Should this be a separate module?
function indexOfElementInArray(element, array) {
    if (array.indexOf) {
        return array.indexOf(element);
    }

    var len = array.length,
        i;

    for (i = 0; i < len; i += 1) {
        if (array[i] === element) {
            return i;
        }
    }

    return -1;
}

/**
 * Internal structure to represent node;
 */
function Node(id) {
    this.id = id;
    this.links = [];
    this.data = null;
}


/**
 * Internal structure to represent links;
 */
function Link(fromId, toId, data, id) {
    this.fromId = fromId;
    this.toId = toId;
    this.data = data;
    this.id = id;
}

},{"ngraph.events":8}],8:[function(require,module,exports){
module.exports = function(subject) {
  validateSubject(subject);

  var eventsStorage = createEventsStorage(subject);
  subject.on = eventsStorage.on;
  subject.off = eventsStorage.off;
  subject.fire = eventsStorage.fire;
  return subject;
};

function createEventsStorage(subject) {
  // Store all event listeners to this hash. Key is event name, value is array
  // of callback records.
  //
  // A callback record consists of callback function and its optional context:
  // { 'eventName' => [{callback: function, ctx: object}] }
  var registeredEvents = {};

  return {
    on: function (eventName, callback, ctx) {
      if (typeof callback !== 'function') {
        throw new Error('callback is expected to be a function');
      }
      if (!registeredEvents.hasOwnProperty(eventName)) {
        registeredEvents[eventName] = [];
      }
      registeredEvents[eventName].push({callback: callback, ctx: ctx});

      return subject;
    },

    off: function (eventName, callback) {
      var wantToRemoveAll = (typeof eventName === 'undefined');
      if (wantToRemoveAll) {
        // Killing old events storage should be enough in this case:
        registeredEvents = {};
        return subject;
      }

      if (registeredEvents.hasOwnProperty(eventName)) {
        var deleteAllCallbacksForEvent = (typeof callback !== 'function');
        if (deleteAllCallbacksForEvent) {
          delete registeredEvents[eventName];
        } else {
          var callbacks = registeredEvents[eventName];
          for (var i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].callback === callback) {
              callbacks.splice(i, 1);
            }
          }
        }
      }

      return subject;
    },

    fire: function (eventName) {
      var noEventsToFire = !registeredEvents.hasOwnProperty(eventName);
      if (noEventsToFire) {
        return subject; 
      }

      var callbacks = registeredEvents[eventName];
      var fireArguments = Array.prototype.splice.call(arguments, 1);
      for(var i = 0; i < callbacks.length; ++i) {
        var callbackInfo = callbacks[i];
        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
      }

      return subject;
    }
  };
}

function validateSubject(subject) {
  if (!subject) {
    throw new Error('Eventify cannot use falsy object as events subject');
  }
  var reservedWords = ['on', 'fire', 'off'];
  for (var i = 0; i < reservedWords.length; ++i) {
    if (subject.hasOwnProperty(reservedWords[i])) {
      throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
    }
  }
}

},{}],9:[function(require,module,exports){
module.exports = {
  random: random,
  randomIterator: randomIterator
};

/**
 * Creates seeded PRNG with two methods:
 *   next() and nextDouble()
 */
function random(inputSeed) {
  var seed = typeof inputSeed === 'number' ? inputSeed : (+ new Date());
  var randomFunc = function() {
      // Robert Jenkins' 32 bit integer hash function.
      seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;
      seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
      seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
      seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;
      seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
  };

  return {
      /**
       * Generates random integer number in the range from 0 (inclusive) to maxValue (exclusive)
       *
       * @param maxValue Number REQUIRED. Ommitting this number will result in NaN values from PRNG.
       */
      next : function (maxValue) {
          return Math.floor(randomFunc() * maxValue);
      },

      /**
       * Generates random double number in the range from 0 (inclusive) to 1 (exclusive)
       * This function is the same as Math.random() (except that it could be seeded)
       */
      nextDouble : function () {
          return randomFunc();
      }
  };
}

/*
 * Creates iterator over array, which returns items of array in random order
 * Time complexity is guaranteed to be O(n);
 */
function randomIterator(array, customRandom) {
    var localRandom = customRandom || random();
    if (typeof localRandom.next !== 'function') {
      throw new Error('customRandom does not match expected API: next() function is missing');
    }

    return {
        forEach : function (callback) {
            var i, j, t;
            for (i = array.length - 1; i > 0; --i) {
                j = localRandom.next(i + 1); // i inclusive
                t = array[j];
                array[j] = array[i];
                array[i] = t;

                callback(t);
            }

            if (array.length) {
                callback(array[0]);
            }
        },

        /**
         * Shuffles array randomly, in place.
         */
        shuffle : function () {
            var i, j, t;
            for (i = array.length - 1; i > 0; --i) {
                j = localRandom.next(i + 1); // i inclusive
                t = array[j];
                array[j] = array[i];
                array[i] = t;
            }

            return array;
        }
    };
}

},{}],10:[function(require,module,exports){
require('githuboauth');
require('an').controller(AllController, 'AllController');

var libraries;

function AllController($scope, $http, $location, $timeout) {
  var getLibraries = require('./libraries');
  var timeouts = [];

  if (!libraries) {
    getLibraries($http).then(initLibraries, showError);

    timeouts = [
      $timeout(function() { if (!libraries) $scope.showSecondLoading = true; }, 2000),
      $timeout(function() { if (!libraries) $scope.showThirdLoading = true; }, 6000),
      $timeout(showError, 14000)
    ];
  } else {
    initLibraries(libraries);
  }

  $scope.routeTo = function(library) {
    $location.path(getRoute(library));
  };

  $scope.getRoute = getRoute;

  $scope.sort = {
    name: 'name',
    direction: 1
  };

  $scope.sortBy = function(name) {
    var sort = $scope.sort;
    if (sort.name === name) sort.direction *= -1;
    else sort.direction = 1;

    sort.name = name;

    $scope.libraries.sort(function(a, b) {
      return a[name] < b[name] ? 1 * sort.direction :
        a[name] === b[name] ? 0 : -1 * sort.direction;
    });
  };

  function getRoute(libraryName) {
    return 'library/' + libraryName.replace('/', '_');
  }

  function initLibraries(foundLibraries) {
    $scope.libraries = foundLibraries;
    $scope.loaded = true;
    $scope.showSecondLoading = false;
    $scope.showThirdLoading = false;
    $scope.showErrorLoading = false;

    libraries = foundLibraries;
  }

  function showError() {
    if (!libraries) $scope.showErrorLoading = true;
    timeouts.forEach($timeout.cancel);
  }
}

AllController.$inject = ['$scope', '$http', '$location', '$timeout'];

},{"./libraries":11,"an":1,"githuboauth":4}],11:[function(require,module,exports){
var libraries = require('../data/libraries');

module.exports = function getLibraries($http) {
  return $http.get('//gh-graph-stats.herokuapp.com/githubstats/').then(mergeWithOfflineData);

  function mergeWithOfflineData(res) {
    var repositories = res.data.repositories;
    repositories.forEach(merge);
    return repositories;

    function merge(repoInfo) {
      var offlineInfo = libraries.libraries[repoInfo.name];
      if (!offlineInfo) {
        // we don't know about this library, bail out:
        return repoInfo;
      }
      for (var name in offlineInfo) {
        // skip standard properties and those which are present in the online data:
        if (!offlineInfo.hasOwnProperty(name) || repoInfo.hasOwnProperty(name)) continue;

        repoInfo[name] = offlineInfo[name];
      }

      return repoInfo;
    }
  }
};

},{"../data/libraries":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
require('./all/allController');
require('./navController');
require('./library/libraryDetailsController');


var ngApp = angular.module('src', ['ngRoute']);

ngApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/all', {
        template: "<div class='container'>\n  <table class=\"table table-hover ng-hide\" ng-show='loaded'>\n    <thead>\n      <tr>\n        <th ng-click='sortBy(\"name\")'>Library\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"name\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"name\" && sort.direction === -1'></span>\n        </th>\n        <th>Details</th>\n        <th ng-click='sortBy(\"watchers\")'>Stars\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"watchers\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"watchers\" && sort.direction === -1'></span>\n        </th>\n        <th ng-click='sortBy(\"forks\")'>Forks\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"forks\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"forks\" && sort.direction === -1'></span>\n        </th>\n        <th ng-click='sortBy(\"createdTime\")'>Created\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"createdTime\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"createdTime\" && sort.direction === -1'></span>\n        </th>\n        <th ng-click='sortBy(\"updatedTime\")'>Updated\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"updatedTime\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"updatedTime\" && sort.direction === -1'></span>\n        </th>\n        <th ng-click='sortBy(\"issues\")'>Issues\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"issues\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"issues\" && sort.direction === -1'></span>\n        </th>\n        <th ng-click='sortBy(\"license\")'>License\n          <span class=\"glyphicon glyphicon-arrow-down\" ng-show='sort.name === \"license\" && sort.direction === 1'></span>\n          <span class=\"glyphicon glyphicon-arrow-up\" ng-show='sort.name === \"license\" && sort.direction === -1'></span>\n        </th>\n    </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat='library in libraries' ng-click='routeTo(library.name)' class='library-info'>\n        <td>\n          <a href='#' target=\"_blank\" ng-href='{{library.url}}'>{{library.name}}</a>\n        </td>\n        <td><a href='#' ng-href='{{\"#/\" + getRoute(library.name)}}'>demo</a></td>\n        <td>{{library.watchers}}</td>\n        <td>{{library.forks}}</td>\n        <td ng-attr-title='{{library.createdTooltip}}'>{{library.created}}</td>\n        <td ng-attr-title='{{library.updatedTooltip}}'>{{library.updated}}</td>\n        <td>{{library.issues}}\n          <br>\n          <img ng-src='//issuestats.herokuapp.com/github/{{library.name}}/badge/issue'>\n        </td>\n        <td>{{library.license}}</td>\n      </tr>\n    </tbody>\n  </table>\n  <h2 ng-hide='loaded'>Loading statistics...</h2>\n  <h3 ng-show='showSecondLoading' class='ng-cloak'>Still loading...</h3>\n  <h4 ng-show='showThirdLoading' class='ng-cloak'>My free Heroku server is still starting...</h4>\n  <h5 ng-show='showErrorLoading' class='ng-cloak'>I must admit something went wrong. Do you see any errors in the console?\n    Please <a href=\"https://github.com/anvaka/graph-drawing-libraries/issues\">report them</a>.\n  </h5>\n</div>\n",
        controller: 'AllController'
      }).
      when('/library/:libraryName', {
        template: "<div class='container'>\n  <h2>{{name}}</h2>\n  <h3>Basic example</h3>\n  <p>\n    Basic example shows how to implement \"hello world\" kind of application with\n    this graph drawing library. You can:\n  </p>\n    <ul>\n      <li><a href='#' ng-href='{{basicExampleUrl}}'>Run interactive demo</a></li>\n      <li><a href='#' ng-href='{{basicExampleSrcUrl}}'>View the source code</a></li>\n    </ul>\n\n  <h3 id='perf'>Performance</h3>\n  <p>\n    Performance of a library is measured interactively. Configure a graph to be\n    rendered below and click on \"Render Graph\" link.\n  </p>\n  <form role='form' class='col-sm-7 form-horizontal'>\n    <div class=\"form-group\">\n      <label class='col-sm-2 control-label' for='graphType'>Graph type:</label>\n      <div class='col-sm-10'>\n        <select class='form-control'\n                id='graphType'\n                ng-model='selectedGraph'\n                ng-options='graphType.name for graphType in graphTypes'>\n        </select>\n        <p class='help-block'>\n          {{selectedGraph.description}}\n        </p>\n      </div>\n    </div>\n\n    <div class=\"form-group\" ng-repeat='param in selectedGraph.params'>\n      <label class=\"col-sm-2 control-label\">{{param.name}}</label>\n      <div class=\"col-sm-10\">\n        <input class=\"form-control\" ng-model='param.value'>\n        <p class='help-block'>\n          {{param.description}}\n        </p>\n      </div>\n    </div>\n  </form>\n  <div class='col-sm-5'>\n    <a href=\"#\" ng-href='{{getPerfUrl(selectedGraph)}}'>Render Graph</a>\n  </div>\n\n</div>\n",
        controller: 'LibraryDetailsController'
      }).
      otherwise({
        redirectTo: '/all'
      });
  }]);

require('an').flush(ngApp);
angular.bootstrap(document, [ngApp.name]);

module.exports = ngApp;

},{"./all/allController":10,"./library/libraryDetailsController":14,"./navController":16,"an":1}],14:[function(require,module,exports){
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

},{"./supportedGraphTypes":15,"an":1}],15:[function(require,module,exports){
var generators = require('ngraph.generators');

module.exports = getGraphTypes;

function getGraphTypes() {
  return Object.keys(generators).map(function(key) {
    var functionBody = generators[key].toString();
    var comments = getComments(functionBody);
    var parsedComments = parseComments(comments);

    return {
      name: key,
      description: parsedComments.description ? parsedComments.description.join('\n') : '',
      params: parsedComments.params
    };
  });
}

function parseComments(comments) {
  var result = {};
  var processLine = readDescription;

  for (var i = 0; i < comments.length; ++i) {
    var line = trim(comments[i]);

    processLine(line);

    var nextLine = comments[i + 1];
    if (typeof nextLine === 'string' && nextLine.indexOf('@') >= 0) {
      processLine = getNextState(nextLine);
    }
  }

  return result;

  function readDescription(line) {
    if (!result.description) result.description = [];
    if (line) result.description.push(line);
  }

  function readParam(line) {
    var paramDef = line.match(/@param \{.+\}\s+(.+?)\s+(.+)/);
    if (paramDef) {
      if (!result.params) result.params = [];
      result.params.push({
        name: paramDef[1],
        description: paramDef[2]
      });
    }
  }

  function readSee(line) {
    var seeDef = line.match(/@see\s+(.+)/);
    if (seeDef) {
      if (!result.see) result.see = [];
      result.see.push(seeDef[1]);
    }
  }

  function noop(line) { }

  function getNextState(line) {
    if (line.indexOf('@param') !== -1) return readParam;
    if (line.indexOf('@see') !== -1) return readSee;
    return noop;
  }
}

function getComments(body) {
  var strings = body.split('\n');
  var comments = [];

  for (var i = 0; i < strings.length; ++i) {
    var line = trim(strings[i]);
    var isJSDoc = (line[0] === '/' && line[1] === '*' && line[2] === '*');

    if (isJSDoc) {
      var commentLine;
      while ( (commentLine = readCommentLine(trim(strings[++i]))) ) {
        comments.push(commentLine);
      }

      return comments;
    }
  }
}

function readCommentLine(str) {
  var endOfJSDoc = str[0] === '*' && str[1] === '/';
  if (endOfJSDoc) return;

  comment = str;
  if (str[0] === '*') {
    comment = str.substr(1);
  }

  comment = trim(comment);
  return comment ? comment : ' ';
}

function trim(str) {
  return str
    .replace(/^\s+/g, '')
    .replace(/\s+$/g, '');
}

},{"ngraph.generators":6}],16:[function(require,module,exports){
module.exports = require('an').controller('navController', navController);

function navController($scope, $location) {
  $scope.share = require('./share');
  $scope.$on('$locationChangeSuccess', locationChanged);
  $scope.lastDetailsRoute = '#/library/almende_vis';

  function locationChanged(e, newRoute, oldRoute) {
    var libraryIdx = newRoute.indexOf('#/library/');
    if (libraryIdx !== -1) {
      $scope.currentRoute = 'details';
      $scope.lastDetailsRoute = newRoute.substr(libraryIdx);
    } else {
      $scope.currentRoute = 'all';
    }
  }
}

navController.$inject = ['$scope', '$location'];

},{"./share":17,"an":1}],17:[function(require,module,exports){
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

},{}]},{},[13])
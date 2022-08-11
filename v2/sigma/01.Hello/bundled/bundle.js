(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/graphology/dist/graphology.umd.min.js
  var require_graphology_umd_min = __commonJS({
    "node_modules/graphology/dist/graphology.umd.min.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).graphology = e();
      }(exports, function() {
        "use strict";
        function t(e2) {
          return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
            return typeof t2;
          } : function(t2) {
            return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
          }, t(e2);
        }
        function e(t2, e2) {
          t2.prototype = Object.create(e2.prototype), t2.prototype.constructor = t2, r(t2, e2);
        }
        function n(t2) {
          return n = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          }, n(t2);
        }
        function r(t2, e2) {
          return r = Object.setPrototypeOf || function(t3, e3) {
            return t3.__proto__ = e3, t3;
          }, r(t2, e2);
        }
        function i() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if ("function" == typeof Proxy)
            return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (t2) {
            return false;
          }
        }
        function o(t2, e2, n2) {
          return o = i() ? Reflect.construct : function(t3, e3, n3) {
            var i2 = [null];
            i2.push.apply(i2, e3);
            var o2 = new (Function.bind.apply(t3, i2))();
            return n3 && r(o2, n3.prototype), o2;
          }, o.apply(null, arguments);
        }
        function a(t2) {
          var e2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return a = function(t3) {
            if (null === t3 || (i2 = t3, -1 === Function.toString.call(i2).indexOf("[native code]")))
              return t3;
            var i2;
            if ("function" != typeof t3)
              throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== e2) {
              if (e2.has(t3))
                return e2.get(t3);
              e2.set(t3, a2);
            }
            function a2() {
              return o(t3, arguments, n(this).constructor);
            }
            return a2.prototype = Object.create(t3.prototype, { constructor: { value: a2, enumerable: false, writable: true, configurable: true } }), r(a2, t3);
          }, a(t2);
        }
        function u(t2) {
          if (void 0 === t2)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        }
        var c = function() {
          for (var t2 = arguments[0], e2 = 1, n2 = arguments.length; e2 < n2; e2++)
            if (arguments[e2])
              for (var r2 in arguments[e2])
                t2[r2] = arguments[e2][r2];
          return t2;
        };
        function s(t2, e2, n2, r2) {
          var i2 = t2._nodes.get(e2), o2 = null;
          return i2 ? o2 = "mixed" === r2 ? i2.out && i2.out[n2] || i2.undirected && i2.undirected[n2] : "directed" === r2 ? i2.out && i2.out[n2] : i2.undirected && i2.undirected[n2] : o2;
        }
        function d(e2) {
          return null !== e2 && "object" === t(e2) && "function" == typeof e2.addUndirectedEdgeWithKey && "function" == typeof e2.dropNode;
        }
        function h(e2) {
          return "object" === t(e2) && null !== e2 && e2.constructor === Object;
        }
        function p(t2) {
          var e2;
          for (e2 in t2)
            return false;
          return true;
        }
        function f(t2, e2, n2) {
          Object.defineProperty(t2, e2, { enumerable: false, configurable: false, writable: true, value: n2 });
        }
        function l(t2, e2, n2) {
          var r2 = { enumerable: true, configurable: true };
          "function" == typeof n2 ? r2.get = n2 : (r2.value = n2, r2.writable = false), Object.defineProperty(t2, e2, r2);
        }
        function g(t2) {
          return !!h(t2) && !(t2.attributes && !Array.isArray(t2.attributes));
        }
        "function" == typeof Object.assign && (c = Object.assign);
        var y, w = { exports: {} }, v = "object" == typeof Reflect ? Reflect : null, b = v && "function" == typeof v.apply ? v.apply : function(t2, e2, n2) {
          return Function.prototype.apply.call(t2, e2, n2);
        };
        y = v && "function" == typeof v.ownKeys ? v.ownKeys : Object.getOwnPropertySymbols ? function(t2) {
          return Object.getOwnPropertyNames(t2).concat(Object.getOwnPropertySymbols(t2));
        } : function(t2) {
          return Object.getOwnPropertyNames(t2);
        };
        var m = Number.isNaN || function(t2) {
          return t2 != t2;
        };
        function k() {
          k.init.call(this);
        }
        w.exports = k, w.exports.once = function(t2, e2) {
          return new Promise(function(n2, r2) {
            function i2(n3) {
              t2.removeListener(e2, o2), r2(n3);
            }
            function o2() {
              "function" == typeof t2.removeListener && t2.removeListener("error", i2), n2([].slice.call(arguments));
            }
            N(t2, e2, o2, { once: true }), "error" !== e2 && function(t3, e3, n3) {
              "function" == typeof t3.on && N(t3, "error", e3, n3);
            }(t2, i2, { once: true });
          });
        }, k.EventEmitter = k, k.prototype._events = void 0, k.prototype._eventsCount = 0, k.prototype._maxListeners = void 0;
        var _ = 10;
        function G(t2) {
          if ("function" != typeof t2)
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t2);
        }
        function x(t2) {
          return void 0 === t2._maxListeners ? k.defaultMaxListeners : t2._maxListeners;
        }
        function E(t2, e2, n2, r2) {
          var i2, o2, a2, u2;
          if (G(n2), void 0 === (o2 = t2._events) ? (o2 = t2._events = /* @__PURE__ */ Object.create(null), t2._eventsCount = 0) : (void 0 !== o2.newListener && (t2.emit("newListener", e2, n2.listener ? n2.listener : n2), o2 = t2._events), a2 = o2[e2]), void 0 === a2)
            a2 = o2[e2] = n2, ++t2._eventsCount;
          else if ("function" == typeof a2 ? a2 = o2[e2] = r2 ? [n2, a2] : [a2, n2] : r2 ? a2.unshift(n2) : a2.push(n2), (i2 = x(t2)) > 0 && a2.length > i2 && !a2.warned) {
            a2.warned = true;
            var c2 = new Error("Possible EventEmitter memory leak detected. " + a2.length + " " + String(e2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            c2.name = "MaxListenersExceededWarning", c2.emitter = t2, c2.type = e2, c2.count = a2.length, u2 = c2, console && console.warn && console.warn(u2);
          }
          return t2;
        }
        function A() {
          if (!this.fired)
            return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function S(t2, e2, n2) {
          var r2 = { fired: false, wrapFn: void 0, target: t2, type: e2, listener: n2 }, i2 = A.bind(r2);
          return i2.listener = n2, r2.wrapFn = i2, i2;
        }
        function D(t2, e2, n2) {
          var r2 = t2._events;
          if (void 0 === r2)
            return [];
          var i2 = r2[e2];
          return void 0 === i2 ? [] : "function" == typeof i2 ? n2 ? [i2.listener || i2] : [i2] : n2 ? function(t3) {
            for (var e3 = new Array(t3.length), n3 = 0; n3 < e3.length; ++n3)
              e3[n3] = t3[n3].listener || t3[n3];
            return e3;
          }(i2) : U(i2, i2.length);
        }
        function L(t2) {
          var e2 = this._events;
          if (void 0 !== e2) {
            var n2 = e2[t2];
            if ("function" == typeof n2)
              return 1;
            if (void 0 !== n2)
              return n2.length;
          }
          return 0;
        }
        function U(t2, e2) {
          for (var n2 = new Array(e2), r2 = 0; r2 < e2; ++r2)
            n2[r2] = t2[r2];
          return n2;
        }
        function N(t2, e2, n2, r2) {
          if ("function" == typeof t2.on)
            r2.once ? t2.once(e2, n2) : t2.on(e2, n2);
          else {
            if ("function" != typeof t2.addEventListener)
              throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t2);
            t2.addEventListener(e2, function i2(o2) {
              r2.once && t2.removeEventListener(e2, i2), n2(o2);
            });
          }
        }
        function j(t2) {
          if ("function" != typeof t2)
            throw new Error("obliterator/iterator: expecting a function!");
          this.next = t2;
        }
        Object.defineProperty(k, "defaultMaxListeners", { enumerable: true, get: function() {
          return _;
        }, set: function(t2) {
          if ("number" != typeof t2 || t2 < 0 || m(t2))
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t2 + ".");
          _ = t2;
        } }), k.init = function() {
          void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        }, k.prototype.setMaxListeners = function(t2) {
          if ("number" != typeof t2 || t2 < 0 || m(t2))
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t2 + ".");
          return this._maxListeners = t2, this;
        }, k.prototype.getMaxListeners = function() {
          return x(this);
        }, k.prototype.emit = function(t2) {
          for (var e2 = [], n2 = 1; n2 < arguments.length; n2++)
            e2.push(arguments[n2]);
          var r2 = "error" === t2, i2 = this._events;
          if (void 0 !== i2)
            r2 = r2 && void 0 === i2.error;
          else if (!r2)
            return false;
          if (r2) {
            var o2;
            if (e2.length > 0 && (o2 = e2[0]), o2 instanceof Error)
              throw o2;
            var a2 = new Error("Unhandled error." + (o2 ? " (" + o2.message + ")" : ""));
            throw a2.context = o2, a2;
          }
          var u2 = i2[t2];
          if (void 0 === u2)
            return false;
          if ("function" == typeof u2)
            b(u2, this, e2);
          else {
            var c2 = u2.length, s2 = U(u2, c2);
            for (n2 = 0; n2 < c2; ++n2)
              b(s2[n2], this, e2);
          }
          return true;
        }, k.prototype.addListener = function(t2, e2) {
          return E(this, t2, e2, false);
        }, k.prototype.on = k.prototype.addListener, k.prototype.prependListener = function(t2, e2) {
          return E(this, t2, e2, true);
        }, k.prototype.once = function(t2, e2) {
          return G(e2), this.on(t2, S(this, t2, e2)), this;
        }, k.prototype.prependOnceListener = function(t2, e2) {
          return G(e2), this.prependListener(t2, S(this, t2, e2)), this;
        }, k.prototype.removeListener = function(t2, e2) {
          var n2, r2, i2, o2, a2;
          if (G(e2), void 0 === (r2 = this._events))
            return this;
          if (void 0 === (n2 = r2[t2]))
            return this;
          if (n2 === e2 || n2.listener === e2)
            0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete r2[t2], r2.removeListener && this.emit("removeListener", t2, n2.listener || e2));
          else if ("function" != typeof n2) {
            for (i2 = -1, o2 = n2.length - 1; o2 >= 0; o2--)
              if (n2[o2] === e2 || n2[o2].listener === e2) {
                a2 = n2[o2].listener, i2 = o2;
                break;
              }
            if (i2 < 0)
              return this;
            0 === i2 ? n2.shift() : function(t3, e3) {
              for (; e3 + 1 < t3.length; e3++)
                t3[e3] = t3[e3 + 1];
              t3.pop();
            }(n2, i2), 1 === n2.length && (r2[t2] = n2[0]), void 0 !== r2.removeListener && this.emit("removeListener", t2, a2 || e2);
          }
          return this;
        }, k.prototype.off = k.prototype.removeListener, k.prototype.removeAllListeners = function(t2) {
          var e2, n2, r2;
          if (void 0 === (n2 = this._events))
            return this;
          if (void 0 === n2.removeListener)
            return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== n2[t2] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete n2[t2]), this;
          if (0 === arguments.length) {
            var i2, o2 = Object.keys(n2);
            for (r2 = 0; r2 < o2.length; ++r2)
              "removeListener" !== (i2 = o2[r2]) && this.removeAllListeners(i2);
            return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
          }
          if ("function" == typeof (e2 = n2[t2]))
            this.removeListener(t2, e2);
          else if (void 0 !== e2)
            for (r2 = e2.length - 1; r2 >= 0; r2--)
              this.removeListener(t2, e2[r2]);
          return this;
        }, k.prototype.listeners = function(t2) {
          return D(this, t2, true);
        }, k.prototype.rawListeners = function(t2) {
          return D(this, t2, false);
        }, k.listenerCount = function(t2, e2) {
          return "function" == typeof t2.listenerCount ? t2.listenerCount(e2) : L.call(t2, e2);
        }, k.prototype.listenerCount = L, k.prototype.eventNames = function() {
          return this._eventsCount > 0 ? y(this._events) : [];
        }, "undefined" != typeof Symbol && (j.prototype[Symbol.iterator] = function() {
          return this;
        }), j.of = function() {
          var t2 = arguments, e2 = t2.length, n2 = 0;
          return new j(function() {
            return n2 >= e2 ? { done: true } : { done: false, value: t2[n2++] };
          });
        }, j.empty = function() {
          return new j(function() {
            return { done: true };
          });
        }, j.fromSequence = function(t2) {
          var e2 = 0, n2 = t2.length;
          return new j(function() {
            return e2 >= n2 ? { done: true } : { done: false, value: t2[e2++] };
          });
        }, j.is = function(t2) {
          return t2 instanceof j || "object" == typeof t2 && null !== t2 && "function" == typeof t2.next;
        };
        var O = j, C = {};
        C.ARRAY_BUFFER_SUPPORT = "undefined" != typeof ArrayBuffer, C.SYMBOL_SUPPORT = "undefined" != typeof Symbol;
        var z = O, M = C, W = M.ARRAY_BUFFER_SUPPORT, P = M.SYMBOL_SUPPORT;
        var R = function(t2) {
          var e2 = function(t3) {
            return "string" == typeof t3 || Array.isArray(t3) || W && ArrayBuffer.isView(t3) ? z.fromSequence(t3) : "object" != typeof t3 || null === t3 ? null : P && "function" == typeof t3[Symbol.iterator] ? t3[Symbol.iterator]() : "function" == typeof t3.next ? t3 : null;
          }(t2);
          if (!e2)
            throw new Error("obliterator: target is not iterable nor a valid iterator.");
          return e2;
        }, K = R, T = function(t2, e2) {
          for (var n2, r2 = arguments.length > 1 ? e2 : 1 / 0, i2 = r2 !== 1 / 0 ? new Array(r2) : [], o2 = 0, a2 = K(t2); ; ) {
            if (o2 === r2)
              return i2;
            if ((n2 = a2.next()).done)
              return o2 !== e2 && (i2.length = o2), i2;
            i2[o2++] = n2.value;
          }
        }, B = function(t2) {
          function n2(e2) {
            var n3;
            return (n3 = t2.call(this) || this).name = "GraphError", n3.message = e2, n3;
          }
          return e(n2, t2), n2;
        }(a(Error)), F = function(t2) {
          function n2(e2) {
            var r2;
            return (r2 = t2.call(this, e2) || this).name = "InvalidArgumentsGraphError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(u(r2), n2.prototype.constructor), r2;
          }
          return e(n2, t2), n2;
        }(B), I = function(t2) {
          function n2(e2) {
            var r2;
            return (r2 = t2.call(this, e2) || this).name = "NotFoundGraphError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(u(r2), n2.prototype.constructor), r2;
          }
          return e(n2, t2), n2;
        }(B), Y = function(t2) {
          function n2(e2) {
            var r2;
            return (r2 = t2.call(this, e2) || this).name = "UsageGraphError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(u(r2), n2.prototype.constructor), r2;
          }
          return e(n2, t2), n2;
        }(B);
        function q(t2, e2) {
          this.key = t2, this.attributes = e2, this.clear();
        }
        function J(t2, e2) {
          this.key = t2, this.attributes = e2, this.clear();
        }
        function V(t2, e2) {
          this.key = t2, this.attributes = e2, this.clear();
        }
        function H(t2, e2, n2, r2, i2) {
          this.key = e2, this.attributes = i2, this.undirected = t2, this.source = n2, this.target = r2;
        }
        q.prototype.clear = function() {
          this.inDegree = 0, this.outDegree = 0, this.undirectedDegree = 0, this.in = {}, this.out = {}, this.undirected = {};
        }, J.prototype.clear = function() {
          this.inDegree = 0, this.outDegree = 0, this.in = {}, this.out = {};
        }, V.prototype.clear = function() {
          this.undirectedDegree = 0, this.undirected = {};
        }, H.prototype.attach = function() {
          var t2 = "out", e2 = "in";
          this.undirected && (t2 = e2 = "undirected");
          var n2 = this.source.key, r2 = this.target.key;
          this.source[t2][r2] = this, this.undirected && n2 === r2 || (this.target[e2][n2] = this);
        }, H.prototype.attachMulti = function() {
          var t2 = "out", e2 = "in", n2 = this.source.key, r2 = this.target.key;
          this.undirected && (t2 = e2 = "undirected");
          var i2 = this.source[t2], o2 = i2[r2];
          if (void 0 === o2)
            return i2[r2] = this, void (this.undirected && n2 === r2 || (this.target[e2][n2] = this));
          o2.previous = this, this.next = o2, i2[r2] = this, this.target[e2][n2] = this;
        }, H.prototype.detach = function() {
          var t2 = this.source.key, e2 = this.target.key, n2 = "out", r2 = "in";
          this.undirected && (n2 = r2 = "undirected"), delete this.source[n2][e2], delete this.target[r2][t2];
        }, H.prototype.detachMulti = function() {
          var t2 = this.source.key, e2 = this.target.key, n2 = "out", r2 = "in";
          this.undirected && (n2 = r2 = "undirected"), void 0 === this.previous ? void 0 === this.next ? (delete this.source[n2][e2], delete this.target[r2][t2]) : (this.next.previous = void 0, this.source[n2][e2] = this.next, this.target[r2][t2] = this.next) : (this.previous.next = this.next, void 0 !== this.next && (this.next.previous = this.previous));
        };
        function Q(t2, e2, n2, r2, i2, o2, a2) {
          var u2, c2, s2, d2;
          if (r2 = "" + r2, 0 === n2) {
            if (!(u2 = t2._nodes.get(r2)))
              throw new I("Graph.".concat(e2, ': could not find the "').concat(r2, '" node in the graph.'));
            s2 = i2, d2 = o2;
          } else if (3 === n2) {
            if (i2 = "" + i2, !(c2 = t2._edges.get(i2)))
              throw new I("Graph.".concat(e2, ': could not find the "').concat(i2, '" edge in the graph.'));
            var h2 = c2.source.key, p2 = c2.target.key;
            if (r2 === h2)
              u2 = c2.target;
            else {
              if (r2 !== p2)
                throw new I("Graph.".concat(e2, ': the "').concat(r2, '" node is not attached to the "').concat(i2, '" edge (').concat(h2, ", ").concat(p2, ")."));
              u2 = c2.source;
            }
            s2 = o2, d2 = a2;
          } else {
            if (!(c2 = t2._edges.get(r2)))
              throw new I("Graph.".concat(e2, ': could not find the "').concat(r2, '" edge in the graph.'));
            u2 = 1 === n2 ? c2.source : c2.target, s2 = i2, d2 = o2;
          }
          return [u2, s2, d2];
        }
        var X = [{ name: function(t2) {
          return "get".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            return a2.attributes[u2];
          };
        } }, { name: function(t2) {
          return "get".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            return Q(this, e2, n2, t3, r2)[0].attributes;
          };
        } }, { name: function(t2) {
          return "has".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            return a2.attributes.hasOwnProperty(u2);
          };
        } }, { name: function(t2) {
          return "set".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2, o2) {
            var a2 = Q(this, e2, n2, t3, r2, i2, o2), u2 = a2[0], c2 = a2[1], s2 = a2[2];
            return u2.attributes[c2] = s2, this.emit("nodeAttributesUpdated", { key: u2.key, type: "set", attributes: u2.attributes, name: c2 }), this;
          };
        } }, { name: function(t2) {
          return "update".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2, o2) {
            var a2 = Q(this, e2, n2, t3, r2, i2, o2), u2 = a2[0], c2 = a2[1], s2 = a2[2];
            if ("function" != typeof s2)
              throw new F("Graph.".concat(e2, ": updater should be a function."));
            var d2 = u2.attributes, h2 = s2(d2[c2]);
            return d2[c2] = h2, this.emit("nodeAttributesUpdated", { key: u2.key, type: "set", attributes: u2.attributes, name: c2 }), this;
          };
        } }, { name: function(t2) {
          return "remove".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            return delete a2.attributes[u2], this.emit("nodeAttributesUpdated", { key: a2.key, type: "remove", attributes: a2.attributes, name: u2 }), this;
          };
        } }, { name: function(t2) {
          return "replace".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            if (!h(u2))
              throw new F("Graph.".concat(e2, ": provided attributes are not a plain object."));
            return a2.attributes = u2, this.emit("nodeAttributesUpdated", { key: a2.key, type: "replace", attributes: a2.attributes }), this;
          };
        } }, { name: function(t2) {
          return "merge".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            if (!h(u2))
              throw new F("Graph.".concat(e2, ": provided attributes are not a plain object."));
            return c(a2.attributes, u2), this.emit("nodeAttributesUpdated", { key: a2.key, type: "merge", attributes: a2.attributes, data: u2 }), this;
          };
        } }, { name: function(t2) {
          return "update".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2 = Q(this, e2, n2, t3, r2, i2), a2 = o2[0], u2 = o2[1];
            if ("function" != typeof u2)
              throw new F("Graph.".concat(e2, ": provided updater is not a function."));
            return a2.attributes = u2(a2.attributes), this.emit("nodeAttributesUpdated", { key: a2.key, type: "update", attributes: a2.attributes }), this;
          };
        } }];
        var Z = [{ name: function(t2) {
          return "get".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            return i2.attributes[r2];
          };
        } }, { name: function(t2) {
          return "get".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3) {
            var r2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 1) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var i2 = "" + t3, o2 = "" + arguments[1];
              if (!(r2 = s(this, i2, o2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(i2, '" - "').concat(o2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(r2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            return r2.attributes;
          };
        } }, { name: function(t2) {
          return "has".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            return i2.attributes.hasOwnProperty(r2);
          };
        } }, { name: function(t2) {
          return "set".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 3) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var a2 = "" + t3, u2 = "" + r2;
              if (r2 = arguments[2], i2 = arguments[3], !(o2 = s(this, a2, u2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(a2, '" - "').concat(u2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(o2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            return o2.attributes[r2] = i2, this.emit("edgeAttributesUpdated", { key: o2.key, type: "set", attributes: o2.attributes, name: r2 }), this;
          };
        } }, { name: function(t2) {
          return "update".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2, i2) {
            var o2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 3) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var a2 = "" + t3, u2 = "" + r2;
              if (r2 = arguments[2], i2 = arguments[3], !(o2 = s(this, a2, u2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(a2, '" - "').concat(u2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(o2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            if ("function" != typeof i2)
              throw new F("Graph.".concat(e2, ": updater should be a function."));
            return o2.attributes[r2] = i2(o2.attributes[r2]), this.emit("edgeAttributesUpdated", { key: o2.key, type: "set", attributes: o2.attributes, name: r2 }), this;
          };
        } }, { name: function(t2) {
          return "remove".concat(t2, "Attribute");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            return delete i2.attributes[r2], this.emit("edgeAttributesUpdated", { key: i2.key, type: "remove", attributes: i2.attributes, name: r2 }), this;
          };
        } }, { name: function(t2) {
          return "replace".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            if (!h(r2))
              throw new F("Graph.".concat(e2, ": provided attributes are not a plain object."));
            return i2.attributes = r2, this.emit("edgeAttributesUpdated", { key: i2.key, type: "replace", attributes: i2.attributes }), this;
          };
        } }, { name: function(t2) {
          return "merge".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            if (!h(r2))
              throw new F("Graph.".concat(e2, ": provided attributes are not a plain object."));
            return c(i2.attributes, r2), this.emit("edgeAttributesUpdated", { key: i2.key, type: "merge", attributes: i2.attributes, data: r2 }), this;
          };
        } }, { name: function(t2) {
          return "update".concat(t2, "Attributes");
        }, attacher: function(t2, e2, n2) {
          t2.prototype[e2] = function(t3, r2) {
            var i2;
            if ("mixed" !== this.type && "mixed" !== n2 && n2 !== this.type)
              throw new Y("Graph.".concat(e2, ": cannot find this type of edges in your ").concat(this.type, " graph."));
            if (arguments.length > 2) {
              if (this.multi)
                throw new Y("Graph.".concat(e2, ": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));
              var o2 = "" + t3, a2 = "" + r2;
              if (r2 = arguments[2], !(i2 = s(this, o2, a2, n2)))
                throw new I("Graph.".concat(e2, ': could not find an edge for the given path ("').concat(o2, '" - "').concat(a2, '").'));
            } else {
              if ("mixed" !== n2)
                throw new Y("Graph.".concat(e2, ": calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type."));
              if (t3 = "" + t3, !(i2 = this._edges.get(t3)))
                throw new I("Graph.".concat(e2, ': could not find the "').concat(t3, '" edge in the graph.'));
            }
            if ("function" != typeof r2)
              throw new F("Graph.".concat(e2, ": provided updater is not a function."));
            return i2.attributes = r2(i2.attributes), this.emit("edgeAttributesUpdated", { key: i2.key, type: "update", attributes: i2.attributes }), this;
          };
        } }];
        var $ = O, tt = R, et = function() {
          var t2 = arguments, e2 = null, n2 = -1;
          return new $(function() {
            for (var r2 = null; ; ) {
              if (null === e2) {
                if (++n2 >= t2.length)
                  return { done: true };
                e2 = tt(t2[n2]);
              }
              if (true !== (r2 = e2.next()).done)
                break;
              e2 = null;
            }
            return r2;
          });
        }, nt = [{ name: "edges", type: "mixed" }, { name: "inEdges", type: "directed", direction: "in" }, { name: "outEdges", type: "directed", direction: "out" }, { name: "inboundEdges", type: "mixed", direction: "in" }, { name: "outboundEdges", type: "mixed", direction: "out" }, { name: "directedEdges", type: "directed" }, { name: "undirectedEdges", type: "undirected" }];
        function rt(t2, e2, n2, r2) {
          var i2 = false;
          for (var o2 in e2)
            if (o2 !== r2) {
              var a2 = e2[o2];
              if (i2 = n2(a2.key, a2.attributes, a2.source.key, a2.target.key, a2.source.attributes, a2.target.attributes, a2.undirected), t2 && i2)
                return a2.key;
            }
        }
        function it(t2, e2, n2, r2) {
          var i2, o2, a2, u2 = false;
          for (var c2 in e2)
            if (c2 !== r2) {
              i2 = e2[c2];
              do {
                if (o2 = i2.source, a2 = i2.target, u2 = n2(i2.key, i2.attributes, o2.key, a2.key, o2.attributes, a2.attributes, i2.undirected), t2 && u2)
                  return i2.key;
                i2 = i2.next;
              } while (void 0 !== i2);
            }
        }
        function ot(t2, e2) {
          var n2, r2 = Object.keys(t2), i2 = r2.length, o2 = 0;
          return new O(function() {
            do {
              if (n2)
                n2 = n2.next;
              else {
                if (o2 >= i2)
                  return { done: true };
                var a2 = r2[o2++];
                if (a2 === e2) {
                  n2 = void 0;
                  continue;
                }
                n2 = t2[a2];
              }
            } while (!n2);
            return { done: false, value: { edge: n2.key, attributes: n2.attributes, source: n2.source.key, target: n2.target.key, sourceAttributes: n2.source.attributes, targetAttributes: n2.target.attributes, undirected: n2.undirected } };
          });
        }
        function at(t2, e2, n2, r2) {
          var i2 = e2[n2];
          if (i2) {
            var o2 = i2.source, a2 = i2.target;
            return r2(i2.key, i2.attributes, o2.key, a2.key, o2.attributes, a2.attributes, i2.undirected) && t2 ? i2.key : void 0;
          }
        }
        function ut(t2, e2, n2, r2) {
          var i2 = e2[n2];
          if (i2) {
            var o2 = false;
            do {
              if (o2 = r2(i2.key, i2.attributes, i2.source.key, i2.target.key, i2.source.attributes, i2.target.attributes, i2.undirected), t2 && o2)
                return i2.key;
              i2 = i2.next;
            } while (void 0 !== i2);
          }
        }
        function ct(t2, e2) {
          var n2 = t2[e2];
          return void 0 !== n2.next ? new O(function() {
            if (!n2)
              return { done: true };
            var t3 = { edge: n2.key, attributes: n2.attributes, source: n2.source.key, target: n2.target.key, sourceAttributes: n2.source.attributes, targetAttributes: n2.target.attributes, undirected: n2.undirected };
            return n2 = n2.next, { done: false, value: t3 };
          }) : O.of({ edge: n2.key, attributes: n2.attributes, source: n2.source.key, target: n2.target.key, sourceAttributes: n2.source.attributes, targetAttributes: n2.target.attributes, undirected: n2.undirected });
        }
        function st(t2, e2) {
          if (0 === t2.size)
            return [];
          if ("mixed" === e2 || e2 === t2.type)
            return "function" == typeof Array.from ? Array.from(t2._edges.keys()) : T(t2._edges.keys(), t2._edges.size);
          for (var n2, r2, i2 = "undirected" === e2 ? t2.undirectedSize : t2.directedSize, o2 = new Array(i2), a2 = "undirected" === e2, u2 = t2._edges.values(), c2 = 0; true !== (n2 = u2.next()).done; )
            (r2 = n2.value).undirected === a2 && (o2[c2++] = r2.key);
          return o2;
        }
        function dt(t2, e2, n2, r2) {
          if (0 !== e2.size) {
            for (var i2, o2, a2 = "mixed" !== n2 && n2 !== e2.type, u2 = "undirected" === n2, c2 = false, s2 = e2._edges.values(); true !== (i2 = s2.next()).done; )
              if (o2 = i2.value, !a2 || o2.undirected === u2) {
                var d2 = o2, h2 = d2.key, p2 = d2.attributes, f2 = d2.source, l2 = d2.target;
                if (c2 = r2(h2, p2, f2.key, l2.key, f2.attributes, l2.attributes, o2.undirected), t2 && c2)
                  return h2;
              }
          }
        }
        function ht(t2, e2) {
          if (0 === t2.size)
            return O.empty();
          var n2 = "mixed" !== e2 && e2 !== t2.type, r2 = "undirected" === e2, i2 = t2._edges.values();
          return new O(function() {
            for (var t3, e3; ; ) {
              if ((t3 = i2.next()).done)
                return t3;
              if (e3 = t3.value, !n2 || e3.undirected === r2)
                break;
            }
            return { value: { edge: e3.key, attributes: e3.attributes, source: e3.source.key, target: e3.target.key, sourceAttributes: e3.source.attributes, targetAttributes: e3.target.attributes, undirected: e3.undirected }, done: false };
          });
        }
        function pt(t2, e2, n2, r2, i2, o2) {
          var a2, u2 = e2 ? it : rt;
          if ("undirected" !== n2) {
            if ("out" !== r2 && (a2 = u2(t2, i2.in, o2), t2 && a2))
              return a2;
            if ("in" !== r2 && (a2 = u2(t2, i2.out, o2, r2 ? void 0 : i2.key), t2 && a2))
              return a2;
          }
          if ("directed" !== n2 && (a2 = u2(t2, i2.undirected, o2), t2 && a2))
            return a2;
        }
        function ft(t2, e2, n2, r2) {
          var i2 = [];
          return pt(false, t2, e2, n2, r2, function(t3) {
            i2.push(t3);
          }), i2;
        }
        function lt(t2, e2, n2) {
          var r2 = O.empty();
          return "undirected" !== t2 && ("out" !== e2 && void 0 !== n2.in && (r2 = et(r2, ot(n2.in))), "in" !== e2 && void 0 !== n2.out && (r2 = et(r2, ot(n2.out, e2 ? void 0 : n2.key)))), "directed" !== t2 && void 0 !== n2.undirected && (r2 = et(r2, ot(n2.undirected))), r2;
        }
        function gt(t2, e2, n2, r2, i2, o2, a2) {
          var u2, c2 = n2 ? ut : at;
          if ("undirected" !== e2) {
            if (void 0 !== i2.in && "out" !== r2 && (u2 = c2(t2, i2.in, o2, a2), t2 && u2))
              return u2;
            if (void 0 !== i2.out && "in" !== r2 && (r2 || i2.key !== o2) && (u2 = c2(t2, i2.out, o2, a2), t2 && u2))
              return u2;
          }
          if ("directed" !== e2 && void 0 !== i2.undirected && (u2 = c2(t2, i2.undirected, o2, a2), t2 && u2))
            return u2;
        }
        function yt(t2, e2, n2, r2, i2) {
          var o2 = [];
          return gt(false, t2, e2, n2, r2, i2, function(t3) {
            o2.push(t3);
          }), o2;
        }
        function wt(t2, e2, n2, r2) {
          var i2 = O.empty();
          return "undirected" !== t2 && (void 0 !== n2.in && "out" !== e2 && r2 in n2.in && (i2 = et(i2, ct(n2.in, r2))), void 0 !== n2.out && "in" !== e2 && r2 in n2.out && (e2 || n2.key !== r2) && (i2 = et(i2, ct(n2.out, r2)))), "directed" !== t2 && void 0 !== n2.undirected && r2 in n2.undirected && (i2 = et(i2, ct(n2.undirected, r2))), i2;
        }
        var vt = [{ name: "neighbors", type: "mixed" }, { name: "inNeighbors", type: "directed", direction: "in" }, { name: "outNeighbors", type: "directed", direction: "out" }, { name: "inboundNeighbors", type: "mixed", direction: "in" }, { name: "outboundNeighbors", type: "mixed", direction: "out" }, { name: "directedNeighbors", type: "directed" }, { name: "undirectedNeighbors", type: "undirected" }];
        function bt() {
          this.A = null, this.B = null;
        }
        function mt(t2, e2, n2, r2, i2) {
          for (var o2 in r2) {
            var a2 = r2[o2], u2 = a2.source, c2 = a2.target, s2 = u2 === n2 ? c2 : u2;
            if (!e2 || !e2.has(s2.key)) {
              var d2 = i2(s2.key, s2.attributes);
              if (t2 && d2)
                return s2.key;
            }
          }
        }
        function kt(t2, e2, n2, r2, i2) {
          if ("mixed" !== e2) {
            if ("undirected" === e2)
              return mt(t2, null, r2, r2.undirected, i2);
            if ("string" == typeof n2)
              return mt(t2, null, r2, r2[n2], i2);
          }
          var o2, a2 = new bt();
          if ("undirected" !== e2) {
            if ("out" !== n2) {
              if (o2 = mt(t2, null, r2, r2.in, i2), t2 && o2)
                return o2;
              a2.wrap(r2.in);
            }
            if ("in" !== n2) {
              if (o2 = mt(t2, a2, r2, r2.out, i2), t2 && o2)
                return o2;
              a2.wrap(r2.out);
            }
          }
          if ("directed" !== e2 && (o2 = mt(t2, a2, r2, r2.undirected, i2), t2 && o2))
            return o2;
        }
        function _t(t2, e2, n2) {
          var r2 = Object.keys(n2), i2 = r2.length, o2 = 0;
          return new O(function() {
            var a2 = null;
            do {
              if (o2 >= i2)
                return t2 && t2.wrap(n2), { done: true };
              var u2 = n2[r2[o2++]], c2 = u2.source, s2 = u2.target;
              a2 = c2 === e2 ? s2 : c2, t2 && t2.has(a2.key) && (a2 = null);
            } while (null === a2);
            return { done: false, value: { neighbor: a2.key, attributes: a2.attributes } };
          });
        }
        function Gt(t2, e2) {
          var n2 = e2.name, r2 = e2.type, i2 = e2.direction;
          t2.prototype[n2] = function(t3) {
            if ("mixed" !== r2 && "mixed" !== this.type && r2 !== this.type)
              return [];
            t3 = "" + t3;
            var e3 = this._nodes.get(t3);
            if (void 0 === e3)
              throw new I("Graph.".concat(n2, ': could not find the "').concat(t3, '" node in the graph.'));
            return function(t4, e4, n3) {
              if ("mixed" !== t4) {
                if ("undirected" === t4)
                  return Object.keys(n3.undirected);
                if ("string" == typeof e4)
                  return Object.keys(n3[e4]);
              }
              var r3 = [];
              return kt(false, t4, e4, n3, function(t5) {
                r3.push(t5);
              }), r3;
            }("mixed" === r2 ? this.type : r2, i2, e3);
          };
        }
        function xt(t2, e2) {
          var n2 = e2.name, r2 = e2.type, i2 = e2.direction, o2 = n2.slice(0, -1) + "Entries";
          t2.prototype[o2] = function(t3) {
            if ("mixed" !== r2 && "mixed" !== this.type && r2 !== this.type)
              return O.empty();
            t3 = "" + t3;
            var e3 = this._nodes.get(t3);
            if (void 0 === e3)
              throw new I("Graph.".concat(o2, ': could not find the "').concat(t3, '" node in the graph.'));
            return function(t4, e4, n3) {
              if ("mixed" !== t4) {
                if ("undirected" === t4)
                  return _t(null, n3, n3.undirected);
                if ("string" == typeof e4)
                  return _t(null, n3, n3[e4]);
              }
              var r3 = O.empty(), i3 = new bt();
              return "undirected" !== t4 && ("out" !== e4 && (r3 = et(r3, _t(i3, n3, n3.in))), "in" !== e4 && (r3 = et(r3, _t(i3, n3, n3.out)))), "directed" !== t4 && (r3 = et(r3, _t(i3, n3, n3.undirected))), r3;
            }("mixed" === r2 ? this.type : r2, i2, e3);
          };
        }
        function Et(t2, e2, n2, r2, i2) {
          for (var o2, a2, u2, c2, s2, d2, h2, p2 = r2._nodes.values(), f2 = r2.type; true !== (o2 = p2.next()).done; ) {
            var l2 = false;
            if (a2 = o2.value, "undirected" !== f2)
              for (u2 in c2 = a2.out) {
                s2 = c2[u2];
                do {
                  if (d2 = s2.target, l2 = true, h2 = i2(a2.key, d2.key, a2.attributes, d2.attributes, s2.key, s2.attributes, s2.undirected), t2 && h2)
                    return s2;
                  s2 = s2.next;
                } while (s2);
              }
            if ("directed" !== f2) {
              for (u2 in c2 = a2.undirected)
                if (!(e2 && a2.key > u2)) {
                  s2 = c2[u2];
                  do {
                    if ((d2 = s2.target).key !== u2 && (d2 = s2.source), l2 = true, h2 = i2(a2.key, d2.key, a2.attributes, d2.attributes, s2.key, s2.attributes, s2.undirected), t2 && h2)
                      return s2;
                    s2 = s2.next;
                  } while (s2);
                }
            }
            if (n2 && !l2 && (h2 = i2(a2.key, null, a2.attributes, null, null, null, null), t2 && h2))
              return null;
          }
        }
        function At(t2) {
          if (!h(t2))
            throw new F('Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');
          if (!("key" in t2))
            throw new F("Graph.import: serialized node is missing its key.");
          if ("attributes" in t2 && (!h(t2.attributes) || null === t2.attributes))
            throw new F("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.");
        }
        function St(t2) {
          if (!h(t2))
            throw new F('Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');
          if (!("source" in t2))
            throw new F("Graph.import: serialized edge is missing its source.");
          if (!("target" in t2))
            throw new F("Graph.import: serialized edge is missing its target.");
          if ("attributes" in t2 && (!h(t2.attributes) || null === t2.attributes))
            throw new F("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.");
          if ("undirected" in t2 && "boolean" != typeof t2.undirected)
            throw new F("Graph.import: invalid undirectedness information. Undirected should be boolean or omitted.");
        }
        bt.prototype.wrap = function(t2) {
          null === this.A ? this.A = t2 : null === this.B && (this.B = t2);
        }, bt.prototype.has = function(t2) {
          return null !== this.A && t2 in this.A || null !== this.B && t2 in this.B;
        };
        var Dt, Lt = (Dt = 255 & Math.floor(256 * Math.random()), function() {
          return Dt++;
        }), Ut = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]), Nt = /* @__PURE__ */ new Set(["domain", "_events", "_eventsCount", "_maxListeners"]), jt = { allowSelfLoops: true, multi: false, type: "mixed" };
        function Ot(t2, e2, n2) {
          var r2 = new t2.NodeDataClass(e2, n2);
          return t2._nodes.set(e2, r2), t2.emit("nodeAdded", { key: e2, attributes: n2 }), r2;
        }
        function Ct(t2, e2, n2, r2, i2, o2, a2, u2) {
          if (!r2 && "undirected" === t2.type)
            throw new Y("Graph.".concat(e2, ": you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead."));
          if (r2 && "directed" === t2.type)
            throw new Y("Graph.".concat(e2, ": you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead."));
          if (u2 && !h(u2))
            throw new F("Graph.".concat(e2, ': invalid attributes. Expecting an object but got "').concat(u2, '"'));
          if (o2 = "" + o2, a2 = "" + a2, u2 = u2 || {}, !t2.allowSelfLoops && o2 === a2)
            throw new Y("Graph.".concat(e2, ': source & target are the same ("').concat(o2, `"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`));
          var c2 = t2._nodes.get(o2), s2 = t2._nodes.get(a2);
          if (!c2)
            throw new I("Graph.".concat(e2, ': source node "').concat(o2, '" not found.'));
          if (!s2)
            throw new I("Graph.".concat(e2, ': target node "').concat(a2, '" not found.'));
          var d2 = { key: null, undirected: r2, source: o2, target: a2, attributes: u2 };
          if (n2)
            i2 = t2._edgeKeyGenerator();
          else if (i2 = "" + i2, t2._edges.has(i2))
            throw new Y("Graph.".concat(e2, ': the "').concat(i2, '" edge already exists in the graph.'));
          if (!t2.multi && (r2 ? void 0 !== c2.undirected[a2] : void 0 !== c2.out[a2]))
            throw new Y("Graph.".concat(e2, ': an edge linking "').concat(o2, '" to "').concat(a2, `" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`));
          var p2 = new H(r2, i2, c2, s2, u2);
          t2._edges.set(i2, p2);
          var f2 = o2 === a2;
          return r2 ? (c2.undirectedDegree++, s2.undirectedDegree++, f2 && t2._undirectedSelfLoopCount++) : (c2.outDegree++, s2.inDegree++, f2 && t2._directedSelfLoopCount++), t2.multi ? p2.attachMulti() : p2.attach(), r2 ? t2._undirectedSize++ : t2._directedSize++, d2.key = i2, t2.emit("edgeAdded", d2), i2;
        }
        function zt(t2, e2, n2, r2, i2, o2, a2, u2, s2) {
          if (!r2 && "undirected" === t2.type)
            throw new Y("Graph.".concat(e2, ": you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead."));
          if (r2 && "directed" === t2.type)
            throw new Y("Graph.".concat(e2, ": you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead."));
          if (u2) {
            if (s2) {
              if ("function" != typeof u2)
                throw new F("Graph.".concat(e2, ': invalid updater function. Expecting a function but got "').concat(u2, '"'));
            } else if (!h(u2))
              throw new F("Graph.".concat(e2, ': invalid attributes. Expecting an object but got "').concat(u2, '"'));
          }
          var d2;
          if (o2 = "" + o2, a2 = "" + a2, s2 && (d2 = u2, u2 = void 0), !t2.allowSelfLoops && o2 === a2)
            throw new Y("Graph.".concat(e2, ': source & target are the same ("').concat(o2, `"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`));
          var p2, f2, l2 = t2._nodes.get(o2), g2 = t2._nodes.get(a2);
          if (!n2 && (p2 = t2._edges.get(i2))) {
            if (!(p2.source.key === o2 && p2.target.key === a2 || r2 && p2.source.key === a2 && p2.target.key === o2))
              throw new Y("Graph.".concat(e2, ': inconsistency detected when attempting to merge the "').concat(i2, '" edge with "').concat(o2, '" source & "').concat(a2, '" target vs. ("').concat(p2.source.key, '", "').concat(p2.target.key, '").'));
            f2 = p2;
          }
          if (f2 || t2.multi || !l2 || (f2 = r2 ? l2.undirected[a2] : l2.out[a2]), f2) {
            var y2 = [f2.key, false, false, false];
            if (s2 ? !d2 : !u2)
              return y2;
            if (s2) {
              var w2 = f2.attributes;
              f2.attributes = d2(w2), t2.emit("edgeAttributesUpdated", { type: "replace", key: f2.key, attributes: f2.attributes });
            } else
              c(f2.attributes, u2), t2.emit("edgeAttributesUpdated", { type: "merge", key: f2.key, attributes: f2.attributes, data: u2 });
            return y2;
          }
          u2 = u2 || {}, s2 && d2 && (u2 = d2(u2));
          var v2 = { key: null, undirected: r2, source: o2, target: a2, attributes: u2 };
          if (n2)
            i2 = t2._edgeKeyGenerator();
          else if (i2 = "" + i2, t2._edges.has(i2))
            throw new Y("Graph.".concat(e2, ': the "').concat(i2, '" edge already exists in the graph.'));
          var b2 = false, m2 = false;
          l2 || (l2 = Ot(t2, o2, {}), b2 = true, o2 === a2 && (g2 = l2, m2 = true)), g2 || (g2 = Ot(t2, a2, {}), m2 = true), p2 = new H(r2, i2, l2, g2, u2), t2._edges.set(i2, p2);
          var k2 = o2 === a2;
          return r2 ? (l2.undirectedDegree++, g2.undirectedDegree++, k2 && t2._undirectedSelfLoopCount++) : (l2.outDegree++, g2.inDegree++, k2 && t2._directedSelfLoopCount++), t2.multi ? p2.attachMulti() : p2.attach(), r2 ? t2._undirectedSize++ : t2._directedSize++, v2.key = i2, t2.emit("edgeAdded", v2), [i2, true, b2, m2];
        }
        function Mt(t2, e2) {
          t2._edges.delete(e2.key);
          var n2 = e2.source, r2 = e2.target, i2 = e2.attributes, o2 = e2.undirected, a2 = n2 === r2;
          o2 ? (n2.undirectedDegree--, r2.undirectedDegree--, a2 && t2._undirectedSelfLoopCount--) : (n2.outDegree--, r2.inDegree--, a2 && t2._directedSelfLoopCount--), t2.multi ? e2.detachMulti() : e2.detach(), o2 ? t2._undirectedSize-- : t2._directedSize--, t2.emit("edgeDropped", { key: e2.key, attributes: i2, source: n2.key, target: r2.key, undirected: o2 });
        }
        var Wt = function(n2) {
          function r2(t2) {
            var e2;
            if (e2 = n2.call(this) || this, "boolean" != typeof (t2 = c({}, jt, t2)).multi)
              throw new F(`Graph.constructor: invalid 'multi' option. Expecting a boolean but got "`.concat(t2.multi, '".'));
            if (!Ut.has(t2.type))
              throw new F(`Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "`.concat(t2.type, '".'));
            if ("boolean" != typeof t2.allowSelfLoops)
              throw new F(`Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "`.concat(t2.allowSelfLoops, '".'));
            var r3 = "mixed" === t2.type ? q : "directed" === t2.type ? J : V;
            f(u(e2), "NodeDataClass", r3);
            var i3 = "geid_" + Lt() + "_", o2 = 0;
            return f(u(e2), "_attributes", {}), f(u(e2), "_nodes", /* @__PURE__ */ new Map()), f(u(e2), "_edges", /* @__PURE__ */ new Map()), f(u(e2), "_directedSize", 0), f(u(e2), "_undirectedSize", 0), f(u(e2), "_directedSelfLoopCount", 0), f(u(e2), "_undirectedSelfLoopCount", 0), f(u(e2), "_edgeKeyGenerator", function() {
              var t3;
              do {
                t3 = i3 + o2++;
              } while (e2._edges.has(t3));
              return t3;
            }), f(u(e2), "_options", t2), Nt.forEach(function(t3) {
              return f(u(e2), t3, e2[t3]);
            }), l(u(e2), "order", function() {
              return e2._nodes.size;
            }), l(u(e2), "size", function() {
              return e2._edges.size;
            }), l(u(e2), "directedSize", function() {
              return e2._directedSize;
            }), l(u(e2), "undirectedSize", function() {
              return e2._undirectedSize;
            }), l(u(e2), "selfLoopCount", function() {
              return e2._directedSelfLoopCount + e2._undirectedSelfLoopCount;
            }), l(u(e2), "directedSelfLoopCount", function() {
              return e2._directedSelfLoopCount;
            }), l(u(e2), "undirectedSelfLoopCount", function() {
              return e2._undirectedSelfLoopCount;
            }), l(u(e2), "multi", e2._options.multi), l(u(e2), "type", e2._options.type), l(u(e2), "allowSelfLoops", e2._options.allowSelfLoops), l(u(e2), "implementation", function() {
              return "graphology";
            }), e2;
          }
          e(r2, n2);
          var i2 = r2.prototype;
          return i2._resetInstanceCounters = function() {
            this._directedSize = 0, this._undirectedSize = 0, this._directedSelfLoopCount = 0, this._undirectedSelfLoopCount = 0;
          }, i2.hasNode = function(t2) {
            return this._nodes.has("" + t2);
          }, i2.hasDirectedEdge = function(t2, e2) {
            if ("undirected" === this.type)
              return false;
            if (1 === arguments.length) {
              var n3 = "" + t2, r3 = this._edges.get(n3);
              return !!r3 && !r3.undirected;
            }
            if (2 === arguments.length) {
              t2 = "" + t2, e2 = "" + e2;
              var i3 = this._nodes.get(t2);
              if (!i3)
                return false;
              var o2 = i3.out[e2];
              return !!o2 && (!this.multi || !!o2.size);
            }
            throw new F("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length, ", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."));
          }, i2.hasUndirectedEdge = function(t2, e2) {
            if ("directed" === this.type)
              return false;
            if (1 === arguments.length) {
              var n3 = "" + t2, r3 = this._edges.get(n3);
              return !!r3 && r3.undirected;
            }
            if (2 === arguments.length) {
              t2 = "" + t2, e2 = "" + e2;
              var i3 = this._nodes.get(t2);
              if (!i3)
                return false;
              var o2 = i3.undirected[e2];
              return !!o2 && (!this.multi || !!o2.size);
            }
            throw new F("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length, ", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."));
          }, i2.hasEdge = function(t2, e2) {
            if (1 === arguments.length) {
              var n3 = "" + t2;
              return this._edges.has(n3);
            }
            if (2 === arguments.length) {
              t2 = "" + t2, e2 = "" + e2;
              var r3 = this._nodes.get(t2);
              if (!r3)
                return false;
              var i3 = void 0 !== r3.out && r3.out[e2];
              return i3 || (i3 = void 0 !== r3.undirected && r3.undirected[e2]), !!i3 && (!this.multi || !!i3.size);
            }
            throw new F("Graph.hasEdge: invalid arity (".concat(arguments.length, ", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."));
          }, i2.directedEdge = function(t2, e2) {
            if ("undirected" !== this.type) {
              if (t2 = "" + t2, e2 = "" + e2, this.multi)
                throw new Y("Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.");
              var n3 = this._nodes.get(t2);
              if (!n3)
                throw new I('Graph.directedEdge: could not find the "'.concat(t2, '" source node in the graph.'));
              if (!this._nodes.has(e2))
                throw new I('Graph.directedEdge: could not find the "'.concat(e2, '" target node in the graph.'));
              var r3 = n3.out && n3.out[e2] || void 0;
              return r3 ? r3.key : void 0;
            }
          }, i2.undirectedEdge = function(t2, e2) {
            if ("directed" !== this.type) {
              if (t2 = "" + t2, e2 = "" + e2, this.multi)
                throw new Y("Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.");
              var n3 = this._nodes.get(t2);
              if (!n3)
                throw new I('Graph.undirectedEdge: could not find the "'.concat(t2, '" source node in the graph.'));
              if (!this._nodes.has(e2))
                throw new I('Graph.undirectedEdge: could not find the "'.concat(e2, '" target node in the graph.'));
              var r3 = n3.undirected && n3.undirected[e2] || void 0;
              return r3 ? r3.key : void 0;
            }
          }, i2.edge = function(t2, e2) {
            if (this.multi)
              throw new Y("Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.");
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.edge: could not find the "'.concat(t2, '" source node in the graph.'));
            if (!this._nodes.has(e2))
              throw new I('Graph.edge: could not find the "'.concat(e2, '" target node in the graph.'));
            var r3 = n3.out && n3.out[e2] || n3.undirected && n3.undirected[e2] || void 0;
            if (r3)
              return r3.key;
          }, i2.areDirectedNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areDirectedNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && (e2 in n3.in || e2 in n3.out);
          }, i2.areOutNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areOutNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && e2 in n3.out;
          }, i2.areInNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areInNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && e2 in n3.in;
          }, i2.areUndirectedNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areUndirectedNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "directed" !== this.type && e2 in n3.undirected;
          }, i2.areNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && (e2 in n3.in || e2 in n3.out) || "directed" !== this.type && e2 in n3.undirected;
          }, i2.areInboundNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areInboundNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && e2 in n3.in || "directed" !== this.type && e2 in n3.undirected;
          }, i2.areOutboundNeighbors = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.areOutboundNeighbors: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" !== this.type && e2 in n3.out || "directed" !== this.type && e2 in n3.undirected;
          }, i2.inDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.inDegree: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" === this.type ? 0 : e2.inDegree;
          }, i2.outDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.outDegree: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" === this.type ? 0 : e2.outDegree;
          }, i2.directedDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.directedDegree: could not find the "'.concat(t2, '" node in the graph.'));
            return "undirected" === this.type ? 0 : e2.inDegree + e2.outDegree;
          }, i2.undirectedDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.undirectedDegree: could not find the "'.concat(t2, '" node in the graph.'));
            return "directed" === this.type ? 0 : e2.undirectedDegree;
          }, i2.inboundDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.inboundDegree: could not find the "'.concat(t2, '" node in the graph.'));
            var n3 = 0;
            return "directed" !== this.type && (n3 += e2.undirectedDegree), "undirected" !== this.type && (n3 += e2.inDegree), n3;
          }, i2.outboundDegree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.outboundDegree: could not find the "'.concat(t2, '" node in the graph.'));
            var n3 = 0;
            return "directed" !== this.type && (n3 += e2.undirectedDegree), "undirected" !== this.type && (n3 += e2.outDegree), n3;
          }, i2.degree = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.degree: could not find the "'.concat(t2, '" node in the graph.'));
            var n3 = 0;
            return "directed" !== this.type && (n3 += e2.undirectedDegree), "undirected" !== this.type && (n3 += e2.inDegree + e2.outDegree), n3;
          }, i2.inDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.inDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            if ("undirected" === this.type)
              return 0;
            var n3 = e2.in[t2], r3 = n3 ? this.multi ? n3.size : 1 : 0;
            return e2.inDegree - r3;
          }, i2.outDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.outDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            if ("undirected" === this.type)
              return 0;
            var n3 = e2.out[t2], r3 = n3 ? this.multi ? n3.size : 1 : 0;
            return e2.outDegree - r3;
          }, i2.directedDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.directedDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            if ("undirected" === this.type)
              return 0;
            var n3 = e2.out[t2], r3 = n3 ? this.multi ? n3.size : 1 : 0;
            return e2.inDegree + e2.outDegree - 2 * r3;
          }, i2.undirectedDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2 = this._nodes.get(t2);
            if (!e2)
              throw new I('Graph.undirectedDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            if ("directed" === this.type)
              return 0;
            var n3 = e2.undirected[t2], r3 = n3 ? this.multi ? n3.size : 1 : 0;
            return e2.undirectedDegree - 2 * r3;
          }, i2.inboundDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2, n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.inboundDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            var r3 = 0, i3 = 0;
            return "directed" !== this.type && (r3 += n3.undirectedDegree, i3 += 2 * ((e2 = n3.undirected[t2]) ? this.multi ? e2.size : 1 : 0)), "undirected" !== this.type && (r3 += n3.inDegree, i3 += (e2 = n3.out[t2]) ? this.multi ? e2.size : 1 : 0), r3 - i3;
          }, i2.outboundDegreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2, n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.outboundDegreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            var r3 = 0, i3 = 0;
            return "directed" !== this.type && (r3 += n3.undirectedDegree, i3 += 2 * ((e2 = n3.undirected[t2]) ? this.multi ? e2.size : 1 : 0)), "undirected" !== this.type && (r3 += n3.outDegree, i3 += (e2 = n3.in[t2]) ? this.multi ? e2.size : 1 : 0), r3 - i3;
          }, i2.degreeWithoutSelfLoops = function(t2) {
            t2 = "" + t2;
            var e2, n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.degreeWithoutSelfLoops: could not find the "'.concat(t2, '" node in the graph.'));
            var r3 = 0, i3 = 0;
            return "directed" !== this.type && (r3 += n3.undirectedDegree, i3 += 2 * ((e2 = n3.undirected[t2]) ? this.multi ? e2.size : 1 : 0)), "undirected" !== this.type && (r3 += n3.inDegree + n3.outDegree, i3 += 2 * ((e2 = n3.out[t2]) ? this.multi ? e2.size : 1 : 0)), r3 - i3;
          }, i2.source = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.source: could not find the "'.concat(t2, '" edge in the graph.'));
            return e2.source.key;
          }, i2.target = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.target: could not find the "'.concat(t2, '" edge in the graph.'));
            return e2.target.key;
          }, i2.extremities = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.extremities: could not find the "'.concat(t2, '" edge in the graph.'));
            return [e2.source.key, e2.target.key];
          }, i2.opposite = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._edges.get(e2);
            if (!n3)
              throw new I('Graph.opposite: could not find the "'.concat(e2, '" edge in the graph.'));
            var r3 = n3.source.key, i3 = n3.target.key;
            if (t2 === r3)
              return i3;
            if (t2 === i3)
              return r3;
            throw new I('Graph.opposite: the "'.concat(t2, '" node is not attached to the "').concat(e2, '" edge (').concat(r3, ", ").concat(i3, ")."));
          }, i2.hasExtremity = function(t2, e2) {
            t2 = "" + t2, e2 = "" + e2;
            var n3 = this._edges.get(t2);
            if (!n3)
              throw new I('Graph.hasExtremity: could not find the "'.concat(t2, '" edge in the graph.'));
            return n3.source.key === e2 || n3.target.key === e2;
          }, i2.isUndirected = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.isUndirected: could not find the "'.concat(t2, '" edge in the graph.'));
            return e2.undirected;
          }, i2.isDirected = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.isDirected: could not find the "'.concat(t2, '" edge in the graph.'));
            return !e2.undirected;
          }, i2.isSelfLoop = function(t2) {
            t2 = "" + t2;
            var e2 = this._edges.get(t2);
            if (!e2)
              throw new I('Graph.isSelfLoop: could not find the "'.concat(t2, '" edge in the graph.'));
            return e2.source === e2.target;
          }, i2.addNode = function(t2, e2) {
            var n3 = function(t3, e3, n4) {
              if (n4 && !h(n4))
                throw new F('Graph.addNode: invalid attributes. Expecting an object but got "'.concat(n4, '"'));
              if (e3 = "" + e3, n4 = n4 || {}, t3._nodes.has(e3))
                throw new Y('Graph.addNode: the "'.concat(e3, '" node already exist in the graph.'));
              var r3 = new t3.NodeDataClass(e3, n4);
              return t3._nodes.set(e3, r3), t3.emit("nodeAdded", { key: e3, attributes: n4 }), r3;
            }(this, t2, e2);
            return n3.key;
          }, i2.mergeNode = function(t2, e2) {
            if (e2 && !h(e2))
              throw new F('Graph.mergeNode: invalid attributes. Expecting an object but got "'.concat(e2, '"'));
            t2 = "" + t2, e2 = e2 || {};
            var n3 = this._nodes.get(t2);
            return n3 ? (e2 && (c(n3.attributes, e2), this.emit("nodeAttributesUpdated", { type: "merge", key: t2, attributes: n3.attributes, data: e2 })), [t2, false]) : (n3 = new this.NodeDataClass(t2, e2), this._nodes.set(t2, n3), this.emit("nodeAdded", { key: t2, attributes: e2 }), [t2, true]);
          }, i2.updateNode = function(t2, e2) {
            if (e2 && "function" != typeof e2)
              throw new F('Graph.updateNode: invalid updater function. Expecting a function but got "'.concat(e2, '"'));
            t2 = "" + t2;
            var n3 = this._nodes.get(t2);
            if (n3) {
              if (e2) {
                var r3 = n3.attributes;
                n3.attributes = e2(r3), this.emit("nodeAttributesUpdated", { type: "replace", key: t2, attributes: n3.attributes });
              }
              return [t2, false];
            }
            var i3 = e2 ? e2({}) : {};
            return n3 = new this.NodeDataClass(t2, i3), this._nodes.set(t2, n3), this.emit("nodeAdded", { key: t2, attributes: i3 }), [t2, true];
          }, i2.dropNode = function(t2) {
            t2 = "" + t2;
            var e2, n3 = this._nodes.get(t2);
            if (!n3)
              throw new I('Graph.dropNode: could not find the "'.concat(t2, '" node in the graph.'));
            if ("undirected" !== this.type) {
              for (var r3 in n3.out) {
                e2 = n3.out[r3];
                do {
                  Mt(this, e2), e2 = e2.next;
                } while (e2);
              }
              for (var i3 in n3.in) {
                e2 = n3.in[i3];
                do {
                  Mt(this, e2), e2 = e2.next;
                } while (e2);
              }
            }
            if ("directed" !== this.type)
              for (var o2 in n3.undirected) {
                e2 = n3.undirected[o2];
                do {
                  Mt(this, e2), e2 = e2.next;
                } while (e2);
              }
            this._nodes.delete(t2), this.emit("nodeDropped", { key: t2, attributes: n3.attributes });
          }, i2.dropEdge = function(t2) {
            var e2;
            if (arguments.length > 1) {
              var n3 = "" + arguments[0], r3 = "" + arguments[1];
              if (!(e2 = s(this, n3, r3, this.type)))
                throw new I('Graph.dropEdge: could not find the "'.concat(n3, '" -> "').concat(r3, '" edge in the graph.'));
            } else if (t2 = "" + t2, !(e2 = this._edges.get(t2)))
              throw new I('Graph.dropEdge: could not find the "'.concat(t2, '" edge in the graph.'));
            return Mt(this, e2), this;
          }, i2.dropDirectedEdge = function(t2, e2) {
            if (arguments.length < 2)
              throw new Y("Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");
            if (this.multi)
              throw new Y("Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");
            var n3 = s(this, t2 = "" + t2, e2 = "" + e2, "directed");
            if (!n3)
              throw new I('Graph.dropDirectedEdge: could not find a "'.concat(t2, '" -> "').concat(e2, '" edge in the graph.'));
            return Mt(this, n3), this;
          }, i2.dropUndirectedEdge = function(t2, e2) {
            if (arguments.length < 2)
              throw new Y("Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");
            if (this.multi)
              throw new Y("Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");
            var n3 = s(this, t2, e2, "undirected");
            if (!n3)
              throw new I('Graph.dropUndirectedEdge: could not find a "'.concat(t2, '" -> "').concat(e2, '" edge in the graph.'));
            return Mt(this, n3), this;
          }, i2.clear = function() {
            this._edges.clear(), this._nodes.clear(), this._resetInstanceCounters(), this.emit("cleared");
          }, i2.clearEdges = function() {
            for (var t2, e2 = this._nodes.values(); true !== (t2 = e2.next()).done; )
              t2.value.clear();
            this._edges.clear(), this._resetInstanceCounters(), this.emit("edgesCleared");
          }, i2.getAttribute = function(t2) {
            return this._attributes[t2];
          }, i2.getAttributes = function() {
            return this._attributes;
          }, i2.hasAttribute = function(t2) {
            return this._attributes.hasOwnProperty(t2);
          }, i2.setAttribute = function(t2, e2) {
            return this._attributes[t2] = e2, this.emit("attributesUpdated", { type: "set", attributes: this._attributes, name: t2 }), this;
          }, i2.updateAttribute = function(t2, e2) {
            if ("function" != typeof e2)
              throw new F("Graph.updateAttribute: updater should be a function.");
            var n3 = this._attributes[t2];
            return this._attributes[t2] = e2(n3), this.emit("attributesUpdated", { type: "set", attributes: this._attributes, name: t2 }), this;
          }, i2.removeAttribute = function(t2) {
            return delete this._attributes[t2], this.emit("attributesUpdated", { type: "remove", attributes: this._attributes, name: t2 }), this;
          }, i2.replaceAttributes = function(t2) {
            if (!h(t2))
              throw new F("Graph.replaceAttributes: provided attributes are not a plain object.");
            return this._attributes = t2, this.emit("attributesUpdated", { type: "replace", attributes: this._attributes }), this;
          }, i2.mergeAttributes = function(t2) {
            if (!h(t2))
              throw new F("Graph.mergeAttributes: provided attributes are not a plain object.");
            return c(this._attributes, t2), this.emit("attributesUpdated", { type: "merge", attributes: this._attributes, data: t2 }), this;
          }, i2.updateAttributes = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.updateAttributes: provided updater is not a function.");
            return this._attributes = t2(this._attributes), this.emit("attributesUpdated", { type: "update", attributes: this._attributes }), this;
          }, i2.updateEachNodeAttributes = function(t2, e2) {
            if ("function" != typeof t2)
              throw new F("Graph.updateEachNodeAttributes: expecting an updater function.");
            if (e2 && !g(e2))
              throw new F("Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");
            for (var n3, r3, i3 = this._nodes.values(); true !== (n3 = i3.next()).done; )
              (r3 = n3.value).attributes = t2(r3.key, r3.attributes);
            this.emit("eachNodeAttributesUpdated", { hints: e2 || null });
          }, i2.updateEachEdgeAttributes = function(t2, e2) {
            if ("function" != typeof t2)
              throw new F("Graph.updateEachEdgeAttributes: expecting an updater function.");
            if (e2 && !g(e2))
              throw new F("Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");
            for (var n3, r3, i3, o2, a2 = this._edges.values(); true !== (n3 = a2.next()).done; )
              i3 = (r3 = n3.value).source, o2 = r3.target, r3.attributes = t2(r3.key, r3.attributes, i3.key, o2.key, i3.attributes, o2.attributes, r3.undirected);
            this.emit("eachEdgeAttributesUpdated", { hints: e2 || null });
          }, i2.forEachAdjacencyEntry = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.forEachAdjacencyEntry: expecting a callback.");
            Et(false, false, false, this, t2);
          }, i2.forEachAdjacencyEntryWithOrphans = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.forEachAdjacencyEntryWithOrphans: expecting a callback.");
            Et(false, false, true, this, t2);
          }, i2.forEachAssymetricAdjacencyEntry = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.forEachAssymetricAdjacencyEntry: expecting a callback.");
            Et(false, true, false, this, t2);
          }, i2.forEachAssymetricAdjacencyEntryWithOrphans = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback.");
            Et(false, true, true, this, t2);
          }, i2.nodes = function() {
            return "function" == typeof Array.from ? Array.from(this._nodes.keys()) : T(this._nodes.keys(), this._nodes.size);
          }, i2.forEachNode = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.forEachNode: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(); true !== (e2 = r3.next()).done; )
              t2((n3 = e2.value).key, n3.attributes);
          }, i2.findNode = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.findNode: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(); true !== (e2 = r3.next()).done; )
              if (t2((n3 = e2.value).key, n3.attributes))
                return n3.key;
          }, i2.mapNodes = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.mapNode: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(), i3 = new Array(this.order), o2 = 0; true !== (e2 = r3.next()).done; )
              n3 = e2.value, i3[o2++] = t2(n3.key, n3.attributes);
            return i3;
          }, i2.someNode = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.someNode: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(); true !== (e2 = r3.next()).done; )
              if (t2((n3 = e2.value).key, n3.attributes))
                return true;
            return false;
          }, i2.everyNode = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.everyNode: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(); true !== (e2 = r3.next()).done; )
              if (!t2((n3 = e2.value).key, n3.attributes))
                return false;
            return true;
          }, i2.filterNodes = function(t2) {
            if ("function" != typeof t2)
              throw new F("Graph.filterNodes: expecting a callback.");
            for (var e2, n3, r3 = this._nodes.values(), i3 = []; true !== (e2 = r3.next()).done; )
              t2((n3 = e2.value).key, n3.attributes) && i3.push(n3.key);
            return i3;
          }, i2.reduceNodes = function(t2, e2) {
            if ("function" != typeof t2)
              throw new F("Graph.reduceNodes: expecting a callback.");
            if (arguments.length < 2)
              throw new F("Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.");
            for (var n3, r3, i3 = e2, o2 = this._nodes.values(); true !== (n3 = o2.next()).done; )
              i3 = t2(i3, (r3 = n3.value).key, r3.attributes);
            return i3;
          }, i2.nodeEntries = function() {
            var t2 = this._nodes.values();
            return new O(function() {
              var e2 = t2.next();
              if (e2.done)
                return e2;
              var n3 = e2.value;
              return { value: { node: n3.key, attributes: n3.attributes }, done: false };
            });
          }, i2.export = function() {
            var t2 = new Array(this._nodes.size), e2 = 0;
            this._nodes.forEach(function(n4, r3) {
              t2[e2++] = function(t3, e3) {
                var n5 = { key: t3 };
                return p(e3.attributes) || (n5.attributes = c({}, e3.attributes)), n5;
              }(r3, n4);
            });
            var n3 = new Array(this._edges.size);
            return e2 = 0, this._edges.forEach(function(t3, r3) {
              n3[e2++] = function(t4, e3) {
                var n4 = { key: t4, source: e3.source.key, target: e3.target.key };
                return p(e3.attributes) || (n4.attributes = c({}, e3.attributes)), e3.undirected && (n4.undirected = true), n4;
              }(r3, t3);
            }), { options: { type: this.type, multi: this.multi, allowSelfLoops: this.allowSelfLoops }, attributes: this.getAttributes(), nodes: t2, edges: n3 };
          }, i2.import = function(t2) {
            var e2, n3, r3, i3, o2, a2 = this, u2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (d(t2))
              return t2.forEachNode(function(t3, e3) {
                u2 ? a2.mergeNode(t3, e3) : a2.addNode(t3, e3);
              }), t2.forEachEdge(function(t3, e3, n4, r4, i4, o3, c3) {
                u2 ? c3 ? a2.mergeUndirectedEdgeWithKey(t3, n4, r4, e3) : a2.mergeDirectedEdgeWithKey(t3, n4, r4, e3) : c3 ? a2.addUndirectedEdgeWithKey(t3, n4, r4, e3) : a2.addDirectedEdgeWithKey(t3, n4, r4, e3);
              }), this;
            if (!h(t2))
              throw new F("Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.");
            if (t2.attributes) {
              if (!h(t2.attributes))
                throw new F("Graph.import: invalid attributes. Expecting a plain object.");
              u2 ? this.mergeAttributes(t2.attributes) : this.replaceAttributes(t2.attributes);
            }
            if (t2.nodes) {
              if (r3 = t2.nodes, !Array.isArray(r3))
                throw new F("Graph.import: invalid nodes. Expecting an array.");
              for (e2 = 0, n3 = r3.length; e2 < n3; e2++) {
                At(i3 = r3[e2]);
                var c2 = i3, s2 = c2.key, p2 = c2.attributes;
                u2 ? this.mergeNode(s2, p2) : this.addNode(s2, p2);
              }
            }
            if (t2.edges) {
              if (r3 = t2.edges, !Array.isArray(r3))
                throw new F("Graph.import: invalid edges. Expecting an array.");
              for (e2 = 0, n3 = r3.length; e2 < n3; e2++) {
                St(o2 = r3[e2]);
                var f2 = o2, l2 = f2.source, g2 = f2.target, y2 = f2.attributes, w2 = f2.undirected, v2 = void 0 !== w2 && w2;
                "key" in o2 ? (u2 ? v2 ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : v2 ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey).call(this, o2.key, l2, g2, y2) : (u2 ? v2 ? this.mergeUndirectedEdge : this.mergeDirectedEdge : v2 ? this.addUndirectedEdge : this.addDirectedEdge).call(this, l2, g2, y2);
              }
            }
            return this;
          }, i2.nullCopy = function(t2) {
            var e2 = new r2(c({}, this._options, t2));
            return e2.replaceAttributes(c({}, this.getAttributes())), e2;
          }, i2.emptyCopy = function(t2) {
            var e2 = this.nullCopy(t2);
            return this._nodes.forEach(function(t3, n3) {
              var r3 = c({}, t3.attributes);
              t3 = new e2.NodeDataClass(n3, r3), e2._nodes.set(n3, t3);
            }), e2;
          }, i2.copy = function(t2) {
            if ("string" == typeof (t2 = t2 || {}).type && t2.type !== this.type && "mixed" !== t2.type)
              throw new Y('Graph.copy: cannot create an incompatible copy from "'.concat(this.type, '" type to "').concat(t2.type, '" because this would mean losing information about the current graph.'));
            if ("boolean" == typeof t2.multi && t2.multi !== this.multi && true !== t2.multi)
              throw new Y("Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph.");
            if ("boolean" == typeof t2.allowSelfLoops && t2.allowSelfLoops !== this.allowSelfLoops && true !== t2.allowSelfLoops)
              throw new Y("Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph.");
            for (var e2, n3, r3 = this.emptyCopy(t2), i3 = this._edges.values(); true !== (e2 = i3.next()).done; )
              Ct(r3, "copy", false, (n3 = e2.value).undirected, n3.key, n3.source.key, n3.target.key, c({}, n3.attributes));
            return r3;
          }, i2.toJSON = function() {
            return this.export();
          }, i2.toString = function() {
            return "[object Graph]";
          }, i2.inspect = function() {
            var e2 = this, n3 = {};
            this._nodes.forEach(function(t2, e3) {
              n3[e3] = t2.attributes;
            });
            var r3 = {}, i3 = {};
            this._edges.forEach(function(t2, n4) {
              var o3, a3 = t2.undirected ? "--" : "->", u2 = "", c2 = t2.source.key, s2 = t2.target.key;
              t2.undirected && c2 > s2 && (o3 = c2, c2 = s2, s2 = o3);
              var d2 = "(".concat(c2, ")").concat(a3, "(").concat(s2, ")");
              n4.startsWith("geid_") ? e2.multi && (void 0 === i3[d2] ? i3[d2] = 0 : i3[d2]++, u2 += "".concat(i3[d2], ". ")) : u2 += "[".concat(n4, "]: "), r3[u2 += d2] = t2.attributes;
            });
            var o2 = {};
            for (var a2 in this)
              this.hasOwnProperty(a2) && !Nt.has(a2) && "function" != typeof this[a2] && "symbol" !== t(a2) && (o2[a2] = this[a2]);
            return o2.attributes = this._attributes, o2.nodes = n3, o2.edges = r3, f(o2, "constructor", this.constructor), o2;
          }, r2;
        }(w.exports.EventEmitter);
        "undefined" != typeof Symbol && (Wt.prototype[Symbol.for("nodejs.util.inspect.custom")] = Wt.prototype.inspect), [{ name: function(t2) {
          return "".concat(t2, "Edge");
        }, generateKey: true }, { name: function(t2) {
          return "".concat(t2, "DirectedEdge");
        }, generateKey: true, type: "directed" }, { name: function(t2) {
          return "".concat(t2, "UndirectedEdge");
        }, generateKey: true, type: "undirected" }, { name: function(t2) {
          return "".concat(t2, "EdgeWithKey");
        } }, { name: function(t2) {
          return "".concat(t2, "DirectedEdgeWithKey");
        }, type: "directed" }, { name: function(t2) {
          return "".concat(t2, "UndirectedEdgeWithKey");
        }, type: "undirected" }].forEach(function(t2) {
          ["add", "merge", "update"].forEach(function(e2) {
            var n2 = t2.name(e2), r2 = "add" === e2 ? Ct : zt;
            t2.generateKey ? Wt.prototype[n2] = function(i2, o2, a2) {
              return r2(this, n2, true, "undirected" === (t2.type || this.type), null, i2, o2, a2, "update" === e2);
            } : Wt.prototype[n2] = function(i2, o2, a2, u2) {
              return r2(this, n2, false, "undirected" === (t2.type || this.type), i2, o2, a2, u2, "update" === e2);
            };
          });
        }), function(t2) {
          X.forEach(function(e2) {
            var n2 = e2.name, r2 = e2.attacher;
            r2(t2, n2("Node"), 0), r2(t2, n2("Source"), 1), r2(t2, n2("Target"), 2), r2(t2, n2("Opposite"), 3);
          });
        }(Wt), function(t2) {
          Z.forEach(function(e2) {
            var n2 = e2.name, r2 = e2.attacher;
            r2(t2, n2("Edge"), "mixed"), r2(t2, n2("DirectedEdge"), "directed"), r2(t2, n2("UndirectedEdge"), "undirected");
          });
        }(Wt), function(t2) {
          nt.forEach(function(e2) {
            !function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction;
              t3.prototype[n2] = function(t4, e4) {
                if ("mixed" !== r2 && "mixed" !== this.type && r2 !== this.type)
                  return [];
                if (!arguments.length)
                  return st(this, r2);
                if (1 === arguments.length) {
                  t4 = "" + t4;
                  var o2 = this._nodes.get(t4);
                  if (void 0 === o2)
                    throw new I("Graph.".concat(n2, ': could not find the "').concat(t4, '" node in the graph.'));
                  return ft(this.multi, "mixed" === r2 ? this.type : r2, i2, o2);
                }
                if (2 === arguments.length) {
                  t4 = "" + t4, e4 = "" + e4;
                  var a2 = this._nodes.get(t4);
                  if (!a2)
                    throw new I("Graph.".concat(n2, ':  could not find the "').concat(t4, '" source node in the graph.'));
                  if (!this._nodes.has(e4))
                    throw new I("Graph.".concat(n2, ':  could not find the "').concat(e4, '" target node in the graph.'));
                  return yt(r2, this.multi, i2, a2, e4);
                }
                throw new F("Graph.".concat(n2, ": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length, ")."));
              };
            }(t2, e2), function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction, o2 = "forEach" + n2[0].toUpperCase() + n2.slice(1, -1);
              t3.prototype[o2] = function(t4, e4, n3) {
                if ("mixed" === r2 || "mixed" === this.type || r2 === this.type) {
                  if (1 === arguments.length)
                    return dt(false, this, r2, n3 = t4);
                  if (2 === arguments.length) {
                    t4 = "" + t4, n3 = e4;
                    var a3 = this._nodes.get(t4);
                    if (void 0 === a3)
                      throw new I("Graph.".concat(o2, ': could not find the "').concat(t4, '" node in the graph.'));
                    return pt(false, this.multi, "mixed" === r2 ? this.type : r2, i2, a3, n3);
                  }
                  if (3 === arguments.length) {
                    t4 = "" + t4, e4 = "" + e4;
                    var u3 = this._nodes.get(t4);
                    if (!u3)
                      throw new I("Graph.".concat(o2, ':  could not find the "').concat(t4, '" source node in the graph.'));
                    if (!this._nodes.has(e4))
                      throw new I("Graph.".concat(o2, ':  could not find the "').concat(e4, '" target node in the graph.'));
                    return gt(false, r2, this.multi, i2, u3, e4, n3);
                  }
                  throw new F("Graph.".concat(o2, ": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length, ")."));
                }
              };
              var a2 = "map" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[a2] = function() {
                var t4, e4 = Array.prototype.slice.call(arguments), n3 = e4.pop();
                if (0 === e4.length) {
                  var i3 = 0;
                  "directed" !== r2 && (i3 += this.undirectedSize), "undirected" !== r2 && (i3 += this.directedSize), t4 = new Array(i3);
                  var a3 = 0;
                  e4.push(function(e5, r3, i4, o3, u3, c3, s2) {
                    t4[a3++] = n3(e5, r3, i4, o3, u3, c3, s2);
                  });
                } else
                  t4 = [], e4.push(function(e5, r3, i4, o3, a4, u3, c3) {
                    t4.push(n3(e5, r3, i4, o3, a4, u3, c3));
                  });
                return this[o2].apply(this, e4), t4;
              };
              var u2 = "filter" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[u2] = function() {
                var t4 = Array.prototype.slice.call(arguments), e4 = t4.pop(), n3 = [];
                return t4.push(function(t5, r3, i3, o3, a3, u3, c3) {
                  e4(t5, r3, i3, o3, a3, u3, c3) && n3.push(t5);
                }), this[o2].apply(this, t4), n3;
              };
              var c2 = "reduce" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[c2] = function() {
                var t4, e4, n3 = Array.prototype.slice.call(arguments);
                if (n3.length < 2 || n3.length > 4)
                  throw new F("Graph.".concat(c2, ": invalid number of arguments (expecting 2, 3 or 4 and got ").concat(n3.length, ")."));
                if ("function" == typeof n3[n3.length - 1] && "function" != typeof n3[n3.length - 2])
                  throw new F("Graph.".concat(c2, ": missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."));
                2 === n3.length ? (t4 = n3[0], e4 = n3[1], n3 = []) : 3 === n3.length ? (t4 = n3[1], e4 = n3[2], n3 = [n3[0]]) : 4 === n3.length && (t4 = n3[2], e4 = n3[3], n3 = [n3[0], n3[1]]);
                var r3 = e4;
                return n3.push(function(e5, n4, i3, o3, a3, u3, c3) {
                  r3 = t4(r3, e5, n4, i3, o3, a3, u3, c3);
                }), this[o2].apply(this, n3), r3;
              };
            }(t2, e2), function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction, o2 = "find" + n2[0].toUpperCase() + n2.slice(1, -1);
              t3.prototype[o2] = function(t4, e4, n3) {
                if ("mixed" !== r2 && "mixed" !== this.type && r2 !== this.type)
                  return false;
                if (1 === arguments.length)
                  return dt(true, this, r2, n3 = t4);
                if (2 === arguments.length) {
                  t4 = "" + t4, n3 = e4;
                  var a3 = this._nodes.get(t4);
                  if (void 0 === a3)
                    throw new I("Graph.".concat(o2, ': could not find the "').concat(t4, '" node in the graph.'));
                  return pt(true, this.multi, "mixed" === r2 ? this.type : r2, i2, a3, n3);
                }
                if (3 === arguments.length) {
                  t4 = "" + t4, e4 = "" + e4;
                  var u3 = this._nodes.get(t4);
                  if (!u3)
                    throw new I("Graph.".concat(o2, ':  could not find the "').concat(t4, '" source node in the graph.'));
                  if (!this._nodes.has(e4))
                    throw new I("Graph.".concat(o2, ':  could not find the "').concat(e4, '" target node in the graph.'));
                  return gt(true, r2, this.multi, i2, u3, e4, n3);
                }
                throw new F("Graph.".concat(o2, ": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length, ")."));
              };
              var a2 = "some" + n2[0].toUpperCase() + n2.slice(1, -1);
              t3.prototype[a2] = function() {
                var t4 = Array.prototype.slice.call(arguments), e4 = t4.pop();
                return t4.push(function(t5, n3, r3, i3, o3, a3, u3) {
                  return e4(t5, n3, r3, i3, o3, a3, u3);
                }), !!this[o2].apply(this, t4);
              };
              var u2 = "every" + n2[0].toUpperCase() + n2.slice(1, -1);
              t3.prototype[u2] = function() {
                var t4 = Array.prototype.slice.call(arguments), e4 = t4.pop();
                return t4.push(function(t5, n3, r3, i3, o3, a3, u3) {
                  return !e4(t5, n3, r3, i3, o3, a3, u3);
                }), !this[o2].apply(this, t4);
              };
            }(t2, e2), function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction, o2 = n2.slice(0, -1) + "Entries";
              t3.prototype[o2] = function(t4, e4) {
                if ("mixed" !== r2 && "mixed" !== this.type && r2 !== this.type)
                  return O.empty();
                if (!arguments.length)
                  return ht(this, r2);
                if (1 === arguments.length) {
                  t4 = "" + t4;
                  var n3 = this._nodes.get(t4);
                  if (!n3)
                    throw new I("Graph.".concat(o2, ': could not find the "').concat(t4, '" node in the graph.'));
                  return lt(r2, i2, n3);
                }
                if (2 === arguments.length) {
                  t4 = "" + t4, e4 = "" + e4;
                  var a2 = this._nodes.get(t4);
                  if (!a2)
                    throw new I("Graph.".concat(o2, ':  could not find the "').concat(t4, '" source node in the graph.'));
                  if (!this._nodes.has(e4))
                    throw new I("Graph.".concat(o2, ':  could not find the "').concat(e4, '" target node in the graph.'));
                  return wt(r2, i2, a2, e4);
                }
                throw new F("Graph.".concat(o2, ": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length, ")."));
              };
            }(t2, e2);
          });
        }(Wt), function(t2) {
          vt.forEach(function(e2) {
            Gt(t2, e2), function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction, o2 = "forEach" + n2[0].toUpperCase() + n2.slice(1, -1);
              t3.prototype[o2] = function(t4, e4) {
                if ("mixed" === r2 || "mixed" === this.type || r2 === this.type) {
                  t4 = "" + t4;
                  var n3 = this._nodes.get(t4);
                  if (void 0 === n3)
                    throw new I("Graph.".concat(o2, ': could not find the "').concat(t4, '" node in the graph.'));
                  kt(false, "mixed" === r2 ? this.type : r2, i2, n3, e4);
                }
              };
              var a2 = "map" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[a2] = function(t4, e4) {
                var n3 = [];
                return this[o2](t4, function(t5, r3) {
                  n3.push(e4(t5, r3));
                }), n3;
              };
              var u2 = "filter" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[u2] = function(t4, e4) {
                var n3 = [];
                return this[o2](t4, function(t5, r3) {
                  e4(t5, r3) && n3.push(t5);
                }), n3;
              };
              var c2 = "reduce" + n2[0].toUpperCase() + n2.slice(1);
              t3.prototype[c2] = function(t4, e4, n3) {
                if (arguments.length < 3)
                  throw new F("Graph.".concat(c2, ": missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."));
                var r3 = n3;
                return this[o2](t4, function(t5, n4) {
                  r3 = e4(r3, t5, n4);
                }), r3;
              };
            }(t2, e2), function(t3, e3) {
              var n2 = e3.name, r2 = e3.type, i2 = e3.direction, o2 = n2[0].toUpperCase() + n2.slice(1, -1), a2 = "find" + o2;
              t3.prototype[a2] = function(t4, e4) {
                if ("mixed" === r2 || "mixed" === this.type || r2 === this.type) {
                  t4 = "" + t4;
                  var n3 = this._nodes.get(t4);
                  if (void 0 === n3)
                    throw new I("Graph.".concat(a2, ': could not find the "').concat(t4, '" node in the graph.'));
                  return kt(true, "mixed" === r2 ? this.type : r2, i2, n3, e4);
                }
              };
              var u2 = "some" + o2;
              t3.prototype[u2] = function(t4, e4) {
                return !!this[a2](t4, e4);
              };
              var c2 = "every" + o2;
              t3.prototype[c2] = function(t4, e4) {
                return !this[a2](t4, function(t5, n3) {
                  return !e4(t5, n3);
                });
              };
            }(t2, e2), xt(t2, e2);
          });
        }(Wt);
        var Pt = function(t2) {
          function n2(e2) {
            var n3 = c({ type: "directed" }, e2);
            if ("multi" in n3 && false !== n3.multi)
              throw new F("DirectedGraph.from: inconsistent indication that the graph should be multi in given options!");
            if ("directed" !== n3.type)
              throw new F('DirectedGraph.from: inconsistent "' + n3.type + '" type in given options!');
            return t2.call(this, n3) || this;
          }
          return e(n2, t2), n2;
        }(Wt), Rt = function(t2) {
          function n2(e2) {
            var n3 = c({ type: "undirected" }, e2);
            if ("multi" in n3 && false !== n3.multi)
              throw new F("UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!");
            if ("undirected" !== n3.type)
              throw new F('UndirectedGraph.from: inconsistent "' + n3.type + '" type in given options!');
            return t2.call(this, n3) || this;
          }
          return e(n2, t2), n2;
        }(Wt), Kt = function(t2) {
          function n2(e2) {
            var n3 = c({ multi: true }, e2);
            if ("multi" in n3 && true !== n3.multi)
              throw new F("MultiGraph.from: inconsistent indication that the graph should be simple in given options!");
            return t2.call(this, n3) || this;
          }
          return e(n2, t2), n2;
        }(Wt), Tt = function(t2) {
          function n2(e2) {
            var n3 = c({ type: "directed", multi: true }, e2);
            if ("multi" in n3 && true !== n3.multi)
              throw new F("MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!");
            if ("directed" !== n3.type)
              throw new F('MultiDirectedGraph.from: inconsistent "' + n3.type + '" type in given options!');
            return t2.call(this, n3) || this;
          }
          return e(n2, t2), n2;
        }(Wt), Bt = function(t2) {
          function n2(e2) {
            var n3 = c({ type: "undirected", multi: true }, e2);
            if ("multi" in n3 && true !== n3.multi)
              throw new F("MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!");
            if ("undirected" !== n3.type)
              throw new F('MultiUndirectedGraph.from: inconsistent "' + n3.type + '" type in given options!');
            return t2.call(this, n3) || this;
          }
          return e(n2, t2), n2;
        }(Wt);
        function Ft(t2) {
          t2.from = function(e2, n2) {
            var r2 = c({}, e2.options, n2), i2 = new t2(r2);
            return i2.import(e2), i2;
          };
        }
        return Ft(Wt), Ft(Pt), Ft(Rt), Ft(Kt), Ft(Tt), Ft(Bt), Wt.Graph = Wt, Wt.DirectedGraph = Pt, Wt.UndirectedGraph = Rt, Wt.MultiGraph = Kt, Wt.MultiDirectedGraph = Tt, Wt.MultiUndirectedGraph = Bt, Wt.InvalidArgumentsGraphError = F, Wt.NotFoundGraphError = I, Wt.UsageGraphError = Y, Wt;
      });
    }
  });

  // node_modules/graphology-utils/is-graph.js
  var require_is_graph = __commonJS({
    "node_modules/graphology-utils/is-graph.js"(exports, module) {
      module.exports = function isGraph(value) {
        return value !== null && typeof value === "object" && typeof value.addUndirectedEdgeWithKey === "function" && typeof value.dropNode === "function" && typeof value.multi === "boolean";
      };
    }
  });

  // node_modules/sigma/utils/matrices.js
  var require_matrices = __commonJS({
    "node_modules/sigma/utils/matrices.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multiplyVec2 = exports.multiply = exports.translate = exports.rotate = exports.scale = exports.identity = void 0;
      function identity() {
        return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
      }
      exports.identity = identity;
      function scale(m, x, y) {
        m[0] = x;
        m[4] = typeof y === "number" ? y : x;
        return m;
      }
      exports.scale = scale;
      function rotate(m, r) {
        var s = Math.sin(r), c = Math.cos(r);
        m[0] = c;
        m[1] = s;
        m[3] = -s;
        m[4] = c;
        return m;
      }
      exports.rotate = rotate;
      function translate(m, x, y) {
        m[6] = x;
        m[7] = y;
        return m;
      }
      exports.translate = translate;
      function multiply(a, b) {
        var a00 = a[0], a01 = a[1], a02 = a[2];
        var a10 = a[3], a11 = a[4], a12 = a[5];
        var a20 = a[6], a21 = a[7], a22 = a[8];
        var b00 = b[0], b01 = b[1], b02 = b[2];
        var b10 = b[3], b11 = b[4], b12 = b[5];
        var b20 = b[6], b21 = b[7], b22 = b[8];
        a[0] = b00 * a00 + b01 * a10 + b02 * a20;
        a[1] = b00 * a01 + b01 * a11 + b02 * a21;
        a[2] = b00 * a02 + b01 * a12 + b02 * a22;
        a[3] = b10 * a00 + b11 * a10 + b12 * a20;
        a[4] = b10 * a01 + b11 * a11 + b12 * a21;
        a[5] = b10 * a02 + b11 * a12 + b12 * a22;
        a[6] = b20 * a00 + b21 * a10 + b22 * a20;
        a[7] = b20 * a01 + b21 * a11 + b22 * a21;
        a[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return a;
      }
      exports.multiply = multiply;
      function multiplyVec2(a, b, z) {
        if (z === void 0) {
          z = 1;
        }
        var a00 = a[0];
        var a01 = a[1];
        var a10 = a[3];
        var a11 = a[4];
        var a20 = a[6];
        var a21 = a[7];
        var b0 = b.x;
        var b1 = b.y;
        return { x: b0 * a00 + b1 * a10 + a20 * z, y: b0 * a01 + b1 * a11 + a21 * z };
      }
      exports.multiplyVec2 = multiplyVec2;
    }
  });

  // node_modules/sigma/utils/data.js
  var require_data = __commonJS({
    "node_modules/sigma/utils/data.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HTML_COLORS = void 0;
      exports.HTML_COLORS = {
        black: "#000000",
        silver: "#C0C0C0",
        gray: "#808080",
        grey: "#808080",
        white: "#FFFFFF",
        maroon: "#800000",
        red: "#FF0000",
        purple: "#800080",
        fuchsia: "#FF00FF",
        green: "#008000",
        lime: "#00FF00",
        olive: "#808000",
        yellow: "#FFFF00",
        navy: "#000080",
        blue: "#0000FF",
        teal: "#008080",
        aqua: "#00FFFF",
        darkblue: "#00008B",
        mediumblue: "#0000CD",
        darkgreen: "#006400",
        darkcyan: "#008B8B",
        deepskyblue: "#00BFFF",
        darkturquoise: "#00CED1",
        mediumspringgreen: "#00FA9A",
        springgreen: "#00FF7F",
        cyan: "#00FFFF",
        midnightblue: "#191970",
        dodgerblue: "#1E90FF",
        lightseagreen: "#20B2AA",
        forestgreen: "#228B22",
        seagreen: "#2E8B57",
        darkslategray: "#2F4F4F",
        darkslategrey: "#2F4F4F",
        limegreen: "#32CD32",
        mediumseagreen: "#3CB371",
        turquoise: "#40E0D0",
        royalblue: "#4169E1",
        steelblue: "#4682B4",
        darkslateblue: "#483D8B",
        mediumturquoise: "#48D1CC",
        indigo: "#4B0082",
        darkolivegreen: "#556B2F",
        cadetblue: "#5F9EA0",
        cornflowerblue: "#6495ED",
        rebeccapurple: "#663399",
        mediumaquamarine: "#66CDAA",
        dimgray: "#696969",
        dimgrey: "#696969",
        slateblue: "#6A5ACD",
        olivedrab: "#6B8E23",
        slategray: "#708090",
        slategrey: "#708090",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        mediumslateblue: "#7B68EE",
        lawngreen: "#7CFC00",
        chartreuse: "#7FFF00",
        aquamarine: "#7FFFD4",
        skyblue: "#87CEEB",
        lightskyblue: "#87CEFA",
        blueviolet: "#8A2BE2",
        darkred: "#8B0000",
        darkmagenta: "#8B008B",
        saddlebrown: "#8B4513",
        darkseagreen: "#8FBC8F",
        lightgreen: "#90EE90",
        mediumpurple: "#9370DB",
        darkviolet: "#9400D3",
        palegreen: "#98FB98",
        darkorchid: "#9932CC",
        yellowgreen: "#9ACD32",
        sienna: "#A0522D",
        brown: "#A52A2A",
        darkgray: "#A9A9A9",
        darkgrey: "#A9A9A9",
        lightblue: "#ADD8E6",
        greenyellow: "#ADFF2F",
        paleturquoise: "#AFEEEE",
        lightsteelblue: "#B0C4DE",
        powderblue: "#B0E0E6",
        firebrick: "#B22222",
        darkgoldenrod: "#B8860B",
        mediumorchid: "#BA55D3",
        rosybrown: "#BC8F8F",
        darkkhaki: "#BDB76B",
        mediumvioletred: "#C71585",
        indianred: "#CD5C5C",
        peru: "#CD853F",
        chocolate: "#D2691E",
        tan: "#D2B48C",
        lightgray: "#D3D3D3",
        lightgrey: "#D3D3D3",
        thistle: "#D8BFD8",
        orchid: "#DA70D6",
        goldenrod: "#DAA520",
        palevioletred: "#DB7093",
        crimson: "#DC143C",
        gainsboro: "#DCDCDC",
        plum: "#DDA0DD",
        burlywood: "#DEB887",
        lightcyan: "#E0FFFF",
        lavender: "#E6E6FA",
        darksalmon: "#E9967A",
        violet: "#EE82EE",
        palegoldenrod: "#EEE8AA",
        lightcoral: "#F08080",
        khaki: "#F0E68C",
        aliceblue: "#F0F8FF",
        honeydew: "#F0FFF0",
        azure: "#F0FFFF",
        sandybrown: "#F4A460",
        wheat: "#F5DEB3",
        beige: "#F5F5DC",
        whitesmoke: "#F5F5F5",
        mintcream: "#F5FFFA",
        ghostwhite: "#F8F8FF",
        salmon: "#FA8072",
        antiquewhite: "#FAEBD7",
        linen: "#FAF0E6",
        lightgoldenrodyellow: "#FAFAD2",
        oldlace: "#FDF5E6",
        magenta: "#FF00FF",
        deeppink: "#FF1493",
        orangered: "#FF4500",
        tomato: "#FF6347",
        hotpink: "#FF69B4",
        coral: "#FF7F50",
        darkorange: "#FF8C00",
        lightsalmon: "#FFA07A",
        orange: "#FFA500",
        lightpink: "#FFB6C1",
        pink: "#FFC0CB",
        gold: "#FFD700",
        peachpuff: "#FFDAB9",
        navajowhite: "#FFDEAD",
        moccasin: "#FFE4B5",
        bisque: "#FFE4C4",
        mistyrose: "#FFE4E1",
        blanchedalmond: "#FFEBCD",
        papayawhip: "#FFEFD5",
        lavenderblush: "#FFF0F5",
        seashell: "#FFF5EE",
        cornsilk: "#FFF8DC",
        lemonchiffon: "#FFFACD",
        floralwhite: "#FFFAF0",
        snow: "#FFFAFA",
        lightyellow: "#FFFFE0",
        ivory: "#FFFFF0"
      };
    }
  });

  // node_modules/sigma/utils/index.js
  var require_utils = __commonJS({
    "node_modules/sigma/utils/index.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateGraph = exports.canUse32BitsIndices = exports.extractPixel = exports.getMatrixImpact = exports.matrixFromCamera = exports.getCorrectionRatio = exports.floatColor = exports.floatArrayColor = exports.parseColor = exports.zIndexOrdering = exports.createNormalizationFunction = exports.graphExtent = exports.getPixelRatio = exports.createElement = exports.cancelFrame = exports.requestFrame = exports.assignDeep = exports.assign = exports.isPlainObject = void 0;
      var is_graph_1 = __importDefault(require_is_graph());
      var matrices_1 = require_matrices();
      var data_1 = require_data();
      function isPlainObject(value) {
        return typeof value === "object" && value !== null && value.constructor === Object;
      }
      exports.isPlainObject = isPlainObject;
      function assign(target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          objects[_i - 1] = arguments[_i];
        }
        target = target || {};
        for (var i = 0, l = objects.length; i < l; i++) {
          var o = objects[i];
          if (!o)
            continue;
          Object.assign(target, o);
        }
        return target;
      }
      exports.assign = assign;
      function assignDeep(target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          objects[_i - 1] = arguments[_i];
        }
        target = target || {};
        for (var i = 0, l = objects.length; i < l; i++) {
          var o = objects[i];
          if (!o)
            continue;
          for (var k in o) {
            if (isPlainObject(o[k])) {
              target[k] = assignDeep(target[k], o[k]);
            } else {
              target[k] = o[k];
            }
          }
        }
        return target;
      }
      exports.assignDeep = assignDeep;
      exports.requestFrame = typeof requestAnimationFrame !== "undefined" ? function(callback) {
        return requestAnimationFrame(callback);
      } : function(callback) {
        return setTimeout(callback, 0);
      };
      exports.cancelFrame = typeof cancelAnimationFrame !== "undefined" ? function(requestID) {
        return cancelAnimationFrame(requestID);
      } : function(requestID) {
        return clearTimeout(requestID);
      };
      function createElement(tag, style, attributes) {
        var element = document.createElement(tag);
        if (style) {
          for (var k in style) {
            element.style[k] = style[k];
          }
        }
        if (attributes) {
          for (var k in attributes) {
            element.setAttribute(k, attributes[k]);
          }
        }
        return element;
      }
      exports.createElement = createElement;
      function getPixelRatio() {
        if (typeof window.devicePixelRatio !== "undefined")
          return window.devicePixelRatio;
        return 1;
      }
      exports.getPixelRatio = getPixelRatio;
      function graphExtent(graph2) {
        if (!graph2.order)
          return { x: [0, 1], y: [0, 1] };
        var xMin = Infinity;
        var xMax = -Infinity;
        var yMin = Infinity;
        var yMax = -Infinity;
        graph2.forEachNode(function(_, attr) {
          var x = attr.x, y = attr.y;
          if (x < xMin)
            xMin = x;
          if (x > xMax)
            xMax = x;
          if (y < yMin)
            yMin = y;
          if (y > yMax)
            yMax = y;
        });
        return { x: [xMin, xMax], y: [yMin, yMax] };
      }
      exports.graphExtent = graphExtent;
      function createNormalizationFunction(extent) {
        var _a = __read(extent.x, 2), minX = _a[0], maxX = _a[1], _b = __read(extent.y, 2), minY = _b[0], maxY = _b[1];
        var ratio = Math.max(maxX - minX, maxY - minY), dX = (maxX + minX) / 2, dY = (maxY + minY) / 2;
        if (ratio === 0 || Math.abs(ratio) === Infinity || isNaN(ratio))
          ratio = 1;
        if (isNaN(dX))
          dX = 0;
        if (isNaN(dY))
          dY = 0;
        var fn = function(data) {
          return {
            x: 0.5 + (data.x - dX) / ratio,
            y: 0.5 + (data.y - dY) / ratio
          };
        };
        fn.applyTo = function(data) {
          data.x = 0.5 + (data.x - dX) / ratio;
          data.y = 0.5 + (data.y - dY) / ratio;
        };
        fn.inverse = function(data) {
          return {
            x: dX + ratio * (data.x - 0.5),
            y: dY + ratio * (data.y - 0.5)
          };
        };
        fn.ratio = ratio;
        return fn;
      }
      exports.createNormalizationFunction = createNormalizationFunction;
      function zIndexOrdering(extent, getter, elements) {
        return elements.sort(function(a, b) {
          var zA = getter(a) || 0, zB = getter(b) || 0;
          if (zA < zB)
            return -1;
          if (zA > zB)
            return 1;
          return 0;
        });
      }
      exports.zIndexOrdering = zIndexOrdering;
      var INT8 = new Int8Array(4);
      var INT32 = new Int32Array(INT8.buffer, 0, 1);
      var FLOAT32 = new Float32Array(INT8.buffer, 0, 1);
      var RGBA_TEST_REGEX = /^\s*rgba?\s*\(/;
      var RGBA_EXTRACT_REGEX = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
      function parseColor(val) {
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 1;
        if (val[0] === "#") {
          if (val.length === 4) {
            r = parseInt(val.charAt(1) + val.charAt(1), 16);
            g = parseInt(val.charAt(2) + val.charAt(2), 16);
            b = parseInt(val.charAt(3) + val.charAt(3), 16);
          } else {
            r = parseInt(val.charAt(1) + val.charAt(2), 16);
            g = parseInt(val.charAt(3) + val.charAt(4), 16);
            b = parseInt(val.charAt(5) + val.charAt(6), 16);
          }
        } else if (RGBA_TEST_REGEX.test(val)) {
          var match = val.match(RGBA_EXTRACT_REGEX);
          if (match) {
            r = +match[1];
            g = +match[2];
            b = +match[3];
            if (match[4])
              a = +match[4];
          }
        }
        return { r, g, b, a };
      }
      exports.parseColor = parseColor;
      var FLOAT_COLOR_CACHE = {};
      for (htmlColor in data_1.HTML_COLORS) {
        FLOAT_COLOR_CACHE[htmlColor] = floatColor(data_1.HTML_COLORS[htmlColor]);
        FLOAT_COLOR_CACHE[data_1.HTML_COLORS[htmlColor]] = FLOAT_COLOR_CACHE[htmlColor];
      }
      var htmlColor;
      function floatArrayColor(val) {
        val = data_1.HTML_COLORS[val] || val;
        var _a = parseColor(val), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        return new Float32Array([r / 255, g / 255, b / 255, a]);
      }
      exports.floatArrayColor = floatArrayColor;
      function floatColor(val) {
        if (typeof FLOAT_COLOR_CACHE[val] !== "undefined")
          return FLOAT_COLOR_CACHE[val];
        var parsed = parseColor(val);
        var r = parsed.r, g = parsed.g, b = parsed.b;
        var a = parsed.a;
        a = a * 255 | 0;
        INT32[0] = (a << 24 | b << 16 | g << 8 | r) & 4278190079;
        var color = FLOAT32[0];
        FLOAT_COLOR_CACHE[val] = color;
        return color;
      }
      exports.floatColor = floatColor;
      function getCorrectionRatio(viewportDimensions, graphDimensions) {
        var viewportRatio = viewportDimensions.height / viewportDimensions.width;
        var graphRatio = graphDimensions.height / graphDimensions.width;
        if (viewportRatio < 1 && graphRatio > 1 || viewportRatio > 1 && graphRatio < 1) {
          return 1;
        }
        return Math.min(Math.max(graphRatio, 1 / graphRatio), Math.max(1 / viewportRatio, viewportRatio));
      }
      exports.getCorrectionRatio = getCorrectionRatio;
      function matrixFromCamera(state, viewportDimensions, graphDimensions, padding, inverse) {
        var angle = state.angle, ratio = state.ratio, x = state.x, y = state.y;
        var width = viewportDimensions.width, height = viewportDimensions.height;
        var matrix = (0, matrices_1.identity)();
        var smallestDimension = Math.min(width, height) - 2 * padding;
        var correctionRatio = getCorrectionRatio(viewportDimensions, graphDimensions);
        if (!inverse) {
          (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 2 * (smallestDimension / width) * correctionRatio, 2 * (smallestDimension / height) * correctionRatio));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), -angle));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 1 / ratio));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), -x, -y));
        } else {
          (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), x, y));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), ratio));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), angle));
          (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), width / smallestDimension / 2 / correctionRatio, height / smallestDimension / 2 / correctionRatio));
        }
        return matrix;
      }
      exports.matrixFromCamera = matrixFromCamera;
      function getMatrixImpact(matrix, cameraState, viewportDimensions) {
        var _a = (0, matrices_1.multiplyVec2)(matrix, { x: Math.cos(cameraState.angle), y: Math.sin(cameraState.angle) }, 0), x = _a.x, y = _a.y;
        return 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / viewportDimensions.width;
      }
      exports.getMatrixImpact = getMatrixImpact;
      function extractPixel(gl, x, y, array) {
        var data = array || new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
        return data;
      }
      exports.extractPixel = extractPixel;
      function canUse32BitsIndices(gl) {
        var webgl2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
        return webgl2 || !!gl.getExtension("OES_element_index_uint");
      }
      exports.canUse32BitsIndices = canUse32BitsIndices;
      function validateGraph(graph2) {
        if (!(0, is_graph_1.default)(graph2))
          throw new Error("Sigma: invalid graph instance.");
        graph2.forEachNode(function(key, attributes) {
          if (!Number.isFinite(attributes.x) || !Number.isFinite(attributes.y)) {
            throw new Error("Sigma: Coordinates of node ".concat(key, " are invalid. A node must have a numeric 'x' and 'y' attribute."));
          }
        });
      }
      exports.validateGraph = validateGraph;
    }
  });

  // node_modules/sigma/utils/easings.js
  var require_easings = __commonJS({
    "node_modules/sigma/utils/easings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.quadraticInOut = exports.quadraticOut = exports.quadraticIn = exports.linear = void 0;
      var linear = function(k) {
        return k;
      };
      exports.linear = linear;
      var quadraticIn = function(k) {
        return k * k;
      };
      exports.quadraticIn = quadraticIn;
      var quadraticOut = function(k) {
        return k * (2 - k);
      };
      exports.quadraticOut = quadraticOut;
      var quadraticInOut = function(k) {
        if ((k *= 2) < 1)
          return 0.5 * k * k;
        return -0.5 * (--k * (k - 2) - 1);
      };
      exports.quadraticInOut = quadraticInOut;
      var cubicIn = function(k) {
        return k * k * k;
      };
      exports.cubicIn = cubicIn;
      var cubicOut = function(k) {
        return --k * k * k + 1;
      };
      exports.cubicOut = cubicOut;
      var cubicInOut = function(k) {
        if ((k *= 2) < 1)
          return 0.5 * k * k * k;
        return 0.5 * ((k -= 2) * k * k + 2);
      };
      exports.cubicInOut = cubicInOut;
      var easings = {
        linear: exports.linear,
        quadraticIn: exports.quadraticIn,
        quadraticOut: exports.quadraticOut,
        quadraticInOut: exports.quadraticInOut,
        cubicIn: exports.cubicIn,
        cubicOut: exports.cubicOut,
        cubicInOut: exports.cubicInOut
      };
      exports.default = easings;
    }
  });

  // node_modules/sigma/utils/animate.js
  var require_animate = __commonJS({
    "node_modules/sigma/utils/animate.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.animateNodes = exports.ANIMATE_DEFAULTS = void 0;
      var index_1 = require_utils();
      var easings_1 = __importDefault(require_easings());
      exports.ANIMATE_DEFAULTS = {
        easing: "quadraticInOut",
        duration: 150
      };
      function animateNodes(graph2, targets, opts, callback) {
        var options = Object.assign({}, exports.ANIMATE_DEFAULTS, opts);
        var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
        var start = Date.now();
        var startPositions = {};
        for (var node in targets) {
          var attrs = targets[node];
          startPositions[node] = {};
          for (var k in attrs)
            startPositions[node][k] = graph2.getNodeAttribute(node, k);
        }
        var frame = null;
        var step = function() {
          frame = null;
          var p = (Date.now() - start) / options.duration;
          if (p >= 1) {
            for (var node2 in targets) {
              var attrs2 = targets[node2];
              for (var k2 in attrs2)
                graph2.setNodeAttribute(node2, k2, attrs2[k2]);
            }
            if (typeof callback === "function")
              callback();
            return;
          }
          p = easing(p);
          for (var node2 in targets) {
            var attrs2 = targets[node2];
            var s = startPositions[node2];
            for (var k2 in attrs2)
              graph2.setNodeAttribute(node2, k2, attrs2[k2] * p + s[k2] * (1 - p));
          }
          frame = (0, index_1.requestFrame)(step);
        };
        step();
        return function() {
          if (frame)
            (0, index_1.cancelFrame)(frame);
        };
      }
      exports.animateNodes = animateNodes;
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/sigma/types.js
  var require_types = __commonJS({
    "node_modules/sigma/types.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TypedEventEmitter = void 0;
      var events_1 = require_events();
      var TypedEventEmitter = function(_super) {
        __extends(TypedEventEmitter2, _super);
        function TypedEventEmitter2() {
          var _this = _super.call(this) || this;
          _this.rawEmitter = _this;
          return _this;
        }
        return TypedEventEmitter2;
      }(events_1.EventEmitter);
      exports.TypedEventEmitter = TypedEventEmitter;
    }
  });

  // node_modules/sigma/core/camera.js
  var require_camera = __commonJS({
    "node_modules/sigma/core/camera.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var animate_1 = require_animate();
      var easings_1 = __importDefault(require_easings());
      var utils_1 = require_utils();
      var types_1 = require_types();
      var DEFAULT_ZOOMING_RATIO = 1.5;
      var Camera = function(_super) {
        __extends(Camera2, _super);
        function Camera2() {
          var _this = _super.call(this) || this;
          _this.x = 0.5;
          _this.y = 0.5;
          _this.angle = 0;
          _this.ratio = 1;
          _this.minRatio = null;
          _this.maxRatio = null;
          _this.nextFrame = null;
          _this.previousState = null;
          _this.enabled = true;
          _this.previousState = _this.getState();
          return _this;
        }
        Camera2.from = function(state) {
          var camera = new Camera2();
          return camera.setState(state);
        };
        Camera2.prototype.enable = function() {
          this.enabled = true;
          return this;
        };
        Camera2.prototype.disable = function() {
          this.enabled = false;
          return this;
        };
        Camera2.prototype.getState = function() {
          return {
            x: this.x,
            y: this.y,
            angle: this.angle,
            ratio: this.ratio
          };
        };
        Camera2.prototype.hasState = function(state) {
          return this.x === state.x && this.y === state.y && this.ratio === state.ratio && this.angle === state.angle;
        };
        Camera2.prototype.getPreviousState = function() {
          var state = this.previousState;
          if (!state)
            return null;
          return {
            x: state.x,
            y: state.y,
            angle: state.angle,
            ratio: state.ratio
          };
        };
        Camera2.prototype.getBoundedRatio = function(ratio) {
          var r = ratio;
          if (typeof this.minRatio === "number")
            r = Math.max(r, this.minRatio);
          if (typeof this.maxRatio === "number")
            r = Math.min(r, this.maxRatio);
          return r;
        };
        Camera2.prototype.validateState = function(state) {
          var validatedState = {};
          if (typeof state.x === "number")
            validatedState.x = state.x;
          if (typeof state.y === "number")
            validatedState.y = state.y;
          if (typeof state.angle === "number")
            validatedState.angle = state.angle;
          if (typeof state.ratio === "number")
            validatedState.ratio = this.getBoundedRatio(state.ratio);
          return validatedState;
        };
        Camera2.prototype.isAnimated = function() {
          return !!this.nextFrame;
        };
        Camera2.prototype.setState = function(state) {
          if (!this.enabled)
            return this;
          this.previousState = this.getState();
          var validState = this.validateState(state);
          if (typeof validState.x === "number")
            this.x = validState.x;
          if (typeof validState.y === "number")
            this.y = validState.y;
          if (typeof validState.angle === "number")
            this.angle = validState.angle;
          if (typeof validState.ratio === "number")
            this.ratio = validState.ratio;
          if (!this.hasState(this.previousState))
            this.emit("updated", this.getState());
          return this;
        };
        Camera2.prototype.animate = function(state, opts, callback) {
          var _this = this;
          if (!this.enabled)
            return;
          var options = Object.assign({}, animate_1.ANIMATE_DEFAULTS, opts);
          var validState = this.validateState(state);
          var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
          var start = Date.now(), initialState = this.getState();
          var fn = function() {
            var t = (Date.now() - start) / options.duration;
            if (t >= 1) {
              _this.nextFrame = null;
              _this.setState(validState);
              if (_this.animationCallback) {
                _this.animationCallback.call(null);
                _this.animationCallback = void 0;
              }
              return;
            }
            var coefficient = easing(t);
            var newState = {};
            if (typeof validState.x === "number")
              newState.x = initialState.x + (validState.x - initialState.x) * coefficient;
            if (typeof validState.y === "number")
              newState.y = initialState.y + (validState.y - initialState.y) * coefficient;
            if (typeof validState.angle === "number")
              newState.angle = initialState.angle + (validState.angle - initialState.angle) * coefficient;
            if (typeof validState.ratio === "number")
              newState.ratio = initialState.ratio + (validState.ratio - initialState.ratio) * coefficient;
            _this.setState(newState);
            _this.nextFrame = (0, utils_1.requestFrame)(fn);
          };
          if (this.nextFrame) {
            (0, utils_1.cancelFrame)(this.nextFrame);
            if (this.animationCallback)
              this.animationCallback.call(null);
            this.nextFrame = (0, utils_1.requestFrame)(fn);
          } else {
            fn();
          }
          this.animationCallback = callback;
        };
        Camera2.prototype.animatedZoom = function(factorOrOptions) {
          if (!factorOrOptions) {
            this.animate({ ratio: this.ratio / DEFAULT_ZOOMING_RATIO });
          } else {
            if (typeof factorOrOptions === "number")
              return this.animate({ ratio: this.ratio / factorOrOptions });
            else
              this.animate({
                ratio: this.ratio / (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
              }, factorOrOptions);
          }
        };
        Camera2.prototype.animatedUnzoom = function(factorOrOptions) {
          if (!factorOrOptions) {
            this.animate({ ratio: this.ratio * DEFAULT_ZOOMING_RATIO });
          } else {
            if (typeof factorOrOptions === "number")
              return this.animate({ ratio: this.ratio * factorOrOptions });
            else
              this.animate({
                ratio: this.ratio * (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
              }, factorOrOptions);
          }
        };
        Camera2.prototype.animatedReset = function(options) {
          this.animate({
            x: 0.5,
            y: 0.5,
            ratio: 1,
            angle: 0
          }, options);
        };
        Camera2.prototype.copy = function() {
          return Camera2.from(this.getState());
        };
        return Camera2;
      }(types_1.TypedEventEmitter);
      exports.default = Camera;
    }
  });

  // node_modules/sigma/core/captors/captor.js
  var require_captor = __commonJS({
    "node_modules/sigma/core/captors/captor.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getWheelDelta = exports.getTouchCoords = exports.getTouchesArray = exports.getWheelCoords = exports.getMouseCoords = exports.getPosition = void 0;
      var types_1 = require_types();
      function getPosition(e, dom) {
        var bbox = dom.getBoundingClientRect();
        return {
          x: e.clientX - bbox.left,
          y: e.clientY - bbox.top
        };
      }
      exports.getPosition = getPosition;
      function getMouseCoords(e, dom) {
        var res = __assign(__assign({}, getPosition(e, dom)), { sigmaDefaultPrevented: false, preventSigmaDefault: function() {
          res.sigmaDefaultPrevented = true;
        }, original: e });
        return res;
      }
      exports.getMouseCoords = getMouseCoords;
      function getWheelCoords(e, dom) {
        return __assign(__assign({}, getMouseCoords(e, dom)), { delta: getWheelDelta(e) });
      }
      exports.getWheelCoords = getWheelCoords;
      var MAX_TOUCHES = 2;
      function getTouchesArray(touches) {
        var arr = [];
        for (var i = 0, l = Math.min(touches.length, MAX_TOUCHES); i < l; i++)
          arr.push(touches[i]);
        return arr;
      }
      exports.getTouchesArray = getTouchesArray;
      function getTouchCoords(e, dom) {
        return {
          touches: getTouchesArray(e.touches).map(function(touch) {
            return getPosition(touch, dom);
          }),
          original: e
        };
      }
      exports.getTouchCoords = getTouchCoords;
      function getWheelDelta(e) {
        if (typeof e.deltaY !== "undefined")
          return e.deltaY * -3 / 360;
        if (typeof e.detail !== "undefined")
          return e.detail / -9;
        throw new Error("Captor: could not extract delta from event.");
      }
      exports.getWheelDelta = getWheelDelta;
      var Captor = function(_super) {
        __extends(Captor2, _super);
        function Captor2(container2, renderer2) {
          var _this = _super.call(this) || this;
          _this.container = container2;
          _this.renderer = renderer2;
          return _this;
        }
        return Captor2;
      }(types_1.TypedEventEmitter);
      exports.default = Captor;
    }
  });

  // node_modules/sigma/core/captors/mouse.js
  var require_mouse = __commonJS({
    "node_modules/sigma/core/captors/mouse.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var captor_1 = __importStar(require_captor());
      var DRAG_TIMEOUT = 100;
      var DRAGGED_EVENTS_TOLERANCE = 3;
      var MOUSE_INERTIA_DURATION = 200;
      var MOUSE_INERTIA_RATIO = 3;
      var MOUSE_ZOOM_DURATION = 250;
      var ZOOMING_RATIO = 1.7;
      var DOUBLE_CLICK_TIMEOUT = 300;
      var DOUBLE_CLICK_ZOOMING_RATIO = 2.2;
      var DOUBLE_CLICK_ZOOMING_DURATION = 200;
      var MouseCaptor = function(_super) {
        __extends(MouseCaptor2, _super);
        function MouseCaptor2(container2, renderer2) {
          var _this = _super.call(this, container2, renderer2) || this;
          _this.enabled = true;
          _this.draggedEvents = 0;
          _this.downStartTime = null;
          _this.lastMouseX = null;
          _this.lastMouseY = null;
          _this.isMouseDown = false;
          _this.isMoving = false;
          _this.movingTimeout = null;
          _this.startCameraState = null;
          _this.clicks = 0;
          _this.doubleClickTimeout = null;
          _this.currentWheelDirection = 0;
          _this.handleClick = _this.handleClick.bind(_this);
          _this.handleRightClick = _this.handleRightClick.bind(_this);
          _this.handleDown = _this.handleDown.bind(_this);
          _this.handleUp = _this.handleUp.bind(_this);
          _this.handleMove = _this.handleMove.bind(_this);
          _this.handleWheel = _this.handleWheel.bind(_this);
          _this.handleOut = _this.handleOut.bind(_this);
          container2.addEventListener("click", _this.handleClick, false);
          container2.addEventListener("contextmenu", _this.handleRightClick, false);
          container2.addEventListener("mousedown", _this.handleDown, false);
          container2.addEventListener("wheel", _this.handleWheel, false);
          container2.addEventListener("mouseout", _this.handleOut, false);
          document.addEventListener("mousemove", _this.handleMove, false);
          document.addEventListener("mouseup", _this.handleUp, false);
          return _this;
        }
        MouseCaptor2.prototype.kill = function() {
          var container2 = this.container;
          container2.removeEventListener("click", this.handleClick);
          container2.removeEventListener("contextmenu", this.handleRightClick);
          container2.removeEventListener("mousedown", this.handleDown);
          container2.removeEventListener("wheel", this.handleWheel);
          container2.removeEventListener("mouseout", this.handleOut);
          document.removeEventListener("mousemove", this.handleMove);
          document.removeEventListener("mouseup", this.handleUp);
        };
        MouseCaptor2.prototype.handleClick = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          this.clicks++;
          if (this.clicks === 2) {
            this.clicks = 0;
            if (typeof this.doubleClickTimeout === "number") {
              clearTimeout(this.doubleClickTimeout);
              this.doubleClickTimeout = null;
            }
            return this.handleDoubleClick(e);
          }
          setTimeout(function() {
            _this.clicks = 0;
            _this.doubleClickTimeout = null;
          }, DOUBLE_CLICK_TIMEOUT);
          if (this.draggedEvents < DRAGGED_EVENTS_TOLERANCE)
            this.emit("click", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleRightClick = function(e) {
          if (!this.enabled)
            return;
          this.emit("rightClick", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleDoubleClick = function(e) {
          if (!this.enabled)
            return;
          e.preventDefault();
          e.stopPropagation();
          var mouseCoords = (0, captor_1.getMouseCoords)(e, this.container);
          this.emit("doubleClick", mouseCoords);
          if (mouseCoords.sigmaDefaultPrevented)
            return;
          var camera = this.renderer.getCamera();
          var newRatio = camera.getBoundedRatio(camera.getState().ratio / DOUBLE_CLICK_ZOOMING_RATIO);
          camera.animate(this.renderer.getViewportZoomedState((0, captor_1.getPosition)(e, this.container), newRatio), {
            easing: "quadraticInOut",
            duration: DOUBLE_CLICK_ZOOMING_DURATION
          });
        };
        MouseCaptor2.prototype.handleDown = function(e) {
          if (!this.enabled)
            return;
          this.startCameraState = this.renderer.getCamera().getState();
          var _a = (0, captor_1.getPosition)(e, this.container), x = _a.x, y = _a.y;
          this.lastMouseX = x;
          this.lastMouseY = y;
          this.draggedEvents = 0;
          this.downStartTime = Date.now();
          this.isMouseDown = true;
          this.emit("mousedown", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleUp = function(e) {
          var _this = this;
          if (!this.enabled || !this.isMouseDown)
            return;
          var camera = this.renderer.getCamera();
          this.isMouseDown = false;
          if (typeof this.movingTimeout === "number") {
            clearTimeout(this.movingTimeout);
            this.movingTimeout = null;
          }
          var _a = (0, captor_1.getPosition)(e, this.container), x = _a.x, y = _a.y;
          var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
          if (this.isMoving) {
            camera.animate({
              x: cameraState.x + MOUSE_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
              y: cameraState.y + MOUSE_INERTIA_RATIO * (cameraState.y - previousCameraState.y)
            }, {
              duration: MOUSE_INERTIA_DURATION,
              easing: "quadraticOut"
            });
          } else if (this.lastMouseX !== x || this.lastMouseY !== y) {
            camera.setState({
              x: cameraState.x,
              y: cameraState.y
            });
          }
          this.isMoving = false;
          setTimeout(function() {
            _this.draggedEvents = 0;
            _this.renderer.refresh();
          }, 0);
          this.emit("mouseup", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleMove = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          var mouseCoords = (0, captor_1.getMouseCoords)(e, this.container);
          this.emit("mousemovebody", mouseCoords);
          if (e.target === this.container) {
            this.emit("mousemove", mouseCoords);
          }
          if (mouseCoords.sigmaDefaultPrevented)
            return;
          if (this.isMouseDown) {
            this.isMoving = true;
            this.draggedEvents++;
            if (typeof this.movingTimeout === "number") {
              clearTimeout(this.movingTimeout);
            }
            this.movingTimeout = window.setTimeout(function() {
              _this.movingTimeout = null;
              _this.isMoving = false;
            }, DRAG_TIMEOUT);
            var camera = this.renderer.getCamera();
            var _a = (0, captor_1.getPosition)(e, this.container), eX = _a.x, eY = _a.y;
            var lastMouse = this.renderer.viewportToFramedGraph({
              x: this.lastMouseX,
              y: this.lastMouseY
            });
            var mouse = this.renderer.viewportToFramedGraph({ x: eX, y: eY });
            var offsetX = lastMouse.x - mouse.x, offsetY = lastMouse.y - mouse.y;
            var cameraState = camera.getState();
            var x = cameraState.x + offsetX, y = cameraState.y + offsetY;
            camera.setState({ x, y });
            this.lastMouseX = eX;
            this.lastMouseY = eY;
            e.preventDefault();
            e.stopPropagation();
          }
        };
        MouseCaptor2.prototype.handleWheel = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          e.stopPropagation();
          var delta = (0, captor_1.getWheelDelta)(e);
          if (!delta)
            return;
          var wheelCoords = (0, captor_1.getWheelCoords)(e, this.container);
          this.emit("wheel", wheelCoords);
          if (wheelCoords.sigmaDefaultPrevented)
            return;
          var ratioDiff = delta > 0 ? 1 / ZOOMING_RATIO : ZOOMING_RATIO;
          var camera = this.renderer.getCamera();
          var newRatio = camera.getBoundedRatio(camera.getState().ratio * ratioDiff);
          var wheelDirection = delta > 0 ? 1 : -1;
          var now = Date.now();
          if (this.currentWheelDirection === wheelDirection && this.lastWheelTriggerTime && now - this.lastWheelTriggerTime < MOUSE_ZOOM_DURATION / 5) {
            return;
          }
          camera.animate(this.renderer.getViewportZoomedState((0, captor_1.getPosition)(e, this.container), newRatio), {
            easing: "quadraticOut",
            duration: MOUSE_ZOOM_DURATION
          }, function() {
            _this.currentWheelDirection = 0;
          });
          this.currentWheelDirection = wheelDirection;
          this.lastWheelTriggerTime = now;
        };
        MouseCaptor2.prototype.handleOut = function() {
        };
        return MouseCaptor2;
      }(captor_1.default);
      exports.default = MouseCaptor;
    }
  });

  // node_modules/@yomguithereal/helpers/extend.js
  var require_extend = __commonJS({
    "node_modules/@yomguithereal/helpers/extend.js"(exports, module) {
      module.exports = function extend(array, values) {
        var l2 = values.length;
        if (l2 === 0)
          return;
        var l1 = array.length;
        array.length += l2;
        for (var i = 0; i < l2; i++)
          array[l1 + i] = values[i];
      };
    }
  });

  // node_modules/sigma/core/quadtree.js
  var require_quadtree = __commonJS({
    "node_modules/sigma/core/quadtree.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rectangleCollidesWithQuad = exports.squareCollidesWithQuad = exports.getCircumscribedAlignedRectangle = exports.isRectangleAligned = void 0;
      var extend_1 = __importDefault(require_extend());
      var BLOCKS = 4;
      var MAX_LEVEL = 5;
      var OUTSIDE_BLOCK = "outside";
      var X_OFFSET = 0;
      var Y_OFFSET = 1;
      var WIDTH_OFFSET = 2;
      var HEIGHT_OFFSET = 3;
      var TOP_LEFT = 1;
      var TOP_RIGHT = 2;
      var BOTTOM_LEFT = 3;
      var BOTTOM_RIGHT = 4;
      var hasWarnedTooMuchOutside = false;
      function isRectangleAligned(rect) {
        return rect.x1 === rect.x2 || rect.y1 === rect.y2;
      }
      exports.isRectangleAligned = isRectangleAligned;
      function getCircumscribedAlignedRectangle(rect) {
        var width = Math.sqrt(Math.pow(rect.x2 - rect.x1, 2) + Math.pow(rect.y2 - rect.y1, 2));
        var heightVector = {
          x: (rect.y1 - rect.y2) * rect.height / width,
          y: (rect.x2 - rect.x1) * rect.height / width
        };
        var tl = { x: rect.x1, y: rect.y1 };
        var tr = { x: rect.x2, y: rect.y2 };
        var bl = {
          x: rect.x1 + heightVector.x,
          y: rect.y1 + heightVector.y
        };
        var br = {
          x: rect.x2 + heightVector.x,
          y: rect.y2 + heightVector.y
        };
        var xL = Math.min(tl.x, tr.x, bl.x, br.x);
        var xR = Math.max(tl.x, tr.x, bl.x, br.x);
        var yT = Math.min(tl.y, tr.y, bl.y, br.y);
        var yB = Math.max(tl.y, tr.y, bl.y, br.y);
        return {
          x1: xL,
          y1: yT,
          x2: xR,
          y2: yT,
          height: yB - yT
        };
      }
      exports.getCircumscribedAlignedRectangle = getCircumscribedAlignedRectangle;
      function squareCollidesWithQuad(x1, y1, w, qx, qy, qw, qh) {
        return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + w > qy;
      }
      exports.squareCollidesWithQuad = squareCollidesWithQuad;
      function rectangleCollidesWithQuad(x1, y1, w, h, qx, qy, qw, qh) {
        return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + h > qy;
      }
      exports.rectangleCollidesWithQuad = rectangleCollidesWithQuad;
      function pointIsInQuad(x, y, qx, qy, qw, qh) {
        var xmp = qx + qw / 2, ymp = qy + qh / 2, top = y < ymp, left = x < xmp;
        return top ? left ? TOP_LEFT : TOP_RIGHT : left ? BOTTOM_LEFT : BOTTOM_RIGHT;
      }
      function buildQuadrants(maxLevel, data) {
        var stack = [0, 0];
        while (stack.length) {
          var level = stack.pop(), block = stack.pop();
          var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
          var x = data[block + X_OFFSET], y = data[block + Y_OFFSET], width = data[block + WIDTH_OFFSET], height = data[block + HEIGHT_OFFSET], hw = width / 2, hh = height / 2;
          data[topLeftBlock + X_OFFSET] = x;
          data[topLeftBlock + Y_OFFSET] = y;
          data[topLeftBlock + WIDTH_OFFSET] = hw;
          data[topLeftBlock + HEIGHT_OFFSET] = hh;
          data[topRightBlock + X_OFFSET] = x + hw;
          data[topRightBlock + Y_OFFSET] = y;
          data[topRightBlock + WIDTH_OFFSET] = hw;
          data[topRightBlock + HEIGHT_OFFSET] = hh;
          data[bottomLeftBlock + X_OFFSET] = x;
          data[bottomLeftBlock + Y_OFFSET] = y + hh;
          data[bottomLeftBlock + WIDTH_OFFSET] = hw;
          data[bottomLeftBlock + HEIGHT_OFFSET] = hh;
          data[bottomRightBlock + X_OFFSET] = x + hw;
          data[bottomRightBlock + Y_OFFSET] = y + hh;
          data[bottomRightBlock + WIDTH_OFFSET] = hw;
          data[bottomRightBlock + HEIGHT_OFFSET] = hh;
          if (level < maxLevel - 1) {
            stack.push(bottomRightBlock, level + 1);
            stack.push(bottomLeftBlock, level + 1);
            stack.push(topRightBlock, level + 1);
            stack.push(topLeftBlock, level + 1);
          }
        }
      }
      function insertNode(maxLevel, data, containers, key, x, y, size) {
        var x1 = x - size, y1 = y - size, w = size * 2;
        var level = 0, block = 0;
        while (true) {
          if (level >= maxLevel) {
            containers[block] = containers[block] || [];
            containers[block].push(key);
            return;
          }
          var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
          var collidingWithTopLeft = squareCollidesWithQuad(x1, y1, w, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
          var collidingWithTopRight = squareCollidesWithQuad(x1, y1, w, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
          var collidingWithBottomLeft = squareCollidesWithQuad(x1, y1, w, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
          var collidingWithBottomRight = squareCollidesWithQuad(x1, y1, w, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
          var collisions = [
            collidingWithTopLeft,
            collidingWithTopRight,
            collidingWithBottomLeft,
            collidingWithBottomRight
          ].reduce(function(acc, current) {
            if (current)
              return acc + 1;
            else
              return acc;
          }, 0);
          if (collisions === 0 && level === 0) {
            containers[OUTSIDE_BLOCK].push(key);
            if (!hasWarnedTooMuchOutside && containers[OUTSIDE_BLOCK].length >= 5) {
              hasWarnedTooMuchOutside = true;
              console.warn("sigma/quadtree.insertNode: At least 5 nodes are outside the global quadtree zone. You might have a problem with the normalization function or the custom bounding box.");
            }
            return;
          }
          if (collisions === 0)
            throw new Error("sigma/quadtree.insertNode: no collision (level: ".concat(level, ", key: ").concat(key, ", x: ").concat(x, ", y: ").concat(y, ", size: ").concat(size, ")."));
          if (collisions === 3)
            throw new Error("sigma/quadtree.insertNode: 3 impossible collisions (level: ".concat(level, ", key: ").concat(key, ", x: ").concat(x, ", y: ").concat(y, ", size: ").concat(size, ")."));
          if (collisions > 1) {
            containers[block] = containers[block] || [];
            containers[block].push(key);
            return;
          } else {
            level++;
          }
          if (collidingWithTopLeft)
            block = topLeftBlock;
          if (collidingWithTopRight)
            block = topRightBlock;
          if (collidingWithBottomLeft)
            block = bottomLeftBlock;
          if (collidingWithBottomRight)
            block = bottomRightBlock;
        }
      }
      function getNodesInAxisAlignedRectangleArea(maxLevel, data, containers, x1, y1, w, h) {
        var stack = [0, 0];
        var collectedNodes = [];
        var container2;
        while (stack.length) {
          var level = stack.pop(), block = stack.pop();
          container2 = containers[block];
          if (container2)
            (0, extend_1.default)(collectedNodes, container2);
          if (level >= maxLevel)
            continue;
          var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
          var collidingWithTopLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
          var collidingWithTopRight = rectangleCollidesWithQuad(x1, y1, w, h, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
          var collidingWithBottomLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
          var collidingWithBottomRight = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
          if (collidingWithTopLeft)
            stack.push(topLeftBlock, level + 1);
          if (collidingWithTopRight)
            stack.push(topRightBlock, level + 1);
          if (collidingWithBottomLeft)
            stack.push(bottomLeftBlock, level + 1);
          if (collidingWithBottomRight)
            stack.push(bottomRightBlock, level + 1);
        }
        return collectedNodes;
      }
      var QuadTree = function() {
        function QuadTree2(params) {
          var _a;
          if (params === void 0) {
            params = {};
          }
          this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
          this.cache = null;
          this.lastRectangle = null;
          var L = Math.pow(4, MAX_LEVEL);
          this.data = new Float32Array(BLOCKS * ((4 * L - 1) / 3));
          if (params.boundaries)
            this.resize(params.boundaries);
          else
            this.resize({
              x: 0,
              y: 0,
              width: 1,
              height: 1
            });
        }
        QuadTree2.prototype.add = function(key, x, y, size) {
          insertNode(MAX_LEVEL, this.data, this.containers, key, x, y, size);
          return this;
        };
        QuadTree2.prototype.resize = function(boundaries) {
          this.clear();
          this.data[X_OFFSET] = boundaries.x;
          this.data[Y_OFFSET] = boundaries.y;
          this.data[WIDTH_OFFSET] = boundaries.width;
          this.data[HEIGHT_OFFSET] = boundaries.height;
          buildQuadrants(MAX_LEVEL, this.data);
        };
        QuadTree2.prototype.clear = function() {
          var _a;
          this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
          return this;
        };
        QuadTree2.prototype.point = function(x, y) {
          var nodes = this.containers[OUTSIDE_BLOCK];
          var block = 0, level = 0;
          do {
            if (this.containers[block])
              nodes.push.apply(nodes, __spreadArray([], __read(this.containers[block]), false));
            var quad = pointIsInQuad(x, y, this.data[block + X_OFFSET], this.data[block + Y_OFFSET], this.data[block + WIDTH_OFFSET], this.data[block + HEIGHT_OFFSET]);
            block = 4 * block + quad * BLOCKS;
            level++;
          } while (level <= MAX_LEVEL);
          return nodes;
        };
        QuadTree2.prototype.rectangle = function(x1, y1, x2, y2, height) {
          var _a;
          var lr = this.lastRectangle;
          if (lr && x1 === lr.x1 && x2 === lr.x2 && y1 === lr.y1 && y2 === lr.y2 && height === lr.height) {
            return this.cache;
          }
          this.lastRectangle = {
            x1,
            y1,
            x2,
            y2,
            height
          };
          if (!isRectangleAligned(this.lastRectangle))
            this.lastRectangle = getCircumscribedAlignedRectangle(this.lastRectangle);
          this.cache = getNodesInAxisAlignedRectangleArea(MAX_LEVEL, this.data, this.containers, x1, y1, Math.abs(x1 - x2) || Math.abs(y1 - y2), height);
          (_a = this.cache).push.apply(_a, __spreadArray([], __read(this.containers[OUTSIDE_BLOCK]), false));
          return this.cache;
        };
        return QuadTree2;
      }();
      exports.default = QuadTree;
    }
  });

  // node_modules/sigma/core/labels.js
  var require_labels = __commonJS({
    "node_modules/sigma/core/labels.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.edgeLabelsToDisplayFromNodes = exports.LabelGrid = void 0;
      var LabelCandidate = function() {
        function LabelCandidate2(key, size) {
          this.key = key;
          this.size = size;
        }
        LabelCandidate2.compare = function(first, second) {
          if (first.size > second.size)
            return -1;
          if (first.size < second.size)
            return 1;
          if (first.key > second.key)
            return 1;
          return -1;
        };
        return LabelCandidate2;
      }();
      var LabelGrid = function() {
        function LabelGrid2() {
          this.width = 0;
          this.height = 0;
          this.cellSize = 0;
          this.columns = 0;
          this.rows = 0;
          this.cells = {};
        }
        LabelGrid2.prototype.resizeAndClear = function(dimensions, cellSize) {
          this.width = dimensions.width;
          this.height = dimensions.height;
          this.cellSize = cellSize;
          this.columns = Math.ceil(dimensions.width / cellSize);
          this.rows = Math.ceil(dimensions.height / cellSize);
          this.cells = {};
        };
        LabelGrid2.prototype.getIndex = function(pos) {
          var xIndex = Math.floor(pos.x / this.cellSize);
          var yIndex = Math.floor(pos.y / this.cellSize);
          return yIndex * this.columns + xIndex;
        };
        LabelGrid2.prototype.add = function(key, size, pos) {
          var candidate = new LabelCandidate(key, size);
          var index = this.getIndex(pos);
          var cell = this.cells[index];
          if (!cell) {
            cell = [];
            this.cells[index] = cell;
          }
          cell.push(candidate);
        };
        LabelGrid2.prototype.organize = function() {
          for (var k in this.cells) {
            var cell = this.cells[k];
            cell.sort(LabelCandidate.compare);
          }
        };
        LabelGrid2.prototype.getLabelsToDisplay = function(ratio, density) {
          var cellArea = this.cellSize * this.cellSize;
          var scaledCellArea = cellArea / ratio / ratio;
          var scaledDensity = scaledCellArea * density / cellArea;
          var labelsToDisplayPerCell = Math.ceil(scaledDensity);
          var labels = [];
          for (var k in this.cells) {
            var cell = this.cells[k];
            for (var i = 0; i < Math.min(labelsToDisplayPerCell, cell.length); i++) {
              labels.push(cell[i].key);
            }
          }
          return labels;
        };
        return LabelGrid2;
      }();
      exports.LabelGrid = LabelGrid;
      function edgeLabelsToDisplayFromNodes(params) {
        var graph2 = params.graph, hoveredNode = params.hoveredNode, highlightedNodes = params.highlightedNodes, displayedNodeLabels = params.displayedNodeLabels;
        var worthyEdges = [];
        graph2.forEachEdge(function(edge, _, source, target) {
          if (source === hoveredNode || target === hoveredNode || highlightedNodes.has(source) || highlightedNodes.has(target) || displayedNodeLabels.has(source) && displayedNodeLabels.has(target)) {
            worthyEdges.push(edge);
          }
        });
        return worthyEdges;
      }
      exports.edgeLabelsToDisplayFromNodes = edgeLabelsToDisplayFromNodes;
    }
  });

  // node_modules/sigma/rendering/canvas/label.js
  var require_label = __commonJS({
    "node_modules/sigma/rendering/canvas/label.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function drawLabel(context, data, settings) {
        if (!data.label)
          return;
        var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight, color = settings.labelColor.attribute ? data[settings.labelColor.attribute] || settings.labelColor.color || "#000" : settings.labelColor.color;
        context.fillStyle = color;
        context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
        context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
      }
      exports.default = drawLabel;
    }
  });

  // node_modules/sigma/rendering/canvas/hover.js
  var require_hover = __commonJS({
    "node_modules/sigma/rendering/canvas/hover.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var label_1 = __importDefault(require_label());
      function drawHover(context, data, settings) {
        var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight;
        context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
        context.fillStyle = "#FFF";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = "#000";
        var PADDING = 2;
        if (typeof data.label === "string") {
          var textWidth = context.measureText(data.label).width, boxWidth = Math.round(textWidth + 5), boxHeight = Math.round(size + 2 * PADDING), radius = Math.max(data.size, size / 2) + PADDING;
          var angleRadian = Math.asin(boxHeight / 2 / radius);
          var xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2)));
          context.beginPath();
          context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
          context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
          context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
          context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
          context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
          context.closePath();
          context.fill();
        } else {
          context.beginPath();
          context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
          context.closePath();
          context.fill();
        }
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
        (0, label_1.default)(context, data, settings);
      }
      exports.default = drawHover;
    }
  });

  // node_modules/sigma/rendering/canvas/edge-label.js
  var require_edge_label = __commonJS({
    "node_modules/sigma/rendering/canvas/edge-label.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function drawEdgeLabel(context, edgeData, sourceData, targetData, settings) {
        var size = settings.edgeLabelSize, font = settings.edgeLabelFont, weight = settings.edgeLabelWeight, color = settings.edgeLabelColor.attribute ? edgeData[settings.edgeLabelColor.attribute] || settings.edgeLabelColor.color || "#000" : settings.edgeLabelColor.color;
        var label = edgeData.label;
        if (!label)
          return;
        context.fillStyle = color;
        context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
        var sSize = sourceData.size;
        var tSize = targetData.size;
        var sx = sourceData.x;
        var sy = sourceData.y;
        var tx = targetData.x;
        var ty = targetData.y;
        var cx = (sx + tx) / 2;
        var cy = (sy + ty) / 2;
        var dx = tx - sx;
        var dy = ty - sy;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < sSize + tSize)
          return;
        sx += dx * sSize / d;
        sy += dy * sSize / d;
        tx -= dx * tSize / d;
        ty -= dy * tSize / d;
        cx = (sx + tx) / 2;
        cy = (sy + ty) / 2;
        dx = tx - sx;
        dy = ty - sy;
        d = Math.sqrt(dx * dx + dy * dy);
        var textLength = context.measureText(label).width;
        if (textLength > d) {
          var ellipsis = "\u2026";
          label = label + ellipsis;
          textLength = context.measureText(label).width;
          while (textLength > d && label.length > 1) {
            label = label.slice(0, -2) + ellipsis;
            textLength = context.measureText(label).width;
          }
          if (label.length < 4)
            return;
        }
        var angle;
        if (dx > 0) {
          if (dy > 0)
            angle = Math.acos(dx / d);
          else
            angle = Math.asin(dy / d);
        } else {
          if (dy > 0)
            angle = Math.acos(dx / d) + Math.PI;
          else
            angle = Math.asin(dx / d) + Math.PI / 2;
        }
        context.save();
        context.translate(cx, cy);
        context.rotate(angle);
        context.fillText(label, -textLength / 2, edgeData.size / 2 + size);
        context.restore();
      }
      exports.default = drawEdgeLabel;
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/node.fast.vert.glsl.js
  var require_node_fast_vert_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/node.fast.vert.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var o = { d: (t2, e2) => {
          for (var n in e2)
            o.o(e2, n) && !o.o(t2, n) && Object.defineProperty(t2, n, { enumerable: true, get: e2[n] });
        }, o: (o2, t2) => Object.prototype.hasOwnProperty.call(o2, t2), r: (o2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(o2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o2, "__esModule", { value: true });
        } }, t = {};
        o.r(t), o.d(t, { default: () => e });
        const e = "attribute vec2 a_position;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform float u_ratio;\nuniform float u_scale;\nuniform mat3 u_matrix;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  gl_Position = vec4(\n    (u_matrix * vec3(a_position, 1)).xy,\n    0,\n    1\n  );\n\n  // Multiply the point size twice:\n  //  - x SCALING_RATIO to correct the canvas scaling\n  //  - x 2 to correct the formulae\n  gl_PointSize = a_size * u_ratio * u_scale * 2.0;\n\n  v_border = (1.0 / u_ratio) * (0.5 / a_size);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
        module.exports = t;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/node.fast.frag.glsl.js
  var require_node_fast_frag_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/node.fast.frag.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var e = { d: (n2, o2) => {
          for (var t in o2)
            e.o(o2, t) && !e.o(n2, t) && Object.defineProperty(n2, t, { enumerable: true, get: o2[t] });
        }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, n = {};
        e.r(n), e.d(n, { default: () => o });
        const o = "precision mediump float;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float radius = 0.5;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  vec2 m = gl_PointCoord - vec2(0.5, 0.5);\n  float dist = radius - length(m);\n\n  float t = 0.0;\n  if (dist > v_border)\n    t = 1.0;\n  else if (dist > 0.0)\n    t = dist / v_border;\n\n  gl_FragColor = mix(transparent, v_color, t);\n}\n";
        module.exports = n;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/utils.js
  var require_utils2 = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.loadProgram = exports.loadFragmentShader = exports.loadVertexShader = void 0;
      function loadShader(type, gl, source) {
        var glType = type === "VERTEX" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
        var shader = gl.createShader(glType);
        if (shader === null) {
          throw new Error("loadShader: error while creating the shader");
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var successfullyCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!successfullyCompiled) {
          var infoLog = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Error("loadShader: error while compiling the shader:\n".concat(infoLog, "\n").concat(source));
        }
        return shader;
      }
      function loadVertexShader(gl, source) {
        return loadShader("VERTEX", gl, source);
      }
      exports.loadVertexShader = loadVertexShader;
      function loadFragmentShader(gl, source) {
        return loadShader("FRAGMENT", gl, source);
      }
      exports.loadFragmentShader = loadFragmentShader;
      function loadProgram(gl, shaders) {
        var program = gl.createProgram();
        if (program === null) {
          throw new Error("loadProgram: error while creating the program.");
        }
        var i, l;
        for (i = 0, l = shaders.length; i < l; i++)
          gl.attachShader(program, shaders[i]);
        gl.linkProgram(program);
        var successfullyLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!successfullyLinked) {
          gl.deleteProgram(program);
          throw new Error("loadProgram: error while linking the program.");
        }
        return program;
      }
      exports.loadProgram = loadProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/programs/common/program.js
  var require_program = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/common/program.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AbstractProgram = void 0;
      var utils_1 = require_utils2();
      var AbstractProgram = function() {
        function AbstractProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          this.array = new Float32Array();
          this.points = points;
          this.attributes = attributes;
          this.gl = gl;
          this.vertexShaderSource = vertexShaderSource;
          this.fragmentShaderSource = fragmentShaderSource;
          var buffer = gl.createBuffer();
          if (buffer === null)
            throw new Error("AbstractProgram: error while creating the buffer");
          this.buffer = buffer;
          gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
          this.vertexShader = (0, utils_1.loadVertexShader)(gl, this.vertexShaderSource);
          this.fragmentShader = (0, utils_1.loadFragmentShader)(gl, this.fragmentShaderSource);
          this.program = (0, utils_1.loadProgram)(gl, [this.vertexShader, this.fragmentShader]);
        }
        AbstractProgram2.prototype.bufferData = function() {
          var gl = this.gl;
          gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
        };
        AbstractProgram2.prototype.allocate = function(capacity) {
          this.array = new Float32Array(this.points * this.attributes * capacity);
        };
        AbstractProgram2.prototype.hasNothingToRender = function() {
          return this.array.length === 0;
        };
        return AbstractProgram2;
      }();
      exports.AbstractProgram = AbstractProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/programs/common/node.js
  var require_node = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/common/node.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createNodeCompoundProgram = exports.AbstractNodeProgram = void 0;
      var program_1 = require_program();
      var AbstractNodeProgram = function(_super) {
        __extends(AbstractNodeProgram2, _super);
        function AbstractNodeProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          var _this = _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.sizeLocation = gl.getAttribLocation(_this.program, "a_size");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("AbstractNodeProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var ratioLocation = gl.getUniformLocation(_this.program, "u_ratio");
          if (ratioLocation === null)
            throw new Error("AbstractNodeProgram: error while getting ratioLocation");
          _this.ratioLocation = ratioLocation;
          var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
          if (scaleLocation === null)
            throw new Error("AbstractNodeProgram: error while getting scaleLocation");
          _this.scaleLocation = scaleLocation;
          return _this;
        }
        AbstractNodeProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.sizeLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, this.attributes * Float32Array.BYTES_PER_ELEMENT, 12);
        };
        return AbstractNodeProgram2;
      }(program_1.AbstractProgram);
      exports.AbstractNodeProgram = AbstractNodeProgram;
      function createNodeCompoundProgram(programClasses) {
        return function() {
          function NodeCompoundProgram(gl, renderer2) {
            this.programs = programClasses.map(function(ProgramClass) {
              return new ProgramClass(gl, renderer2);
            });
          }
          NodeCompoundProgram.prototype.bufferData = function() {
            this.programs.forEach(function(program) {
              return program.bufferData();
            });
          };
          NodeCompoundProgram.prototype.allocate = function(capacity) {
            this.programs.forEach(function(program) {
              return program.allocate(capacity);
            });
          };
          NodeCompoundProgram.prototype.bind = function() {
          };
          NodeCompoundProgram.prototype.render = function(params) {
            this.programs.forEach(function(program) {
              program.bind();
              program.bufferData();
              program.render(params);
            });
          };
          NodeCompoundProgram.prototype.process = function(data, hidden, offset) {
            this.programs.forEach(function(program) {
              return program.process(data, hidden, offset);
            });
          };
          return NodeCompoundProgram;
        }();
      }
      exports.createNodeCompoundProgram = createNodeCompoundProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/programs/node.fast.js
  var require_node_fast = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/node.fast.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils_1 = require_utils();
      var node_fast_vert_glsl_1 = __importDefault(require_node_fast_vert_glsl());
      var node_fast_frag_glsl_1 = __importDefault(require_node_fast_frag_glsl());
      var node_1 = require_node();
      var POINTS = 1;
      var ATTRIBUTES = 4;
      var NodeFastProgram = function(_super) {
        __extends(NodeFastProgram2, _super);
        function NodeFastProgram2(gl) {
          var _this = _super.call(this, gl, node_fast_vert_glsl_1.default, node_fast_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          _this.bind();
          return _this;
        }
        NodeFastProgram2.prototype.process = function(data, hidden, offset) {
          var array = this.array;
          var i = offset * POINTS * ATTRIBUTES;
          if (hidden) {
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            return;
          }
          var color = (0, utils_1.floatColor)(data.color);
          array[i++] = data.x;
          array[i++] = data.y;
          array[i++] = data.size;
          array[i] = color;
        };
        NodeFastProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
          gl.uniform1f(this.scaleLocation, params.scalingRatio);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
        };
        return NodeFastProgram2;
      }(node_1.AbstractNodeProgram);
      exports.default = NodeFastProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/edge.vert.glsl.js
  var require_edge_vert_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/edge.vert.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var e = { d: (n2, o2) => {
          for (var t in o2)
            e.o(o2, t) && !e.o(n2, t) && Object.defineProperty(n2, t, { enumerable: true, get: o2[t] });
        }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, n = {};
        e.r(n), e.d(n, { default: () => o });
        const o = 'attribute vec4 a_color;\nattribute vec2 a_normal;\nattribute vec2 a_position;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // We require edges to be at least `minThickness` pixels thick *on screen*\n  // (so we need to compensate the SQRT zoom ratio):\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n\n  // Then, we need to retrieve the normalized thickness of the edge in the WebGL\n  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction\n  // ratio:\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n\n  // Finally, we adapt the edge thickness to the "SQRT rule" in sigma (so that\n  // items are not too big when zoomed in, and not too small when zoomed out).\n  // The exact computation should be `adapted = value * zoom / sqrt(zoom)`, but\n  // it\'s simpler like this:\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(a_position + unitNormal * adaptedWebGLThickness, 1)).xy, 0, 1);\n\n  // For the fragment shader though, we need a thickness that takes the "magic"\n  // correction ratio into account (as in webGLThickness), but so that the\n  // antialiasint effect does not depend on the zoom level. So here\'s yet\n  // another thickness version:\n  v_thickness = webGLThickness / u_sqrtZoomRatio;\n\n  v_normal = unitNormal;\n  v_color = a_color;\n  v_color.a *= bias;\n}\n';
        module.exports = n;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/edge.frag.glsl.js
  var require_edge_frag_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/edge.frag.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var e = { d: (n2, t2) => {
          for (var o in t2)
            e.o(t2, o) && !e.o(n2, o) && Object.defineProperty(n2, o, { enumerable: true, get: t2[o] });
        }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, n = {};
        e.r(n), e.d(n, { default: () => t });
        const t = "precision mediump float;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float feather = 0.001;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  float dist = length(v_normal) * v_thickness;\n\n  float t = smoothstep(\n    v_thickness - feather,\n    v_thickness,\n    dist\n  );\n\n  gl_FragColor = mix(v_color, transparent, t);\n}\n";
        module.exports = n;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/programs/common/edge.js
  var require_edge = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/common/edge.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createEdgeCompoundProgram = exports.AbstractEdgeProgram = void 0;
      var program_1 = require_program();
      var AbstractEdgeProgram = function(_super) {
        __extends(AbstractEdgeProgram2, _super);
        function AbstractEdgeProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          return _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
        }
        return AbstractEdgeProgram2;
      }(program_1.AbstractProgram);
      exports.AbstractEdgeProgram = AbstractEdgeProgram;
      function createEdgeCompoundProgram(programClasses) {
        return function() {
          function EdgeCompoundProgram(gl, renderer2) {
            this.programs = programClasses.map(function(ProgramClass) {
              return new ProgramClass(gl, renderer2);
            });
          }
          EdgeCompoundProgram.prototype.bufferData = function() {
            this.programs.forEach(function(program) {
              return program.bufferData();
            });
          };
          EdgeCompoundProgram.prototype.allocate = function(capacity) {
            this.programs.forEach(function(program) {
              return program.allocate(capacity);
            });
          };
          EdgeCompoundProgram.prototype.bind = function() {
          };
          EdgeCompoundProgram.prototype.computeIndices = function() {
            this.programs.forEach(function(program) {
              return program.computeIndices();
            });
          };
          EdgeCompoundProgram.prototype.render = function(params) {
            this.programs.forEach(function(program) {
              program.bind();
              program.bufferData();
              program.render(params);
            });
          };
          EdgeCompoundProgram.prototype.process = function(sourceData, targetData, data, hidden, offset) {
            this.programs.forEach(function(program) {
              return program.process(sourceData, targetData, data, hidden, offset);
            });
          };
          return EdgeCompoundProgram;
        }();
      }
      exports.createEdgeCompoundProgram = createEdgeCompoundProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/programs/edge.js
  var require_edge2 = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/edge.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils_1 = require_utils();
      var edge_vert_glsl_1 = __importDefault(require_edge_vert_glsl());
      var edge_frag_glsl_1 = __importDefault(require_edge_frag_glsl());
      var edge_1 = require_edge();
      var POINTS = 4;
      var ATTRIBUTES = 5;
      var STRIDE = POINTS * ATTRIBUTES;
      var EdgeProgram = function(_super) {
        __extends(EdgeProgram2, _super);
        function EdgeProgram2(gl) {
          var _this = _super.call(this, gl, edge_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          var indicesBuffer = gl.createBuffer();
          if (indicesBuffer === null)
            throw new Error("EdgeProgram: error while creating indicesBuffer");
          _this.indicesBuffer = indicesBuffer;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeProgram: error while getting correctionRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeProgram: error while getting sqrtZoomRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
          _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
          _this.indicesArray = new _this.IndicesArray();
          _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
          _this.bind();
          return _this;
        }
        EdgeProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
        };
        EdgeProgram2.prototype.computeIndices = function() {
          var l = this.array.length / ATTRIBUTES;
          var size = l + l / 2;
          var indices = new this.IndicesArray(size);
          for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
          }
          this.indicesArray = indices;
        };
        EdgeProgram2.prototype.bufferData = function() {
          _super.prototype.bufferData.call(this);
          var gl = this.gl;
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
        };
        EdgeProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i] = color;
        };
        EdgeProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
        };
        return EdgeProgram2;
      }(edge_1.AbstractEdgeProgram);
      exports.default = EdgeProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.vert.glsl.js
  var require_edge_arrowHead_vert_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.vert.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var a = { d: (e2, t2) => {
          for (var o in t2)
            a.o(t2, o) && !a.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: t2[o] });
        }, o: (a2, e2) => Object.prototype.hasOwnProperty.call(a2, e2), r: (a2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a2, "__esModule", { value: true });
        } }, e = {};
        a.r(e), a.d(e, { default: () => t });
        const t = "attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_radius;\nattribute vec4 a_color;\nattribute vec3 a_barycentric;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\nconst float arrowHeadWidthLengthRatio = 0.66;\nconst float arrowHeadLengthThicknessRatio = 2.5;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl and\n  // edge.clamped.vert.glsl. Please read it to get better comments on what's\n  // happening:\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n  float adaptedWebGLNodeRadius = a_radius * 2.0 * u_correctionRatio * u_sqrtZoomRatio;\n  float adaptedWebGLArrowHeadLength = adaptedWebGLThickness * 2.0 * arrowHeadLengthThicknessRatio;\n  float adaptedWebGLArrowHeadHalfWidth = adaptedWebGLArrowHeadLength * arrowHeadWidthLengthRatio / 2.0;\n\n  float da = a_barycentric.x;\n  float db = a_barycentric.y;\n  float dc = a_barycentric.z;\n\n  vec2 delta = vec2(\n      da * (adaptedWebGLNodeRadius * unitNormal.y)\n    + db * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y + adaptedWebGLArrowHeadHalfWidth * unitNormal.x)\n    + dc * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y - adaptedWebGLArrowHeadHalfWidth * unitNormal.x),\n\n      da * (-adaptedWebGLNodeRadius * unitNormal.x)\n    + db * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x + adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\n    + dc * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x - adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\n  );\n\n  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
        module.exports = e;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.frag.glsl.js
  var require_edge_arrowHead_frag_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.frag.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var e = { d: (o2, r2) => {
          for (var t in r2)
            e.o(r2, t) && !e.o(o2, t) && Object.defineProperty(o2, t, { enumerable: true, get: r2[t] });
        }, o: (e2, o2) => Object.prototype.hasOwnProperty.call(e2, o2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, o = {};
        e.r(o), e.d(o, { default: () => r });
        const r = "precision mediump float;\n\nvarying vec4 v_color;\n\nvoid main(void) {\n  gl_FragColor = v_color;\n}\n";
        module.exports = o;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/programs/edge.arrowHead.js
  var require_edge_arrowHead = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/edge.arrowHead.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils_1 = require_utils();
      var edge_arrowHead_vert_glsl_1 = __importDefault(require_edge_arrowHead_vert_glsl());
      var edge_arrowHead_frag_glsl_1 = __importDefault(require_edge_arrowHead_frag_glsl());
      var edge_1 = require_edge();
      var POINTS = 3;
      var ATTRIBUTES = 9;
      var STRIDE = POINTS * ATTRIBUTES;
      var EdgeArrowHeadProgram = function(_super) {
        __extends(EdgeArrowHeadProgram2, _super);
        function EdgeArrowHeadProgram2(gl) {
          var _this = _super.call(this, gl, edge_arrowHead_vert_glsl_1.default, edge_arrowHead_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
          _this.barycentricLocation = gl.getAttribLocation(_this.program, "a_barycentric");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting sqrtZoomRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting correctionRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          _this.bind();
          return _this;
        }
        EdgeArrowHeadProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.radiusLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.enableVertexAttribArray(this.barycentricLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
          gl.vertexAttribPointer(this.barycentricLocation, 3, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 24);
        };
        EdgeArrowHeadProgram2.prototype.computeIndices = function() {
        };
        EdgeArrowHeadProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, radius = targetData.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 1;
          array[i++] = 0;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = 1;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = 0;
          array[i] = 1;
        };
        EdgeArrowHeadProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawArrays(gl.TRIANGLES, 0, this.array.length / ATTRIBUTES);
        };
        return EdgeArrowHeadProgram2;
      }(edge_1.AbstractEdgeProgram);
      exports.default = EdgeArrowHeadProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/shaders/edge.clamped.vert.glsl.js
  var require_edge_clamped_vert_glsl = __commonJS({
    "node_modules/sigma/rendering/webgl/shaders/edge.clamped.vert.glsl.js"(exports, module) {
      (() => {
        "use strict";
        var e = { d: (o2, n2) => {
          for (var t in n2)
            e.o(n2, t) && !e.o(o2, t) && Object.defineProperty(o2, t, { enumerable: true, get: n2[t] });
        }, o: (e2, o2) => Object.prototype.hasOwnProperty.call(e2, o2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, o = {};
        e.r(o), e.d(o, { default: () => n });
        const n = "attribute vec4 a_color;\nattribute vec2 a_normal;\nattribute vec2 a_position;\nattribute float a_radius;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\nconst float arrowHeadLengthThicknessRatio = 2.5;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl. Please read it to\n  // get better comments on what's happening:\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n\n  // Here, we move the point to leave space for the arrow head:\n  float direction = sign(a_radius);\n  float adaptedWebGLNodeRadius = direction * a_radius * 2.0 * u_correctionRatio * u_sqrtZoomRatio;\n  float adaptedWebGLArrowHeadLength = adaptedWebGLThickness * 2.0 * arrowHeadLengthThicknessRatio;\n\n  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength);\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(a_position + unitNormal * adaptedWebGLThickness + compensationVector, 1)).xy, 0, 1);\n\n  v_thickness = webGLThickness / u_sqrtZoomRatio;\n\n  v_normal = unitNormal;\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
        module.exports = o;
      })();
    }
  });

  // node_modules/sigma/rendering/webgl/programs/edge.clamped.js
  var require_edge_clamped = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/edge.clamped.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var edge_1 = require_edge();
      var utils_1 = require_utils();
      var edge_clamped_vert_glsl_1 = __importDefault(require_edge_clamped_vert_glsl());
      var edge_frag_glsl_1 = __importDefault(require_edge_frag_glsl());
      var POINTS = 4;
      var ATTRIBUTES = 6;
      var STRIDE = POINTS * ATTRIBUTES;
      var EdgeClampedProgram = function(_super) {
        __extends(EdgeClampedProgram2, _super);
        function EdgeClampedProgram2(gl) {
          var _this = _super.call(this, gl, edge_clamped_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          var indicesBuffer = gl.createBuffer();
          if (indicesBuffer === null)
            throw new Error("EdgeClampedProgram: error while getting resolutionLocation");
          _this.indicesBuffer = indicesBuffer;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeClampedProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting cameraRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting viewportRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
          _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
          _this.indicesArray = new _this.IndicesArray();
          _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
          _this.bind();
          return _this;
        }
        EdgeClampedProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.enableVertexAttribArray(this.radiusLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
          gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
        };
        EdgeClampedProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, radius = targetData.size || 1, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = radius;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i] = -radius;
        };
        EdgeClampedProgram2.prototype.computeIndices = function() {
          var l = this.array.length / ATTRIBUTES;
          var size = l + l / 2;
          var indices = new this.IndicesArray(size);
          for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
          }
          this.indicesArray = indices;
        };
        EdgeClampedProgram2.prototype.bufferData = function() {
          _super.prototype.bufferData.call(this);
          var gl = this.gl;
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
        };
        EdgeClampedProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
        };
        return EdgeClampedProgram2;
      }(edge_1.AbstractEdgeProgram);
      exports.default = EdgeClampedProgram;
    }
  });

  // node_modules/sigma/rendering/webgl/programs/edge.arrow.js
  var require_edge_arrow = __commonJS({
    "node_modules/sigma/rendering/webgl/programs/edge.arrow.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var edge_1 = require_edge();
      var edge_arrowHead_1 = __importDefault(require_edge_arrowHead());
      var edge_clamped_1 = __importDefault(require_edge_clamped());
      var EdgeArrowProgram = (0, edge_1.createEdgeCompoundProgram)([edge_clamped_1.default, edge_arrowHead_1.default]);
      exports.default = EdgeArrowProgram;
    }
  });

  // node_modules/sigma/settings.js
  var require_settings = __commonJS({
    "node_modules/sigma/settings.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DEFAULT_SETTINGS = exports.validateSettings = void 0;
      var label_1 = __importDefault(require_label());
      var hover_1 = __importDefault(require_hover());
      var edge_label_1 = __importDefault(require_edge_label());
      var node_fast_1 = __importDefault(require_node_fast());
      var edge_1 = __importDefault(require_edge2());
      var edge_arrow_1 = __importDefault(require_edge_arrow());
      function validateSettings(settings) {
        if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
          throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
        }
        var minCameraRatio = settings.minCameraRatio, maxCameraRatio = settings.maxCameraRatio;
        if (typeof minCameraRatio === "number" && typeof maxCameraRatio === "number" && maxCameraRatio < minCameraRatio) {
          throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
        }
      }
      exports.validateSettings = validateSettings;
      exports.DEFAULT_SETTINGS = {
        hideEdgesOnMove: false,
        hideLabelsOnMove: false,
        renderLabels: true,
        renderEdgeLabels: false,
        enableEdgeClickEvents: false,
        enableEdgeWheelEvents: false,
        enableEdgeHoverEvents: false,
        defaultNodeColor: "#999",
        defaultNodeType: "circle",
        defaultEdgeColor: "#ccc",
        defaultEdgeType: "line",
        labelFont: "Arial",
        labelSize: 14,
        labelWeight: "normal",
        labelColor: { color: "#000" },
        edgeLabelFont: "Arial",
        edgeLabelSize: 14,
        edgeLabelWeight: "normal",
        edgeLabelColor: { attribute: "color" },
        stagePadding: 30,
        labelDensity: 1,
        labelGridCellSize: 100,
        labelRenderedSizeThreshold: 6,
        nodeReducer: null,
        edgeReducer: null,
        zIndex: false,
        minCameraRatio: null,
        maxCameraRatio: null,
        labelRenderer: label_1.default,
        hoverRenderer: hover_1.default,
        edgeLabelRenderer: edge_label_1.default,
        allowInvalidContainer: false,
        nodeProgramClasses: {
          circle: node_fast_1.default
        },
        edgeProgramClasses: {
          arrow: edge_arrow_1.default,
          line: edge_1.default
        }
      };
    }
  });

  // node_modules/sigma/core/captors/touch.js
  var require_touch = __commonJS({
    "node_modules/sigma/core/captors/touch.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var captor_1 = __importStar(require_captor());
      var DRAG_TIMEOUT = 200;
      var TOUCH_INERTIA_RATIO = 3;
      var TOUCH_INERTIA_DURATION = 200;
      var TouchCaptor = function(_super) {
        __extends(TouchCaptor2, _super);
        function TouchCaptor2(container2, renderer2) {
          var _this = _super.call(this, container2, renderer2) || this;
          _this.enabled = true;
          _this.isMoving = false;
          _this.touchMode = 0;
          _this.handleStart = _this.handleStart.bind(_this);
          _this.handleLeave = _this.handleLeave.bind(_this);
          _this.handleMove = _this.handleMove.bind(_this);
          container2.addEventListener("touchstart", _this.handleStart, false);
          container2.addEventListener("touchend", _this.handleLeave, false);
          container2.addEventListener("touchcancel", _this.handleLeave, false);
          container2.addEventListener("touchmove", _this.handleMove, false);
          return _this;
        }
        TouchCaptor2.prototype.kill = function() {
          var container2 = this.container;
          container2.removeEventListener("touchstart", this.handleStart);
          container2.removeEventListener("touchend", this.handleLeave);
          container2.removeEventListener("touchcancel", this.handleLeave);
          container2.removeEventListener("touchmove", this.handleMove);
        };
        TouchCaptor2.prototype.getDimensions = function() {
          return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight
          };
        };
        TouchCaptor2.prototype.dispatchRelatedMouseEvent = function(type, e, position, emitter) {
          var mousePosition = position || (0, captor_1.getPosition)(e.touches[0], this.container);
          var mouseEvent = new MouseEvent(type, {
            clientX: mousePosition.x,
            clientY: mousePosition.y,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey
          });
          mouseEvent.isFakeSigmaMouseEvent = true;
          (emitter || this.container).dispatchEvent(mouseEvent);
        };
        TouchCaptor2.prototype.handleStart = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousedown", e);
          var touches = (0, captor_1.getTouchesArray)(e.touches);
          this.isMoving = true;
          this.touchMode = touches.length;
          this.startCameraState = this.renderer.getCamera().getState();
          this.startTouchesPositions = touches.map(function(touch) {
            return (0, captor_1.getPosition)(touch, _this.container);
          });
          this.lastTouchesPositions = this.startTouchesPositions;
          if (this.touchMode === 2) {
            var _a = __read(this.startTouchesPositions, 2), _b = _a[0], x0 = _b.x, y0 = _b.y, _c = _a[1], x1 = _c.x, y1 = _c.y;
            this.startTouchesAngle = Math.atan2(y1 - y0, x1 - x0);
            this.startTouchesDistance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
          }
          this.emit("touchdown", (0, captor_1.getTouchCoords)(e, this.container));
        };
        TouchCaptor2.prototype.handleLeave = function(e) {
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 0 && this.lastTouchesPositions && this.lastTouchesPositions.length) {
            this.dispatchRelatedMouseEvent("mouseup", e, this.lastTouchesPositions[0], document);
            this.dispatchRelatedMouseEvent("click", e, this.lastTouchesPositions[0]);
          }
          if (this.movingTimeout) {
            this.isMoving = false;
            clearTimeout(this.movingTimeout);
          }
          switch (this.touchMode) {
            case 2:
              if (e.touches.length === 1) {
                this.handleStart(e);
                e.preventDefault();
                break;
              }
            case 1:
              if (this.isMoving) {
                var camera = this.renderer.getCamera();
                var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
                camera.animate({
                  x: cameraState.x + TOUCH_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
                  y: cameraState.y + TOUCH_INERTIA_RATIO * (cameraState.y - previousCameraState.y)
                }, {
                  duration: TOUCH_INERTIA_DURATION,
                  easing: "quadraticOut"
                });
              }
              this.isMoving = false;
              this.touchMode = 0;
              break;
          }
          this.emit("touchup", (0, captor_1.getTouchCoords)(e, this.container));
        };
        TouchCaptor2.prototype.handleMove = function(e) {
          var _a;
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousemove", e);
          var camera = this.renderer.getCamera();
          var startCameraState = this.startCameraState;
          var touches = (0, captor_1.getTouchesArray)(e.touches);
          var touchesPositions = touches.map(function(touch) {
            return (0, captor_1.getPosition)(touch, _this.container);
          });
          this.lastTouchesPositions = touchesPositions;
          this.isMoving = true;
          if (this.movingTimeout)
            clearTimeout(this.movingTimeout);
          this.movingTimeout = window.setTimeout(function() {
            _this.isMoving = false;
          }, DRAG_TIMEOUT);
          switch (this.touchMode) {
            case 1: {
              var _b = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), xStart = _b.x, yStart = _b.y;
              var _c = this.renderer.viewportToFramedGraph(touchesPositions[0]), x = _c.x, y = _c.y;
              camera.setState({
                x: startCameraState.x + xStart - x,
                y: startCameraState.y + yStart - y
              });
              break;
            }
            case 2: {
              var newCameraState = {};
              var _d = touchesPositions[0], x0 = _d.x, y0 = _d.y;
              var _e = touchesPositions[1], x1 = _e.x, y1 = _e.y;
              var angleDiff = Math.atan2(y1 - y0, x1 - x0) - this.startTouchesAngle;
              var ratioDiff = Math.hypot(y1 - y0, x1 - x0) / this.startTouchesDistance;
              var newRatio = camera.getBoundedRatio(startCameraState.ratio / ratioDiff);
              newCameraState.ratio = newRatio;
              newCameraState.angle = startCameraState.angle + angleDiff;
              var dimensions = this.getDimensions();
              var touchGraphPosition = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], { cameraState: startCameraState });
              var smallestDimension = Math.min(dimensions.width, dimensions.height);
              var dx = smallestDimension / dimensions.width;
              var dy = smallestDimension / dimensions.height;
              var ratio = newRatio / smallestDimension;
              var x = x0 - smallestDimension / 2 / dx;
              var y = y0 - smallestDimension / 2 / dy;
              _a = __read([
                x * Math.cos(-newCameraState.angle) - y * Math.sin(-newCameraState.angle),
                y * Math.cos(-newCameraState.angle) + x * Math.sin(-newCameraState.angle)
              ], 2), x = _a[0], y = _a[1];
              newCameraState.x = touchGraphPosition.x - x * ratio;
              newCameraState.y = touchGraphPosition.y + y * ratio;
              camera.setState(newCameraState);
              break;
            }
          }
          this.emit("touchmove", (0, captor_1.getTouchCoords)(e, this.container));
        };
        return TouchCaptor2;
      }(captor_1.default);
      exports.default = TouchCaptor;
    }
  });

  // node_modules/sigma/utils/edge-collisions.js
  var require_edge_collisions = __commonJS({
    "node_modules/sigma/utils/edge-collisions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doEdgeCollideWithPoint = exports.isPixelColored = void 0;
      function isPixelColored(gl, x, y) {
        var pixels = new Uint8Array(4);
        gl.readPixels(x, gl.drawingBufferHeight - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return pixels[3] > 0;
      }
      exports.isPixelColored = isPixelColored;
      function doEdgeCollideWithPoint(x, y, xS, yS, xT, yT, thickness) {
        if (x < xS - thickness && x < xT - thickness)
          return false;
        if (y < yS - thickness && y < yT - thickness)
          return false;
        if (x > xS + thickness && x > xT + thickness)
          return false;
        if (y > yS + thickness && y > yT + thickness)
          return false;
        var distance = Math.abs((xT - xS) * (yS - y) - (xS - x) * (yT - yS)) / Math.sqrt(Math.pow(xT - xS, 2) + Math.pow(yT - yS, 2));
        return distance < thickness / 2;
      }
      exports.doEdgeCollideWithPoint = doEdgeCollideWithPoint;
    }
  });

  // node_modules/sigma/sigma.js
  var require_sigma = __commonJS({
    "node_modules/sigma/sigma.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var camera_1 = __importDefault(require_camera());
      var mouse_1 = __importDefault(require_mouse());
      var quadtree_1 = __importDefault(require_quadtree());
      var types_1 = require_types();
      var utils_1 = require_utils();
      var labels_1 = require_labels();
      var settings_1 = require_settings();
      var touch_1 = __importDefault(require_touch());
      var matrices_1 = require_matrices();
      var edge_collisions_1 = require_edge_collisions();
      function applyNodeDefaults(settings, key, data) {
        if (!data.hasOwnProperty("x") || !data.hasOwnProperty("y"))
          throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(key, '". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));
        if (!data.color)
          data.color = settings.defaultNodeColor;
        if (!data.label && data.label !== "")
          data.label = null;
        if (data.label !== void 0 && data.label !== null)
          data.label = "" + data.label;
        else
          data.label = null;
        if (!data.size)
          data.size = 2;
        if (!data.hasOwnProperty("hidden"))
          data.hidden = false;
        if (!data.hasOwnProperty("highlighted"))
          data.highlighted = false;
        if (!data.hasOwnProperty("forceLabel"))
          data.forceLabel = false;
        if (!data.type || data.type === "")
          data.type = settings.defaultNodeType;
        if (!data.zIndex)
          data.zIndex = 0;
        return data;
      }
      function applyEdgeDefaults(settings, key, data) {
        if (!data.color)
          data.color = settings.defaultEdgeColor;
        if (!data.label)
          data.label = "";
        if (!data.size)
          data.size = 0.5;
        if (!data.hasOwnProperty("hidden"))
          data.hidden = false;
        if (!data.hasOwnProperty("forceLabel"))
          data.forceLabel = false;
        if (!data.type || data.type === "")
          data.type = settings.defaultEdgeType;
        if (!data.zIndex)
          data.zIndex = 0;
        return data;
      }
      var Sigma2 = function(_super) {
        __extends(Sigma3, _super);
        function Sigma3(graph2, container2, settings) {
          if (settings === void 0) {
            settings = {};
          }
          var _this = _super.call(this) || this;
          _this.elements = {};
          _this.canvasContexts = {};
          _this.webGLContexts = {};
          _this.activeListeners = {};
          _this.quadtree = new quadtree_1.default();
          _this.labelGrid = new labels_1.LabelGrid();
          _this.nodeDataCache = {};
          _this.edgeDataCache = {};
          _this.nodesWithForcedLabels = [];
          _this.edgesWithForcedLabels = [];
          _this.nodeExtent = { x: [0, 1], y: [0, 1] };
          _this.matrix = (0, matrices_1.identity)();
          _this.invMatrix = (0, matrices_1.identity)();
          _this.correctionRatio = 1;
          _this.customBBox = null;
          _this.normalizationFunction = (0, utils_1.createNormalizationFunction)({
            x: [0, 1],
            y: [0, 1]
          });
          _this.cameraSizeRatio = 1;
          _this.width = 0;
          _this.height = 0;
          _this.pixelRatio = (0, utils_1.getPixelRatio)();
          _this.displayedLabels = /* @__PURE__ */ new Set();
          _this.highlightedNodes = /* @__PURE__ */ new Set();
          _this.hoveredNode = null;
          _this.hoveredEdge = null;
          _this.renderFrame = null;
          _this.renderHighlightedNodesFrame = null;
          _this.needToProcess = false;
          _this.needToSoftProcess = false;
          _this.checkEdgesEventsFrame = null;
          _this.nodePrograms = {};
          _this.hoverNodePrograms = {};
          _this.edgePrograms = {};
          _this.settings = (0, utils_1.assign)({}, settings_1.DEFAULT_SETTINGS, settings);
          (0, settings_1.validateSettings)(_this.settings);
          (0, utils_1.validateGraph)(graph2);
          if (!(container2 instanceof HTMLElement))
            throw new Error("Sigma: container should be an html element.");
          _this.graph = graph2;
          _this.container = container2;
          _this.createWebGLContext("edges", { preserveDrawingBuffer: true });
          _this.createCanvasContext("edgeLabels");
          _this.createWebGLContext("nodes");
          _this.createCanvasContext("labels");
          _this.createCanvasContext("hovers");
          _this.createWebGLContext("hoverNodes");
          _this.createCanvasContext("mouse");
          for (var key in _this.webGLContexts) {
            var gl = _this.webGLContexts[key];
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
          }
          for (var type in _this.settings.nodeProgramClasses) {
            var NodeProgramClass = _this.settings.nodeProgramClasses[type];
            _this.nodePrograms[type] = new NodeProgramClass(_this.webGLContexts.nodes, _this);
            _this.hoverNodePrograms[type] = new NodeProgramClass(_this.webGLContexts.hoverNodes, _this);
          }
          for (var type in _this.settings.edgeProgramClasses) {
            var EdgeProgramClass = _this.settings.edgeProgramClasses[type];
            _this.edgePrograms[type] = new EdgeProgramClass(_this.webGLContexts.edges, _this);
          }
          _this.resize();
          _this.camera = new camera_1.default();
          _this.bindCameraHandlers();
          _this.mouseCaptor = new mouse_1.default(_this.elements.mouse, _this);
          _this.touchCaptor = new touch_1.default(_this.elements.mouse, _this);
          _this.bindEventHandlers();
          _this.bindGraphHandlers();
          _this.handleSettingsUpdate();
          _this.process();
          _this.render();
          return _this;
        }
        Sigma3.prototype.createCanvas = function(id) {
          var canvas = (0, utils_1.createElement)("canvas", {
            position: "absolute"
          }, {
            class: "sigma-".concat(id)
          });
          this.elements[id] = canvas;
          this.container.appendChild(canvas);
          return canvas;
        };
        Sigma3.prototype.createCanvasContext = function(id) {
          var canvas = this.createCanvas(id);
          var contextOptions = {
            preserveDrawingBuffer: false,
            antialias: false
          };
          this.canvasContexts[id] = canvas.getContext("2d", contextOptions);
          return this;
        };
        Sigma3.prototype.createWebGLContext = function(id, options) {
          var canvas = this.createCanvas(id);
          var contextOptions = __assign({ preserveDrawingBuffer: false, antialias: false }, options || {});
          var context;
          context = canvas.getContext("webgl2", contextOptions);
          if (!context)
            context = canvas.getContext("webgl", contextOptions);
          if (!context)
            context = canvas.getContext("experimental-webgl", contextOptions);
          this.webGLContexts[id] = context;
          return this;
        };
        Sigma3.prototype.bindCameraHandlers = function() {
          var _this = this;
          this.activeListeners.camera = function() {
            _this._scheduleRefresh();
          };
          this.camera.on("updated", this.activeListeners.camera);
          return this;
        };
        Sigma3.prototype.mouseIsOnNode = function(_a, _b, size) {
          var x = _a.x, y = _a.y;
          var nodeX = _b.x, nodeY = _b.y;
          return x > nodeX - size && x < nodeX + size && y > nodeY - size && y < nodeY + size && Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)) < size;
        };
        Sigma3.prototype.getQuadNodes = function(position) {
          var mouseGraphPosition = this.viewportToFramedGraph(position);
          return this.quadtree.point(mouseGraphPosition.x, 1 - mouseGraphPosition.y);
        };
        Sigma3.prototype.getNodeAtPosition = function(position) {
          var x = position.x, y = position.y;
          var quadNodes = this.getQuadNodes(position);
          var minDistance = Infinity, nodeAtPosition = null;
          for (var i = 0, l = quadNodes.length; i < l; i++) {
            var node = quadNodes[i];
            var data = this.nodeDataCache[node];
            var nodePosition = this.framedGraphToViewport(data);
            var size = this.scaleSize(data.size);
            if (!data.hidden && this.mouseIsOnNode(position, nodePosition, size)) {
              var distance = Math.sqrt(Math.pow(x - nodePosition.x, 2) + Math.pow(y - nodePosition.y, 2));
              if (distance < minDistance) {
                minDistance = distance;
                nodeAtPosition = node;
              }
            }
          }
          return nodeAtPosition;
        };
        Sigma3.prototype.bindEventHandlers = function() {
          var _this = this;
          this.activeListeners.handleResize = function() {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
          };
          window.addEventListener("resize", this.activeListeners.handleResize);
          this.activeListeners.handleMove = function(e) {
            var baseEvent = {
              event: e,
              preventSigmaDefault: function() {
                e.preventSigmaDefault();
              }
            };
            var nodeToHover = _this.getNodeAtPosition(e);
            if (nodeToHover && _this.hoveredNode !== nodeToHover && !_this.nodeDataCache[nodeToHover].hidden) {
              if (_this.hoveredNode)
                _this.emit("leaveNode", __assign(__assign({}, baseEvent), { node: _this.hoveredNode }));
              _this.hoveredNode = nodeToHover;
              _this.emit("enterNode", __assign(__assign({}, baseEvent), { node: nodeToHover }));
              _this.scheduleHighlightedNodesRender();
              return;
            }
            if (_this.hoveredNode) {
              var data = _this.nodeDataCache[_this.hoveredNode];
              var pos = _this.framedGraphToViewport(data);
              var size = _this.scaleSize(data.size);
              if (!_this.mouseIsOnNode(e, pos, size)) {
                var node = _this.hoveredNode;
                _this.hoveredNode = null;
                _this.emit("leaveNode", __assign(__assign({}, baseEvent), { node }));
                _this.scheduleHighlightedNodesRender();
                return;
              }
            }
            if (_this.settings.enableEdgeHoverEvents === true) {
              _this.checkEdgeHoverEvents(baseEvent);
            } else if (_this.settings.enableEdgeHoverEvents === "debounce") {
              if (!_this.checkEdgesEventsFrame)
                _this.checkEdgesEventsFrame = (0, utils_1.requestFrame)(function() {
                  _this.checkEdgeHoverEvents(baseEvent);
                  _this.checkEdgesEventsFrame = null;
                });
            }
          };
          var createMouseListener = function(eventType) {
            return function(e) {
              var baseEvent = {
                event: e,
                preventSigmaDefault: function() {
                  e.preventSigmaDefault();
                }
              };
              var isFakeSigmaMouseEvent = e.original.isFakeSigmaMouseEvent;
              var nodeAtPosition = isFakeSigmaMouseEvent ? _this.getNodeAtPosition(e) : _this.hoveredNode;
              if (nodeAtPosition)
                return _this.emit("".concat(eventType, "Node"), __assign(__assign({}, baseEvent), { node: nodeAtPosition }));
              if (eventType === "wheel" ? _this.settings.enableEdgeWheelEvents : _this.settings.enableEdgeClickEvents) {
                var edge = _this.getEdgeAtPoint(e.x, e.y);
                if (edge)
                  return _this.emit("".concat(eventType, "Edge"), __assign(__assign({}, baseEvent), { edge }));
              }
              return _this.emit("".concat(eventType, "Stage"), baseEvent);
            };
          };
          this.activeListeners.handleClick = createMouseListener("click");
          this.activeListeners.handleRightClick = createMouseListener("rightClick");
          this.activeListeners.handleDoubleClick = createMouseListener("doubleClick");
          this.activeListeners.handleWheel = createMouseListener("wheel");
          this.activeListeners.handleDown = createMouseListener("down");
          this.mouseCaptor.on("mousemove", this.activeListeners.handleMove);
          this.mouseCaptor.on("click", this.activeListeners.handleClick);
          this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick);
          this.mouseCaptor.on("doubleClick", this.activeListeners.handleDoubleClick);
          this.mouseCaptor.on("wheel", this.activeListeners.handleWheel);
          this.mouseCaptor.on("mousedown", this.activeListeners.handleDown);
          return this;
        };
        Sigma3.prototype.bindGraphHandlers = function() {
          var _this = this;
          var graph2 = this.graph;
          this.activeListeners.graphUpdate = function() {
            _this.needToProcess = true;
            _this._scheduleRefresh();
          };
          this.activeListeners.softGraphUpdate = function() {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
          };
          this.activeListeners.dropNodeGraphUpdate = function(e) {
            delete _this.nodeDataCache[e.key];
            if (_this.hoveredNode === e.key)
              _this.hoveredNode = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.dropEdgeGraphUpdate = function(e) {
            delete _this.edgeDataCache[e.key];
            if (_this.hoveredEdge === e.key)
              _this.hoveredEdge = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.clearEdgesGraphUpdate = function() {
            _this.edgeDataCache = {};
            _this.hoveredEdge = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.clearGraphUpdate = function() {
            _this.nodeDataCache = {};
            _this.hoveredNode = null;
            _this.activeListeners.clearEdgesGraphUpdate();
          };
          graph2.on("nodeAdded", this.activeListeners.graphUpdate);
          graph2.on("nodeDropped", this.activeListeners.dropNodeGraphUpdate);
          graph2.on("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph2.on("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
          graph2.on("edgeAdded", this.activeListeners.graphUpdate);
          graph2.on("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
          graph2.on("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph2.on("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
          graph2.on("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
          graph2.on("cleared", this.activeListeners.clearGraphUpdate);
          return this;
        };
        Sigma3.prototype.checkEdgeHoverEvents = function(payload) {
          var edgeToHover = this.hoveredNode ? null : this.getEdgeAtPoint(payload.event.x, payload.event.y);
          if (edgeToHover !== this.hoveredEdge) {
            if (this.hoveredEdge)
              this.emit("leaveEdge", __assign(__assign({}, payload), { edge: this.hoveredEdge }));
            if (edgeToHover)
              this.emit("enterEdge", __assign(__assign({}, payload), { edge: edgeToHover }));
            this.hoveredEdge = edgeToHover;
          }
          return this;
        };
        Sigma3.prototype.getEdgeAtPoint = function(x, y) {
          var e_1, _a;
          var _this = this;
          var _b = this, edgeDataCache = _b.edgeDataCache, nodeDataCache = _b.nodeDataCache;
          if (!(0, edge_collisions_1.isPixelColored)(this.webGLContexts.edges, x * this.pixelRatio, y * this.pixelRatio))
            return null;
          var _c = this.viewportToGraph({ x, y }), graphX = _c.x, graphY = _c.y;
          var transformationRatio = 0;
          this.graph.someEdge(function(key, _, sourceId, targetId, _a2, _b2) {
            var xs = _a2.x, ys = _a2.y;
            var xt = _b2.x, yt = _b2.y;
            if (edgeDataCache[key].hidden || nodeDataCache[sourceId].hidden || nodeDataCache[targetId].hidden)
              return false;
            if (xs !== xt || ys !== yt) {
              var graphLength = Math.sqrt(Math.pow(xt - xs, 2) + Math.pow(yt - ys, 2));
              var _c2 = _this.graphToViewport({ x: xs, y: ys }), vp_xs = _c2.x, vp_ys = _c2.y;
              var _d = _this.graphToViewport({ x: xt, y: yt }), vp_xt = _d.x, vp_yt = _d.y;
              var viewportLength = Math.sqrt(Math.pow(vp_xt - vp_xs, 2) + Math.pow(vp_yt - vp_ys, 2));
              transformationRatio = graphLength / viewportLength;
              return true;
            }
          });
          if (!transformationRatio)
            return null;
          var edges = this.graph.filterEdges(function(key, edgeAttributes, sourceId, targetId, sourcePosition, targetPosition) {
            if (edgeDataCache[key].hidden || nodeDataCache[sourceId].hidden || nodeDataCache[targetId].hidden)
              return false;
            if ((0, edge_collisions_1.doEdgeCollideWithPoint)(
              graphX,
              graphY,
              sourcePosition.x,
              sourcePosition.y,
              targetPosition.x,
              targetPosition.y,
              edgeDataCache[key].size * transformationRatio / _this.cameraSizeRatio
            )) {
              return true;
            }
          });
          if (edges.length === 0)
            return null;
          var selectedEdge = edges[edges.length - 1];
          var highestZIndex = -Infinity;
          try {
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
              var edge = edges_1_1.value;
              var zIndex = this.graph.getEdgeAttribute(edge, "zIndex");
              if (zIndex >= highestZIndex) {
                selectedEdge = edge;
                highestZIndex = zIndex;
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return))
                _a.call(edges_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return selectedEdge;
        };
        Sigma3.prototype.process = function(keepArrays) {
          var _this = this;
          if (keepArrays === void 0) {
            keepArrays = false;
          }
          var graph2 = this.graph;
          var settings = this.settings;
          var dimensions = this.getDimensions();
          var nodeZExtent = [Infinity, -Infinity];
          var edgeZExtent = [Infinity, -Infinity];
          this.quadtree.clear();
          this.labelGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
          this.highlightedNodes = /* @__PURE__ */ new Set();
          this.nodeExtent = (0, utils_1.graphExtent)(graph2);
          this.nodesWithForcedLabels = [];
          this.edgesWithForcedLabels = [];
          var nullCamera = new camera_1.default();
          var nullCameraMatrix = (0, utils_1.matrixFromCamera)(nullCamera.getState(), this.getDimensions(), this.getGraphDimensions(), this.getSetting("stagePadding") || 0);
          this.normalizationFunction = (0, utils_1.createNormalizationFunction)(this.customBBox || this.nodeExtent);
          var nodesPerPrograms = {};
          var nodes = graph2.nodes();
          for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var attr = Object.assign({}, graph2.getNodeAttributes(node));
            if (settings.nodeReducer)
              attr = settings.nodeReducer(node, attr);
            var data = applyNodeDefaults(this.settings, node, attr);
            nodesPerPrograms[data.type] = (nodesPerPrograms[data.type] || 0) + 1;
            this.nodeDataCache[node] = data;
            this.normalizationFunction.applyTo(data);
            if (data.forceLabel)
              this.nodesWithForcedLabels.push(node);
            if (this.settings.zIndex) {
              if (data.zIndex < nodeZExtent[0])
                nodeZExtent[0] = data.zIndex;
              if (data.zIndex > nodeZExtent[1])
                nodeZExtent[1] = data.zIndex;
            }
          }
          for (var type in this.nodePrograms) {
            if (!this.nodePrograms.hasOwnProperty(type)) {
              throw new Error('Sigma: could not find a suitable program for node type "'.concat(type, '"!'));
            }
            if (!keepArrays)
              this.nodePrograms[type].allocate(nodesPerPrograms[type] || 0);
            nodesPerPrograms[type] = 0;
          }
          if (this.settings.zIndex && nodeZExtent[0] !== nodeZExtent[1])
            nodes = (0, utils_1.zIndexOrdering)(nodeZExtent, function(node2) {
              return _this.nodeDataCache[node2].zIndex;
            }, nodes);
          for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var data = this.nodeDataCache[node];
            this.quadtree.add(node, data.x, 1 - data.y, data.size / this.width);
            if (typeof data.label === "string" && !data.hidden)
              this.labelGrid.add(node, data.size, this.framedGraphToViewport(data, { matrix: nullCameraMatrix }));
            this.nodePrograms[data.type].process(data, data.hidden, nodesPerPrograms[data.type]++);
            if (data.highlighted && !data.hidden)
              this.highlightedNodes.add(node);
          }
          this.labelGrid.organize();
          var edgesPerPrograms = {};
          var edges = graph2.edges();
          for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            var attr = Object.assign({}, graph2.getEdgeAttributes(edge));
            if (settings.edgeReducer)
              attr = settings.edgeReducer(edge, attr);
            var data = applyEdgeDefaults(this.settings, edge, attr);
            edgesPerPrograms[data.type] = (edgesPerPrograms[data.type] || 0) + 1;
            this.edgeDataCache[edge] = data;
            if (data.forceLabel && !data.hidden)
              this.edgesWithForcedLabels.push(edge);
            if (this.settings.zIndex) {
              if (data.zIndex < edgeZExtent[0])
                edgeZExtent[0] = data.zIndex;
              if (data.zIndex > edgeZExtent[1])
                edgeZExtent[1] = data.zIndex;
            }
          }
          for (var type in this.edgePrograms) {
            if (!this.edgePrograms.hasOwnProperty(type)) {
              throw new Error('Sigma: could not find a suitable program for edge type "'.concat(type, '"!'));
            }
            if (!keepArrays)
              this.edgePrograms[type].allocate(edgesPerPrograms[type] || 0);
            edgesPerPrograms[type] = 0;
          }
          if (this.settings.zIndex && edgeZExtent[0] !== edgeZExtent[1])
            edges = (0, utils_1.zIndexOrdering)(edgeZExtent, function(edge2) {
              return _this.edgeDataCache[edge2].zIndex;
            }, edges);
          for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            var data = this.edgeDataCache[edge];
            var extremities = graph2.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]];
            var hidden = data.hidden || sourceData.hidden || targetData.hidden;
            this.edgePrograms[data.type].process(sourceData, targetData, data, hidden, edgesPerPrograms[data.type]++);
          }
          for (var type in this.edgePrograms) {
            var program = this.edgePrograms[type];
            if (!keepArrays && typeof program.computeIndices === "function")
              program.computeIndices();
          }
          return this;
        };
        Sigma3.prototype.handleSettingsUpdate = function() {
          this.camera.minRatio = this.settings.minCameraRatio;
          this.camera.maxRatio = this.settings.maxCameraRatio;
          this.camera.setState(this.camera.validateState(this.camera.getState()));
          return this;
        };
        Sigma3.prototype._refresh = function() {
          if (this.needToProcess) {
            this.process();
          } else if (this.needToSoftProcess) {
            this.process(true);
          }
          this.needToProcess = false;
          this.needToSoftProcess = false;
          this.render();
          return this;
        };
        Sigma3.prototype._scheduleRefresh = function() {
          var _this = this;
          if (!this.renderFrame) {
            this.renderFrame = (0, utils_1.requestFrame)(function() {
              _this._refresh();
              _this.renderFrame = null;
            });
          }
          return this;
        };
        Sigma3.prototype.renderLabels = function() {
          if (!this.settings.renderLabels)
            return this;
          var cameraState = this.camera.getState();
          var visibleNodes;
          if (cameraState.ratio >= 1) {
            visibleNodes = new Set(this.graph.nodes());
          } else {
            var viewRectangle = this.viewRectangle();
            visibleNodes = new Set(this.quadtree.rectangle(viewRectangle.x1, 1 - viewRectangle.y1, viewRectangle.x2, 1 - viewRectangle.y2, viewRectangle.height));
          }
          var labelsToDisplay = this.labelGrid.getLabelsToDisplay(cameraState.ratio, this.settings.labelDensity).concat(this.nodesWithForcedLabels);
          this.displayedLabels = /* @__PURE__ */ new Set();
          var context = this.canvasContexts.labels;
          for (var i = 0, l = labelsToDisplay.length; i < l; i++) {
            var node = labelsToDisplay[i];
            var data = this.nodeDataCache[node];
            if (this.displayedLabels.has(node))
              continue;
            if (data.hidden)
              continue;
            var _a = this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            var size = this.scaleSize(data.size);
            if (!data.forceLabel && size < this.settings.labelRenderedSizeThreshold)
              continue;
            if (!visibleNodes.has(node))
              continue;
            this.displayedLabels.add(node);
            this.settings.labelRenderer(context, __assign(__assign({ key: node }, data), { size, x, y }), this.settings);
          }
          return this;
        };
        Sigma3.prototype.renderEdgeLabels = function() {
          if (!this.settings.renderEdgeLabels)
            return this;
          var context = this.canvasContexts.edgeLabels;
          context.clearRect(0, 0, this.width, this.height);
          var edgeLabelsToDisplay = (0, labels_1.edgeLabelsToDisplayFromNodes)({
            graph: this.graph,
            hoveredNode: this.hoveredNode,
            displayedNodeLabels: this.displayedLabels,
            highlightedNodes: this.highlightedNodes
          }).concat(this.edgesWithForcedLabels);
          var displayedLabels = /* @__PURE__ */ new Set();
          for (var i = 0, l = edgeLabelsToDisplay.length; i < l; i++) {
            var edge = edgeLabelsToDisplay[i], extremities = this.graph.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]], edgeData = this.edgeDataCache[edge];
            if (displayedLabels.has(edge))
              continue;
            if (edgeData.hidden || sourceData.hidden || targetData.hidden) {
              continue;
            }
            this.settings.edgeLabelRenderer(context, __assign(__assign({ key: edge }, edgeData), { size: this.scaleSize(edgeData.size) }), __assign(__assign(__assign({ key: extremities[0] }, sourceData), this.framedGraphToViewport(sourceData)), { size: this.scaleSize(sourceData.size) }), __assign(__assign(__assign({ key: extremities[1] }, targetData), this.framedGraphToViewport(targetData)), { size: this.scaleSize(targetData.size) }), this.settings);
            displayedLabels.add(edge);
          }
          return this;
        };
        Sigma3.prototype.renderHighlightedNodes = function() {
          var _this = this;
          var context = this.canvasContexts.hovers;
          context.clearRect(0, 0, this.width, this.height);
          var render = function(node) {
            var data = _this.nodeDataCache[node];
            var _a = _this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            var size = _this.scaleSize(data.size);
            _this.settings.hoverRenderer(context, __assign(__assign({ key: node }, data), { size, x, y }), _this.settings);
          };
          var nodesToRender = [];
          if (this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden) {
            nodesToRender.push(this.hoveredNode);
          }
          this.highlightedNodes.forEach(function(node) {
            if (node !== _this.hoveredNode)
              nodesToRender.push(node);
          });
          nodesToRender.forEach(function(node) {
            return render(node);
          });
          var nodesPerPrograms = {};
          nodesToRender.forEach(function(node) {
            var type2 = _this.nodeDataCache[node].type;
            nodesPerPrograms[type2] = (nodesPerPrograms[type2] || 0) + 1;
          });
          for (var type in this.hoverNodePrograms) {
            this.hoverNodePrograms[type].allocate(nodesPerPrograms[type] || 0);
            nodesPerPrograms[type] = 0;
          }
          nodesToRender.forEach(function(node) {
            var data = _this.nodeDataCache[node];
            _this.hoverNodePrograms[data.type].process(data, data.hidden, nodesPerPrograms[data.type]++);
          });
          this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
          for (var type in this.hoverNodePrograms) {
            var program = this.hoverNodePrograms[type];
            program.bind();
            program.bufferData();
            program.render({
              matrix: this.matrix,
              width: this.width,
              height: this.height,
              ratio: this.camera.ratio,
              correctionRatio: this.correctionRatio / this.camera.ratio,
              scalingRatio: this.pixelRatio
            });
          }
        };
        Sigma3.prototype.scheduleHighlightedNodesRender = function() {
          var _this = this;
          if (this.renderHighlightedNodesFrame || this.renderFrame)
            return;
          this.renderHighlightedNodesFrame = (0, utils_1.requestFrame)(function() {
            _this.renderHighlightedNodesFrame = null;
            _this.renderHighlightedNodes();
            _this.renderEdgeLabels();
          });
        };
        Sigma3.prototype.render = function() {
          var _this = this;
          this.emit("beforeRender");
          var handleEscape = function() {
            _this.emit("afterRender");
            return _this;
          };
          if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
            this.needToProcess = false;
            this.needToSoftProcess = false;
          }
          this.resize();
          this.clear();
          this.updateCachedValues();
          if (!this.graph.order)
            return handleEscape();
          var mouseCaptor = this.mouseCaptor;
          var moving = this.camera.isAnimated() || mouseCaptor.isMoving || mouseCaptor.draggedEvents || mouseCaptor.currentWheelDirection;
          var cameraState = this.camera.getState();
          var viewportDimensions = this.getDimensions();
          var graphDimensions = this.getGraphDimensions();
          var padding = this.getSetting("stagePadding") || 0;
          this.matrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding);
          this.invMatrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding, true);
          this.correctionRatio = (0, utils_1.getMatrixImpact)(this.matrix, cameraState, viewportDimensions);
          for (var type in this.nodePrograms) {
            var program = this.nodePrograms[type];
            program.bind();
            program.bufferData();
            program.render({
              matrix: this.matrix,
              width: this.width,
              height: this.height,
              ratio: cameraState.ratio,
              correctionRatio: this.correctionRatio / cameraState.ratio,
              scalingRatio: this.pixelRatio
            });
          }
          if (!this.settings.hideEdgesOnMove || !moving) {
            for (var type in this.edgePrograms) {
              var program = this.edgePrograms[type];
              program.bind();
              program.bufferData();
              program.render({
                matrix: this.matrix,
                width: this.width,
                height: this.height,
                ratio: cameraState.ratio,
                correctionRatio: this.correctionRatio / cameraState.ratio,
                scalingRatio: this.pixelRatio
              });
            }
          }
          if (this.settings.hideLabelsOnMove && moving)
            return handleEscape();
          this.renderLabels();
          this.renderEdgeLabels();
          this.renderHighlightedNodes();
          return handleEscape();
        };
        Sigma3.prototype.updateCachedValues = function() {
          var ratio = this.camera.getState().ratio;
          this.cameraSizeRatio = Math.sqrt(ratio);
        };
        Sigma3.prototype.getCamera = function() {
          return this.camera;
        };
        Sigma3.prototype.getContainer = function() {
          return this.container;
        };
        Sigma3.prototype.getGraph = function() {
          return this.graph;
        };
        Sigma3.prototype.getMouseCaptor = function() {
          return this.mouseCaptor;
        };
        Sigma3.prototype.getTouchCaptor = function() {
          return this.touchCaptor;
        };
        Sigma3.prototype.getDimensions = function() {
          return { width: this.width, height: this.height };
        };
        Sigma3.prototype.getGraphDimensions = function() {
          var extent = this.customBBox || this.nodeExtent;
          return {
            width: extent.x[1] - extent.x[0] || 1,
            height: extent.y[1] - extent.y[0] || 1
          };
        };
        Sigma3.prototype.getNodeDisplayData = function(key) {
          var node = this.nodeDataCache[key];
          return node ? Object.assign({}, node) : void 0;
        };
        Sigma3.prototype.getEdgeDisplayData = function(key) {
          var edge = this.edgeDataCache[key];
          return edge ? Object.assign({}, edge) : void 0;
        };
        Sigma3.prototype.getSettings = function() {
          return __assign({}, this.settings);
        };
        Sigma3.prototype.getSetting = function(key) {
          return this.settings[key];
        };
        Sigma3.prototype.setSetting = function(key, value) {
          this.settings[key] = value;
          (0, settings_1.validateSettings)(this.settings);
          this.handleSettingsUpdate();
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.updateSetting = function(key, updater) {
          this.settings[key] = updater(this.settings[key]);
          (0, settings_1.validateSettings)(this.settings);
          this.handleSettingsUpdate();
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.resize = function() {
          var previousWidth = this.width, previousHeight = this.height;
          this.width = this.container.offsetWidth;
          this.height = this.container.offsetHeight;
          this.pixelRatio = (0, utils_1.getPixelRatio)();
          if (this.width === 0) {
            if (this.settings.allowInvalidContainer)
              this.width = 1;
            else
              throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seing this error.");
          }
          if (this.height === 0) {
            if (this.settings.allowInvalidContainer)
              this.height = 1;
            else
              throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seing this error.");
          }
          if (previousWidth === this.width && previousHeight === this.height)
            return this;
          this.emit("resize");
          for (var id in this.elements) {
            var element = this.elements[id];
            element.style.width = this.width + "px";
            element.style.height = this.height + "px";
          }
          for (var id in this.canvasContexts) {
            this.elements[id].setAttribute("width", this.width * this.pixelRatio + "px");
            this.elements[id].setAttribute("height", this.height * this.pixelRatio + "px");
            if (this.pixelRatio !== 1)
              this.canvasContexts[id].scale(this.pixelRatio, this.pixelRatio);
          }
          for (var id in this.webGLContexts) {
            this.elements[id].setAttribute("width", this.width * this.pixelRatio + "px");
            this.elements[id].setAttribute("height", this.height * this.pixelRatio + "px");
            this.webGLContexts[id].viewport(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
          }
          return this;
        };
        Sigma3.prototype.clear = function() {
          this.webGLContexts.nodes.clear(this.webGLContexts.nodes.COLOR_BUFFER_BIT);
          this.webGLContexts.edges.clear(this.webGLContexts.edges.COLOR_BUFFER_BIT);
          this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
          this.canvasContexts.labels.clearRect(0, 0, this.width, this.height);
          this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height);
          this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height);
          return this;
        };
        Sigma3.prototype.refresh = function() {
          this.needToProcess = true;
          this._refresh();
          return this;
        };
        Sigma3.prototype.scheduleRefresh = function() {
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.getViewportZoomedState = function(viewportTarget, newRatio) {
          var _a = this.camera.getState(), ratio = _a.ratio, angle = _a.angle, x = _a.x, y = _a.y;
          var ratioDiff = newRatio / ratio;
          var center = {
            x: this.width / 2,
            y: this.height / 2
          };
          var graphMousePosition = this.viewportToFramedGraph(viewportTarget);
          var graphCenterPosition = this.viewportToFramedGraph(center);
          return {
            angle,
            x: (graphMousePosition.x - graphCenterPosition.x) * (1 - ratioDiff) + x,
            y: (graphMousePosition.y - graphCenterPosition.y) * (1 - ratioDiff) + y,
            ratio: newRatio
          };
        };
        Sigma3.prototype.viewRectangle = function() {
          var marginX = 0 * this.width / 8, marginY = 0 * this.height / 8;
          var p1 = this.viewportToFramedGraph({ x: 0 - marginX, y: 0 - marginY }), p2 = this.viewportToFramedGraph({ x: this.width + marginX, y: 0 - marginY }), h = this.viewportToFramedGraph({ x: 0, y: this.height + marginY });
          return {
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            height: p2.y - h.y
          };
        };
        Sigma3.prototype.framedGraphToViewport = function(coordinates, override) {
          if (override === void 0) {
            override = {};
          }
          var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !!override.graphDimensions;
          var matrix = override.matrix ? override.matrix : recomputeMatrix ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0) : this.matrix;
          var viewportPos = (0, matrices_1.multiplyVec2)(matrix, coordinates);
          return {
            x: (1 + viewportPos.x) * this.width / 2,
            y: (1 - viewportPos.y) * this.height / 2
          };
        };
        Sigma3.prototype.viewportToFramedGraph = function(coordinates, override) {
          if (override === void 0) {
            override = {};
          }
          var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !override.graphDimensions;
          var invMatrix = override.matrix ? override.matrix : recomputeMatrix ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0, true) : this.invMatrix;
          var res = (0, matrices_1.multiplyVec2)(invMatrix, {
            x: coordinates.x / this.width * 2 - 1,
            y: 1 - coordinates.y / this.height * 2
          });
          if (isNaN(res.x))
            res.x = 0;
          if (isNaN(res.y))
            res.y = 0;
          return res;
        };
        Sigma3.prototype.viewportToGraph = function(viewportPoint, override) {
          if (override === void 0) {
            override = {};
          }
          return this.normalizationFunction.inverse(this.viewportToFramedGraph(viewportPoint, override));
        };
        Sigma3.prototype.graphToViewport = function(graphPoint, override) {
          if (override === void 0) {
            override = {};
          }
          return this.framedGraphToViewport(this.normalizationFunction(graphPoint), override);
        };
        Sigma3.prototype.getBBox = function() {
          return (0, utils_1.graphExtent)(this.graph);
        };
        Sigma3.prototype.getCustomBBox = function() {
          return this.customBBox;
        };
        Sigma3.prototype.setCustomBBox = function(customBBox) {
          this.customBBox = customBBox;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.kill = function() {
          var graph2 = this.graph;
          this.emit("kill");
          this.removeAllListeners();
          this.camera.removeListener("updated", this.activeListeners.camera);
          window.removeEventListener("resize", this.activeListeners.handleResize);
          this.mouseCaptor.kill();
          this.touchCaptor.kill();
          graph2.removeListener("nodeAdded", this.activeListeners.dropNodeGraphUpdate);
          graph2.removeListener("nodeDropped", this.activeListeners.graphUpdate);
          graph2.removeListener("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph2.removeListener("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
          graph2.removeListener("edgeAdded", this.activeListeners.graphUpdate);
          graph2.removeListener("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
          graph2.removeListener("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph2.removeListener("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
          graph2.removeListener("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
          graph2.removeListener("cleared", this.activeListeners.clearGraphUpdate);
          this.quadtree = new quadtree_1.default();
          this.nodeDataCache = {};
          this.edgeDataCache = {};
          this.nodesWithForcedLabels = [];
          this.edgesWithForcedLabels = [];
          this.highlightedNodes.clear();
          if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
          }
          if (this.renderHighlightedNodesFrame) {
            (0, utils_1.cancelFrame)(this.renderHighlightedNodesFrame);
            this.renderHighlightedNodesFrame = null;
          }
          var container2 = this.container;
          while (container2.firstChild)
            container2.removeChild(container2.firstChild);
        };
        Sigma3.prototype.scaleSize = function(size) {
          return size / this.cameraSizeRatio;
        };
        Sigma3.prototype.getCanvases = function() {
          return __assign({}, this.elements);
        };
        return Sigma3;
      }(types_1.TypedEventEmitter);
      exports.default = Sigma2;
    }
  });

  // node_modules/sigma/index.js
  var require_sigma2 = __commonJS({
    "node_modules/sigma/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sigma = exports.MouseCaptor = exports.QuadTree = exports.Camera = void 0;
      var sigma_1 = __importDefault(require_sigma());
      exports.Sigma = sigma_1.default;
      var camera_1 = __importDefault(require_camera());
      exports.Camera = camera_1.default;
      var quadtree_1 = __importDefault(require_quadtree());
      exports.QuadTree = quadtree_1.default;
      var mouse_1 = __importDefault(require_mouse());
      exports.MouseCaptor = mouse_1.default;
      exports.default = sigma_1.default;
    }
  });

  // node_modules/graphology-utils/getters.js
  var require_getters = __commonJS({
    "node_modules/graphology-utils/getters.js"(exports) {
      function coerceWeight(value) {
        if (typeof value !== "number" || isNaN(value))
          return 1;
        return value;
      }
      function createNodeValueGetter(nameOrFunction, defaultValue) {
        var getter = {};
        var coerceToDefault = function(v) {
          if (typeof v === "undefined")
            return defaultValue;
          return v;
        };
        if (typeof defaultValue === "function")
          coerceToDefault = defaultValue;
        var get = function(attributes) {
          return coerceToDefault(attributes[nameOrFunction]);
        };
        var returnDefault = function() {
          return coerceToDefault(void 0);
        };
        if (typeof nameOrFunction === "string") {
          getter.fromAttributes = get;
          getter.fromGraph = function(graph2, node) {
            return get(graph2.getNodeAttributes(node));
          };
          getter.fromEntry = function(node, attributes) {
            return get(attributes);
          };
        } else if (typeof nameOrFunction === "function") {
          getter.fromAttributes = function() {
            throw new Error(
              "graphology-utils/getters/createNodeValueGetter: irrelevant usage."
            );
          };
          getter.fromGraph = function(graph2, node) {
            return coerceToDefault(
              nameOrFunction(node, graph2.getNodeAttributes(node))
            );
          };
          getter.fromEntry = function(node, attributes) {
            return coerceToDefault(nameOrFunction(node, attributes));
          };
        } else {
          getter.fromAttributes = returnDefault;
          getter.fromGraph = returnDefault;
          getter.fromEntry = returnDefault;
        }
        return getter;
      }
      function createEdgeValueGetter(nameOrFunction, defaultValue) {
        var getter = {};
        var coerceToDefault = function(v) {
          if (typeof v === "undefined")
            return defaultValue;
          return v;
        };
        if (typeof defaultValue === "function")
          coerceToDefault = defaultValue;
        var get = function(attributes) {
          return coerceToDefault(attributes[nameOrFunction]);
        };
        var returnDefault = function() {
          return coerceToDefault(void 0);
        };
        if (typeof nameOrFunction === "string") {
          getter.fromAttributes = get;
          getter.fromGraph = function(graph2, edge) {
            return get(graph2.getEdgeAttributes(edge));
          };
          getter.fromEntry = function(edge, attributes) {
            return get(attributes);
          };
          getter.fromPartialEntry = getter.fromEntry;
          getter.fromMinimalEntry = getter.fromEntry;
        } else if (typeof nameOrFunction === "function") {
          getter.fromAttributes = function() {
            throw new Error(
              "graphology-utils/getters/createEdgeValueGetter: irrelevant usage."
            );
          };
          getter.fromGraph = function(graph2, edge) {
            var extremities = graph2.extremities(edge);
            return coerceToDefault(
              nameOrFunction(
                edge,
                graph2.getEdgeAttributes(edge),
                extremities[0],
                extremities[1],
                graph2.getNodeAttributes(extremities[0]),
                graph2.getNodeAttributes(extremities[1]),
                graph2.isUndirected(edge)
              )
            );
          };
          getter.fromEntry = function(e, a, s, t, sa, ta, u) {
            return coerceToDefault(nameOrFunction(e, a, s, t, sa, ta, u));
          };
          getter.fromPartialEntry = function(e, a, s, t) {
            return coerceToDefault(nameOrFunction(e, a, s, t));
          };
          getter.fromMinimalEntry = function(e, a) {
            return coerceToDefault(nameOrFunction(e, a));
          };
        } else {
          getter.fromAttributes = returnDefault;
          getter.fromGraph = returnDefault;
          getter.fromEntry = returnDefault;
          getter.fromMinimalEntry = returnDefault;
        }
        return getter;
      }
      exports.createNodeValueGetter = createNodeValueGetter;
      exports.createEdgeValueGetter = createEdgeValueGetter;
      exports.createEdgeWeightGetter = function(name) {
        return createEdgeValueGetter(name, coerceWeight);
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/iterate.js
  var require_iterate = __commonJS({
    "node_modules/graphology-layout-forceatlas2/iterate.js"(exports, module) {
      var NODE_X = 0;
      var NODE_Y = 1;
      var NODE_DX = 2;
      var NODE_DY = 3;
      var NODE_OLD_DX = 4;
      var NODE_OLD_DY = 5;
      var NODE_MASS = 6;
      var NODE_CONVERGENCE = 7;
      var NODE_SIZE = 8;
      var NODE_FIXED = 9;
      var EDGE_SOURCE = 0;
      var EDGE_TARGET = 1;
      var EDGE_WEIGHT = 2;
      var REGION_NODE = 0;
      var REGION_CENTER_X = 1;
      var REGION_CENTER_Y = 2;
      var REGION_SIZE = 3;
      var REGION_NEXT_SIBLING = 4;
      var REGION_FIRST_CHILD = 5;
      var REGION_MASS = 6;
      var REGION_MASS_CENTER_X = 7;
      var REGION_MASS_CENTER_Y = 8;
      var SUBDIVISION_ATTEMPTS = 3;
      var PPN = 10;
      var PPE = 3;
      var PPR = 9;
      var MAX_FORCE = 10;
      module.exports = function iterate(options, NodeMatrix, EdgeMatrix) {
        var l, r, n, n1, n2, rn, e, w, g, s;
        var order = NodeMatrix.length, size = EdgeMatrix.length;
        var adjustSizes = options.adjustSizes;
        var thetaSquared = options.barnesHutTheta * options.barnesHutTheta;
        var outboundAttCompensation, coefficient, xDist, yDist, ewc, distance, factor;
        var RegionMatrix = [];
        for (n = 0; n < order; n += PPN) {
          NodeMatrix[n + NODE_OLD_DX] = NodeMatrix[n + NODE_DX];
          NodeMatrix[n + NODE_OLD_DY] = NodeMatrix[n + NODE_DY];
          NodeMatrix[n + NODE_DX] = 0;
          NodeMatrix[n + NODE_DY] = 0;
        }
        if (options.outboundAttractionDistribution) {
          outboundAttCompensation = 0;
          for (n = 0; n < order; n += PPN) {
            outboundAttCompensation += NodeMatrix[n + NODE_MASS];
          }
          outboundAttCompensation /= order / PPN;
        }
        if (options.barnesHutOptimize) {
          var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, q, q2, subdivisionAttempts;
          for (n = 0; n < order; n += PPN) {
            minX = Math.min(minX, NodeMatrix[n + NODE_X]);
            maxX = Math.max(maxX, NodeMatrix[n + NODE_X]);
            minY = Math.min(minY, NodeMatrix[n + NODE_Y]);
            maxY = Math.max(maxY, NodeMatrix[n + NODE_Y]);
          }
          var dx = maxX - minX, dy = maxY - minY;
          if (dx > dy) {
            minY -= (dx - dy) / 2;
            maxY = minY + dx;
          } else {
            minX -= (dy - dx) / 2;
            maxX = minX + dy;
          }
          RegionMatrix[0 + REGION_NODE] = -1;
          RegionMatrix[0 + REGION_CENTER_X] = (minX + maxX) / 2;
          RegionMatrix[0 + REGION_CENTER_Y] = (minY + maxY) / 2;
          RegionMatrix[0 + REGION_SIZE] = Math.max(maxX - minX, maxY - minY);
          RegionMatrix[0 + REGION_NEXT_SIBLING] = -1;
          RegionMatrix[0 + REGION_FIRST_CHILD] = -1;
          RegionMatrix[0 + REGION_MASS] = 0;
          RegionMatrix[0 + REGION_MASS_CENTER_X] = 0;
          RegionMatrix[0 + REGION_MASS_CENTER_Y] = 0;
          l = 1;
          for (n = 0; n < order; n += PPN) {
            r = 0;
            subdivisionAttempts = SUBDIVISION_ATTEMPTS;
            while (true) {
              if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {
                if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                  if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                    q = RegionMatrix[r + REGION_FIRST_CHILD];
                  } else {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                  }
                } else {
                  if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                  } else {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                  }
                }
                RegionMatrix[r + REGION_MASS_CENTER_X] = (RegionMatrix[r + REGION_MASS_CENTER_X] * RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_X] * NodeMatrix[n + NODE_MASS]) / (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);
                RegionMatrix[r + REGION_MASS_CENTER_Y] = (RegionMatrix[r + REGION_MASS_CENTER_Y] * RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_Y] * NodeMatrix[n + NODE_MASS]) / (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);
                RegionMatrix[r + REGION_MASS] += NodeMatrix[n + NODE_MASS];
                r = q;
                continue;
              } else {
                if (RegionMatrix[r + REGION_NODE] < 0) {
                  RegionMatrix[r + REGION_NODE] = n;
                  break;
                } else {
                  RegionMatrix[r + REGION_FIRST_CHILD] = l * PPR;
                  w = RegionMatrix[r + REGION_SIZE] / 2;
                  g = RegionMatrix[r + REGION_FIRST_CHILD];
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = RegionMatrix[r + REGION_NEXT_SIBLING];
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  l += 4;
                  if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                    if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q = RegionMatrix[r + REGION_FIRST_CHILD];
                    } else {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                    }
                  } else {
                    if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                    } else {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                    }
                  }
                  RegionMatrix[r + REGION_MASS] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_MASS];
                  RegionMatrix[r + REGION_MASS_CENTER_X] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X];
                  RegionMatrix[r + REGION_MASS_CENTER_Y] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y];
                  RegionMatrix[q + REGION_NODE] = RegionMatrix[r + REGION_NODE];
                  RegionMatrix[r + REGION_NODE] = -1;
                  if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                    if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD];
                    } else {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                    }
                  } else {
                    if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                    } else {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                    }
                  }
                  if (q === q2) {
                    if (subdivisionAttempts--) {
                      r = q;
                      continue;
                    } else {
                      subdivisionAttempts = SUBDIVISION_ATTEMPTS;
                      break;
                    }
                  }
                  RegionMatrix[q2 + REGION_NODE] = n;
                  break;
                }
              }
            }
          }
        }
        if (options.barnesHutOptimize) {
          coefficient = options.scalingRatio;
          for (n = 0; n < order; n += PPN) {
            r = 0;
            while (true) {
              if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {
                distance = Math.pow(
                  NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X],
                  2
                ) + Math.pow(
                  NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y],
                  2
                );
                s = RegionMatrix[r + REGION_SIZE];
                if (4 * s * s / distance < thetaSquared) {
                  xDist = NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X];
                  yDist = NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y];
                  if (adjustSizes === true) {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    } else if (distance < 0) {
                      factor = -coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / Math.sqrt(distance);
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  } else {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  }
                  r = RegionMatrix[r + REGION_NEXT_SIBLING];
                  if (r < 0)
                    break;
                  continue;
                } else {
                  r = RegionMatrix[r + REGION_FIRST_CHILD];
                  continue;
                }
              } else {
                rn = RegionMatrix[r + REGION_NODE];
                if (rn >= 0 && rn !== n) {
                  xDist = NodeMatrix[n + NODE_X] - NodeMatrix[rn + NODE_X];
                  yDist = NodeMatrix[n + NODE_Y] - NodeMatrix[rn + NODE_Y];
                  distance = xDist * xDist + yDist * yDist;
                  if (adjustSizes === true) {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    } else if (distance < 0) {
                      factor = -coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / Math.sqrt(distance);
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  } else {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  }
                }
                r = RegionMatrix[r + REGION_NEXT_SIBLING];
                if (r < 0)
                  break;
                continue;
              }
            }
          }
        } else {
          coefficient = options.scalingRatio;
          for (n1 = 0; n1 < order; n1 += PPN) {
            for (n2 = 0; n2 < n1; n2 += PPN) {
              xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
              yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];
              if (adjustSizes === true) {
                distance = Math.sqrt(xDist * xDist + yDist * yDist) - NodeMatrix[n1 + NODE_SIZE] - NodeMatrix[n2 + NODE_SIZE];
                if (distance > 0) {
                  factor = coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS] / distance / distance;
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] += xDist * factor;
                  NodeMatrix[n2 + NODE_DY] += yDist * factor;
                } else if (distance < 0) {
                  factor = 100 * coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS];
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] -= xDist * factor;
                  NodeMatrix[n2 + NODE_DY] -= yDist * factor;
                }
              } else {
                distance = Math.sqrt(xDist * xDist + yDist * yDist);
                if (distance > 0) {
                  factor = coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS] / distance / distance;
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] -= xDist * factor;
                  NodeMatrix[n2 + NODE_DY] -= yDist * factor;
                }
              }
            }
          }
        }
        g = options.gravity / options.scalingRatio;
        coefficient = options.scalingRatio;
        for (n = 0; n < order; n += PPN) {
          factor = 0;
          xDist = NodeMatrix[n + NODE_X];
          yDist = NodeMatrix[n + NODE_Y];
          distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
          if (options.strongGravityMode) {
            if (distance > 0)
              factor = coefficient * NodeMatrix[n + NODE_MASS] * g;
          } else {
            if (distance > 0)
              factor = coefficient * NodeMatrix[n + NODE_MASS] * g / distance;
          }
          NodeMatrix[n + NODE_DX] -= xDist * factor;
          NodeMatrix[n + NODE_DY] -= yDist * factor;
        }
        coefficient = 1 * (options.outboundAttractionDistribution ? outboundAttCompensation : 1);
        for (e = 0; e < size; e += PPE) {
          n1 = EdgeMatrix[e + EDGE_SOURCE];
          n2 = EdgeMatrix[e + EDGE_TARGET];
          w = EdgeMatrix[e + EDGE_WEIGHT];
          ewc = Math.pow(w, options.edgeWeightInfluence);
          xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
          yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];
          if (adjustSizes === true) {
            distance = Math.sqrt(xDist * xDist + yDist * yDist) - NodeMatrix[n1 + NODE_SIZE] - NodeMatrix[n2 + NODE_SIZE];
            if (options.linLogMode) {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance;
                }
              }
            } else {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0) {
                  factor = -coefficient * ewc;
                }
              }
            }
          } else {
            distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            if (options.linLogMode) {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0)
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance;
              }
            } else {
              if (options.outboundAttractionDistribution) {
                distance = 1;
                factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
              } else {
                distance = 1;
                factor = -coefficient * ewc;
              }
            }
          }
          if (distance > 0) {
            NodeMatrix[n1 + NODE_DX] += xDist * factor;
            NodeMatrix[n1 + NODE_DY] += yDist * factor;
            NodeMatrix[n2 + NODE_DX] -= xDist * factor;
            NodeMatrix[n2 + NODE_DY] -= yDist * factor;
          }
        }
        var force, swinging, traction, nodespeed, newX, newY;
        if (adjustSizes === true) {
          for (n = 0; n < order; n += PPN) {
            if (NodeMatrix[n + NODE_FIXED] !== 1) {
              force = Math.sqrt(
                Math.pow(NodeMatrix[n + NODE_DX], 2) + Math.pow(NodeMatrix[n + NODE_DY], 2)
              );
              if (force > MAX_FORCE) {
                NodeMatrix[n + NODE_DX] = NodeMatrix[n + NODE_DX] * MAX_FORCE / force;
                NodeMatrix[n + NODE_DY] = NodeMatrix[n + NODE_DY] * MAX_FORCE / force;
              }
              swinging = NodeMatrix[n + NODE_MASS] * Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
              );
              traction = Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
              ) / 2;
              nodespeed = 0.1 * Math.log(1 + traction) / (1 + Math.sqrt(swinging));
              newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_X] = newX;
              newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_Y] = newY;
            }
          }
        } else {
          for (n = 0; n < order; n += PPN) {
            if (NodeMatrix[n + NODE_FIXED] !== 1) {
              swinging = NodeMatrix[n + NODE_MASS] * Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
              );
              traction = Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
              ) / 2;
              nodespeed = NodeMatrix[n + NODE_CONVERGENCE] * Math.log(1 + traction) / (1 + Math.sqrt(swinging));
              NodeMatrix[n + NODE_CONVERGENCE] = Math.min(
                1,
                Math.sqrt(
                  nodespeed * (Math.pow(NodeMatrix[n + NODE_DX], 2) + Math.pow(NodeMatrix[n + NODE_DY], 2)) / (1 + Math.sqrt(swinging))
                )
              );
              newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_X] = newX;
              newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_Y] = newY;
            }
          }
        }
        return {};
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/helpers.js
  var require_helpers = __commonJS({
    "node_modules/graphology-layout-forceatlas2/helpers.js"(exports) {
      var PPN = 10;
      var PPE = 3;
      exports.assign = function(target) {
        target = target || {};
        var objects = Array.prototype.slice.call(arguments).slice(1), i, k, l;
        for (i = 0, l = objects.length; i < l; i++) {
          if (!objects[i])
            continue;
          for (k in objects[i])
            target[k] = objects[i][k];
        }
        return target;
      };
      exports.validateSettings = function(settings) {
        if ("linLogMode" in settings && typeof settings.linLogMode !== "boolean")
          return { message: "the `linLogMode` setting should be a boolean." };
        if ("outboundAttractionDistribution" in settings && typeof settings.outboundAttractionDistribution !== "boolean")
          return {
            message: "the `outboundAttractionDistribution` setting should be a boolean."
          };
        if ("adjustSizes" in settings && typeof settings.adjustSizes !== "boolean")
          return { message: "the `adjustSizes` setting should be a boolean." };
        if ("edgeWeightInfluence" in settings && typeof settings.edgeWeightInfluence !== "number")
          return {
            message: "the `edgeWeightInfluence` setting should be a number."
          };
        if ("scalingRatio" in settings && !(typeof settings.scalingRatio === "number" && settings.scalingRatio >= 0))
          return { message: "the `scalingRatio` setting should be a number >= 0." };
        if ("strongGravityMode" in settings && typeof settings.strongGravityMode !== "boolean")
          return { message: "the `strongGravityMode` setting should be a boolean." };
        if ("gravity" in settings && !(typeof settings.gravity === "number" && settings.gravity >= 0))
          return { message: "the `gravity` setting should be a number >= 0." };
        if ("slowDown" in settings && !(typeof settings.slowDown === "number" || settings.slowDown >= 0))
          return { message: "the `slowDown` setting should be a number >= 0." };
        if ("barnesHutOptimize" in settings && typeof settings.barnesHutOptimize !== "boolean")
          return { message: "the `barnesHutOptimize` setting should be a boolean." };
        if ("barnesHutTheta" in settings && !(typeof settings.barnesHutTheta === "number" && settings.barnesHutTheta >= 0))
          return { message: "the `barnesHutTheta` setting should be a number >= 0." };
        return null;
      };
      exports.graphToByteArrays = function(graph2, getEdgeWeight) {
        var order = graph2.order;
        var size = graph2.size;
        var index = {};
        var j;
        var NodeMatrix = new Float32Array(order * PPN);
        var EdgeMatrix = new Float32Array(size * PPE);
        j = 0;
        graph2.forEachNode(function(node, attr) {
          index[node] = j;
          NodeMatrix[j] = attr.x;
          NodeMatrix[j + 1] = attr.y;
          NodeMatrix[j + 2] = 0;
          NodeMatrix[j + 3] = 0;
          NodeMatrix[j + 4] = 0;
          NodeMatrix[j + 5] = 0;
          NodeMatrix[j + 6] = 1;
          NodeMatrix[j + 7] = 1;
          NodeMatrix[j + 8] = attr.size || 1;
          NodeMatrix[j + 9] = attr.fixed ? 1 : 0;
          j += PPN;
        });
        j = 0;
        graph2.forEachEdge(function(edge, attr, source, target, sa, ta, u) {
          var sj = index[source];
          var tj = index[target];
          NodeMatrix[sj + 6] += 1;
          NodeMatrix[tj + 6] += 1;
          EdgeMatrix[j] = sj;
          EdgeMatrix[j + 1] = tj;
          EdgeMatrix[j + 2] = getEdgeWeight(edge, attr, source, target, sa, ta, u);
          j += PPE;
        });
        return {
          nodes: NodeMatrix,
          edges: EdgeMatrix
        };
      };
      exports.assignLayoutChanges = function(graph2, NodeMatrix, outputReducer) {
        var i = 0;
        graph2.updateEachNodeAttributes(function(node, attr) {
          attr.x = NodeMatrix[i];
          attr.y = NodeMatrix[i + 1];
          i += PPN;
          return outputReducer ? outputReducer(node, attr) : attr;
        });
      };
      exports.readGraphPositions = function(graph2, NodeMatrix) {
        var i = 0;
        graph2.forEachNode(function(node, attr) {
          NodeMatrix[i] = attr.x;
          NodeMatrix[i + 1] = attr.y;
          i += PPN;
        });
      };
      exports.collectLayoutChanges = function(graph2, NodeMatrix, outputReducer) {
        var nodes = graph2.nodes(), positions = {};
        for (var i = 0, j = 0, l = NodeMatrix.length; i < l; i += PPN) {
          if (outputReducer) {
            var newAttr = Object.assign({}, graph2.getNodeAttributes(nodes[j]));
            newAttr.x = NodeMatrix[i];
            newAttr.y = NodeMatrix[i + 1];
            newAttr = outputReducer(nodes[j], newAttr);
            positions[nodes[j]] = {
              x: newAttr.x,
              y: newAttr.y
            };
          } else {
            positions[nodes[j]] = {
              x: NodeMatrix[i],
              y: NodeMatrix[i + 1]
            };
          }
          j++;
        }
        return positions;
      };
      exports.createWorker = function createWorker(fn) {
        var xURL = window.URL || window.webkitURL;
        var code = fn.toString();
        var objectUrl = xURL.createObjectURL(
          new Blob(["(" + code + ").call(this);"], { type: "text/javascript" })
        );
        var worker = new Worker(objectUrl);
        xURL.revokeObjectURL(objectUrl);
        return worker;
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/defaults.js
  var require_defaults = __commonJS({
    "node_modules/graphology-layout-forceatlas2/defaults.js"(exports, module) {
      module.exports = {
        linLogMode: false,
        outboundAttractionDistribution: false,
        adjustSizes: false,
        edgeWeightInfluence: 1,
        scalingRatio: 1,
        strongGravityMode: false,
        gravity: 1,
        slowDown: 1,
        barnesHutOptimize: false,
        barnesHutTheta: 0.5
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/index.js
  var require_graphology_layout_forceatlas2 = __commonJS({
    "node_modules/graphology-layout-forceatlas2/index.js"(exports, module) {
      var isGraph = require_is_graph();
      var createEdgeWeightGetter = require_getters().createEdgeWeightGetter;
      var iterate = require_iterate();
      var helpers = require_helpers();
      var DEFAULT_SETTINGS = require_defaults();
      function abstractSynchronousLayout(assign, graph2, params) {
        if (!isGraph(graph2))
          throw new Error(
            "graphology-layout-forceatlas2: the given graph is not a valid graphology instance."
          );
        if (typeof params === "number")
          params = { iterations: params };
        var iterations = params.iterations;
        if (typeof iterations !== "number")
          throw new Error(
            "graphology-layout-forceatlas2: invalid number of iterations."
          );
        if (iterations <= 0)
          throw new Error(
            "graphology-layout-forceatlas2: you should provide a positive number of iterations."
          );
        var getEdgeWeight = createEdgeWeightGetter(params.getEdgeWeight).fromEntry;
        var outputReducer = typeof params.outputReducer === "function" ? params.outputReducer : null;
        var settings = helpers.assign({}, DEFAULT_SETTINGS, params.settings);
        var validationError = helpers.validateSettings(settings);
        if (validationError)
          throw new Error(
            "graphology-layout-forceatlas2: " + validationError.message
          );
        var matrices = helpers.graphToByteArrays(graph2, getEdgeWeight);
        var i;
        for (i = 0; i < iterations; i++)
          iterate(settings, matrices.nodes, matrices.edges);
        if (assign) {
          helpers.assignLayoutChanges(graph2, matrices.nodes, outputReducer);
          return;
        }
        return helpers.collectLayoutChanges(graph2, matrices.nodes);
      }
      function inferSettings(graph2) {
        var order = typeof graph2 === "number" ? graph2 : graph2.order;
        return {
          barnesHutOptimize: order > 2e3,
          strongGravityMode: true,
          gravity: 0.05,
          scalingRatio: 10,
          slowDown: 1 + Math.log(order)
        };
      }
      var synchronousLayout = abstractSynchronousLayout.bind(null, false);
      synchronousLayout.assign = abstractSynchronousLayout.bind(null, true);
      synchronousLayout.inferSettings = inferSettings;
      module.exports = synchronousLayout;
    }
  });

  // index.js
  var import_graphology = __toESM(require_graphology_umd_min());
  var import_sigma = __toESM(require_sigma2());
  var import_graphology_layout_forceatlas2 = __toESM(require_graphology_layout_forceatlas2());
  var container = document.getElementById("sigma-container");
  var graph = new import_graphology.default();
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      graph.addNode(`${x}${y}`, {
        x: Math.random(),
        y: Math.random(),
        size: x + y + 1,
        label: `Node ${x} ${y}`,
        color: "blue"
      });
    }
  }
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (x + 1 < 10)
        graph.addEdge(`${x}${y}`, `${x + 1}${y}`);
      if (y + 1 < 10)
        graph.addEdge(`${x}${y}`, `${x}${y + 1}`);
    }
  }
  import_graphology_layout_forceatlas2.default.assign(graph, { iterations: 50 });
  var renderer = new import_sigma.default(graph, container);
})();
//# sourceMappingURL=bundle.js.map

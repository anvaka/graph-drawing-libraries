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
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
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

  // node_modules/regl/dist/regl.js
  var require_regl = __commonJS({
    "node_modules/regl/dist/regl.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.createREGL = factory();
      })(exports, function() {
        "use strict";
        var isTypedArray = function(x) {
          return x instanceof Uint8Array || x instanceof Uint16Array || x instanceof Uint32Array || x instanceof Int8Array || x instanceof Int16Array || x instanceof Int32Array || x instanceof Float32Array || x instanceof Float64Array || x instanceof Uint8ClampedArray;
        };
        var extend2 = function(base, opts) {
          var keys = Object.keys(opts);
          for (var i = 0; i < keys.length; ++i) {
            base[keys[i]] = opts[keys[i]];
          }
          return base;
        };
        var endl = "\n";
        function decodeB64(str2) {
          if (typeof atob !== "undefined") {
            return atob(str2);
          }
          return "base64:" + str2;
        }
        function raise2(message) {
          var error = new Error("(regl) " + message);
          console.error(error);
          throw error;
        }
        function check(pred, message) {
          if (!pred) {
            raise2(message);
          }
        }
        function encolon(message) {
          if (message) {
            return ": " + message;
          }
          return "";
        }
        function checkParameter(param, possibilities, message) {
          if (!(param in possibilities)) {
            raise2("unknown parameter (" + param + ")" + encolon(message) + ". possible values: " + Object.keys(possibilities).join());
          }
        }
        function checkIsTypedArray(data, message) {
          if (!isTypedArray(data)) {
            raise2(
              "invalid parameter type" + encolon(message) + ". must be a typed array"
            );
          }
        }
        function standardTypeEh(value, type) {
          switch (type) {
            case "number":
              return typeof value === "number";
            case "object":
              return typeof value === "object";
            case "string":
              return typeof value === "string";
            case "boolean":
              return typeof value === "boolean";
            case "function":
              return typeof value === "function";
            case "undefined":
              return typeof value === "undefined";
            case "symbol":
              return typeof value === "symbol";
          }
        }
        function checkTypeOf(value, type, message) {
          if (!standardTypeEh(value, type)) {
            raise2(
              "invalid parameter type" + encolon(message) + ". expected " + type + ", got " + typeof value
            );
          }
        }
        function checkNonNegativeInt(value, message) {
          if (!(value >= 0 && (value | 0) === value)) {
            raise2("invalid parameter type, (" + value + ")" + encolon(message) + ". must be a nonnegative integer");
          }
        }
        function checkOneOf(value, list, message) {
          if (list.indexOf(value) < 0) {
            raise2("invalid value" + encolon(message) + ". must be one of: " + list);
          }
        }
        var constructorKeys = [
          "gl",
          "canvas",
          "container",
          "attributes",
          "pixelRatio",
          "extensions",
          "optionalExtensions",
          "profile",
          "onDone"
        ];
        function checkConstructor(obj) {
          Object.keys(obj).forEach(function(key) {
            if (constructorKeys.indexOf(key) < 0) {
              raise2('invalid regl constructor argument "' + key + '". must be one of ' + constructorKeys);
            }
          });
        }
        function leftPad(str2, n) {
          str2 = str2 + "";
          while (str2.length < n) {
            str2 = " " + str2;
          }
          return str2;
        }
        function ShaderFile() {
          this.name = "unknown";
          this.lines = [];
          this.index = {};
          this.hasErrors = false;
        }
        function ShaderLine(number, line2) {
          this.number = number;
          this.line = line2;
          this.errors = [];
        }
        function ShaderError(fileNumber, lineNumber, message) {
          this.file = fileNumber;
          this.line = lineNumber;
          this.message = message;
        }
        function guessCommand() {
          var error = new Error();
          var stack = (error.stack || error).toString();
          var pat = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(stack);
          if (pat) {
            return pat[1];
          }
          var pat2 = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(stack);
          if (pat2) {
            return pat2[1];
          }
          return "unknown";
        }
        function guessCallSite() {
          var error = new Error();
          var stack = (error.stack || error).toString();
          var pat = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(stack);
          if (pat) {
            return pat[1];
          }
          var pat2 = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(stack);
          if (pat2) {
            return pat2[1];
          }
          return "unknown";
        }
        function parseSource(source, command) {
          var lines2 = source.split("\n");
          var lineNumber = 1;
          var fileNumber = 0;
          var files = {
            unknown: new ShaderFile(),
            0: new ShaderFile()
          };
          files.unknown.name = files[0].name = command || guessCommand();
          files.unknown.lines.push(new ShaderLine(0, ""));
          for (var i = 0; i < lines2.length; ++i) {
            var line2 = lines2[i];
            var parts = /^\s*#\s*(\w+)\s+(.+)\s*$/.exec(line2);
            if (parts) {
              switch (parts[1]) {
                case "line":
                  var lineNumberInfo = /(\d+)(\s+\d+)?/.exec(parts[2]);
                  if (lineNumberInfo) {
                    lineNumber = lineNumberInfo[1] | 0;
                    if (lineNumberInfo[2]) {
                      fileNumber = lineNumberInfo[2] | 0;
                      if (!(fileNumber in files)) {
                        files[fileNumber] = new ShaderFile();
                      }
                    }
                  }
                  break;
                case "define":
                  var nameInfo = /SHADER_NAME(_B64)?\s+(.*)$/.exec(parts[2]);
                  if (nameInfo) {
                    files[fileNumber].name = nameInfo[1] ? decodeB64(nameInfo[2]) : nameInfo[2];
                  }
                  break;
              }
            }
            files[fileNumber].lines.push(new ShaderLine(lineNumber++, line2));
          }
          Object.keys(files).forEach(function(fileNumber2) {
            var file = files[fileNumber2];
            file.lines.forEach(function(line3) {
              file.index[line3.number] = line3;
            });
          });
          return files;
        }
        function parseErrorLog(errLog) {
          var result = [];
          errLog.split("\n").forEach(function(errMsg) {
            if (errMsg.length < 5) {
              return;
            }
            var parts = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(errMsg);
            if (parts) {
              result.push(new ShaderError(
                parts[1] | 0,
                parts[2] | 0,
                parts[3].trim()
              ));
            } else if (errMsg.length > 0) {
              result.push(new ShaderError("unknown", 0, errMsg));
            }
          });
          return result;
        }
        function annotateFiles(files, errors) {
          errors.forEach(function(error) {
            var file = files[error.file];
            if (file) {
              var line2 = file.index[error.line];
              if (line2) {
                line2.errors.push(error);
                file.hasErrors = true;
                return;
              }
            }
            files.unknown.hasErrors = true;
            files.unknown.lines[0].errors.push(error);
          });
        }
        function checkShaderError(gl, shader, source, type, command) {
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var errLog = gl.getShaderInfoLog(shader);
            var typeName = type === gl.FRAGMENT_SHADER ? "fragment" : "vertex";
            checkCommandType(source, "string", typeName + " shader source must be a string", command);
            var files = parseSource(source, command);
            var errors = parseErrorLog(errLog);
            annotateFiles(files, errors);
            Object.keys(files).forEach(function(fileNumber) {
              var file = files[fileNumber];
              if (!file.hasErrors) {
                return;
              }
              var strings = [""];
              var styles = [""];
              function push(str2, style) {
                strings.push(str2);
                styles.push(style || "");
              }
              push("file number " + fileNumber + ": " + file.name + "\n", "color:red;text-decoration:underline;font-weight:bold");
              file.lines.forEach(function(line2) {
                if (line2.errors.length > 0) {
                  push(leftPad(line2.number, 4) + "|  ", "background-color:yellow; font-weight:bold");
                  push(line2.line + endl, "color:red; background-color:yellow; font-weight:bold");
                  var offset = 0;
                  line2.errors.forEach(function(error) {
                    var message = error.message;
                    var token = /^\s*'(.*)'\s*:\s*(.*)$/.exec(message);
                    if (token) {
                      var tokenPat = token[1];
                      message = token[2];
                      switch (tokenPat) {
                        case "assign":
                          tokenPat = "=";
                          break;
                      }
                      offset = Math.max(line2.line.indexOf(tokenPat, offset), 0);
                    } else {
                      offset = 0;
                    }
                    push(leftPad("| ", 6));
                    push(leftPad("^^^", offset + 3) + endl, "font-weight:bold");
                    push(leftPad("| ", 6));
                    push(message + endl, "font-weight:bold");
                  });
                  push(leftPad("| ", 6) + endl);
                } else {
                  push(leftPad(line2.number, 4) + "|  ");
                  push(line2.line + endl, "color:red");
                }
              });
              if (typeof document !== "undefined" && !window.chrome) {
                styles[0] = strings.join("%c");
                console.log.apply(console, styles);
              } else {
                console.log(strings.join(""));
              }
            });
            check.raise("Error compiling " + typeName + " shader, " + files[0].name);
          }
        }
        function checkLinkError(gl, program, fragShader, vertShader, command) {
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var errLog = gl.getProgramInfoLog(program);
            var fragParse = parseSource(fragShader, command);
            var vertParse = parseSource(vertShader, command);
            var header = 'Error linking program with vertex shader, "' + vertParse[0].name + '", and fragment shader "' + fragParse[0].name + '"';
            if (typeof document !== "undefined") {
              console.log(
                "%c" + header + endl + "%c" + errLog,
                "color:red;text-decoration:underline;font-weight:bold",
                "color:red"
              );
            } else {
              console.log(header + endl + errLog);
            }
            check.raise(header);
          }
        }
        function saveCommandRef(object) {
          object._commandRef = guessCommand();
        }
        function saveDrawCommandInfo(opts, uniforms, attributes, stringStore) {
          saveCommandRef(opts);
          function id2(str2) {
            if (str2) {
              return stringStore.id(str2);
            }
            return 0;
          }
          opts._fragId = id2(opts.static.frag);
          opts._vertId = id2(opts.static.vert);
          function addProps(dict, set4) {
            Object.keys(set4).forEach(function(u) {
              dict[stringStore.id(u)] = true;
            });
          }
          var uniformSet = opts._uniformSet = {};
          addProps(uniformSet, uniforms.static);
          addProps(uniformSet, uniforms.dynamic);
          var attributeSet = opts._attributeSet = {};
          addProps(attributeSet, attributes.static);
          addProps(attributeSet, attributes.dynamic);
          opts._hasCount = "count" in opts.static || "count" in opts.dynamic || "elements" in opts.static || "elements" in opts.dynamic;
        }
        function commandRaise(message, command) {
          var callSite = guessCallSite();
          raise2(message + " in command " + (command || guessCommand()) + (callSite === "unknown" ? "" : " called from " + callSite));
        }
        function checkCommand(pred, message, command) {
          if (!pred) {
            commandRaise(message, command || guessCommand());
          }
        }
        function checkParameterCommand(param, possibilities, message, command) {
          if (!(param in possibilities)) {
            commandRaise(
              "unknown parameter (" + param + ")" + encolon(message) + ". possible values: " + Object.keys(possibilities).join(),
              command || guessCommand()
            );
          }
        }
        function checkCommandType(value, type, message, command) {
          if (!standardTypeEh(value, type)) {
            commandRaise(
              "invalid parameter type" + encolon(message) + ". expected " + type + ", got " + typeof value,
              command || guessCommand()
            );
          }
        }
        function checkOptional(block) {
          block();
        }
        function checkFramebufferFormat(attachment, texFormats, rbFormats) {
          if (attachment.texture) {
            checkOneOf(
              attachment.texture._texture.internalformat,
              texFormats,
              "unsupported texture format for attachment"
            );
          } else {
            checkOneOf(
              attachment.renderbuffer._renderbuffer.format,
              rbFormats,
              "unsupported renderbuffer format for attachment"
            );
          }
        }
        var GL_CLAMP_TO_EDGE = 33071;
        var GL_NEAREST = 9728;
        var GL_NEAREST_MIPMAP_NEAREST = 9984;
        var GL_LINEAR_MIPMAP_NEAREST = 9985;
        var GL_NEAREST_MIPMAP_LINEAR = 9986;
        var GL_LINEAR_MIPMAP_LINEAR = 9987;
        var GL_BYTE = 5120;
        var GL_UNSIGNED_BYTE = 5121;
        var GL_SHORT = 5122;
        var GL_UNSIGNED_SHORT = 5123;
        var GL_INT = 5124;
        var GL_UNSIGNED_INT = 5125;
        var GL_FLOAT = 5126;
        var GL_UNSIGNED_SHORT_4_4_4_4 = 32819;
        var GL_UNSIGNED_SHORT_5_5_5_1 = 32820;
        var GL_UNSIGNED_SHORT_5_6_5 = 33635;
        var GL_UNSIGNED_INT_24_8_WEBGL = 34042;
        var GL_HALF_FLOAT_OES = 36193;
        var TYPE_SIZE = {};
        TYPE_SIZE[GL_BYTE] = TYPE_SIZE[GL_UNSIGNED_BYTE] = 1;
        TYPE_SIZE[GL_SHORT] = TYPE_SIZE[GL_UNSIGNED_SHORT] = TYPE_SIZE[GL_HALF_FLOAT_OES] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_6_5] = TYPE_SIZE[GL_UNSIGNED_SHORT_4_4_4_4] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_5_5_1] = 2;
        TYPE_SIZE[GL_INT] = TYPE_SIZE[GL_UNSIGNED_INT] = TYPE_SIZE[GL_FLOAT] = TYPE_SIZE[GL_UNSIGNED_INT_24_8_WEBGL] = 4;
        function pixelSize(type, channels) {
          if (type === GL_UNSIGNED_SHORT_5_5_5_1 || type === GL_UNSIGNED_SHORT_4_4_4_4 || type === GL_UNSIGNED_SHORT_5_6_5) {
            return 2;
          } else if (type === GL_UNSIGNED_INT_24_8_WEBGL) {
            return 4;
          } else {
            return TYPE_SIZE[type] * channels;
          }
        }
        function isPow2(v) {
          return !(v & v - 1) && !!v;
        }
        function checkTexture2D(info, mipData, limits) {
          var i;
          var w = mipData.width;
          var h = mipData.height;
          var c = mipData.channels;
          check(
            w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize,
            "invalid texture shape"
          );
          if (info.wrapS !== GL_CLAMP_TO_EDGE || info.wrapT !== GL_CLAMP_TO_EDGE) {
            check(
              isPow2(w) && isPow2(h),
              "incompatible wrap mode for texture, both width and height must be power of 2"
            );
          }
          if (mipData.mipmask === 1) {
            if (w !== 1 && h !== 1) {
              check(
                info.minFilter !== GL_NEAREST_MIPMAP_NEAREST && info.minFilter !== GL_NEAREST_MIPMAP_LINEAR && info.minFilter !== GL_LINEAR_MIPMAP_NEAREST && info.minFilter !== GL_LINEAR_MIPMAP_LINEAR,
                "min filter requires mipmap"
              );
            }
          } else {
            check(
              isPow2(w) && isPow2(h),
              "texture must be a square power of 2 to support mipmapping"
            );
            check(
              mipData.mipmask === (w << 1) - 1,
              "missing or incomplete mipmap data"
            );
          }
          if (mipData.type === GL_FLOAT) {
            if (limits.extensions.indexOf("oes_texture_float_linear") < 0) {
              check(
                info.minFilter === GL_NEAREST && info.magFilter === GL_NEAREST,
                "filter not supported, must enable oes_texture_float_linear"
              );
            }
            check(
              !info.genMipmaps,
              "mipmap generation not supported with float textures"
            );
          }
          var mipimages = mipData.images;
          for (i = 0; i < 16; ++i) {
            if (mipimages[i]) {
              var mw = w >> i;
              var mh = h >> i;
              check(mipData.mipmask & 1 << i, "missing mipmap data");
              var img = mipimages[i];
              check(
                img.width === mw && img.height === mh,
                "invalid shape for mip images"
              );
              check(
                img.format === mipData.format && img.internalformat === mipData.internalformat && img.type === mipData.type,
                "incompatible type for mip image"
              );
              if (img.compressed) {
              } else if (img.data) {
                var rowSize = Math.ceil(pixelSize(img.type, c) * mw / img.unpackAlignment) * img.unpackAlignment;
                check(
                  img.data.byteLength === rowSize * mh,
                  "invalid data for image, buffer size is inconsistent with image format"
                );
              } else if (img.element) {
              } else if (img.copy) {
              }
            } else if (!info.genMipmaps) {
              check((mipData.mipmask & 1 << i) === 0, "extra mipmap data");
            }
          }
          if (mipData.compressed) {
            check(
              !info.genMipmaps,
              "mipmap generation for compressed images not supported"
            );
          }
        }
        function checkTextureCube(texture, info, faces, limits) {
          var w = texture.width;
          var h = texture.height;
          var c = texture.channels;
          check(
            w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize,
            "invalid texture shape"
          );
          check(
            w === h,
            "cube map must be square"
          );
          check(
            info.wrapS === GL_CLAMP_TO_EDGE && info.wrapT === GL_CLAMP_TO_EDGE,
            "wrap mode not supported by cube map"
          );
          for (var i = 0; i < faces.length; ++i) {
            var face = faces[i];
            check(
              face.width === w && face.height === h,
              "inconsistent cube map face shape"
            );
            if (info.genMipmaps) {
              check(
                !face.compressed,
                "can not generate mipmap for compressed textures"
              );
              check(
                face.mipmask === 1,
                "can not specify mipmaps and generate mipmaps"
              );
            } else {
            }
            var mipmaps = face.images;
            for (var j = 0; j < 16; ++j) {
              var img = mipmaps[j];
              if (img) {
                var mw = w >> j;
                var mh = h >> j;
                check(face.mipmask & 1 << j, "missing mipmap data");
                check(
                  img.width === mw && img.height === mh,
                  "invalid shape for mip images"
                );
                check(
                  img.format === texture.format && img.internalformat === texture.internalformat && img.type === texture.type,
                  "incompatible type for mip image"
                );
                if (img.compressed) {
                } else if (img.data) {
                  check(
                    img.data.byteLength === mw * mh * Math.max(pixelSize(img.type, c), img.unpackAlignment),
                    "invalid data for image, buffer size is inconsistent with image format"
                  );
                } else if (img.element) {
                } else if (img.copy) {
                }
              }
            }
          }
        }
        var check$1 = extend2(check, {
          optional: checkOptional,
          raise: raise2,
          commandRaise,
          command: checkCommand,
          parameter: checkParameter,
          commandParameter: checkParameterCommand,
          constructor: checkConstructor,
          type: checkTypeOf,
          commandType: checkCommandType,
          isTypedArray: checkIsTypedArray,
          nni: checkNonNegativeInt,
          oneOf: checkOneOf,
          shaderError: checkShaderError,
          linkError: checkLinkError,
          callSite: guessCallSite,
          saveCommandRef,
          saveDrawInfo: saveDrawCommandInfo,
          framebufferFormat: checkFramebufferFormat,
          guessCommand,
          texture2D: checkTexture2D,
          textureCube: checkTextureCube
        });
        var VARIABLE_COUNTER = 0;
        var DYN_FUNC = 0;
        var DYN_CONSTANT = 5;
        var DYN_ARRAY = 6;
        function DynamicVariable(type, data) {
          this.id = VARIABLE_COUNTER++;
          this.type = type;
          this.data = data;
        }
        function escapeStr(str2) {
          return str2.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        }
        function splitParts(str2) {
          if (str2.length === 0) {
            return [];
          }
          var firstChar = str2.charAt(0);
          var lastChar = str2.charAt(str2.length - 1);
          if (str2.length > 1 && firstChar === lastChar && (firstChar === '"' || firstChar === "'")) {
            return ['"' + escapeStr(str2.substr(1, str2.length - 2)) + '"'];
          }
          var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str2);
          if (parts) {
            return splitParts(str2.substr(0, parts.index)).concat(splitParts(parts[1])).concat(splitParts(str2.substr(parts.index + parts[0].length)));
          }
          var subparts = str2.split(".");
          if (subparts.length === 1) {
            return ['"' + escapeStr(str2) + '"'];
          }
          var result = [];
          for (var i = 0; i < subparts.length; ++i) {
            result = result.concat(splitParts(subparts[i]));
          }
          return result;
        }
        function toAccessorString(str2) {
          return "[" + splitParts(str2).join("][") + "]";
        }
        function defineDynamic(type, data) {
          return new DynamicVariable(type, toAccessorString(data + ""));
        }
        function isDynamic(x) {
          return typeof x === "function" && !x._reglType || x instanceof DynamicVariable;
        }
        function unbox(x, path) {
          if (typeof x === "function") {
            return new DynamicVariable(DYN_FUNC, x);
          } else if (typeof x === "number" || typeof x === "boolean") {
            return new DynamicVariable(DYN_CONSTANT, x);
          } else if (Array.isArray(x)) {
            return new DynamicVariable(DYN_ARRAY, x.map(function(y, i) {
              return unbox(y, path + "[" + i + "]");
            }));
          } else if (x instanceof DynamicVariable) {
            return x;
          }
          check$1(false, "invalid option type in uniform " + path);
        }
        var dynamic = {
          DynamicVariable,
          define: defineDynamic,
          isDynamic,
          unbox,
          accessor: toAccessorString
        };
        var raf = {
          next: typeof requestAnimationFrame === "function" ? function(cb) {
            return requestAnimationFrame(cb);
          } : function(cb) {
            return setTimeout(cb, 16);
          },
          cancel: typeof cancelAnimationFrame === "function" ? function(raf2) {
            return cancelAnimationFrame(raf2);
          } : clearTimeout
        };
        var clock2 = typeof performance !== "undefined" && performance.now ? function() {
          return performance.now();
        } : function() {
          return +new Date();
        };
        function createStringStore() {
          var stringIds = { "": 0 };
          var stringValues = [""];
          return {
            id: function(str2) {
              var result = stringIds[str2];
              if (result) {
                return result;
              }
              result = stringIds[str2] = stringValues.length;
              stringValues.push(str2);
              return result;
            },
            str: function(id2) {
              return stringValues[id2];
            }
          };
        }
        function createCanvas(element, onDone, pixelRatio) {
          var canvas2 = document.createElement("canvas");
          extend2(canvas2.style, {
            border: 0,
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          });
          element.appendChild(canvas2);
          if (element === document.body) {
            canvas2.style.position = "absolute";
            extend2(element.style, {
              margin: 0,
              padding: 0
            });
          }
          function resize() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            if (element !== document.body) {
              var bounds = canvas2.getBoundingClientRect();
              w = bounds.right - bounds.left;
              h = bounds.bottom - bounds.top;
            }
            canvas2.width = pixelRatio * w;
            canvas2.height = pixelRatio * h;
          }
          var resizeObserver;
          if (element !== document.body && typeof ResizeObserver === "function") {
            resizeObserver = new ResizeObserver(function() {
              setTimeout(resize);
            });
            resizeObserver.observe(element);
          } else {
            window.addEventListener("resize", resize, false);
          }
          function onDestroy() {
            if (resizeObserver) {
              resizeObserver.disconnect();
            } else {
              window.removeEventListener("resize", resize);
            }
            element.removeChild(canvas2);
          }
          resize();
          return {
            canvas: canvas2,
            onDestroy
          };
        }
        function createContext(canvas2, contextAttributes) {
          function get3(name) {
            try {
              return canvas2.getContext(name, contextAttributes);
            } catch (e) {
              return null;
            }
          }
          return get3("webgl") || get3("experimental-webgl") || get3("webgl-experimental");
        }
        function isHTMLElement(obj) {
          return typeof obj.nodeName === "string" && typeof obj.appendChild === "function" && typeof obj.getBoundingClientRect === "function";
        }
        function isWebGLContext(obj) {
          return typeof obj.drawArrays === "function" || typeof obj.drawElements === "function";
        }
        function parseExtensions(input) {
          if (typeof input === "string") {
            return input.split();
          }
          check$1(Array.isArray(input), "invalid extension array");
          return input;
        }
        function getElement(desc) {
          if (typeof desc === "string") {
            check$1(typeof document !== "undefined", "not supported outside of DOM");
            return document.querySelector(desc);
          }
          return desc;
        }
        function parseArgs(args_) {
          var args = args_ || {};
          var element, container, canvas2, gl;
          var contextAttributes = {};
          var extensions = [];
          var optionalExtensions = [];
          var pixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio;
          var profile = false;
          var onDone = function(err) {
            if (err) {
              check$1.raise(err);
            }
          };
          var onDestroy = function() {
          };
          if (typeof args === "string") {
            check$1(
              typeof document !== "undefined",
              "selector queries only supported in DOM enviroments"
            );
            element = document.querySelector(args);
            check$1(element, "invalid query string for element");
          } else if (typeof args === "object") {
            if (isHTMLElement(args)) {
              element = args;
            } else if (isWebGLContext(args)) {
              gl = args;
              canvas2 = gl.canvas;
            } else {
              check$1.constructor(args);
              if ("gl" in args) {
                gl = args.gl;
              } else if ("canvas" in args) {
                canvas2 = getElement(args.canvas);
              } else if ("container" in args) {
                container = getElement(args.container);
              }
              if ("attributes" in args) {
                contextAttributes = args.attributes;
                check$1.type(contextAttributes, "object", "invalid context attributes");
              }
              if ("extensions" in args) {
                extensions = parseExtensions(args.extensions);
              }
              if ("optionalExtensions" in args) {
                optionalExtensions = parseExtensions(args.optionalExtensions);
              }
              if ("onDone" in args) {
                check$1.type(
                  args.onDone,
                  "function",
                  "invalid or missing onDone callback"
                );
                onDone = args.onDone;
              }
              if ("profile" in args) {
                profile = !!args.profile;
              }
              if ("pixelRatio" in args) {
                pixelRatio = +args.pixelRatio;
                check$1(pixelRatio > 0, "invalid pixel ratio");
              }
            }
          } else {
            check$1.raise("invalid arguments to regl");
          }
          if (element) {
            if (element.nodeName.toLowerCase() === "canvas") {
              canvas2 = element;
            } else {
              container = element;
            }
          }
          if (!gl) {
            if (!canvas2) {
              check$1(
                typeof document !== "undefined",
                "must manually specify webgl context outside of DOM environments"
              );
              var result = createCanvas(container || document.body, onDone, pixelRatio);
              if (!result) {
                return null;
              }
              canvas2 = result.canvas;
              onDestroy = result.onDestroy;
            }
            if (contextAttributes.premultipliedAlpha === void 0)
              contextAttributes.premultipliedAlpha = true;
            gl = createContext(canvas2, contextAttributes);
          }
          if (!gl) {
            onDestroy();
            onDone("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org");
            return null;
          }
          return {
            gl,
            canvas: canvas2,
            container,
            extensions,
            optionalExtensions,
            pixelRatio,
            profile,
            onDone,
            onDestroy
          };
        }
        function createExtensionCache(gl, config2) {
          var extensions = {};
          function tryLoadExtension(name_) {
            check$1.type(name_, "string", "extension name must be string");
            var name2 = name_.toLowerCase();
            var ext;
            try {
              ext = extensions[name2] = gl.getExtension(name2);
            } catch (e) {
            }
            return !!ext;
          }
          for (var i = 0; i < config2.extensions.length; ++i) {
            var name = config2.extensions[i];
            if (!tryLoadExtension(name)) {
              config2.onDestroy();
              config2.onDone('"' + name + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser');
              return null;
            }
          }
          config2.optionalExtensions.forEach(tryLoadExtension);
          return {
            extensions,
            restore: function() {
              Object.keys(extensions).forEach(function(name2) {
                if (extensions[name2] && !tryLoadExtension(name2)) {
                  throw new Error("(regl): error restoring extension " + name2);
                }
              });
            }
          };
        }
        function loop(n, f) {
          var result = Array(n);
          for (var i = 0; i < n; ++i) {
            result[i] = f(i);
          }
          return result;
        }
        var GL_BYTE$1 = 5120;
        var GL_UNSIGNED_BYTE$2 = 5121;
        var GL_SHORT$1 = 5122;
        var GL_UNSIGNED_SHORT$1 = 5123;
        var GL_INT$1 = 5124;
        var GL_UNSIGNED_INT$1 = 5125;
        var GL_FLOAT$2 = 5126;
        function nextPow16(v) {
          for (var i = 16; i <= 1 << 28; i *= 16) {
            if (v <= i) {
              return i;
            }
          }
          return 0;
        }
        function log2(v) {
          var r, shift;
          r = (v > 65535) << 4;
          v >>>= r;
          shift = (v > 255) << 3;
          v >>>= shift;
          r |= shift;
          shift = (v > 15) << 2;
          v >>>= shift;
          r |= shift;
          shift = (v > 3) << 1;
          v >>>= shift;
          r |= shift;
          return r | v >> 1;
        }
        function createPool() {
          var bufferPool = loop(8, function() {
            return [];
          });
          function alloc(n) {
            var sz = nextPow16(n);
            var bin = bufferPool[log2(sz) >> 2];
            if (bin.length > 0) {
              return bin.pop();
            }
            return new ArrayBuffer(sz);
          }
          function free(buf) {
            bufferPool[log2(buf.byteLength) >> 2].push(buf);
          }
          function allocType(type, n) {
            var result = null;
            switch (type) {
              case GL_BYTE$1:
                result = new Int8Array(alloc(n), 0, n);
                break;
              case GL_UNSIGNED_BYTE$2:
                result = new Uint8Array(alloc(n), 0, n);
                break;
              case GL_SHORT$1:
                result = new Int16Array(alloc(2 * n), 0, n);
                break;
              case GL_UNSIGNED_SHORT$1:
                result = new Uint16Array(alloc(2 * n), 0, n);
                break;
              case GL_INT$1:
                result = new Int32Array(alloc(4 * n), 0, n);
                break;
              case GL_UNSIGNED_INT$1:
                result = new Uint32Array(alloc(4 * n), 0, n);
                break;
              case GL_FLOAT$2:
                result = new Float32Array(alloc(4 * n), 0, n);
                break;
              default:
                return null;
            }
            if (result.length !== n) {
              return result.subarray(0, n);
            }
            return result;
          }
          function freeType(array2) {
            free(array2.buffer);
          }
          return {
            alloc,
            free,
            allocType,
            freeType
          };
        }
        var pool = createPool();
        pool.zero = createPool();
        var GL_SUBPIXEL_BITS = 3408;
        var GL_RED_BITS = 3410;
        var GL_GREEN_BITS = 3411;
        var GL_BLUE_BITS = 3412;
        var GL_ALPHA_BITS = 3413;
        var GL_DEPTH_BITS = 3414;
        var GL_STENCIL_BITS = 3415;
        var GL_ALIASED_POINT_SIZE_RANGE = 33901;
        var GL_ALIASED_LINE_WIDTH_RANGE = 33902;
        var GL_MAX_TEXTURE_SIZE = 3379;
        var GL_MAX_VIEWPORT_DIMS = 3386;
        var GL_MAX_VERTEX_ATTRIBS = 34921;
        var GL_MAX_VERTEX_UNIFORM_VECTORS = 36347;
        var GL_MAX_VARYING_VECTORS = 36348;
        var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
        var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
        var GL_MAX_TEXTURE_IMAGE_UNITS = 34930;
        var GL_MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
        var GL_MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
        var GL_MAX_RENDERBUFFER_SIZE = 34024;
        var GL_VENDOR = 7936;
        var GL_RENDERER = 7937;
        var GL_VERSION = 7938;
        var GL_SHADING_LANGUAGE_VERSION = 35724;
        var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047;
        var GL_MAX_COLOR_ATTACHMENTS_WEBGL = 36063;
        var GL_MAX_DRAW_BUFFERS_WEBGL = 34852;
        var GL_TEXTURE_2D = 3553;
        var GL_TEXTURE_CUBE_MAP = 34067;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
        var GL_TEXTURE0 = 33984;
        var GL_RGBA = 6408;
        var GL_FLOAT$1 = 5126;
        var GL_UNSIGNED_BYTE$1 = 5121;
        var GL_FRAMEBUFFER = 36160;
        var GL_FRAMEBUFFER_COMPLETE = 36053;
        var GL_COLOR_ATTACHMENT0 = 36064;
        var GL_COLOR_BUFFER_BIT$1 = 16384;
        var wrapLimits = function(gl, extensions) {
          var maxAnisotropic = 1;
          if (extensions.ext_texture_filter_anisotropic) {
            maxAnisotropic = gl.getParameter(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }
          var maxDrawbuffers = 1;
          var maxColorAttachments = 1;
          if (extensions.webgl_draw_buffers) {
            maxDrawbuffers = gl.getParameter(GL_MAX_DRAW_BUFFERS_WEBGL);
            maxColorAttachments = gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL);
          }
          var readFloat = !!extensions.oes_texture_float;
          if (readFloat) {
            var readFloatTexture = gl.createTexture();
            gl.bindTexture(GL_TEXTURE_2D, readFloatTexture);
            gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_FLOAT$1, null);
            var fbo = gl.createFramebuffer();
            gl.bindFramebuffer(GL_FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, readFloatTexture, 0);
            gl.bindTexture(GL_TEXTURE_2D, null);
            if (gl.checkFramebufferStatus(GL_FRAMEBUFFER) !== GL_FRAMEBUFFER_COMPLETE)
              readFloat = false;
            else {
              gl.viewport(0, 0, 1, 1);
              gl.clearColor(1, 0, 0, 1);
              gl.clear(GL_COLOR_BUFFER_BIT$1);
              var pixels = pool.allocType(GL_FLOAT$1, 4);
              gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_FLOAT$1, pixels);
              if (gl.getError())
                readFloat = false;
              else {
                gl.deleteFramebuffer(fbo);
                gl.deleteTexture(readFloatTexture);
                readFloat = pixels[0] === 1;
              }
              pool.freeType(pixels);
            }
          }
          var isIE = typeof navigator !== "undefined" && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent));
          var npotTextureCube = true;
          if (!isIE) {
            var cubeTexture = gl.createTexture();
            var data = pool.allocType(GL_UNSIGNED_BYTE$1, 36);
            gl.activeTexture(GL_TEXTURE0);
            gl.bindTexture(GL_TEXTURE_CUBE_MAP, cubeTexture);
            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X, 0, GL_RGBA, 3, 3, 0, GL_RGBA, GL_UNSIGNED_BYTE$1, data);
            pool.freeType(data);
            gl.bindTexture(GL_TEXTURE_CUBE_MAP, null);
            gl.deleteTexture(cubeTexture);
            npotTextureCube = !gl.getError();
          }
          return {
            colorBits: [
              gl.getParameter(GL_RED_BITS),
              gl.getParameter(GL_GREEN_BITS),
              gl.getParameter(GL_BLUE_BITS),
              gl.getParameter(GL_ALPHA_BITS)
            ],
            depthBits: gl.getParameter(GL_DEPTH_BITS),
            stencilBits: gl.getParameter(GL_STENCIL_BITS),
            subpixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
            extensions: Object.keys(extensions).filter(function(ext) {
              return !!extensions[ext];
            }),
            maxAnisotropic,
            maxDrawbuffers,
            maxColorAttachments,
            pointSizeDims: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE),
            lineWidthDims: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE),
            maxViewportDims: gl.getParameter(GL_MAX_VIEWPORT_DIMS),
            maxCombinedTextureUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            maxCubeMapSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
            maxRenderbufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
            maxTextureUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
            maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
            maxAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
            maxVertexUniforms: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
            maxVertexTextureUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
            maxFragmentUniforms: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
            glsl: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
            renderer: gl.getParameter(GL_RENDERER),
            vendor: gl.getParameter(GL_VENDOR),
            version: gl.getParameter(GL_VERSION),
            readFloat,
            npotTextureCube
          };
        };
        function isNDArrayLike(obj) {
          return !!obj && typeof obj === "object" && Array.isArray(obj.shape) && Array.isArray(obj.stride) && typeof obj.offset === "number" && obj.shape.length === obj.stride.length && (Array.isArray(obj.data) || isTypedArray(obj.data));
        }
        var values = function(obj) {
          return Object.keys(obj).map(function(key) {
            return obj[key];
          });
        };
        var flattenUtils = {
          shape: arrayShape$1,
          flatten: flattenArray
        };
        function flatten1D(array2, nx, out) {
          for (var i = 0; i < nx; ++i) {
            out[i] = array2[i];
          }
        }
        function flatten2D(array2, nx, ny, out) {
          var ptr = 0;
          for (var i = 0; i < nx; ++i) {
            var row = array2[i];
            for (var j = 0; j < ny; ++j) {
              out[ptr++] = row[j];
            }
          }
        }
        function flatten3D(array2, nx, ny, nz, out, ptr_) {
          var ptr = ptr_;
          for (var i = 0; i < nx; ++i) {
            var row = array2[i];
            for (var j = 0; j < ny; ++j) {
              var col = row[j];
              for (var k = 0; k < nz; ++k) {
                out[ptr++] = col[k];
              }
            }
          }
        }
        function flattenRec(array2, shape, level, out, ptr) {
          var stride = 1;
          for (var i = level + 1; i < shape.length; ++i) {
            stride *= shape[i];
          }
          var n = shape[level];
          if (shape.length - level === 4) {
            var nx = shape[level + 1];
            var ny = shape[level + 2];
            var nz = shape[level + 3];
            for (i = 0; i < n; ++i) {
              flatten3D(array2[i], nx, ny, nz, out, ptr);
              ptr += stride;
            }
          } else {
            for (i = 0; i < n; ++i) {
              flattenRec(array2[i], shape, level + 1, out, ptr);
              ptr += stride;
            }
          }
        }
        function flattenArray(array2, shape, type, out_) {
          var sz = 1;
          if (shape.length) {
            for (var i = 0; i < shape.length; ++i) {
              sz *= shape[i];
            }
          } else {
            sz = 0;
          }
          var out = out_ || pool.allocType(type, sz);
          switch (shape.length) {
            case 0:
              break;
            case 1:
              flatten1D(array2, shape[0], out);
              break;
            case 2:
              flatten2D(array2, shape[0], shape[1], out);
              break;
            case 3:
              flatten3D(array2, shape[0], shape[1], shape[2], out, 0);
              break;
            default:
              flattenRec(array2, shape, 0, out, 0);
          }
          return out;
        }
        function arrayShape$1(array_) {
          var shape = [];
          for (var array2 = array_; array2.length; array2 = array2[0]) {
            shape.push(array2.length);
          }
          return shape;
        }
        var arrayTypes = {
          "[object Int8Array]": 5120,
          "[object Int16Array]": 5122,
          "[object Int32Array]": 5124,
          "[object Uint8Array]": 5121,
          "[object Uint8ClampedArray]": 5121,
          "[object Uint16Array]": 5123,
          "[object Uint32Array]": 5125,
          "[object Float32Array]": 5126,
          "[object Float64Array]": 5121,
          "[object ArrayBuffer]": 5121
        };
        var int8 = 5120;
        var int16 = 5122;
        var int32 = 5124;
        var uint8 = 5121;
        var uint16 = 5123;
        var uint32 = 5125;
        var float = 5126;
        var float32 = 5126;
        var glTypes = {
          int8,
          int16,
          int32,
          uint8,
          uint16,
          uint32,
          float,
          float32
        };
        var dynamic$1 = 35048;
        var stream = 35040;
        var usageTypes = {
          dynamic: dynamic$1,
          stream,
          "static": 35044
        };
        var arrayFlatten = flattenUtils.flatten;
        var arrayShape = flattenUtils.shape;
        var GL_STATIC_DRAW = 35044;
        var GL_STREAM_DRAW = 35040;
        var GL_UNSIGNED_BYTE$3 = 5121;
        var GL_FLOAT$3 = 5126;
        var DTYPES_SIZES = [];
        DTYPES_SIZES[5120] = 1;
        DTYPES_SIZES[5122] = 2;
        DTYPES_SIZES[5124] = 4;
        DTYPES_SIZES[5121] = 1;
        DTYPES_SIZES[5123] = 2;
        DTYPES_SIZES[5125] = 4;
        DTYPES_SIZES[5126] = 4;
        function typedArrayCode(data) {
          return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
        function copyArray(out, inp) {
          for (var i = 0; i < inp.length; ++i) {
            out[i] = inp[i];
          }
        }
        function transpose2(result, data, shapeX, shapeY, strideX, strideY, offset) {
          var ptr = 0;
          for (var i = 0; i < shapeX; ++i) {
            for (var j = 0; j < shapeY; ++j) {
              result[ptr++] = data[strideX * i + strideY * j + offset];
            }
          }
        }
        function wrapBufferState(gl, stats2, config2, destroyBuffer) {
          var bufferCount = 0;
          var bufferSet = {};
          function REGLBuffer(type) {
            this.id = bufferCount++;
            this.buffer = gl.createBuffer();
            this.type = type;
            this.usage = GL_STATIC_DRAW;
            this.byteLength = 0;
            this.dimension = 1;
            this.dtype = GL_UNSIGNED_BYTE$3;
            this.persistentData = null;
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          REGLBuffer.prototype.bind = function() {
            gl.bindBuffer(this.type, this.buffer);
          };
          REGLBuffer.prototype.destroy = function() {
            destroy(this);
          };
          var streamPool = [];
          function createStream(type, data) {
            var buffer = streamPool.pop();
            if (!buffer) {
              buffer = new REGLBuffer(type);
            }
            buffer.bind();
            initBufferFromData(buffer, data, GL_STREAM_DRAW, 0, 1, false);
            return buffer;
          }
          function destroyStream(stream$$1) {
            streamPool.push(stream$$1);
          }
          function initBufferFromTypedArray(buffer, data, usage) {
            buffer.byteLength = data.byteLength;
            gl.bufferData(buffer.type, data, usage);
          }
          function initBufferFromData(buffer, data, usage, dtype, dimension, persist) {
            var shape;
            buffer.usage = usage;
            if (Array.isArray(data)) {
              buffer.dtype = dtype || GL_FLOAT$3;
              if (data.length > 0) {
                var flatData;
                if (Array.isArray(data[0])) {
                  shape = arrayShape(data);
                  var dim = 1;
                  for (var i = 1; i < shape.length; ++i) {
                    dim *= shape[i];
                  }
                  buffer.dimension = dim;
                  flatData = arrayFlatten(data, shape, buffer.dtype);
                  initBufferFromTypedArray(buffer, flatData, usage);
                  if (persist) {
                    buffer.persistentData = flatData;
                  } else {
                    pool.freeType(flatData);
                  }
                } else if (typeof data[0] === "number") {
                  buffer.dimension = dimension;
                  var typedData = pool.allocType(buffer.dtype, data.length);
                  copyArray(typedData, data);
                  initBufferFromTypedArray(buffer, typedData, usage);
                  if (persist) {
                    buffer.persistentData = typedData;
                  } else {
                    pool.freeType(typedData);
                  }
                } else if (isTypedArray(data[0])) {
                  buffer.dimension = data[0].length;
                  buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$3;
                  flatData = arrayFlatten(
                    data,
                    [data.length, data[0].length],
                    buffer.dtype
                  );
                  initBufferFromTypedArray(buffer, flatData, usage);
                  if (persist) {
                    buffer.persistentData = flatData;
                  } else {
                    pool.freeType(flatData);
                  }
                } else {
                  check$1.raise("invalid buffer data");
                }
              }
            } else if (isTypedArray(data)) {
              buffer.dtype = dtype || typedArrayCode(data);
              buffer.dimension = dimension;
              initBufferFromTypedArray(buffer, data, usage);
              if (persist) {
                buffer.persistentData = new Uint8Array(new Uint8Array(data.buffer));
              }
            } else if (isNDArrayLike(data)) {
              shape = data.shape;
              var stride = data.stride;
              var offset = data.offset;
              var shapeX = 0;
              var shapeY = 0;
              var strideX = 0;
              var strideY = 0;
              if (shape.length === 1) {
                shapeX = shape[0];
                shapeY = 1;
                strideX = stride[0];
                strideY = 0;
              } else if (shape.length === 2) {
                shapeX = shape[0];
                shapeY = shape[1];
                strideX = stride[0];
                strideY = stride[1];
              } else {
                check$1.raise("invalid shape");
              }
              buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$3;
              buffer.dimension = shapeY;
              var transposeData2 = pool.allocType(buffer.dtype, shapeX * shapeY);
              transpose2(
                transposeData2,
                data.data,
                shapeX,
                shapeY,
                strideX,
                strideY,
                offset
              );
              initBufferFromTypedArray(buffer, transposeData2, usage);
              if (persist) {
                buffer.persistentData = transposeData2;
              } else {
                pool.freeType(transposeData2);
              }
            } else if (data instanceof ArrayBuffer) {
              buffer.dtype = GL_UNSIGNED_BYTE$3;
              buffer.dimension = dimension;
              initBufferFromTypedArray(buffer, data, usage);
              if (persist) {
                buffer.persistentData = new Uint8Array(new Uint8Array(data));
              }
            } else {
              check$1.raise("invalid buffer data");
            }
          }
          function destroy(buffer) {
            stats2.bufferCount--;
            destroyBuffer(buffer);
            var handle = buffer.buffer;
            check$1(handle, "buffer must not be deleted already");
            gl.deleteBuffer(handle);
            buffer.buffer = null;
            delete bufferSet[buffer.id];
          }
          function createBuffer(options, type, deferInit, persistent) {
            stats2.bufferCount++;
            var buffer = new REGLBuffer(type);
            bufferSet[buffer.id] = buffer;
            function reglBuffer(options2) {
              var usage = GL_STATIC_DRAW;
              var data = null;
              var byteLength = 0;
              var dtype = 0;
              var dimension = 1;
              if (Array.isArray(options2) || isTypedArray(options2) || isNDArrayLike(options2) || options2 instanceof ArrayBuffer) {
                data = options2;
              } else if (typeof options2 === "number") {
                byteLength = options2 | 0;
              } else if (options2) {
                check$1.type(
                  options2,
                  "object",
                  "buffer arguments must be an object, a number or an array"
                );
                if ("data" in options2) {
                  check$1(
                    data === null || Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data),
                    "invalid data for buffer"
                  );
                  data = options2.data;
                }
                if ("usage" in options2) {
                  check$1.parameter(options2.usage, usageTypes, "invalid buffer usage");
                  usage = usageTypes[options2.usage];
                }
                if ("type" in options2) {
                  check$1.parameter(options2.type, glTypes, "invalid buffer type");
                  dtype = glTypes[options2.type];
                }
                if ("dimension" in options2) {
                  check$1.type(options2.dimension, "number", "invalid dimension");
                  dimension = options2.dimension | 0;
                }
                if ("length" in options2) {
                  check$1.nni(byteLength, "buffer length must be a nonnegative integer");
                  byteLength = options2.length | 0;
                }
              }
              buffer.bind();
              if (!data) {
                if (byteLength)
                  gl.bufferData(buffer.type, byteLength, usage);
                buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
                buffer.usage = usage;
                buffer.dimension = dimension;
                buffer.byteLength = byteLength;
              } else {
                initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
              }
              if (config2.profile) {
                buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
              }
              return reglBuffer;
            }
            function setSubData(data, offset) {
              check$1(
                offset + data.byteLength <= buffer.byteLength,
                "invalid buffer subdata call, buffer is too small.  Can't write data of size " + data.byteLength + " starting from offset " + offset + " to a buffer of size " + buffer.byteLength
              );
              gl.bufferSubData(buffer.type, offset, data);
            }
            function subdata(data, offset_) {
              var offset = (offset_ || 0) | 0;
              var shape;
              buffer.bind();
              if (isTypedArray(data) || data instanceof ArrayBuffer) {
                setSubData(data, offset);
              } else if (Array.isArray(data)) {
                if (data.length > 0) {
                  if (typeof data[0] === "number") {
                    var converted = pool.allocType(buffer.dtype, data.length);
                    copyArray(converted, data);
                    setSubData(converted, offset);
                    pool.freeType(converted);
                  } else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
                    shape = arrayShape(data);
                    var flatData = arrayFlatten(data, shape, buffer.dtype);
                    setSubData(flatData, offset);
                    pool.freeType(flatData);
                  } else {
                    check$1.raise("invalid buffer data");
                  }
                }
              } else if (isNDArrayLike(data)) {
                shape = data.shape;
                var stride = data.stride;
                var shapeX = 0;
                var shapeY = 0;
                var strideX = 0;
                var strideY = 0;
                if (shape.length === 1) {
                  shapeX = shape[0];
                  shapeY = 1;
                  strideX = stride[0];
                  strideY = 0;
                } else if (shape.length === 2) {
                  shapeX = shape[0];
                  shapeY = shape[1];
                  strideX = stride[0];
                  strideY = stride[1];
                } else {
                  check$1.raise("invalid shape");
                }
                var dtype = Array.isArray(data.data) ? buffer.dtype : typedArrayCode(data.data);
                var transposeData2 = pool.allocType(dtype, shapeX * shapeY);
                transpose2(
                  transposeData2,
                  data.data,
                  shapeX,
                  shapeY,
                  strideX,
                  strideY,
                  data.offset
                );
                setSubData(transposeData2, offset);
                pool.freeType(transposeData2);
              } else {
                check$1.raise("invalid data for buffer subdata");
              }
              return reglBuffer;
            }
            if (!deferInit) {
              reglBuffer(options);
            }
            reglBuffer._reglType = "buffer";
            reglBuffer._buffer = buffer;
            reglBuffer.subdata = subdata;
            if (config2.profile) {
              reglBuffer.stats = buffer.stats;
            }
            reglBuffer.destroy = function() {
              destroy(buffer);
            };
            return reglBuffer;
          }
          function restoreBuffers() {
            values(bufferSet).forEach(function(buffer) {
              buffer.buffer = gl.createBuffer();
              gl.bindBuffer(buffer.type, buffer.buffer);
              gl.bufferData(
                buffer.type,
                buffer.persistentData || buffer.byteLength,
                buffer.usage
              );
            });
          }
          if (config2.profile) {
            stats2.getTotalBufferSize = function() {
              var total = 0;
              Object.keys(bufferSet).forEach(function(key) {
                total += bufferSet[key].stats.size;
              });
              return total;
            };
          }
          return {
            create: createBuffer,
            createStream,
            destroyStream,
            clear: function() {
              values(bufferSet).forEach(destroy);
              streamPool.forEach(destroy);
            },
            getBuffer: function(wrapper) {
              if (wrapper && wrapper._buffer instanceof REGLBuffer) {
                return wrapper._buffer;
              }
              return null;
            },
            restore: restoreBuffers,
            _initBuffer: initBufferFromData
          };
        }
        var points = 0;
        var point = 0;
        var lines = 1;
        var line = 1;
        var triangles = 4;
        var triangle = 4;
        var primTypes = {
          points,
          point,
          lines,
          line,
          triangles,
          triangle,
          "line loop": 2,
          "line strip": 3,
          "triangle strip": 5,
          "triangle fan": 6
        };
        var GL_POINTS = 0;
        var GL_LINES = 1;
        var GL_TRIANGLES = 4;
        var GL_BYTE$2 = 5120;
        var GL_UNSIGNED_BYTE$4 = 5121;
        var GL_SHORT$2 = 5122;
        var GL_UNSIGNED_SHORT$2 = 5123;
        var GL_INT$2 = 5124;
        var GL_UNSIGNED_INT$2 = 5125;
        var GL_ELEMENT_ARRAY_BUFFER = 34963;
        var GL_STREAM_DRAW$1 = 35040;
        var GL_STATIC_DRAW$1 = 35044;
        function wrapElementsState(gl, extensions, bufferState, stats2) {
          var elementSet = {};
          var elementCount = 0;
          var elementTypes = {
            "uint8": GL_UNSIGNED_BYTE$4,
            "uint16": GL_UNSIGNED_SHORT$2
          };
          if (extensions.oes_element_index_uint) {
            elementTypes.uint32 = GL_UNSIGNED_INT$2;
          }
          function REGLElementBuffer(buffer) {
            this.id = elementCount++;
            elementSet[this.id] = this;
            this.buffer = buffer;
            this.primType = GL_TRIANGLES;
            this.vertCount = 0;
            this.type = 0;
          }
          REGLElementBuffer.prototype.bind = function() {
            this.buffer.bind();
          };
          var bufferPool = [];
          function createElementStream(data) {
            var result = bufferPool.pop();
            if (!result) {
              result = new REGLElementBuffer(bufferState.create(
                null,
                GL_ELEMENT_ARRAY_BUFFER,
                true,
                false
              )._buffer);
            }
            initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
            return result;
          }
          function destroyElementStream(elements) {
            bufferPool.push(elements);
          }
          function initElements(elements, data, usage, prim, count, byteLength, type) {
            elements.buffer.bind();
            var dtype;
            if (data) {
              var predictedType = type;
              if (!type && (!isTypedArray(data) || isNDArrayLike(data) && !isTypedArray(data.data))) {
                predictedType = extensions.oes_element_index_uint ? GL_UNSIGNED_INT$2 : GL_UNSIGNED_SHORT$2;
              }
              bufferState._initBuffer(
                elements.buffer,
                data,
                usage,
                predictedType,
                3
              );
            } else {
              gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
              elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$4;
              elements.buffer.usage = usage;
              elements.buffer.dimension = 3;
              elements.buffer.byteLength = byteLength;
            }
            dtype = type;
            if (!type) {
              switch (elements.buffer.dtype) {
                case GL_UNSIGNED_BYTE$4:
                case GL_BYTE$2:
                  dtype = GL_UNSIGNED_BYTE$4;
                  break;
                case GL_UNSIGNED_SHORT$2:
                case GL_SHORT$2:
                  dtype = GL_UNSIGNED_SHORT$2;
                  break;
                case GL_UNSIGNED_INT$2:
                case GL_INT$2:
                  dtype = GL_UNSIGNED_INT$2;
                  break;
                default:
                  check$1.raise("unsupported type for element array");
              }
              elements.buffer.dtype = dtype;
            }
            elements.type = dtype;
            check$1(
              dtype !== GL_UNSIGNED_INT$2 || !!extensions.oes_element_index_uint,
              "32 bit element buffers not supported, enable oes_element_index_uint first"
            );
            var vertCount = count;
            if (vertCount < 0) {
              vertCount = elements.buffer.byteLength;
              if (dtype === GL_UNSIGNED_SHORT$2) {
                vertCount >>= 1;
              } else if (dtype === GL_UNSIGNED_INT$2) {
                vertCount >>= 2;
              }
            }
            elements.vertCount = vertCount;
            var primType = prim;
            if (prim < 0) {
              primType = GL_TRIANGLES;
              var dimension = elements.buffer.dimension;
              if (dimension === 1)
                primType = GL_POINTS;
              if (dimension === 2)
                primType = GL_LINES;
              if (dimension === 3)
                primType = GL_TRIANGLES;
            }
            elements.primType = primType;
          }
          function destroyElements(elements) {
            stats2.elementsCount--;
            check$1(elements.buffer !== null, "must not double destroy elements");
            delete elementSet[elements.id];
            elements.buffer.destroy();
            elements.buffer = null;
          }
          function createElements(options, persistent) {
            var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
            var elements = new REGLElementBuffer(buffer._buffer);
            stats2.elementsCount++;
            function reglElements(options2) {
              if (!options2) {
                buffer();
                elements.primType = GL_TRIANGLES;
                elements.vertCount = 0;
                elements.type = GL_UNSIGNED_BYTE$4;
              } else if (typeof options2 === "number") {
                buffer(options2);
                elements.primType = GL_TRIANGLES;
                elements.vertCount = options2 | 0;
                elements.type = GL_UNSIGNED_BYTE$4;
              } else {
                var data = null;
                var usage = GL_STATIC_DRAW$1;
                var primType = -1;
                var vertCount = -1;
                var byteLength = 0;
                var dtype = 0;
                if (Array.isArray(options2) || isTypedArray(options2) || isNDArrayLike(options2)) {
                  data = options2;
                } else {
                  check$1.type(options2, "object", "invalid arguments for elements");
                  if ("data" in options2) {
                    data = options2.data;
                    check$1(
                      Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data),
                      "invalid data for element buffer"
                    );
                  }
                  if ("usage" in options2) {
                    check$1.parameter(
                      options2.usage,
                      usageTypes,
                      "invalid element buffer usage"
                    );
                    usage = usageTypes[options2.usage];
                  }
                  if ("primitive" in options2) {
                    check$1.parameter(
                      options2.primitive,
                      primTypes,
                      "invalid element buffer primitive"
                    );
                    primType = primTypes[options2.primitive];
                  }
                  if ("count" in options2) {
                    check$1(
                      typeof options2.count === "number" && options2.count >= 0,
                      "invalid vertex count for elements"
                    );
                    vertCount = options2.count | 0;
                  }
                  if ("type" in options2) {
                    check$1.parameter(
                      options2.type,
                      elementTypes,
                      "invalid buffer type"
                    );
                    dtype = elementTypes[options2.type];
                  }
                  if ("length" in options2) {
                    byteLength = options2.length | 0;
                  } else {
                    byteLength = vertCount;
                    if (dtype === GL_UNSIGNED_SHORT$2 || dtype === GL_SHORT$2) {
                      byteLength *= 2;
                    } else if (dtype === GL_UNSIGNED_INT$2 || dtype === GL_INT$2) {
                      byteLength *= 4;
                    }
                  }
                }
                initElements(
                  elements,
                  data,
                  usage,
                  primType,
                  vertCount,
                  byteLength,
                  dtype
                );
              }
              return reglElements;
            }
            reglElements(options);
            reglElements._reglType = "elements";
            reglElements._elements = elements;
            reglElements.subdata = function(data, offset) {
              buffer.subdata(data, offset);
              return reglElements;
            };
            reglElements.destroy = function() {
              destroyElements(elements);
            };
            return reglElements;
          }
          return {
            create: createElements,
            createStream: createElementStream,
            destroyStream: destroyElementStream,
            getElements: function(elements) {
              if (typeof elements === "function" && elements._elements instanceof REGLElementBuffer) {
                return elements._elements;
              }
              return null;
            },
            clear: function() {
              values(elementSet).forEach(destroyElements);
            }
          };
        }
        var FLOAT = new Float32Array(1);
        var INT = new Uint32Array(FLOAT.buffer);
        var GL_UNSIGNED_SHORT$4 = 5123;
        function convertToHalfFloat(array2) {
          var ushorts = pool.allocType(GL_UNSIGNED_SHORT$4, array2.length);
          for (var i = 0; i < array2.length; ++i) {
            if (isNaN(array2[i])) {
              ushorts[i] = 65535;
            } else if (array2[i] === Infinity) {
              ushorts[i] = 31744;
            } else if (array2[i] === -Infinity) {
              ushorts[i] = 64512;
            } else {
              FLOAT[0] = array2[i];
              var x = INT[0];
              var sgn = x >>> 31 << 15;
              var exp = (x << 1 >>> 24) - 127;
              var frac = x >> 13 & (1 << 10) - 1;
              if (exp < -24) {
                ushorts[i] = sgn;
              } else if (exp < -14) {
                var s = -14 - exp;
                ushorts[i] = sgn + (frac + (1 << 10) >> s);
              } else if (exp > 15) {
                ushorts[i] = sgn + 31744;
              } else {
                ushorts[i] = sgn + (exp + 15 << 10) + frac;
              }
            }
          }
          return ushorts;
        }
        function isArrayLike(s) {
          return Array.isArray(s) || isTypedArray(s);
        }
        var isPow2$1 = function(v) {
          return !(v & v - 1) && !!v;
        };
        var GL_COMPRESSED_TEXTURE_FORMATS = 34467;
        var GL_TEXTURE_2D$1 = 3553;
        var GL_TEXTURE_CUBE_MAP$1 = 34067;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 = 34069;
        var GL_RGBA$1 = 6408;
        var GL_ALPHA = 6406;
        var GL_RGB = 6407;
        var GL_LUMINANCE = 6409;
        var GL_LUMINANCE_ALPHA = 6410;
        var GL_RGBA4 = 32854;
        var GL_RGB5_A1 = 32855;
        var GL_RGB565 = 36194;
        var GL_UNSIGNED_SHORT_4_4_4_4$1 = 32819;
        var GL_UNSIGNED_SHORT_5_5_5_1$1 = 32820;
        var GL_UNSIGNED_SHORT_5_6_5$1 = 33635;
        var GL_UNSIGNED_INT_24_8_WEBGL$1 = 34042;
        var GL_DEPTH_COMPONENT = 6402;
        var GL_DEPTH_STENCIL = 34041;
        var GL_SRGB_EXT = 35904;
        var GL_SRGB_ALPHA_EXT = 35906;
        var GL_HALF_FLOAT_OES$1 = 36193;
        var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 33776;
        var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777;
        var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778;
        var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779;
        var GL_COMPRESSED_RGB_ATC_WEBGL = 35986;
        var GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35987;
        var GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798;
        var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840;
        var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841;
        var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842;
        var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843;
        var GL_COMPRESSED_RGB_ETC1_WEBGL = 36196;
        var GL_UNSIGNED_BYTE$5 = 5121;
        var GL_UNSIGNED_SHORT$3 = 5123;
        var GL_UNSIGNED_INT$3 = 5125;
        var GL_FLOAT$4 = 5126;
        var GL_TEXTURE_WRAP_S = 10242;
        var GL_TEXTURE_WRAP_T = 10243;
        var GL_REPEAT = 10497;
        var GL_CLAMP_TO_EDGE$1 = 33071;
        var GL_MIRRORED_REPEAT = 33648;
        var GL_TEXTURE_MAG_FILTER = 10240;
        var GL_TEXTURE_MIN_FILTER = 10241;
        var GL_NEAREST$1 = 9728;
        var GL_LINEAR = 9729;
        var GL_NEAREST_MIPMAP_NEAREST$1 = 9984;
        var GL_LINEAR_MIPMAP_NEAREST$1 = 9985;
        var GL_NEAREST_MIPMAP_LINEAR$1 = 9986;
        var GL_LINEAR_MIPMAP_LINEAR$1 = 9987;
        var GL_GENERATE_MIPMAP_HINT = 33170;
        var GL_DONT_CARE = 4352;
        var GL_FASTEST = 4353;
        var GL_NICEST = 4354;
        var GL_TEXTURE_MAX_ANISOTROPY_EXT = 34046;
        var GL_UNPACK_ALIGNMENT = 3317;
        var GL_UNPACK_FLIP_Y_WEBGL = 37440;
        var GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
        var GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
        var GL_BROWSER_DEFAULT_WEBGL = 37444;
        var GL_TEXTURE0$1 = 33984;
        var MIPMAP_FILTERS = [
          GL_NEAREST_MIPMAP_NEAREST$1,
          GL_NEAREST_MIPMAP_LINEAR$1,
          GL_LINEAR_MIPMAP_NEAREST$1,
          GL_LINEAR_MIPMAP_LINEAR$1
        ];
        var CHANNELS_FORMAT = [
          0,
          GL_LUMINANCE,
          GL_LUMINANCE_ALPHA,
          GL_RGB,
          GL_RGBA$1
        ];
        var FORMAT_CHANNELS = {};
        FORMAT_CHANNELS[GL_LUMINANCE] = FORMAT_CHANNELS[GL_ALPHA] = FORMAT_CHANNELS[GL_DEPTH_COMPONENT] = 1;
        FORMAT_CHANNELS[GL_DEPTH_STENCIL] = FORMAT_CHANNELS[GL_LUMINANCE_ALPHA] = 2;
        FORMAT_CHANNELS[GL_RGB] = FORMAT_CHANNELS[GL_SRGB_EXT] = 3;
        FORMAT_CHANNELS[GL_RGBA$1] = FORMAT_CHANNELS[GL_SRGB_ALPHA_EXT] = 4;
        function objectName(str2) {
          return "[object " + str2 + "]";
        }
        var CANVAS_CLASS = objectName("HTMLCanvasElement");
        var OFFSCREENCANVAS_CLASS = objectName("OffscreenCanvas");
        var CONTEXT2D_CLASS = objectName("CanvasRenderingContext2D");
        var BITMAP_CLASS = objectName("ImageBitmap");
        var IMAGE_CLASS = objectName("HTMLImageElement");
        var VIDEO_CLASS = objectName("HTMLVideoElement");
        var PIXEL_CLASSES = Object.keys(arrayTypes).concat([
          CANVAS_CLASS,
          OFFSCREENCANVAS_CLASS,
          CONTEXT2D_CLASS,
          BITMAP_CLASS,
          IMAGE_CLASS,
          VIDEO_CLASS
        ]);
        var TYPE_SIZES = [];
        TYPE_SIZES[GL_UNSIGNED_BYTE$5] = 1;
        TYPE_SIZES[GL_FLOAT$4] = 4;
        TYPE_SIZES[GL_HALF_FLOAT_OES$1] = 2;
        TYPE_SIZES[GL_UNSIGNED_SHORT$3] = 2;
        TYPE_SIZES[GL_UNSIGNED_INT$3] = 4;
        var FORMAT_SIZES_SPECIAL = [];
        FORMAT_SIZES_SPECIAL[GL_RGBA4] = 2;
        FORMAT_SIZES_SPECIAL[GL_RGB5_A1] = 2;
        FORMAT_SIZES_SPECIAL[GL_RGB565] = 2;
        FORMAT_SIZES_SPECIAL[GL_DEPTH_STENCIL] = 4;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ATC_WEBGL] = 0.5;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25;
        FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ETC1_WEBGL] = 0.5;
        function isNumericArray(arr) {
          return Array.isArray(arr) && (arr.length === 0 || typeof arr[0] === "number");
        }
        function isRectArray(arr) {
          if (!Array.isArray(arr)) {
            return false;
          }
          var width = arr.length;
          if (width === 0 || !isArrayLike(arr[0])) {
            return false;
          }
          return true;
        }
        function classString(x) {
          return Object.prototype.toString.call(x);
        }
        function isCanvasElement(object) {
          return classString(object) === CANVAS_CLASS;
        }
        function isOffscreenCanvas(object) {
          return classString(object) === OFFSCREENCANVAS_CLASS;
        }
        function isContext2D(object) {
          return classString(object) === CONTEXT2D_CLASS;
        }
        function isBitmap(object) {
          return classString(object) === BITMAP_CLASS;
        }
        function isImageElement(object) {
          return classString(object) === IMAGE_CLASS;
        }
        function isVideoElement(object) {
          return classString(object) === VIDEO_CLASS;
        }
        function isPixelData(object) {
          if (!object) {
            return false;
          }
          var className = classString(object);
          if (PIXEL_CLASSES.indexOf(className) >= 0) {
            return true;
          }
          return isNumericArray(object) || isRectArray(object) || isNDArrayLike(object);
        }
        function typedArrayCode$1(data) {
          return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
        function convertData(result, data) {
          var n = data.length;
          switch (result.type) {
            case GL_UNSIGNED_BYTE$5:
            case GL_UNSIGNED_SHORT$3:
            case GL_UNSIGNED_INT$3:
            case GL_FLOAT$4:
              var converted = pool.allocType(result.type, n);
              converted.set(data);
              result.data = converted;
              break;
            case GL_HALF_FLOAT_OES$1:
              result.data = convertToHalfFloat(data);
              break;
            default:
              check$1.raise("unsupported texture type, must specify a typed array");
          }
        }
        function preConvert(image, n) {
          return pool.allocType(
            image.type === GL_HALF_FLOAT_OES$1 ? GL_FLOAT$4 : image.type,
            n
          );
        }
        function postConvert(image, data) {
          if (image.type === GL_HALF_FLOAT_OES$1) {
            image.data = convertToHalfFloat(data);
            pool.freeType(data);
          } else {
            image.data = data;
          }
        }
        function transposeData(image, array2, strideX, strideY, strideC, offset) {
          var w = image.width;
          var h = image.height;
          var c = image.channels;
          var n = w * h * c;
          var data = preConvert(image, n);
          var p = 0;
          for (var i = 0; i < h; ++i) {
            for (var j = 0; j < w; ++j) {
              for (var k = 0; k < c; ++k) {
                data[p++] = array2[strideX * j + strideY * i + strideC * k + offset];
              }
            }
          }
          postConvert(image, data);
        }
        function getTextureSize(format, type, width, height, isMipmap, isCube) {
          var s;
          if (typeof FORMAT_SIZES_SPECIAL[format] !== "undefined") {
            s = FORMAT_SIZES_SPECIAL[format];
          } else {
            s = FORMAT_CHANNELS[format] * TYPE_SIZES[type];
          }
          if (isCube) {
            s *= 6;
          }
          if (isMipmap) {
            var total = 0;
            var w = width;
            while (w >= 1) {
              total += s * w * w;
              w /= 2;
            }
            return total;
          } else {
            return s * width * height;
          }
        }
        function createTextureSet(gl, extensions, limits, reglPoll, contextState, stats2, config2) {
          var mipmapHint = {
            "don't care": GL_DONT_CARE,
            "dont care": GL_DONT_CARE,
            "nice": GL_NICEST,
            "fast": GL_FASTEST
          };
          var wrapModes = {
            "repeat": GL_REPEAT,
            "clamp": GL_CLAMP_TO_EDGE$1,
            "mirror": GL_MIRRORED_REPEAT
          };
          var magFilters = {
            "nearest": GL_NEAREST$1,
            "linear": GL_LINEAR
          };
          var minFilters = extend2({
            "mipmap": GL_LINEAR_MIPMAP_LINEAR$1,
            "nearest mipmap nearest": GL_NEAREST_MIPMAP_NEAREST$1,
            "linear mipmap nearest": GL_LINEAR_MIPMAP_NEAREST$1,
            "nearest mipmap linear": GL_NEAREST_MIPMAP_LINEAR$1,
            "linear mipmap linear": GL_LINEAR_MIPMAP_LINEAR$1
          }, magFilters);
          var colorSpace = {
            "none": 0,
            "browser": GL_BROWSER_DEFAULT_WEBGL
          };
          var textureTypes = {
            "uint8": GL_UNSIGNED_BYTE$5,
            "rgba4": GL_UNSIGNED_SHORT_4_4_4_4$1,
            "rgb565": GL_UNSIGNED_SHORT_5_6_5$1,
            "rgb5 a1": GL_UNSIGNED_SHORT_5_5_5_1$1
          };
          var textureFormats = {
            "alpha": GL_ALPHA,
            "luminance": GL_LUMINANCE,
            "luminance alpha": GL_LUMINANCE_ALPHA,
            "rgb": GL_RGB,
            "rgba": GL_RGBA$1,
            "rgba4": GL_RGBA4,
            "rgb5 a1": GL_RGB5_A1,
            "rgb565": GL_RGB565
          };
          var compressedTextureFormats = {};
          if (extensions.ext_srgb) {
            textureFormats.srgb = GL_SRGB_EXT;
            textureFormats.srgba = GL_SRGB_ALPHA_EXT;
          }
          if (extensions.oes_texture_float) {
            textureTypes.float32 = textureTypes.float = GL_FLOAT$4;
          }
          if (extensions.oes_texture_half_float) {
            textureTypes["float16"] = textureTypes["half float"] = GL_HALF_FLOAT_OES$1;
          }
          if (extensions.webgl_depth_texture) {
            extend2(textureFormats, {
              "depth": GL_DEPTH_COMPONENT,
              "depth stencil": GL_DEPTH_STENCIL
            });
            extend2(textureTypes, {
              "uint16": GL_UNSIGNED_SHORT$3,
              "uint32": GL_UNSIGNED_INT$3,
              "depth stencil": GL_UNSIGNED_INT_24_8_WEBGL$1
            });
          }
          if (extensions.webgl_compressed_texture_s3tc) {
            extend2(compressedTextureFormats, {
              "rgb s3tc dxt1": GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
              "rgba s3tc dxt1": GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
              "rgba s3tc dxt3": GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
              "rgba s3tc dxt5": GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
            });
          }
          if (extensions.webgl_compressed_texture_atc) {
            extend2(compressedTextureFormats, {
              "rgb atc": GL_COMPRESSED_RGB_ATC_WEBGL,
              "rgba atc explicit alpha": GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
              "rgba atc interpolated alpha": GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
            });
          }
          if (extensions.webgl_compressed_texture_pvrtc) {
            extend2(compressedTextureFormats, {
              "rgb pvrtc 4bppv1": GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
              "rgb pvrtc 2bppv1": GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
              "rgba pvrtc 4bppv1": GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
              "rgba pvrtc 2bppv1": GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            });
          }
          if (extensions.webgl_compressed_texture_etc1) {
            compressedTextureFormats["rgb etc1"] = GL_COMPRESSED_RGB_ETC1_WEBGL;
          }
          var supportedCompressedFormats = Array.prototype.slice.call(
            gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS)
          );
          Object.keys(compressedTextureFormats).forEach(function(name) {
            var format = compressedTextureFormats[name];
            if (supportedCompressedFormats.indexOf(format) >= 0) {
              textureFormats[name] = format;
            }
          });
          var supportedFormats = Object.keys(textureFormats);
          limits.textureFormats = supportedFormats;
          var textureFormatsInvert = [];
          Object.keys(textureFormats).forEach(function(key) {
            var val = textureFormats[key];
            textureFormatsInvert[val] = key;
          });
          var textureTypesInvert = [];
          Object.keys(textureTypes).forEach(function(key) {
            var val = textureTypes[key];
            textureTypesInvert[val] = key;
          });
          var magFiltersInvert = [];
          Object.keys(magFilters).forEach(function(key) {
            var val = magFilters[key];
            magFiltersInvert[val] = key;
          });
          var minFiltersInvert = [];
          Object.keys(minFilters).forEach(function(key) {
            var val = minFilters[key];
            minFiltersInvert[val] = key;
          });
          var wrapModesInvert = [];
          Object.keys(wrapModes).forEach(function(key) {
            var val = wrapModes[key];
            wrapModesInvert[val] = key;
          });
          var colorFormats = supportedFormats.reduce(function(color2, key) {
            var glenum = textureFormats[key];
            if (glenum === GL_LUMINANCE || glenum === GL_ALPHA || glenum === GL_LUMINANCE || glenum === GL_LUMINANCE_ALPHA || glenum === GL_DEPTH_COMPONENT || glenum === GL_DEPTH_STENCIL || extensions.ext_srgb && (glenum === GL_SRGB_EXT || glenum === GL_SRGB_ALPHA_EXT)) {
              color2[glenum] = glenum;
            } else if (glenum === GL_RGB5_A1 || key.indexOf("rgba") >= 0) {
              color2[glenum] = GL_RGBA$1;
            } else {
              color2[glenum] = GL_RGB;
            }
            return color2;
          }, {});
          function TexFlags() {
            this.internalformat = GL_RGBA$1;
            this.format = GL_RGBA$1;
            this.type = GL_UNSIGNED_BYTE$5;
            this.compressed = false;
            this.premultiplyAlpha = false;
            this.flipY = false;
            this.unpackAlignment = 1;
            this.colorSpace = GL_BROWSER_DEFAULT_WEBGL;
            this.width = 0;
            this.height = 0;
            this.channels = 0;
          }
          function copyFlags(result, other) {
            result.internalformat = other.internalformat;
            result.format = other.format;
            result.type = other.type;
            result.compressed = other.compressed;
            result.premultiplyAlpha = other.premultiplyAlpha;
            result.flipY = other.flipY;
            result.unpackAlignment = other.unpackAlignment;
            result.colorSpace = other.colorSpace;
            result.width = other.width;
            result.height = other.height;
            result.channels = other.channels;
          }
          function parseFlags(flags, options) {
            if (typeof options !== "object" || !options) {
              return;
            }
            if ("premultiplyAlpha" in options) {
              check$1.type(
                options.premultiplyAlpha,
                "boolean",
                "invalid premultiplyAlpha"
              );
              flags.premultiplyAlpha = options.premultiplyAlpha;
            }
            if ("flipY" in options) {
              check$1.type(
                options.flipY,
                "boolean",
                "invalid texture flip"
              );
              flags.flipY = options.flipY;
            }
            if ("alignment" in options) {
              check$1.oneOf(
                options.alignment,
                [1, 2, 4, 8],
                "invalid texture unpack alignment"
              );
              flags.unpackAlignment = options.alignment;
            }
            if ("colorSpace" in options) {
              check$1.parameter(
                options.colorSpace,
                colorSpace,
                "invalid colorSpace"
              );
              flags.colorSpace = colorSpace[options.colorSpace];
            }
            if ("type" in options) {
              var type = options.type;
              check$1(
                extensions.oes_texture_float || !(type === "float" || type === "float32"),
                "you must enable the OES_texture_float extension in order to use floating point textures."
              );
              check$1(
                extensions.oes_texture_half_float || !(type === "half float" || type === "float16"),
                "you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."
              );
              check$1(
                extensions.webgl_depth_texture || !(type === "uint16" || type === "uint32" || type === "depth stencil"),
                "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
              );
              check$1.parameter(
                type,
                textureTypes,
                "invalid texture type"
              );
              flags.type = textureTypes[type];
            }
            var w = flags.width;
            var h = flags.height;
            var c = flags.channels;
            var hasChannels = false;
            if ("shape" in options) {
              check$1(
                Array.isArray(options.shape) && options.shape.length >= 2,
                "shape must be an array"
              );
              w = options.shape[0];
              h = options.shape[1];
              if (options.shape.length === 3) {
                c = options.shape[2];
                check$1(c > 0 && c <= 4, "invalid number of channels");
                hasChannels = true;
              }
              check$1(w >= 0 && w <= limits.maxTextureSize, "invalid width");
              check$1(h >= 0 && h <= limits.maxTextureSize, "invalid height");
            } else {
              if ("radius" in options) {
                w = h = options.radius;
                check$1(w >= 0 && w <= limits.maxTextureSize, "invalid radius");
              }
              if ("width" in options) {
                w = options.width;
                check$1(w >= 0 && w <= limits.maxTextureSize, "invalid width");
              }
              if ("height" in options) {
                h = options.height;
                check$1(h >= 0 && h <= limits.maxTextureSize, "invalid height");
              }
              if ("channels" in options) {
                c = options.channels;
                check$1(c > 0 && c <= 4, "invalid number of channels");
                hasChannels = true;
              }
            }
            flags.width = w | 0;
            flags.height = h | 0;
            flags.channels = c | 0;
            var hasFormat = false;
            if ("format" in options) {
              var formatStr = options.format;
              check$1(
                extensions.webgl_depth_texture || !(formatStr === "depth" || formatStr === "depth stencil"),
                "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
              );
              check$1.parameter(
                formatStr,
                textureFormats,
                "invalid texture format"
              );
              var internalformat = flags.internalformat = textureFormats[formatStr];
              flags.format = colorFormats[internalformat];
              if (formatStr in textureTypes) {
                if (!("type" in options)) {
                  flags.type = textureTypes[formatStr];
                }
              }
              if (formatStr in compressedTextureFormats) {
                flags.compressed = true;
              }
              hasFormat = true;
            }
            if (!hasChannels && hasFormat) {
              flags.channels = FORMAT_CHANNELS[flags.format];
            } else if (hasChannels && !hasFormat) {
              if (flags.channels !== CHANNELS_FORMAT[flags.format]) {
                flags.format = flags.internalformat = CHANNELS_FORMAT[flags.channels];
              }
            } else if (hasFormat && hasChannels) {
              check$1(
                flags.channels === FORMAT_CHANNELS[flags.format],
                "number of channels inconsistent with specified format"
              );
            }
          }
          function setFlags(flags) {
            gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
            gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
            gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
            gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
          }
          function TexImage() {
            TexFlags.call(this);
            this.xOffset = 0;
            this.yOffset = 0;
            this.data = null;
            this.needsFree = false;
            this.element = null;
            this.needsCopy = false;
          }
          function parseImage(image, options) {
            var data = null;
            if (isPixelData(options)) {
              data = options;
            } else if (options) {
              check$1.type(options, "object", "invalid pixel data type");
              parseFlags(image, options);
              if ("x" in options) {
                image.xOffset = options.x | 0;
              }
              if ("y" in options) {
                image.yOffset = options.y | 0;
              }
              if (isPixelData(options.data)) {
                data = options.data;
              }
            }
            check$1(
              !image.compressed || data instanceof Uint8Array,
              "compressed texture data must be stored in a uint8array"
            );
            if (options.copy) {
              check$1(!data, "can not specify copy and data field for the same texture");
              var viewW = contextState.viewportWidth;
              var viewH = contextState.viewportHeight;
              image.width = image.width || viewW - image.xOffset;
              image.height = image.height || viewH - image.yOffset;
              image.needsCopy = true;
              check$1(
                image.xOffset >= 0 && image.xOffset < viewW && image.yOffset >= 0 && image.yOffset < viewH && image.width > 0 && image.width <= viewW && image.height > 0 && image.height <= viewH,
                "copy texture read out of bounds"
              );
            } else if (!data) {
              image.width = image.width || 1;
              image.height = image.height || 1;
              image.channels = image.channels || 4;
            } else if (isTypedArray(data)) {
              image.channels = image.channels || 4;
              image.data = data;
              if (!("type" in options) && image.type === GL_UNSIGNED_BYTE$5) {
                image.type = typedArrayCode$1(data);
              }
            } else if (isNumericArray(data)) {
              image.channels = image.channels || 4;
              convertData(image, data);
              image.alignment = 1;
              image.needsFree = true;
            } else if (isNDArrayLike(data)) {
              var array2 = data.data;
              if (!Array.isArray(array2) && image.type === GL_UNSIGNED_BYTE$5) {
                image.type = typedArrayCode$1(array2);
              }
              var shape = data.shape;
              var stride = data.stride;
              var shapeX, shapeY, shapeC, strideX, strideY, strideC;
              if (shape.length === 3) {
                shapeC = shape[2];
                strideC = stride[2];
              } else {
                check$1(shape.length === 2, "invalid ndarray pixel data, must be 2 or 3D");
                shapeC = 1;
                strideC = 1;
              }
              shapeX = shape[0];
              shapeY = shape[1];
              strideX = stride[0];
              strideY = stride[1];
              image.alignment = 1;
              image.width = shapeX;
              image.height = shapeY;
              image.channels = shapeC;
              image.format = image.internalformat = CHANNELS_FORMAT[shapeC];
              image.needsFree = true;
              transposeData(image, array2, strideX, strideY, strideC, data.offset);
            } else if (isCanvasElement(data) || isOffscreenCanvas(data) || isContext2D(data)) {
              if (isCanvasElement(data) || isOffscreenCanvas(data)) {
                image.element = data;
              } else {
                image.element = data.canvas;
              }
              image.width = image.element.width;
              image.height = image.element.height;
              image.channels = 4;
            } else if (isBitmap(data)) {
              image.element = data;
              image.width = data.width;
              image.height = data.height;
              image.channels = 4;
            } else if (isImageElement(data)) {
              image.element = data;
              image.width = data.naturalWidth;
              image.height = data.naturalHeight;
              image.channels = 4;
            } else if (isVideoElement(data)) {
              image.element = data;
              image.width = data.videoWidth;
              image.height = data.videoHeight;
              image.channels = 4;
            } else if (isRectArray(data)) {
              var w = image.width || data[0].length;
              var h = image.height || data.length;
              var c = image.channels;
              if (isArrayLike(data[0][0])) {
                c = c || data[0][0].length;
              } else {
                c = c || 1;
              }
              var arrayShape2 = flattenUtils.shape(data);
              var n = 1;
              for (var dd = 0; dd < arrayShape2.length; ++dd) {
                n *= arrayShape2[dd];
              }
              var allocData = preConvert(image, n);
              flattenUtils.flatten(data, arrayShape2, "", allocData);
              postConvert(image, allocData);
              image.alignment = 1;
              image.width = w;
              image.height = h;
              image.channels = c;
              image.format = image.internalformat = CHANNELS_FORMAT[c];
              image.needsFree = true;
            }
            if (image.type === GL_FLOAT$4) {
              check$1(
                limits.extensions.indexOf("oes_texture_float") >= 0,
                "oes_texture_float extension not enabled"
              );
            } else if (image.type === GL_HALF_FLOAT_OES$1) {
              check$1(
                limits.extensions.indexOf("oes_texture_half_float") >= 0,
                "oes_texture_half_float extension not enabled"
              );
            }
          }
          function setImage(info, target, miplevel) {
            var element = info.element;
            var data = info.data;
            var internalformat = info.internalformat;
            var format = info.format;
            var type = info.type;
            var width = info.width;
            var height = info.height;
            setFlags(info);
            if (element) {
              gl.texImage2D(target, miplevel, format, format, type, element);
            } else if (info.compressed) {
              gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
            } else if (info.needsCopy) {
              reglPoll();
              gl.copyTexImage2D(
                target,
                miplevel,
                format,
                info.xOffset,
                info.yOffset,
                width,
                height,
                0
              );
            } else {
              gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
            }
          }
          function setSubImage(info, target, x, y, miplevel) {
            var element = info.element;
            var data = info.data;
            var internalformat = info.internalformat;
            var format = info.format;
            var type = info.type;
            var width = info.width;
            var height = info.height;
            setFlags(info);
            if (element) {
              gl.texSubImage2D(
                target,
                miplevel,
                x,
                y,
                format,
                type,
                element
              );
            } else if (info.compressed) {
              gl.compressedTexSubImage2D(
                target,
                miplevel,
                x,
                y,
                internalformat,
                width,
                height,
                data
              );
            } else if (info.needsCopy) {
              reglPoll();
              gl.copyTexSubImage2D(
                target,
                miplevel,
                x,
                y,
                info.xOffset,
                info.yOffset,
                width,
                height
              );
            } else {
              gl.texSubImage2D(
                target,
                miplevel,
                x,
                y,
                width,
                height,
                format,
                type,
                data
              );
            }
          }
          var imagePool = [];
          function allocImage() {
            return imagePool.pop() || new TexImage();
          }
          function freeImage(image) {
            if (image.needsFree) {
              pool.freeType(image.data);
            }
            TexImage.call(image);
            imagePool.push(image);
          }
          function MipMap() {
            TexFlags.call(this);
            this.genMipmaps = false;
            this.mipmapHint = GL_DONT_CARE;
            this.mipmask = 0;
            this.images = Array(16);
          }
          function parseMipMapFromShape(mipmap, width, height) {
            var img = mipmap.images[0] = allocImage();
            mipmap.mipmask = 1;
            img.width = mipmap.width = width;
            img.height = mipmap.height = height;
            img.channels = mipmap.channels = 4;
          }
          function parseMipMapFromObject(mipmap, options) {
            var imgData = null;
            if (isPixelData(options)) {
              imgData = mipmap.images[0] = allocImage();
              copyFlags(imgData, mipmap);
              parseImage(imgData, options);
              mipmap.mipmask = 1;
            } else {
              parseFlags(mipmap, options);
              if (Array.isArray(options.mipmap)) {
                var mipData = options.mipmap;
                for (var i = 0; i < mipData.length; ++i) {
                  imgData = mipmap.images[i] = allocImage();
                  copyFlags(imgData, mipmap);
                  imgData.width >>= i;
                  imgData.height >>= i;
                  parseImage(imgData, mipData[i]);
                  mipmap.mipmask |= 1 << i;
                }
              } else {
                imgData = mipmap.images[0] = allocImage();
                copyFlags(imgData, mipmap);
                parseImage(imgData, options);
                mipmap.mipmask = 1;
              }
            }
            copyFlags(mipmap, mipmap.images[0]);
            if (mipmap.compressed && (mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT)) {
              check$1(
                mipmap.width % 4 === 0 && mipmap.height % 4 === 0,
                "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4"
              );
            }
          }
          function setMipMap(mipmap, target) {
            var images = mipmap.images;
            for (var i = 0; i < images.length; ++i) {
              if (!images[i]) {
                return;
              }
              setImage(images[i], target, i);
            }
          }
          var mipPool = [];
          function allocMipMap() {
            var result = mipPool.pop() || new MipMap();
            TexFlags.call(result);
            result.mipmask = 0;
            for (var i = 0; i < 16; ++i) {
              result.images[i] = null;
            }
            return result;
          }
          function freeMipMap(mipmap) {
            var images = mipmap.images;
            for (var i = 0; i < images.length; ++i) {
              if (images[i]) {
                freeImage(images[i]);
              }
              images[i] = null;
            }
            mipPool.push(mipmap);
          }
          function TexInfo() {
            this.minFilter = GL_NEAREST$1;
            this.magFilter = GL_NEAREST$1;
            this.wrapS = GL_CLAMP_TO_EDGE$1;
            this.wrapT = GL_CLAMP_TO_EDGE$1;
            this.anisotropic = 1;
            this.genMipmaps = false;
            this.mipmapHint = GL_DONT_CARE;
          }
          function parseTexInfo(info, options) {
            if ("min" in options) {
              var minFilter = options.min;
              check$1.parameter(minFilter, minFilters);
              info.minFilter = minFilters[minFilter];
              if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !("faces" in options)) {
                info.genMipmaps = true;
              }
            }
            if ("mag" in options) {
              var magFilter = options.mag;
              check$1.parameter(magFilter, magFilters);
              info.magFilter = magFilters[magFilter];
            }
            var wrapS = info.wrapS;
            var wrapT = info.wrapT;
            if ("wrap" in options) {
              var wrap = options.wrap;
              if (typeof wrap === "string") {
                check$1.parameter(wrap, wrapModes);
                wrapS = wrapT = wrapModes[wrap];
              } else if (Array.isArray(wrap)) {
                check$1.parameter(wrap[0], wrapModes);
                check$1.parameter(wrap[1], wrapModes);
                wrapS = wrapModes[wrap[0]];
                wrapT = wrapModes[wrap[1]];
              }
            } else {
              if ("wrapS" in options) {
                var optWrapS = options.wrapS;
                check$1.parameter(optWrapS, wrapModes);
                wrapS = wrapModes[optWrapS];
              }
              if ("wrapT" in options) {
                var optWrapT = options.wrapT;
                check$1.parameter(optWrapT, wrapModes);
                wrapT = wrapModes[optWrapT];
              }
            }
            info.wrapS = wrapS;
            info.wrapT = wrapT;
            if ("anisotropic" in options) {
              var anisotropic = options.anisotropic;
              check$1(
                typeof anisotropic === "number" && anisotropic >= 1 && anisotropic <= limits.maxAnisotropic,
                "aniso samples must be between 1 and "
              );
              info.anisotropic = options.anisotropic;
            }
            if ("mipmap" in options) {
              var hasMipMap = false;
              switch (typeof options.mipmap) {
                case "string":
                  check$1.parameter(
                    options.mipmap,
                    mipmapHint,
                    "invalid mipmap hint"
                  );
                  info.mipmapHint = mipmapHint[options.mipmap];
                  info.genMipmaps = true;
                  hasMipMap = true;
                  break;
                case "boolean":
                  hasMipMap = info.genMipmaps = options.mipmap;
                  break;
                case "object":
                  check$1(Array.isArray(options.mipmap), "invalid mipmap type");
                  info.genMipmaps = false;
                  hasMipMap = true;
                  break;
                default:
                  check$1.raise("invalid mipmap type");
              }
              if (hasMipMap && !("min" in options)) {
                info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
              }
            }
          }
          function setTexInfo(info, target) {
            gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
            gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
            gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
            gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
            if (extensions.ext_texture_filter_anisotropic) {
              gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
            }
            if (info.genMipmaps) {
              gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
              gl.generateMipmap(target);
            }
          }
          var textureCount = 0;
          var textureSet = {};
          var numTexUnits = limits.maxTextureUnits;
          var textureUnits = Array(numTexUnits).map(function() {
            return null;
          });
          function REGLTexture(target) {
            TexFlags.call(this);
            this.mipmask = 0;
            this.internalformat = GL_RGBA$1;
            this.id = textureCount++;
            this.refCount = 1;
            this.target = target;
            this.texture = gl.createTexture();
            this.unit = -1;
            this.bindCount = 0;
            this.texInfo = new TexInfo();
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          function tempBind(texture) {
            gl.activeTexture(GL_TEXTURE0$1);
            gl.bindTexture(texture.target, texture.texture);
          }
          function tempRestore() {
            var prev = textureUnits[0];
            if (prev) {
              gl.bindTexture(prev.target, prev.texture);
            } else {
              gl.bindTexture(GL_TEXTURE_2D$1, null);
            }
          }
          function destroy(texture) {
            var handle = texture.texture;
            check$1(handle, "must not double destroy texture");
            var unit = texture.unit;
            var target = texture.target;
            if (unit >= 0) {
              gl.activeTexture(GL_TEXTURE0$1 + unit);
              gl.bindTexture(target, null);
              textureUnits[unit] = null;
            }
            gl.deleteTexture(handle);
            texture.texture = null;
            texture.params = null;
            texture.pixels = null;
            texture.refCount = 0;
            delete textureSet[texture.id];
            stats2.textureCount--;
          }
          extend2(REGLTexture.prototype, {
            bind: function() {
              var texture = this;
              texture.bindCount += 1;
              var unit = texture.unit;
              if (unit < 0) {
                for (var i = 0; i < numTexUnits; ++i) {
                  var other = textureUnits[i];
                  if (other) {
                    if (other.bindCount > 0) {
                      continue;
                    }
                    other.unit = -1;
                  }
                  textureUnits[i] = texture;
                  unit = i;
                  break;
                }
                if (unit >= numTexUnits) {
                  check$1.raise("insufficient number of texture units");
                }
                if (config2.profile && stats2.maxTextureUnits < unit + 1) {
                  stats2.maxTextureUnits = unit + 1;
                }
                texture.unit = unit;
                gl.activeTexture(GL_TEXTURE0$1 + unit);
                gl.bindTexture(texture.target, texture.texture);
              }
              return unit;
            },
            unbind: function() {
              this.bindCount -= 1;
            },
            decRef: function() {
              if (--this.refCount <= 0) {
                destroy(this);
              }
            }
          });
          function createTexture2D(a, b) {
            var texture = new REGLTexture(GL_TEXTURE_2D$1);
            textureSet[texture.id] = texture;
            stats2.textureCount++;
            function reglTexture2D(a2, b2) {
              var texInfo = texture.texInfo;
              TexInfo.call(texInfo);
              var mipData = allocMipMap();
              if (typeof a2 === "number") {
                if (typeof b2 === "number") {
                  parseMipMapFromShape(mipData, a2 | 0, b2 | 0);
                } else {
                  parseMipMapFromShape(mipData, a2 | 0, a2 | 0);
                }
              } else if (a2) {
                check$1.type(a2, "object", "invalid arguments to regl.texture");
                parseTexInfo(texInfo, a2);
                parseMipMapFromObject(mipData, a2);
              } else {
                parseMipMapFromShape(mipData, 1, 1);
              }
              if (texInfo.genMipmaps) {
                mipData.mipmask = (mipData.width << 1) - 1;
              }
              texture.mipmask = mipData.mipmask;
              copyFlags(texture, mipData);
              check$1.texture2D(texInfo, mipData, limits);
              texture.internalformat = mipData.internalformat;
              reglTexture2D.width = mipData.width;
              reglTexture2D.height = mipData.height;
              tempBind(texture);
              setMipMap(mipData, GL_TEXTURE_2D$1);
              setTexInfo(texInfo, GL_TEXTURE_2D$1);
              tempRestore();
              freeMipMap(mipData);
              if (config2.profile) {
                texture.stats.size = getTextureSize(
                  texture.internalformat,
                  texture.type,
                  mipData.width,
                  mipData.height,
                  texInfo.genMipmaps,
                  false
                );
              }
              reglTexture2D.format = textureFormatsInvert[texture.internalformat];
              reglTexture2D.type = textureTypesInvert[texture.type];
              reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
              reglTexture2D.min = minFiltersInvert[texInfo.minFilter];
              reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
              reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];
              return reglTexture2D;
            }
            function subimage(image, x_, y_, level_) {
              check$1(!!image, "must specify image data");
              var x = x_ | 0;
              var y = y_ | 0;
              var level = level_ | 0;
              var imageData = allocImage();
              copyFlags(imageData, texture);
              imageData.width = 0;
              imageData.height = 0;
              parseImage(imageData, image);
              imageData.width = imageData.width || (texture.width >> level) - x;
              imageData.height = imageData.height || (texture.height >> level) - y;
              check$1(
                texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat,
                "incompatible format for texture.subimage"
              );
              check$1(
                x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height,
                "texture.subimage write out of bounds"
              );
              check$1(
                texture.mipmask & 1 << level,
                "missing mipmap data"
              );
              check$1(
                imageData.data || imageData.element || imageData.needsCopy,
                "missing image data"
              );
              tempBind(texture);
              setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
              tempRestore();
              freeImage(imageData);
              return reglTexture2D;
            }
            function resize(w_, h_) {
              var w = w_ | 0;
              var h = h_ | 0 || w;
              if (w === texture.width && h === texture.height) {
                return reglTexture2D;
              }
              reglTexture2D.width = texture.width = w;
              reglTexture2D.height = texture.height = h;
              tempBind(texture);
              for (var i = 0; texture.mipmask >> i; ++i) {
                var _w = w >> i;
                var _h = h >> i;
                if (!_w || !_h)
                  break;
                gl.texImage2D(
                  GL_TEXTURE_2D$1,
                  i,
                  texture.format,
                  _w,
                  _h,
                  0,
                  texture.format,
                  texture.type,
                  null
                );
              }
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(
                  texture.internalformat,
                  texture.type,
                  w,
                  h,
                  false,
                  false
                );
              }
              return reglTexture2D;
            }
            reglTexture2D(a, b);
            reglTexture2D.subimage = subimage;
            reglTexture2D.resize = resize;
            reglTexture2D._reglType = "texture2d";
            reglTexture2D._texture = texture;
            if (config2.profile) {
              reglTexture2D.stats = texture.stats;
            }
            reglTexture2D.destroy = function() {
              texture.decRef();
            };
            return reglTexture2D;
          }
          function createTextureCube(a0, a1, a2, a3, a4, a5) {
            var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
            textureSet[texture.id] = texture;
            stats2.cubeCount++;
            var faces = new Array(6);
            function reglTextureCube(a02, a12, a22, a32, a42, a52) {
              var i;
              var texInfo = texture.texInfo;
              TexInfo.call(texInfo);
              for (i = 0; i < 6; ++i) {
                faces[i] = allocMipMap();
              }
              if (typeof a02 === "number" || !a02) {
                var s = a02 | 0 || 1;
                for (i = 0; i < 6; ++i) {
                  parseMipMapFromShape(faces[i], s, s);
                }
              } else if (typeof a02 === "object") {
                if (a12) {
                  parseMipMapFromObject(faces[0], a02);
                  parseMipMapFromObject(faces[1], a12);
                  parseMipMapFromObject(faces[2], a22);
                  parseMipMapFromObject(faces[3], a32);
                  parseMipMapFromObject(faces[4], a42);
                  parseMipMapFromObject(faces[5], a52);
                } else {
                  parseTexInfo(texInfo, a02);
                  parseFlags(texture, a02);
                  if ("faces" in a02) {
                    var faceInput = a02.faces;
                    check$1(
                      Array.isArray(faceInput) && faceInput.length === 6,
                      "cube faces must be a length 6 array"
                    );
                    for (i = 0; i < 6; ++i) {
                      check$1(
                        typeof faceInput[i] === "object" && !!faceInput[i],
                        "invalid input for cube map face"
                      );
                      copyFlags(faces[i], texture);
                      parseMipMapFromObject(faces[i], faceInput[i]);
                    }
                  } else {
                    for (i = 0; i < 6; ++i) {
                      parseMipMapFromObject(faces[i], a02);
                    }
                  }
                }
              } else {
                check$1.raise("invalid arguments to cube map");
              }
              copyFlags(texture, faces[0]);
              check$1.optional(function() {
                if (!limits.npotTextureCube) {
                  check$1(isPow2$1(texture.width) && isPow2$1(texture.height), "your browser does not support non power or two texture dimensions");
                }
              });
              if (texInfo.genMipmaps) {
                texture.mipmask = (faces[0].width << 1) - 1;
              } else {
                texture.mipmask = faces[0].mipmask;
              }
              check$1.textureCube(texture, texInfo, faces, limits);
              texture.internalformat = faces[0].internalformat;
              reglTextureCube.width = faces[0].width;
              reglTextureCube.height = faces[0].height;
              tempBind(texture);
              for (i = 0; i < 6; ++i) {
                setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
              }
              setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(
                  texture.internalformat,
                  texture.type,
                  reglTextureCube.width,
                  reglTextureCube.height,
                  texInfo.genMipmaps,
                  true
                );
              }
              reglTextureCube.format = textureFormatsInvert[texture.internalformat];
              reglTextureCube.type = textureTypesInvert[texture.type];
              reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
              reglTextureCube.min = minFiltersInvert[texInfo.minFilter];
              reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
              reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];
              for (i = 0; i < 6; ++i) {
                freeMipMap(faces[i]);
              }
              return reglTextureCube;
            }
            function subimage(face, image, x_, y_, level_) {
              check$1(!!image, "must specify image data");
              check$1(typeof face === "number" && face === (face | 0) && face >= 0 && face < 6, "invalid face");
              var x = x_ | 0;
              var y = y_ | 0;
              var level = level_ | 0;
              var imageData = allocImage();
              copyFlags(imageData, texture);
              imageData.width = 0;
              imageData.height = 0;
              parseImage(imageData, image);
              imageData.width = imageData.width || (texture.width >> level) - x;
              imageData.height = imageData.height || (texture.height >> level) - y;
              check$1(
                texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat,
                "incompatible format for texture.subimage"
              );
              check$1(
                x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height,
                "texture.subimage write out of bounds"
              );
              check$1(
                texture.mipmask & 1 << level,
                "missing mipmap data"
              );
              check$1(
                imageData.data || imageData.element || imageData.needsCopy,
                "missing image data"
              );
              tempBind(texture);
              setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
              tempRestore();
              freeImage(imageData);
              return reglTextureCube;
            }
            function resize(radius_) {
              var radius = radius_ | 0;
              if (radius === texture.width) {
                return;
              }
              reglTextureCube.width = texture.width = radius;
              reglTextureCube.height = texture.height = radius;
              tempBind(texture);
              for (var i = 0; i < 6; ++i) {
                for (var j = 0; texture.mipmask >> j; ++j) {
                  gl.texImage2D(
                    GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i,
                    j,
                    texture.format,
                    radius >> j,
                    radius >> j,
                    0,
                    texture.format,
                    texture.type,
                    null
                  );
                }
              }
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(
                  texture.internalformat,
                  texture.type,
                  reglTextureCube.width,
                  reglTextureCube.height,
                  false,
                  true
                );
              }
              return reglTextureCube;
            }
            reglTextureCube(a0, a1, a2, a3, a4, a5);
            reglTextureCube.subimage = subimage;
            reglTextureCube.resize = resize;
            reglTextureCube._reglType = "textureCube";
            reglTextureCube._texture = texture;
            if (config2.profile) {
              reglTextureCube.stats = texture.stats;
            }
            reglTextureCube.destroy = function() {
              texture.decRef();
            };
            return reglTextureCube;
          }
          function destroyTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              gl.activeTexture(GL_TEXTURE0$1 + i);
              gl.bindTexture(GL_TEXTURE_2D$1, null);
              textureUnits[i] = null;
            }
            values(textureSet).forEach(destroy);
            stats2.cubeCount = 0;
            stats2.textureCount = 0;
          }
          if (config2.profile) {
            stats2.getTotalTextureSize = function() {
              var total = 0;
              Object.keys(textureSet).forEach(function(key) {
                total += textureSet[key].stats.size;
              });
              return total;
            };
          }
          function restoreTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              var tex = textureUnits[i];
              if (tex) {
                tex.bindCount = 0;
                tex.unit = -1;
                textureUnits[i] = null;
              }
            }
            values(textureSet).forEach(function(texture) {
              texture.texture = gl.createTexture();
              gl.bindTexture(texture.target, texture.texture);
              for (var i2 = 0; i2 < 32; ++i2) {
                if ((texture.mipmask & 1 << i2) === 0) {
                  continue;
                }
                if (texture.target === GL_TEXTURE_2D$1) {
                  gl.texImage2D(
                    GL_TEXTURE_2D$1,
                    i2,
                    texture.internalformat,
                    texture.width >> i2,
                    texture.height >> i2,
                    0,
                    texture.internalformat,
                    texture.type,
                    null
                  );
                } else {
                  for (var j = 0; j < 6; ++j) {
                    gl.texImage2D(
                      GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j,
                      i2,
                      texture.internalformat,
                      texture.width >> i2,
                      texture.height >> i2,
                      0,
                      texture.internalformat,
                      texture.type,
                      null
                    );
                  }
                }
              }
              setTexInfo(texture.texInfo, texture.target);
            });
          }
          function refreshTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              var tex = textureUnits[i];
              if (tex) {
                tex.bindCount = 0;
                tex.unit = -1;
                textureUnits[i] = null;
              }
              gl.activeTexture(GL_TEXTURE0$1 + i);
              gl.bindTexture(GL_TEXTURE_2D$1, null);
              gl.bindTexture(GL_TEXTURE_CUBE_MAP$1, null);
            }
          }
          return {
            create2D: createTexture2D,
            createCube: createTextureCube,
            clear: destroyTextures,
            getTexture: function(wrapper) {
              return null;
            },
            restore: restoreTextures,
            refresh: refreshTextures
          };
        }
        var GL_RENDERBUFFER = 36161;
        var GL_RGBA4$1 = 32854;
        var GL_RGB5_A1$1 = 32855;
        var GL_RGB565$1 = 36194;
        var GL_DEPTH_COMPONENT16 = 33189;
        var GL_STENCIL_INDEX8 = 36168;
        var GL_DEPTH_STENCIL$1 = 34041;
        var GL_SRGB8_ALPHA8_EXT = 35907;
        var GL_RGBA32F_EXT = 34836;
        var GL_RGBA16F_EXT = 34842;
        var GL_RGB16F_EXT = 34843;
        var FORMAT_SIZES = [];
        FORMAT_SIZES[GL_RGBA4$1] = 2;
        FORMAT_SIZES[GL_RGB5_A1$1] = 2;
        FORMAT_SIZES[GL_RGB565$1] = 2;
        FORMAT_SIZES[GL_DEPTH_COMPONENT16] = 2;
        FORMAT_SIZES[GL_STENCIL_INDEX8] = 1;
        FORMAT_SIZES[GL_DEPTH_STENCIL$1] = 4;
        FORMAT_SIZES[GL_SRGB8_ALPHA8_EXT] = 4;
        FORMAT_SIZES[GL_RGBA32F_EXT] = 16;
        FORMAT_SIZES[GL_RGBA16F_EXT] = 8;
        FORMAT_SIZES[GL_RGB16F_EXT] = 6;
        function getRenderbufferSize(format, width, height) {
          return FORMAT_SIZES[format] * width * height;
        }
        var wrapRenderbuffers = function(gl, extensions, limits, stats2, config2) {
          var formatTypes = {
            "rgba4": GL_RGBA4$1,
            "rgb565": GL_RGB565$1,
            "rgb5 a1": GL_RGB5_A1$1,
            "depth": GL_DEPTH_COMPONENT16,
            "stencil": GL_STENCIL_INDEX8,
            "depth stencil": GL_DEPTH_STENCIL$1
          };
          if (extensions.ext_srgb) {
            formatTypes["srgba"] = GL_SRGB8_ALPHA8_EXT;
          }
          if (extensions.ext_color_buffer_half_float) {
            formatTypes["rgba16f"] = GL_RGBA16F_EXT;
            formatTypes["rgb16f"] = GL_RGB16F_EXT;
          }
          if (extensions.webgl_color_buffer_float) {
            formatTypes["rgba32f"] = GL_RGBA32F_EXT;
          }
          var formatTypesInvert = [];
          Object.keys(formatTypes).forEach(function(key) {
            var val = formatTypes[key];
            formatTypesInvert[val] = key;
          });
          var renderbufferCount = 0;
          var renderbufferSet = {};
          function REGLRenderbuffer(renderbuffer) {
            this.id = renderbufferCount++;
            this.refCount = 1;
            this.renderbuffer = renderbuffer;
            this.format = GL_RGBA4$1;
            this.width = 0;
            this.height = 0;
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          REGLRenderbuffer.prototype.decRef = function() {
            if (--this.refCount <= 0) {
              destroy(this);
            }
          };
          function destroy(rb) {
            var handle = rb.renderbuffer;
            check$1(handle, "must not double destroy renderbuffer");
            gl.bindRenderbuffer(GL_RENDERBUFFER, null);
            gl.deleteRenderbuffer(handle);
            rb.renderbuffer = null;
            rb.refCount = 0;
            delete renderbufferSet[rb.id];
            stats2.renderbufferCount--;
          }
          function createRenderbuffer(a, b) {
            var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
            renderbufferSet[renderbuffer.id] = renderbuffer;
            stats2.renderbufferCount++;
            function reglRenderbuffer(a2, b2) {
              var w = 0;
              var h = 0;
              var format = GL_RGBA4$1;
              if (typeof a2 === "object" && a2) {
                var options = a2;
                if ("shape" in options) {
                  var shape = options.shape;
                  check$1(
                    Array.isArray(shape) && shape.length >= 2,
                    "invalid renderbuffer shape"
                  );
                  w = shape[0] | 0;
                  h = shape[1] | 0;
                } else {
                  if ("radius" in options) {
                    w = h = options.radius | 0;
                  }
                  if ("width" in options) {
                    w = options.width | 0;
                  }
                  if ("height" in options) {
                    h = options.height | 0;
                  }
                }
                if ("format" in options) {
                  check$1.parameter(
                    options.format,
                    formatTypes,
                    "invalid renderbuffer format"
                  );
                  format = formatTypes[options.format];
                }
              } else if (typeof a2 === "number") {
                w = a2 | 0;
                if (typeof b2 === "number") {
                  h = b2 | 0;
                } else {
                  h = w;
                }
              } else if (!a2) {
                w = h = 1;
              } else {
                check$1.raise("invalid arguments to renderbuffer constructor");
              }
              check$1(
                w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize,
                "invalid renderbuffer size"
              );
              if (w === renderbuffer.width && h === renderbuffer.height && format === renderbuffer.format) {
                return;
              }
              reglRenderbuffer.width = renderbuffer.width = w;
              reglRenderbuffer.height = renderbuffer.height = h;
              renderbuffer.format = format;
              gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);
              check$1(
                gl.getError() === 0,
                "invalid render buffer format"
              );
              if (config2.profile) {
                renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
              }
              reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];
              return reglRenderbuffer;
            }
            function resize(w_, h_) {
              var w = w_ | 0;
              var h = h_ | 0 || w;
              if (w === renderbuffer.width && h === renderbuffer.height) {
                return reglRenderbuffer;
              }
              check$1(
                w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize,
                "invalid renderbuffer size"
              );
              reglRenderbuffer.width = renderbuffer.width = w;
              reglRenderbuffer.height = renderbuffer.height = h;
              gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);
              check$1(
                gl.getError() === 0,
                "invalid render buffer format"
              );
              if (config2.profile) {
                renderbuffer.stats.size = getRenderbufferSize(
                  renderbuffer.format,
                  renderbuffer.width,
                  renderbuffer.height
                );
              }
              return reglRenderbuffer;
            }
            reglRenderbuffer(a, b);
            reglRenderbuffer.resize = resize;
            reglRenderbuffer._reglType = "renderbuffer";
            reglRenderbuffer._renderbuffer = renderbuffer;
            if (config2.profile) {
              reglRenderbuffer.stats = renderbuffer.stats;
            }
            reglRenderbuffer.destroy = function() {
              renderbuffer.decRef();
            };
            return reglRenderbuffer;
          }
          if (config2.profile) {
            stats2.getTotalRenderbufferSize = function() {
              var total = 0;
              Object.keys(renderbufferSet).forEach(function(key) {
                total += renderbufferSet[key].stats.size;
              });
              return total;
            };
          }
          function restoreRenderbuffers() {
            values(renderbufferSet).forEach(function(rb) {
              rb.renderbuffer = gl.createRenderbuffer();
              gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
            });
            gl.bindRenderbuffer(GL_RENDERBUFFER, null);
          }
          return {
            create: createRenderbuffer,
            clear: function() {
              values(renderbufferSet).forEach(destroy);
            },
            restore: restoreRenderbuffers
          };
        };
        var GL_FRAMEBUFFER$1 = 36160;
        var GL_RENDERBUFFER$1 = 36161;
        var GL_TEXTURE_2D$2 = 3553;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 = 34069;
        var GL_COLOR_ATTACHMENT0$1 = 36064;
        var GL_DEPTH_ATTACHMENT = 36096;
        var GL_STENCIL_ATTACHMENT = 36128;
        var GL_DEPTH_STENCIL_ATTACHMENT = 33306;
        var GL_FRAMEBUFFER_COMPLETE$1 = 36053;
        var GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
        var GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
        var GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
        var GL_FRAMEBUFFER_UNSUPPORTED = 36061;
        var GL_HALF_FLOAT_OES$2 = 36193;
        var GL_UNSIGNED_BYTE$6 = 5121;
        var GL_FLOAT$5 = 5126;
        var GL_RGB$1 = 6407;
        var GL_RGBA$2 = 6408;
        var GL_DEPTH_COMPONENT$1 = 6402;
        var colorTextureFormatEnums = [
          GL_RGB$1,
          GL_RGBA$2
        ];
        var textureFormatChannels = [];
        textureFormatChannels[GL_RGBA$2] = 4;
        textureFormatChannels[GL_RGB$1] = 3;
        var textureTypeSizes = [];
        textureTypeSizes[GL_UNSIGNED_BYTE$6] = 1;
        textureTypeSizes[GL_FLOAT$5] = 4;
        textureTypeSizes[GL_HALF_FLOAT_OES$2] = 2;
        var GL_RGBA4$2 = 32854;
        var GL_RGB5_A1$2 = 32855;
        var GL_RGB565$2 = 36194;
        var GL_DEPTH_COMPONENT16$1 = 33189;
        var GL_STENCIL_INDEX8$1 = 36168;
        var GL_DEPTH_STENCIL$2 = 34041;
        var GL_SRGB8_ALPHA8_EXT$1 = 35907;
        var GL_RGBA32F_EXT$1 = 34836;
        var GL_RGBA16F_EXT$1 = 34842;
        var GL_RGB16F_EXT$1 = 34843;
        var colorRenderbufferFormatEnums = [
          GL_RGBA4$2,
          GL_RGB5_A1$2,
          GL_RGB565$2,
          GL_SRGB8_ALPHA8_EXT$1,
          GL_RGBA16F_EXT$1,
          GL_RGB16F_EXT$1,
          GL_RGBA32F_EXT$1
        ];
        var statusCode = {};
        statusCode[GL_FRAMEBUFFER_COMPLETE$1] = "complete";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT] = "incomplete attachment";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS] = "incomplete dimensions";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT] = "incomplete, missing attachment";
        statusCode[GL_FRAMEBUFFER_UNSUPPORTED] = "unsupported";
        function wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats2) {
          var framebufferState = {
            cur: null,
            next: null,
            dirty: false,
            setFBO: null
          };
          var colorTextureFormats = ["rgba"];
          var colorRenderbufferFormats = ["rgba4", "rgb565", "rgb5 a1"];
          if (extensions.ext_srgb) {
            colorRenderbufferFormats.push("srgba");
          }
          if (extensions.ext_color_buffer_half_float) {
            colorRenderbufferFormats.push("rgba16f", "rgb16f");
          }
          if (extensions.webgl_color_buffer_float) {
            colorRenderbufferFormats.push("rgba32f");
          }
          var colorTypes = ["uint8"];
          if (extensions.oes_texture_half_float) {
            colorTypes.push("half float", "float16");
          }
          if (extensions.oes_texture_float) {
            colorTypes.push("float", "float32");
          }
          function FramebufferAttachment(target, texture, renderbuffer) {
            this.target = target;
            this.texture = texture;
            this.renderbuffer = renderbuffer;
            var w = 0;
            var h = 0;
            if (texture) {
              w = texture.width;
              h = texture.height;
            } else if (renderbuffer) {
              w = renderbuffer.width;
              h = renderbuffer.height;
            }
            this.width = w;
            this.height = h;
          }
          function decRef(attachment) {
            if (attachment) {
              if (attachment.texture) {
                attachment.texture._texture.decRef();
              }
              if (attachment.renderbuffer) {
                attachment.renderbuffer._renderbuffer.decRef();
              }
            }
          }
          function incRefAndCheckShape(attachment, width, height) {
            if (!attachment) {
              return;
            }
            if (attachment.texture) {
              var texture = attachment.texture._texture;
              var tw = Math.max(1, texture.width);
              var th = Math.max(1, texture.height);
              check$1(
                tw === width && th === height,
                "inconsistent width/height for supplied texture"
              );
              texture.refCount += 1;
            } else {
              var renderbuffer = attachment.renderbuffer._renderbuffer;
              check$1(
                renderbuffer.width === width && renderbuffer.height === height,
                "inconsistent width/height for renderbuffer"
              );
              renderbuffer.refCount += 1;
            }
          }
          function attach(location, attachment) {
            if (attachment) {
              if (attachment.texture) {
                gl.framebufferTexture2D(
                  GL_FRAMEBUFFER$1,
                  location,
                  attachment.target,
                  attachment.texture._texture.texture,
                  0
                );
              } else {
                gl.framebufferRenderbuffer(
                  GL_FRAMEBUFFER$1,
                  location,
                  GL_RENDERBUFFER$1,
                  attachment.renderbuffer._renderbuffer.renderbuffer
                );
              }
            }
          }
          function parseAttachment(attachment) {
            var target = GL_TEXTURE_2D$2;
            var texture = null;
            var renderbuffer = null;
            var data = attachment;
            if (typeof attachment === "object") {
              data = attachment.data;
              if ("target" in attachment) {
                target = attachment.target | 0;
              }
            }
            check$1.type(data, "function", "invalid attachment data");
            var type = data._reglType;
            if (type === "texture2d") {
              texture = data;
              check$1(target === GL_TEXTURE_2D$2);
            } else if (type === "textureCube") {
              texture = data;
              check$1(
                target >= GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 && target < GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + 6,
                "invalid cube map target"
              );
            } else if (type === "renderbuffer") {
              renderbuffer = data;
              target = GL_RENDERBUFFER$1;
            } else {
              check$1.raise("invalid regl object for attachment");
            }
            return new FramebufferAttachment(target, texture, renderbuffer);
          }
          function allocAttachment(width, height, isTexture, format, type) {
            if (isTexture) {
              var texture = textureState.create2D({
                width,
                height,
                format,
                type
              });
              texture._texture.refCount = 0;
              return new FramebufferAttachment(GL_TEXTURE_2D$2, texture, null);
            } else {
              var rb = renderbufferState.create({
                width,
                height,
                format
              });
              rb._renderbuffer.refCount = 0;
              return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb);
            }
          }
          function unwrapAttachment(attachment) {
            return attachment && (attachment.texture || attachment.renderbuffer);
          }
          function resizeAttachment(attachment, w, h) {
            if (attachment) {
              if (attachment.texture) {
                attachment.texture.resize(w, h);
              } else if (attachment.renderbuffer) {
                attachment.renderbuffer.resize(w, h);
              }
              attachment.width = w;
              attachment.height = h;
            }
          }
          var framebufferCount = 0;
          var framebufferSet = {};
          function REGLFramebuffer() {
            this.id = framebufferCount++;
            framebufferSet[this.id] = this;
            this.framebuffer = gl.createFramebuffer();
            this.width = 0;
            this.height = 0;
            this.colorAttachments = [];
            this.depthAttachment = null;
            this.stencilAttachment = null;
            this.depthStencilAttachment = null;
          }
          function decFBORefs(framebuffer) {
            framebuffer.colorAttachments.forEach(decRef);
            decRef(framebuffer.depthAttachment);
            decRef(framebuffer.stencilAttachment);
            decRef(framebuffer.depthStencilAttachment);
          }
          function destroy(framebuffer) {
            var handle = framebuffer.framebuffer;
            check$1(handle, "must not double destroy framebuffer");
            gl.deleteFramebuffer(handle);
            framebuffer.framebuffer = null;
            stats2.framebufferCount--;
            delete framebufferSet[framebuffer.id];
          }
          function updateFramebuffer(framebuffer) {
            var i;
            gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebuffer.framebuffer);
            var colorAttachments = framebuffer.colorAttachments;
            for (i = 0; i < colorAttachments.length; ++i) {
              attach(GL_COLOR_ATTACHMENT0$1 + i, colorAttachments[i]);
            }
            for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
              gl.framebufferTexture2D(
                GL_FRAMEBUFFER$1,
                GL_COLOR_ATTACHMENT0$1 + i,
                GL_TEXTURE_2D$2,
                null,
                0
              );
            }
            gl.framebufferTexture2D(
              GL_FRAMEBUFFER$1,
              GL_DEPTH_STENCIL_ATTACHMENT,
              GL_TEXTURE_2D$2,
              null,
              0
            );
            gl.framebufferTexture2D(
              GL_FRAMEBUFFER$1,
              GL_DEPTH_ATTACHMENT,
              GL_TEXTURE_2D$2,
              null,
              0
            );
            gl.framebufferTexture2D(
              GL_FRAMEBUFFER$1,
              GL_STENCIL_ATTACHMENT,
              GL_TEXTURE_2D$2,
              null,
              0
            );
            attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
            attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
            attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);
            var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER$1);
            if (!gl.isContextLost() && status !== GL_FRAMEBUFFER_COMPLETE$1) {
              check$1.raise("framebuffer configuration not supported, status = " + statusCode[status]);
            }
            gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebufferState.next ? framebufferState.next.framebuffer : null);
            framebufferState.cur = framebufferState.next;
            gl.getError();
          }
          function createFBO(a0, a1) {
            var framebuffer = new REGLFramebuffer();
            stats2.framebufferCount++;
            function reglFramebuffer(a, b) {
              var i;
              check$1(
                framebufferState.next !== framebuffer,
                "can not update framebuffer which is currently in use"
              );
              var width = 0;
              var height = 0;
              var needsDepth = true;
              var needsStencil = true;
              var colorBuffer = null;
              var colorTexture = true;
              var colorFormat = "rgba";
              var colorType = "uint8";
              var colorCount = 1;
              var depthBuffer = null;
              var stencilBuffer = null;
              var depthStencilBuffer = null;
              var depthStencilTexture = false;
              if (typeof a === "number") {
                width = a | 0;
                height = b | 0 || width;
              } else if (!a) {
                width = height = 1;
              } else {
                check$1.type(a, "object", "invalid arguments for framebuffer");
                var options = a;
                if ("shape" in options) {
                  var shape = options.shape;
                  check$1(
                    Array.isArray(shape) && shape.length >= 2,
                    "invalid shape for framebuffer"
                  );
                  width = shape[0];
                  height = shape[1];
                } else {
                  if ("radius" in options) {
                    width = height = options.radius;
                  }
                  if ("width" in options) {
                    width = options.width;
                  }
                  if ("height" in options) {
                    height = options.height;
                  }
                }
                if ("color" in options || "colors" in options) {
                  colorBuffer = options.color || options.colors;
                  if (Array.isArray(colorBuffer)) {
                    check$1(
                      colorBuffer.length === 1 || extensions.webgl_draw_buffers,
                      "multiple render targets not supported"
                    );
                  }
                }
                if (!colorBuffer) {
                  if ("colorCount" in options) {
                    colorCount = options.colorCount | 0;
                    check$1(colorCount > 0, "invalid color buffer count");
                  }
                  if ("colorTexture" in options) {
                    colorTexture = !!options.colorTexture;
                    colorFormat = "rgba4";
                  }
                  if ("colorType" in options) {
                    colorType = options.colorType;
                    if (!colorTexture) {
                      if (colorType === "half float" || colorType === "float16") {
                        check$1(
                          extensions.ext_color_buffer_half_float,
                          "you must enable EXT_color_buffer_half_float to use 16-bit render buffers"
                        );
                        colorFormat = "rgba16f";
                      } else if (colorType === "float" || colorType === "float32") {
                        check$1(
                          extensions.webgl_color_buffer_float,
                          "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"
                        );
                        colorFormat = "rgba32f";
                      }
                    } else {
                      check$1(
                        extensions.oes_texture_float || !(colorType === "float" || colorType === "float32"),
                        "you must enable OES_texture_float in order to use floating point framebuffer objects"
                      );
                      check$1(
                        extensions.oes_texture_half_float || !(colorType === "half float" || colorType === "float16"),
                        "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects"
                      );
                    }
                    check$1.oneOf(colorType, colorTypes, "invalid color type");
                  }
                  if ("colorFormat" in options) {
                    colorFormat = options.colorFormat;
                    if (colorTextureFormats.indexOf(colorFormat) >= 0) {
                      colorTexture = true;
                    } else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
                      colorTexture = false;
                    } else {
                      check$1.optional(function() {
                        if (colorTexture) {
                          check$1.oneOf(
                            options.colorFormat,
                            colorTextureFormats,
                            "invalid color format for texture"
                          );
                        } else {
                          check$1.oneOf(
                            options.colorFormat,
                            colorRenderbufferFormats,
                            "invalid color format for renderbuffer"
                          );
                        }
                      });
                    }
                  }
                }
                if ("depthTexture" in options || "depthStencilTexture" in options) {
                  depthStencilTexture = !!(options.depthTexture || options.depthStencilTexture);
                  check$1(
                    !depthStencilTexture || extensions.webgl_depth_texture,
                    "webgl_depth_texture extension not supported"
                  );
                }
                if ("depth" in options) {
                  if (typeof options.depth === "boolean") {
                    needsDepth = options.depth;
                  } else {
                    depthBuffer = options.depth;
                    needsStencil = false;
                  }
                }
                if ("stencil" in options) {
                  if (typeof options.stencil === "boolean") {
                    needsStencil = options.stencil;
                  } else {
                    stencilBuffer = options.stencil;
                    needsDepth = false;
                  }
                }
                if ("depthStencil" in options) {
                  if (typeof options.depthStencil === "boolean") {
                    needsDepth = needsStencil = options.depthStencil;
                  } else {
                    depthStencilBuffer = options.depthStencil;
                    needsDepth = false;
                    needsStencil = false;
                  }
                }
              }
              var colorAttachments = null;
              var depthAttachment = null;
              var stencilAttachment = null;
              var depthStencilAttachment = null;
              if (Array.isArray(colorBuffer)) {
                colorAttachments = colorBuffer.map(parseAttachment);
              } else if (colorBuffer) {
                colorAttachments = [parseAttachment(colorBuffer)];
              } else {
                colorAttachments = new Array(colorCount);
                for (i = 0; i < colorCount; ++i) {
                  colorAttachments[i] = allocAttachment(
                    width,
                    height,
                    colorTexture,
                    colorFormat,
                    colorType
                  );
                }
              }
              check$1(
                extensions.webgl_draw_buffers || colorAttachments.length <= 1,
                "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."
              );
              check$1(
                colorAttachments.length <= limits.maxColorAttachments,
                "too many color attachments, not supported"
              );
              width = width || colorAttachments[0].width;
              height = height || colorAttachments[0].height;
              if (depthBuffer) {
                depthAttachment = parseAttachment(depthBuffer);
              } else if (needsDepth && !needsStencil) {
                depthAttachment = allocAttachment(
                  width,
                  height,
                  depthStencilTexture,
                  "depth",
                  "uint32"
                );
              }
              if (stencilBuffer) {
                stencilAttachment = parseAttachment(stencilBuffer);
              } else if (needsStencil && !needsDepth) {
                stencilAttachment = allocAttachment(
                  width,
                  height,
                  false,
                  "stencil",
                  "uint8"
                );
              }
              if (depthStencilBuffer) {
                depthStencilAttachment = parseAttachment(depthStencilBuffer);
              } else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
                depthStencilAttachment = allocAttachment(
                  width,
                  height,
                  depthStencilTexture,
                  "depth stencil",
                  "depth stencil"
                );
              }
              check$1(
                !!depthBuffer + !!stencilBuffer + !!depthStencilBuffer <= 1,
                "invalid framebuffer configuration, can specify exactly one depth/stencil attachment"
              );
              var commonColorAttachmentSize = null;
              for (i = 0; i < colorAttachments.length; ++i) {
                incRefAndCheckShape(colorAttachments[i], width, height);
                check$1(
                  !colorAttachments[i] || colorAttachments[i].texture && colorTextureFormatEnums.indexOf(colorAttachments[i].texture._texture.format) >= 0 || colorAttachments[i].renderbuffer && colorRenderbufferFormatEnums.indexOf(colorAttachments[i].renderbuffer._renderbuffer.format) >= 0,
                  "framebuffer color attachment " + i + " is invalid"
                );
                if (colorAttachments[i] && colorAttachments[i].texture) {
                  var colorAttachmentSize = textureFormatChannels[colorAttachments[i].texture._texture.format] * textureTypeSizes[colorAttachments[i].texture._texture.type];
                  if (commonColorAttachmentSize === null) {
                    commonColorAttachmentSize = colorAttachmentSize;
                  } else {
                    check$1(
                      commonColorAttachmentSize === colorAttachmentSize,
                      "all color attachments much have the same number of bits per pixel."
                    );
                  }
                }
              }
              incRefAndCheckShape(depthAttachment, width, height);
              check$1(
                !depthAttachment || depthAttachment.texture && depthAttachment.texture._texture.format === GL_DEPTH_COMPONENT$1 || depthAttachment.renderbuffer && depthAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_COMPONENT16$1,
                "invalid depth attachment for framebuffer object"
              );
              incRefAndCheckShape(stencilAttachment, width, height);
              check$1(
                !stencilAttachment || stencilAttachment.renderbuffer && stencilAttachment.renderbuffer._renderbuffer.format === GL_STENCIL_INDEX8$1,
                "invalid stencil attachment for framebuffer object"
              );
              incRefAndCheckShape(depthStencilAttachment, width, height);
              check$1(
                !depthStencilAttachment || depthStencilAttachment.texture && depthStencilAttachment.texture._texture.format === GL_DEPTH_STENCIL$2 || depthStencilAttachment.renderbuffer && depthStencilAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_STENCIL$2,
                "invalid depth-stencil attachment for framebuffer object"
              );
              decFBORefs(framebuffer);
              framebuffer.width = width;
              framebuffer.height = height;
              framebuffer.colorAttachments = colorAttachments;
              framebuffer.depthAttachment = depthAttachment;
              framebuffer.stencilAttachment = stencilAttachment;
              framebuffer.depthStencilAttachment = depthStencilAttachment;
              reglFramebuffer.color = colorAttachments.map(unwrapAttachment);
              reglFramebuffer.depth = unwrapAttachment(depthAttachment);
              reglFramebuffer.stencil = unwrapAttachment(stencilAttachment);
              reglFramebuffer.depthStencil = unwrapAttachment(depthStencilAttachment);
              reglFramebuffer.width = framebuffer.width;
              reglFramebuffer.height = framebuffer.height;
              updateFramebuffer(framebuffer);
              return reglFramebuffer;
            }
            function resize(w_, h_) {
              check$1(
                framebufferState.next !== framebuffer,
                "can not resize a framebuffer which is currently in use"
              );
              var w = Math.max(w_ | 0, 1);
              var h = Math.max(h_ | 0 || w, 1);
              if (w === framebuffer.width && h === framebuffer.height) {
                return reglFramebuffer;
              }
              var colorAttachments = framebuffer.colorAttachments;
              for (var i = 0; i < colorAttachments.length; ++i) {
                resizeAttachment(colorAttachments[i], w, h);
              }
              resizeAttachment(framebuffer.depthAttachment, w, h);
              resizeAttachment(framebuffer.stencilAttachment, w, h);
              resizeAttachment(framebuffer.depthStencilAttachment, w, h);
              framebuffer.width = reglFramebuffer.width = w;
              framebuffer.height = reglFramebuffer.height = h;
              updateFramebuffer(framebuffer);
              return reglFramebuffer;
            }
            reglFramebuffer(a0, a1);
            return extend2(reglFramebuffer, {
              resize,
              _reglType: "framebuffer",
              _framebuffer: framebuffer,
              destroy: function() {
                destroy(framebuffer);
                decFBORefs(framebuffer);
              },
              use: function(block) {
                framebufferState.setFBO({
                  framebuffer: reglFramebuffer
                }, block);
              }
            });
          }
          function createCubeFBO(options) {
            var faces = Array(6);
            function reglFramebufferCube(a) {
              var i;
              check$1(
                faces.indexOf(framebufferState.next) < 0,
                "can not update framebuffer which is currently in use"
              );
              var params = {
                color: null
              };
              var radius = 0;
              var colorBuffer = null;
              var colorFormat = "rgba";
              var colorType = "uint8";
              var colorCount = 1;
              if (typeof a === "number") {
                radius = a | 0;
              } else if (!a) {
                radius = 1;
              } else {
                check$1.type(a, "object", "invalid arguments for framebuffer");
                var options2 = a;
                if ("shape" in options2) {
                  var shape = options2.shape;
                  check$1(
                    Array.isArray(shape) && shape.length >= 2,
                    "invalid shape for framebuffer"
                  );
                  check$1(
                    shape[0] === shape[1],
                    "cube framebuffer must be square"
                  );
                  radius = shape[0];
                } else {
                  if ("radius" in options2) {
                    radius = options2.radius | 0;
                  }
                  if ("width" in options2) {
                    radius = options2.width | 0;
                    if ("height" in options2) {
                      check$1(options2.height === radius, "must be square");
                    }
                  } else if ("height" in options2) {
                    radius = options2.height | 0;
                  }
                }
                if ("color" in options2 || "colors" in options2) {
                  colorBuffer = options2.color || options2.colors;
                  if (Array.isArray(colorBuffer)) {
                    check$1(
                      colorBuffer.length === 1 || extensions.webgl_draw_buffers,
                      "multiple render targets not supported"
                    );
                  }
                }
                if (!colorBuffer) {
                  if ("colorCount" in options2) {
                    colorCount = options2.colorCount | 0;
                    check$1(colorCount > 0, "invalid color buffer count");
                  }
                  if ("colorType" in options2) {
                    check$1.oneOf(
                      options2.colorType,
                      colorTypes,
                      "invalid color type"
                    );
                    colorType = options2.colorType;
                  }
                  if ("colorFormat" in options2) {
                    colorFormat = options2.colorFormat;
                    check$1.oneOf(
                      options2.colorFormat,
                      colorTextureFormats,
                      "invalid color format for texture"
                    );
                  }
                }
                if ("depth" in options2) {
                  params.depth = options2.depth;
                }
                if ("stencil" in options2) {
                  params.stencil = options2.stencil;
                }
                if ("depthStencil" in options2) {
                  params.depthStencil = options2.depthStencil;
                }
              }
              var colorCubes;
              if (colorBuffer) {
                if (Array.isArray(colorBuffer)) {
                  colorCubes = [];
                  for (i = 0; i < colorBuffer.length; ++i) {
                    colorCubes[i] = colorBuffer[i];
                  }
                } else {
                  colorCubes = [colorBuffer];
                }
              } else {
                colorCubes = Array(colorCount);
                var cubeMapParams = {
                  radius,
                  format: colorFormat,
                  type: colorType
                };
                for (i = 0; i < colorCount; ++i) {
                  colorCubes[i] = textureState.createCube(cubeMapParams);
                }
              }
              params.color = Array(colorCubes.length);
              for (i = 0; i < colorCubes.length; ++i) {
                var cube = colorCubes[i];
                check$1(
                  typeof cube === "function" && cube._reglType === "textureCube",
                  "invalid cube map"
                );
                radius = radius || cube.width;
                check$1(
                  cube.width === radius && cube.height === radius,
                  "invalid cube map shape"
                );
                params.color[i] = {
                  target: GL_TEXTURE_CUBE_MAP_POSITIVE_X$2,
                  data: colorCubes[i]
                };
              }
              for (i = 0; i < 6; ++i) {
                for (var j = 0; j < colorCubes.length; ++j) {
                  params.color[j].target = GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + i;
                }
                if (i > 0) {
                  params.depth = faces[0].depth;
                  params.stencil = faces[0].stencil;
                  params.depthStencil = faces[0].depthStencil;
                }
                if (faces[i]) {
                  faces[i](params);
                } else {
                  faces[i] = createFBO(params);
                }
              }
              return extend2(reglFramebufferCube, {
                width: radius,
                height: radius,
                color: colorCubes
              });
            }
            function resize(radius_) {
              var i;
              var radius = radius_ | 0;
              check$1(
                radius > 0 && radius <= limits.maxCubeMapSize,
                "invalid radius for cube fbo"
              );
              if (radius === reglFramebufferCube.width) {
                return reglFramebufferCube;
              }
              var colors = reglFramebufferCube.color;
              for (i = 0; i < colors.length; ++i) {
                colors[i].resize(radius);
              }
              for (i = 0; i < 6; ++i) {
                faces[i].resize(radius);
              }
              reglFramebufferCube.width = reglFramebufferCube.height = radius;
              return reglFramebufferCube;
            }
            reglFramebufferCube(options);
            return extend2(reglFramebufferCube, {
              faces,
              resize,
              _reglType: "framebufferCube",
              destroy: function() {
                faces.forEach(function(f) {
                  f.destroy();
                });
              }
            });
          }
          function restoreFramebuffers() {
            framebufferState.cur = null;
            framebufferState.next = null;
            framebufferState.dirty = true;
            values(framebufferSet).forEach(function(fb) {
              fb.framebuffer = gl.createFramebuffer();
              updateFramebuffer(fb);
            });
          }
          return extend2(framebufferState, {
            getFramebuffer: function(object) {
              if (typeof object === "function" && object._reglType === "framebuffer") {
                var fbo = object._framebuffer;
                if (fbo instanceof REGLFramebuffer) {
                  return fbo;
                }
              }
              return null;
            },
            create: createFBO,
            createCube: createCubeFBO,
            clear: function() {
              values(framebufferSet).forEach(destroy);
            },
            restore: restoreFramebuffers
          });
        }
        var GL_FLOAT$6 = 5126;
        var GL_ARRAY_BUFFER$1 = 34962;
        var GL_ELEMENT_ARRAY_BUFFER$1 = 34963;
        var VAO_OPTIONS = [
          "attributes",
          "elements",
          "offset",
          "count",
          "primitive",
          "instances"
        ];
        function AttributeRecord() {
          this.state = 0;
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.w = 0;
          this.buffer = null;
          this.size = 0;
          this.normalized = false;
          this.type = GL_FLOAT$6;
          this.offset = 0;
          this.stride = 0;
          this.divisor = 0;
        }
        function wrapAttributeState(gl, extensions, limits, stats2, bufferState, elementState, drawState) {
          var NUM_ATTRIBUTES = limits.maxAttributes;
          var attributeBindings = new Array(NUM_ATTRIBUTES);
          for (var i = 0; i < NUM_ATTRIBUTES; ++i) {
            attributeBindings[i] = new AttributeRecord();
          }
          var vaoCount = 0;
          var vaoSet = {};
          var state = {
            Record: AttributeRecord,
            scope: {},
            state: attributeBindings,
            currentVAO: null,
            targetVAO: null,
            restore: extVAO() ? restoreVAO : function() {
            },
            createVAO,
            getVAO,
            destroyBuffer,
            setVAO: extVAO() ? setVAOEXT : setVAOEmulated,
            clear: extVAO() ? destroyVAOEXT : function() {
            }
          };
          function destroyBuffer(buffer) {
            for (var i2 = 0; i2 < attributeBindings.length; ++i2) {
              var record = attributeBindings[i2];
              if (record.buffer === buffer) {
                gl.disableVertexAttribArray(i2);
                record.buffer = null;
              }
            }
          }
          function extVAO() {
            return extensions.oes_vertex_array_object;
          }
          function extInstanced() {
            return extensions.angle_instanced_arrays;
          }
          function getVAO(vao) {
            if (typeof vao === "function" && vao._vao) {
              return vao._vao;
            }
            return null;
          }
          function setVAOEXT(vao) {
            if (vao === state.currentVAO) {
              return;
            }
            var ext = extVAO();
            if (vao) {
              ext.bindVertexArrayOES(vao.vao);
            } else {
              ext.bindVertexArrayOES(null);
            }
            state.currentVAO = vao;
          }
          function setVAOEmulated(vao) {
            if (vao === state.currentVAO) {
              return;
            }
            if (vao) {
              vao.bindAttrs();
            } else {
              var exti = extInstanced();
              for (var i2 = 0; i2 < attributeBindings.length; ++i2) {
                var binding = attributeBindings[i2];
                if (binding.buffer) {
                  gl.enableVertexAttribArray(i2);
                  binding.buffer.bind();
                  gl.vertexAttribPointer(i2, binding.size, binding.type, binding.normalized, binding.stride, binding.offfset);
                  if (exti && binding.divisor) {
                    exti.vertexAttribDivisorANGLE(i2, binding.divisor);
                  }
                } else {
                  gl.disableVertexAttribArray(i2);
                  gl.vertexAttrib4f(i2, binding.x, binding.y, binding.z, binding.w);
                }
              }
              if (drawState.elements) {
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, drawState.elements.buffer.buffer);
              } else {
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, null);
              }
            }
            state.currentVAO = vao;
          }
          function destroyVAOEXT() {
            values(vaoSet).forEach(function(vao) {
              vao.destroy();
            });
          }
          function REGLVAO() {
            this.id = ++vaoCount;
            this.attributes = [];
            this.elements = null;
            this.ownsElements = false;
            this.count = 0;
            this.offset = 0;
            this.instances = -1;
            this.primitive = 4;
            var extension = extVAO();
            if (extension) {
              this.vao = extension.createVertexArrayOES();
            } else {
              this.vao = null;
            }
            vaoSet[this.id] = this;
            this.buffers = [];
          }
          REGLVAO.prototype.bindAttrs = function() {
            var exti = extInstanced();
            var attributes = this.attributes;
            for (var i2 = 0; i2 < attributes.length; ++i2) {
              var attr = attributes[i2];
              if (attr.buffer) {
                gl.enableVertexAttribArray(i2);
                gl.bindBuffer(GL_ARRAY_BUFFER$1, attr.buffer.buffer);
                gl.vertexAttribPointer(i2, attr.size, attr.type, attr.normalized, attr.stride, attr.offset);
                if (exti && attr.divisor) {
                  exti.vertexAttribDivisorANGLE(i2, attr.divisor);
                }
              } else {
                gl.disableVertexAttribArray(i2);
                gl.vertexAttrib4f(i2, attr.x, attr.y, attr.z, attr.w);
              }
            }
            for (var j = attributes.length; j < NUM_ATTRIBUTES; ++j) {
              gl.disableVertexAttribArray(j);
            }
            var elements = elementState.getElements(this.elements);
            if (elements) {
              gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, elements.buffer.buffer);
            } else {
              gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, null);
            }
          };
          REGLVAO.prototype.refresh = function() {
            var ext = extVAO();
            if (ext) {
              ext.bindVertexArrayOES(this.vao);
              this.bindAttrs();
              state.currentVAO = null;
              ext.bindVertexArrayOES(null);
            }
          };
          REGLVAO.prototype.destroy = function() {
            if (this.vao) {
              var extension = extVAO();
              if (this === state.currentVAO) {
                state.currentVAO = null;
                extension.bindVertexArrayOES(null);
              }
              extension.deleteVertexArrayOES(this.vao);
              this.vao = null;
            }
            if (this.ownsElements) {
              this.elements.destroy();
              this.elements = null;
              this.ownsElements = false;
            }
            if (vaoSet[this.id]) {
              delete vaoSet[this.id];
              stats2.vaoCount -= 1;
            }
          };
          function restoreVAO() {
            var ext = extVAO();
            if (ext) {
              values(vaoSet).forEach(function(vao) {
                vao.refresh();
              });
            }
          }
          function createVAO(_attr) {
            var vao = new REGLVAO();
            stats2.vaoCount += 1;
            function updateVAO(options) {
              var attributes;
              if (Array.isArray(options)) {
                attributes = options;
                if (vao.elements && vao.ownsElements) {
                  vao.elements.destroy();
                }
                vao.elements = null;
                vao.ownsElements = false;
                vao.offset = 0;
                vao.count = 0;
                vao.instances = -1;
                vao.primitive = 4;
              } else {
                check$1(typeof options === "object", "invalid arguments for create vao");
                check$1("attributes" in options, "must specify attributes for vao");
                if (options.elements) {
                  var elements = options.elements;
                  if (vao.ownsElements) {
                    if (typeof elements === "function" && elements._reglType === "elements") {
                      vao.elements.destroy();
                      vao.ownsElements = false;
                    } else {
                      vao.elements(elements);
                      vao.ownsElements = false;
                    }
                  } else if (elementState.getElements(options.elements)) {
                    vao.elements = options.elements;
                    vao.ownsElements = false;
                  } else {
                    vao.elements = elementState.create(options.elements);
                    vao.ownsElements = true;
                  }
                } else {
                  vao.elements = null;
                  vao.ownsElements = false;
                }
                attributes = options.attributes;
                vao.offset = 0;
                vao.count = -1;
                vao.instances = -1;
                vao.primitive = 4;
                if (vao.elements) {
                  vao.count = vao.elements._elements.vertCount;
                  vao.primitive = vao.elements._elements.primType;
                }
                if ("offset" in options) {
                  vao.offset = options.offset | 0;
                }
                if ("count" in options) {
                  vao.count = options.count | 0;
                }
                if ("instances" in options) {
                  vao.instances = options.instances | 0;
                }
                if ("primitive" in options) {
                  check$1(options.primitive in primTypes, "bad primitive type: " + options.primitive);
                  vao.primitive = primTypes[options.primitive];
                }
                check$1.optional(() => {
                  var keys = Object.keys(options);
                  for (var i3 = 0; i3 < keys.length; ++i3) {
                    check$1(VAO_OPTIONS.indexOf(keys[i3]) >= 0, 'invalid option for vao: "' + keys[i3] + '" valid options are ' + VAO_OPTIONS);
                  }
                });
                check$1(Array.isArray(attributes), "attributes must be an array");
              }
              check$1(attributes.length < NUM_ATTRIBUTES, "too many attributes");
              check$1(attributes.length > 0, "must specify at least one attribute");
              var bufUpdated = {};
              var nattributes = vao.attributes;
              nattributes.length = attributes.length;
              for (var i2 = 0; i2 < attributes.length; ++i2) {
                var spec = attributes[i2];
                var rec = nattributes[i2] = new AttributeRecord();
                var data = spec.data || spec;
                if (Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data)) {
                  var buf;
                  if (vao.buffers[i2]) {
                    buf = vao.buffers[i2];
                    if (isTypedArray(data) && buf._buffer.byteLength >= data.byteLength) {
                      buf.subdata(data);
                    } else {
                      buf.destroy();
                      vao.buffers[i2] = null;
                    }
                  }
                  if (!vao.buffers[i2]) {
                    buf = vao.buffers[i2] = bufferState.create(spec, GL_ARRAY_BUFFER$1, false, true);
                  }
                  rec.buffer = bufferState.getBuffer(buf);
                  rec.size = rec.buffer.dimension | 0;
                  rec.normalized = false;
                  rec.type = rec.buffer.dtype;
                  rec.offset = 0;
                  rec.stride = 0;
                  rec.divisor = 0;
                  rec.state = 1;
                  bufUpdated[i2] = 1;
                } else if (bufferState.getBuffer(spec)) {
                  rec.buffer = bufferState.getBuffer(spec);
                  rec.size = rec.buffer.dimension | 0;
                  rec.normalized = false;
                  rec.type = rec.buffer.dtype;
                  rec.offset = 0;
                  rec.stride = 0;
                  rec.divisor = 0;
                  rec.state = 1;
                } else if (bufferState.getBuffer(spec.buffer)) {
                  rec.buffer = bufferState.getBuffer(spec.buffer);
                  rec.size = (+spec.size || rec.buffer.dimension) | 0;
                  rec.normalized = !!spec.normalized || false;
                  if ("type" in spec) {
                    check$1.parameter(spec.type, glTypes, "invalid buffer type");
                    rec.type = glTypes[spec.type];
                  } else {
                    rec.type = rec.buffer.dtype;
                  }
                  rec.offset = (spec.offset || 0) | 0;
                  rec.stride = (spec.stride || 0) | 0;
                  rec.divisor = (spec.divisor || 0) | 0;
                  rec.state = 1;
                  check$1(rec.size >= 1 && rec.size <= 4, "size must be between 1 and 4");
                  check$1(rec.offset >= 0, "invalid offset");
                  check$1(rec.stride >= 0 && rec.stride <= 255, "stride must be between 0 and 255");
                  check$1(rec.divisor >= 0, "divisor must be positive");
                  check$1(!rec.divisor || !!extensions.angle_instanced_arrays, "ANGLE_instanced_arrays must be enabled to use divisor");
                } else if ("x" in spec) {
                  check$1(i2 > 0, "first attribute must not be a constant");
                  rec.x = +spec.x || 0;
                  rec.y = +spec.y || 0;
                  rec.z = +spec.z || 0;
                  rec.w = +spec.w || 0;
                  rec.state = 2;
                } else {
                  check$1(false, "invalid attribute spec for location " + i2);
                }
              }
              for (var j = 0; j < vao.buffers.length; ++j) {
                if (!bufUpdated[j] && vao.buffers[j]) {
                  vao.buffers[j].destroy();
                  vao.buffers[j] = null;
                }
              }
              vao.refresh();
              return updateVAO;
            }
            updateVAO.destroy = function() {
              for (var j = 0; j < vao.buffers.length; ++j) {
                if (vao.buffers[j]) {
                  vao.buffers[j].destroy();
                }
              }
              vao.buffers.length = 0;
              if (vao.ownsElements) {
                vao.elements.destroy();
                vao.elements = null;
                vao.ownsElements = false;
              }
              vao.destroy();
            };
            updateVAO._vao = vao;
            updateVAO._reglType = "vao";
            return updateVAO(_attr);
          }
          return state;
        }
        var GL_FRAGMENT_SHADER = 35632;
        var GL_VERTEX_SHADER = 35633;
        var GL_ACTIVE_UNIFORMS = 35718;
        var GL_ACTIVE_ATTRIBUTES = 35721;
        function wrapShaderState(gl, stringStore, stats2, config2) {
          var fragShaders = {};
          var vertShaders = {};
          function ActiveInfo(name, id2, location, info) {
            this.name = name;
            this.id = id2;
            this.location = location;
            this.info = info;
          }
          function insertActiveInfo(list, info) {
            for (var i = 0; i < list.length; ++i) {
              if (list[i].id === info.id) {
                list[i].location = info.location;
                return;
              }
            }
            list.push(info);
          }
          function getShader(type, id2, command) {
            var cache = type === GL_FRAGMENT_SHADER ? fragShaders : vertShaders;
            var shader = cache[id2];
            if (!shader) {
              var source = stringStore.str(id2);
              shader = gl.createShader(type);
              gl.shaderSource(shader, source);
              gl.compileShader(shader);
              check$1.shaderError(gl, shader, source, type, command);
              cache[id2] = shader;
            }
            return shader;
          }
          var programCache = {};
          var programList = [];
          var PROGRAM_COUNTER = 0;
          function REGLProgram(fragId, vertId) {
            this.id = PROGRAM_COUNTER++;
            this.fragId = fragId;
            this.vertId = vertId;
            this.program = null;
            this.uniforms = [];
            this.attributes = [];
            this.refCount = 1;
            if (config2.profile) {
              this.stats = {
                uniformsCount: 0,
                attributesCount: 0
              };
            }
          }
          function linkProgram(desc, command, attributeLocations) {
            var i, info;
            var fragShader = getShader(GL_FRAGMENT_SHADER, desc.fragId);
            var vertShader = getShader(GL_VERTEX_SHADER, desc.vertId);
            var program = desc.program = gl.createProgram();
            gl.attachShader(program, fragShader);
            gl.attachShader(program, vertShader);
            if (attributeLocations) {
              for (i = 0; i < attributeLocations.length; ++i) {
                var binding = attributeLocations[i];
                gl.bindAttribLocation(program, binding[0], binding[1]);
              }
            }
            gl.linkProgram(program);
            check$1.linkError(
              gl,
              program,
              stringStore.str(desc.fragId),
              stringStore.str(desc.vertId),
              command
            );
            var numUniforms = gl.getProgramParameter(program, GL_ACTIVE_UNIFORMS);
            if (config2.profile) {
              desc.stats.uniformsCount = numUniforms;
            }
            var uniforms = desc.uniforms;
            for (i = 0; i < numUniforms; ++i) {
              info = gl.getActiveUniform(program, i);
              if (info) {
                if (info.size > 1) {
                  for (var j = 0; j < info.size; ++j) {
                    var name = info.name.replace("[0]", "[" + j + "]");
                    insertActiveInfo(uniforms, new ActiveInfo(
                      name,
                      stringStore.id(name),
                      gl.getUniformLocation(program, name),
                      info
                    ));
                  }
                }
                var uniName = info.name;
                if (info.size > 1) {
                  uniName = uniName.replace("[0]", "");
                }
                insertActiveInfo(uniforms, new ActiveInfo(
                  uniName,
                  stringStore.id(uniName),
                  gl.getUniformLocation(program, uniName),
                  info
                ));
              }
            }
            var numAttributes = gl.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES);
            if (config2.profile) {
              desc.stats.attributesCount = numAttributes;
            }
            var attributes = desc.attributes;
            for (i = 0; i < numAttributes; ++i) {
              info = gl.getActiveAttrib(program, i);
              if (info) {
                insertActiveInfo(attributes, new ActiveInfo(
                  info.name,
                  stringStore.id(info.name),
                  gl.getAttribLocation(program, info.name),
                  info
                ));
              }
            }
          }
          if (config2.profile) {
            stats2.getMaxUniformsCount = function() {
              var m = 0;
              programList.forEach(function(desc) {
                if (desc.stats.uniformsCount > m) {
                  m = desc.stats.uniformsCount;
                }
              });
              return m;
            };
            stats2.getMaxAttributesCount = function() {
              var m = 0;
              programList.forEach(function(desc) {
                if (desc.stats.attributesCount > m) {
                  m = desc.stats.attributesCount;
                }
              });
              return m;
            };
          }
          function restoreShaders() {
            fragShaders = {};
            vertShaders = {};
            for (var i = 0; i < programList.length; ++i) {
              linkProgram(programList[i], null, programList[i].attributes.map(function(info) {
                return [info.location, info.name];
              }));
            }
          }
          return {
            clear: function() {
              var deleteShader = gl.deleteShader.bind(gl);
              values(fragShaders).forEach(deleteShader);
              fragShaders = {};
              values(vertShaders).forEach(deleteShader);
              vertShaders = {};
              programList.forEach(function(desc) {
                gl.deleteProgram(desc.program);
              });
              programList.length = 0;
              programCache = {};
              stats2.shaderCount = 0;
            },
            program: function(vertId, fragId, command, attribLocations) {
              check$1.command(vertId >= 0, "missing vertex shader", command);
              check$1.command(fragId >= 0, "missing fragment shader", command);
              var cache = programCache[fragId];
              if (!cache) {
                cache = programCache[fragId] = {};
              }
              var prevProgram = cache[vertId];
              if (prevProgram) {
                prevProgram.refCount++;
                if (!attribLocations) {
                  return prevProgram;
                }
              }
              var program = new REGLProgram(fragId, vertId);
              stats2.shaderCount++;
              linkProgram(program, command, attribLocations);
              if (!prevProgram) {
                cache[vertId] = program;
              }
              programList.push(program);
              return extend2(program, {
                destroy: function() {
                  program.refCount--;
                  if (program.refCount <= 0) {
                    gl.deleteProgram(program.program);
                    var idx = programList.indexOf(program);
                    programList.splice(idx, 1);
                    stats2.shaderCount--;
                  }
                  if (cache[program.vertId].refCount <= 0) {
                    gl.deleteShader(vertShaders[program.vertId]);
                    delete vertShaders[program.vertId];
                    delete programCache[program.fragId][program.vertId];
                  }
                  if (!Object.keys(programCache[program.fragId]).length) {
                    gl.deleteShader(fragShaders[program.fragId]);
                    delete fragShaders[program.fragId];
                    delete programCache[program.fragId];
                  }
                }
              });
            },
            restore: restoreShaders,
            shader: getShader,
            frag: -1,
            vert: -1
          };
        }
        var GL_RGBA$3 = 6408;
        var GL_UNSIGNED_BYTE$7 = 5121;
        var GL_PACK_ALIGNMENT = 3333;
        var GL_FLOAT$7 = 5126;
        function wrapReadPixels(gl, framebufferState, reglPoll, context, glAttributes, extensions, limits) {
          function readPixelsImpl(input) {
            var type;
            if (framebufferState.next === null) {
              check$1(
                glAttributes.preserveDrawingBuffer,
                'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'
              );
              type = GL_UNSIGNED_BYTE$7;
            } else {
              check$1(
                framebufferState.next.colorAttachments[0].texture !== null,
                "You cannot read from a renderbuffer"
              );
              type = framebufferState.next.colorAttachments[0].texture._texture.type;
              check$1.optional(function() {
                if (extensions.oes_texture_float) {
                  check$1(
                    type === GL_UNSIGNED_BYTE$7 || type === GL_FLOAT$7,
                    "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"
                  );
                  if (type === GL_FLOAT$7) {
                    check$1(limits.readFloat, "Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float");
                  }
                } else {
                  check$1(
                    type === GL_UNSIGNED_BYTE$7,
                    "Reading from a framebuffer is only allowed for the type 'uint8'"
                  );
                }
              });
            }
            var x = 0;
            var y = 0;
            var width = context.framebufferWidth;
            var height = context.framebufferHeight;
            var data = null;
            if (isTypedArray(input)) {
              data = input;
            } else if (input) {
              check$1.type(input, "object", "invalid arguments to regl.read()");
              x = input.x | 0;
              y = input.y | 0;
              check$1(
                x >= 0 && x < context.framebufferWidth,
                "invalid x offset for regl.read"
              );
              check$1(
                y >= 0 && y < context.framebufferHeight,
                "invalid y offset for regl.read"
              );
              width = (input.width || context.framebufferWidth - x) | 0;
              height = (input.height || context.framebufferHeight - y) | 0;
              data = input.data || null;
            }
            if (data) {
              if (type === GL_UNSIGNED_BYTE$7) {
                check$1(
                  data instanceof Uint8Array,
                  "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"
                );
              } else if (type === GL_FLOAT$7) {
                check$1(
                  data instanceof Float32Array,
                  "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'"
                );
              }
            }
            check$1(
              width > 0 && width + x <= context.framebufferWidth,
              "invalid width for read pixels"
            );
            check$1(
              height > 0 && height + y <= context.framebufferHeight,
              "invalid height for read pixels"
            );
            reglPoll();
            var size = width * height * 4;
            if (!data) {
              if (type === GL_UNSIGNED_BYTE$7) {
                data = new Uint8Array(size);
              } else if (type === GL_FLOAT$7) {
                data = data || new Float32Array(size);
              }
            }
            check$1.isTypedArray(data, "data buffer for regl.read() must be a typedarray");
            check$1(data.byteLength >= size, "data buffer for regl.read() too small");
            gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
            gl.readPixels(
              x,
              y,
              width,
              height,
              GL_RGBA$3,
              type,
              data
            );
            return data;
          }
          function readPixelsFBO(options) {
            var result;
            framebufferState.setFBO({
              framebuffer: options.framebuffer
            }, function() {
              result = readPixelsImpl(options);
            });
            return result;
          }
          function readPixels2(options) {
            if (!options || !("framebuffer" in options)) {
              return readPixelsImpl(options);
            } else {
              return readPixelsFBO(options);
            }
          }
          return readPixels2;
        }
        function slice(x) {
          return Array.prototype.slice.call(x);
        }
        function join(x) {
          return slice(x).join("");
        }
        function createEnvironment() {
          var varCounter = 0;
          var linkedNames = [];
          var linkedValues = [];
          function link(value) {
            for (var i = 0; i < linkedValues.length; ++i) {
              if (linkedValues[i] === value) {
                return linkedNames[i];
              }
            }
            var name = "g" + varCounter++;
            linkedNames.push(name);
            linkedValues.push(value);
            return name;
          }
          function block() {
            var code = [];
            function push() {
              code.push.apply(code, slice(arguments));
            }
            var vars = [];
            function def() {
              var name = "v" + varCounter++;
              vars.push(name);
              if (arguments.length > 0) {
                code.push(name, "=");
                code.push.apply(code, slice(arguments));
                code.push(";");
              }
              return name;
            }
            return extend2(push, {
              def,
              toString: function() {
                return join([
                  vars.length > 0 ? "var " + vars.join(",") + ";" : "",
                  join(code)
                ]);
              }
            });
          }
          function scope() {
            var entry = block();
            var exit = block();
            var entryToString = entry.toString;
            var exitToString = exit.toString;
            function save(object, prop) {
              exit(object, prop, "=", entry.def(object, prop), ";");
            }
            return extend2(function() {
              entry.apply(entry, slice(arguments));
            }, {
              def: entry.def,
              entry,
              exit,
              save,
              set: function(object, prop, value) {
                save(object, prop);
                entry(object, prop, "=", value, ";");
              },
              toString: function() {
                return entryToString() + exitToString();
              }
            });
          }
          function conditional() {
            var pred = join(arguments);
            var thenBlock = scope();
            var elseBlock = scope();
            var thenToString = thenBlock.toString;
            var elseToString = elseBlock.toString;
            return extend2(thenBlock, {
              then: function() {
                thenBlock.apply(thenBlock, slice(arguments));
                return this;
              },
              else: function() {
                elseBlock.apply(elseBlock, slice(arguments));
                return this;
              },
              toString: function() {
                var elseClause = elseToString();
                if (elseClause) {
                  elseClause = "else{" + elseClause + "}";
                }
                return join([
                  "if(",
                  pred,
                  "){",
                  thenToString(),
                  "}",
                  elseClause
                ]);
              }
            });
          }
          var globalBlock = block();
          var procedures = {};
          function proc(name, count) {
            var args = [];
            function arg() {
              var name2 = "a" + args.length;
              args.push(name2);
              return name2;
            }
            count = count || 0;
            for (var i = 0; i < count; ++i) {
              arg();
            }
            var body = scope();
            var bodyToString = body.toString;
            var result = procedures[name] = extend2(body, {
              arg,
              toString: function() {
                return join([
                  "function(",
                  args.join(),
                  "){",
                  bodyToString(),
                  "}"
                ]);
              }
            });
            return result;
          }
          function compile() {
            var code = [
              '"use strict";',
              globalBlock,
              "return {"
            ];
            Object.keys(procedures).forEach(function(name) {
              code.push('"', name, '":', procedures[name].toString(), ",");
            });
            code.push("}");
            var src = join(code).replace(/;/g, ";\n").replace(/}/g, "}\n").replace(/{/g, "{\n");
            var proc2 = Function.apply(null, linkedNames.concat(src));
            return proc2.apply(null, linkedValues);
          }
          return {
            global: globalBlock,
            link,
            block,
            proc,
            scope,
            cond: conditional,
            compile
          };
        }
        var CUTE_COMPONENTS = "xyzw".split("");
        var GL_UNSIGNED_BYTE$8 = 5121;
        var ATTRIB_STATE_POINTER = 1;
        var ATTRIB_STATE_CONSTANT = 2;
        var DYN_FUNC$1 = 0;
        var DYN_PROP$1 = 1;
        var DYN_CONTEXT$1 = 2;
        var DYN_STATE$1 = 3;
        var DYN_THUNK = 4;
        var DYN_CONSTANT$1 = 5;
        var DYN_ARRAY$1 = 6;
        var S_DITHER = "dither";
        var S_BLEND_ENABLE = "blend.enable";
        var S_BLEND_COLOR = "blend.color";
        var S_BLEND_EQUATION = "blend.equation";
        var S_BLEND_FUNC = "blend.func";
        var S_DEPTH_ENABLE = "depth.enable";
        var S_DEPTH_FUNC = "depth.func";
        var S_DEPTH_RANGE = "depth.range";
        var S_DEPTH_MASK = "depth.mask";
        var S_COLOR_MASK = "colorMask";
        var S_CULL_ENABLE = "cull.enable";
        var S_CULL_FACE = "cull.face";
        var S_FRONT_FACE = "frontFace";
        var S_LINE_WIDTH = "lineWidth";
        var S_POLYGON_OFFSET_ENABLE = "polygonOffset.enable";
        var S_POLYGON_OFFSET_OFFSET = "polygonOffset.offset";
        var S_SAMPLE_ALPHA = "sample.alpha";
        var S_SAMPLE_ENABLE = "sample.enable";
        var S_SAMPLE_COVERAGE = "sample.coverage";
        var S_STENCIL_ENABLE = "stencil.enable";
        var S_STENCIL_MASK = "stencil.mask";
        var S_STENCIL_FUNC = "stencil.func";
        var S_STENCIL_OPFRONT = "stencil.opFront";
        var S_STENCIL_OPBACK = "stencil.opBack";
        var S_SCISSOR_ENABLE = "scissor.enable";
        var S_SCISSOR_BOX = "scissor.box";
        var S_VIEWPORT = "viewport";
        var S_PROFILE = "profile";
        var S_FRAMEBUFFER = "framebuffer";
        var S_VERT = "vert";
        var S_FRAG = "frag";
        var S_ELEMENTS = "elements";
        var S_PRIMITIVE = "primitive";
        var S_COUNT = "count";
        var S_OFFSET = "offset";
        var S_INSTANCES = "instances";
        var S_VAO = "vao";
        var SUFFIX_WIDTH = "Width";
        var SUFFIX_HEIGHT = "Height";
        var S_FRAMEBUFFER_WIDTH = S_FRAMEBUFFER + SUFFIX_WIDTH;
        var S_FRAMEBUFFER_HEIGHT = S_FRAMEBUFFER + SUFFIX_HEIGHT;
        var S_VIEWPORT_WIDTH = S_VIEWPORT + SUFFIX_WIDTH;
        var S_VIEWPORT_HEIGHT = S_VIEWPORT + SUFFIX_HEIGHT;
        var S_DRAWINGBUFFER = "drawingBuffer";
        var S_DRAWINGBUFFER_WIDTH = S_DRAWINGBUFFER + SUFFIX_WIDTH;
        var S_DRAWINGBUFFER_HEIGHT = S_DRAWINGBUFFER + SUFFIX_HEIGHT;
        var NESTED_OPTIONS = [
          S_BLEND_FUNC,
          S_BLEND_EQUATION,
          S_STENCIL_FUNC,
          S_STENCIL_OPFRONT,
          S_STENCIL_OPBACK,
          S_SAMPLE_COVERAGE,
          S_VIEWPORT,
          S_SCISSOR_BOX,
          S_POLYGON_OFFSET_OFFSET
        ];
        var GL_ARRAY_BUFFER$2 = 34962;
        var GL_ELEMENT_ARRAY_BUFFER$2 = 34963;
        var GL_FRAGMENT_SHADER$1 = 35632;
        var GL_VERTEX_SHADER$1 = 35633;
        var GL_TEXTURE_2D$3 = 3553;
        var GL_TEXTURE_CUBE_MAP$2 = 34067;
        var GL_CULL_FACE = 2884;
        var GL_BLEND = 3042;
        var GL_DITHER = 3024;
        var GL_STENCIL_TEST = 2960;
        var GL_DEPTH_TEST = 2929;
        var GL_SCISSOR_TEST = 3089;
        var GL_POLYGON_OFFSET_FILL = 32823;
        var GL_SAMPLE_ALPHA_TO_COVERAGE = 32926;
        var GL_SAMPLE_COVERAGE = 32928;
        var GL_FLOAT$8 = 5126;
        var GL_FLOAT_VEC2 = 35664;
        var GL_FLOAT_VEC3 = 35665;
        var GL_FLOAT_VEC4 = 35666;
        var GL_INT$3 = 5124;
        var GL_INT_VEC2 = 35667;
        var GL_INT_VEC3 = 35668;
        var GL_INT_VEC4 = 35669;
        var GL_BOOL = 35670;
        var GL_BOOL_VEC2 = 35671;
        var GL_BOOL_VEC3 = 35672;
        var GL_BOOL_VEC4 = 35673;
        var GL_FLOAT_MAT2 = 35674;
        var GL_FLOAT_MAT3 = 35675;
        var GL_FLOAT_MAT4 = 35676;
        var GL_SAMPLER_2D = 35678;
        var GL_SAMPLER_CUBE = 35680;
        var GL_TRIANGLES$1 = 4;
        var GL_FRONT = 1028;
        var GL_BACK = 1029;
        var GL_CW = 2304;
        var GL_CCW = 2305;
        var GL_MIN_EXT = 32775;
        var GL_MAX_EXT = 32776;
        var GL_ALWAYS = 519;
        var GL_KEEP = 7680;
        var GL_ZERO = 0;
        var GL_ONE = 1;
        var GL_FUNC_ADD = 32774;
        var GL_LESS = 513;
        var GL_FRAMEBUFFER$2 = 36160;
        var GL_COLOR_ATTACHMENT0$2 = 36064;
        var blendFuncs = {
          "0": 0,
          "1": 1,
          "zero": 0,
          "one": 1,
          "src color": 768,
          "one minus src color": 769,
          "src alpha": 770,
          "one minus src alpha": 771,
          "dst color": 774,
          "one minus dst color": 775,
          "dst alpha": 772,
          "one minus dst alpha": 773,
          "constant color": 32769,
          "one minus constant color": 32770,
          "constant alpha": 32771,
          "one minus constant alpha": 32772,
          "src alpha saturate": 776
        };
        var invalidBlendCombinations = [
          "constant color, constant alpha",
          "one minus constant color, constant alpha",
          "constant color, one minus constant alpha",
          "one minus constant color, one minus constant alpha",
          "constant alpha, constant color",
          "constant alpha, one minus constant color",
          "one minus constant alpha, constant color",
          "one minus constant alpha, one minus constant color"
        ];
        var compareFuncs = {
          "never": 512,
          "less": 513,
          "<": 513,
          "equal": 514,
          "=": 514,
          "==": 514,
          "===": 514,
          "lequal": 515,
          "<=": 515,
          "greater": 516,
          ">": 516,
          "notequal": 517,
          "!=": 517,
          "!==": 517,
          "gequal": 518,
          ">=": 518,
          "always": 519
        };
        var stencilOps = {
          "0": 0,
          "zero": 0,
          "keep": 7680,
          "replace": 7681,
          "increment": 7682,
          "decrement": 7683,
          "increment wrap": 34055,
          "decrement wrap": 34056,
          "invert": 5386
        };
        var shaderType = {
          "frag": GL_FRAGMENT_SHADER$1,
          "vert": GL_VERTEX_SHADER$1
        };
        var orientationType = {
          "cw": GL_CW,
          "ccw": GL_CCW
        };
        function isBufferArgs(x) {
          return Array.isArray(x) || isTypedArray(x) || isNDArrayLike(x);
        }
        function sortState(state) {
          return state.sort(function(a, b) {
            if (a === S_VIEWPORT) {
              return -1;
            } else if (b === S_VIEWPORT) {
              return 1;
            }
            return a < b ? -1 : 1;
          });
        }
        function Declaration(thisDep, contextDep, propDep, append) {
          this.thisDep = thisDep;
          this.contextDep = contextDep;
          this.propDep = propDep;
          this.append = append;
        }
        function isStatic(decl) {
          return decl && !(decl.thisDep || decl.contextDep || decl.propDep);
        }
        function createStaticDecl(append) {
          return new Declaration(false, false, false, append);
        }
        function createDynamicDecl(dyn, append) {
          var type = dyn.type;
          if (type === DYN_FUNC$1) {
            var numArgs = dyn.data.length;
            return new Declaration(
              true,
              numArgs >= 1,
              numArgs >= 2,
              append
            );
          } else if (type === DYN_THUNK) {
            var data = dyn.data;
            return new Declaration(
              data.thisDep,
              data.contextDep,
              data.propDep,
              append
            );
          } else if (type === DYN_CONSTANT$1) {
            return new Declaration(
              false,
              false,
              false,
              append
            );
          } else if (type === DYN_ARRAY$1) {
            var thisDep = false;
            var contextDep = false;
            var propDep = false;
            for (var i = 0; i < dyn.data.length; ++i) {
              var subDyn = dyn.data[i];
              if (subDyn.type === DYN_PROP$1) {
                propDep = true;
              } else if (subDyn.type === DYN_CONTEXT$1) {
                contextDep = true;
              } else if (subDyn.type === DYN_STATE$1) {
                thisDep = true;
              } else if (subDyn.type === DYN_FUNC$1) {
                thisDep = true;
                var subArgs = subDyn.data;
                if (subArgs >= 1) {
                  contextDep = true;
                }
                if (subArgs >= 2) {
                  propDep = true;
                }
              } else if (subDyn.type === DYN_THUNK) {
                thisDep = thisDep || subDyn.data.thisDep;
                contextDep = contextDep || subDyn.data.contextDep;
                propDep = propDep || subDyn.data.propDep;
              }
            }
            return new Declaration(
              thisDep,
              contextDep,
              propDep,
              append
            );
          } else {
            return new Declaration(
              type === DYN_STATE$1,
              type === DYN_CONTEXT$1,
              type === DYN_PROP$1,
              append
            );
          }
        }
        var SCOPE_DECL = new Declaration(false, false, false, function() {
        });
        function reglCore(gl, stringStore, extensions, limits, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer2, config2) {
          var AttributeRecord2 = attributeState.Record;
          var blendEquations = {
            "add": 32774,
            "subtract": 32778,
            "reverse subtract": 32779
          };
          if (extensions.ext_blend_minmax) {
            blendEquations.min = GL_MIN_EXT;
            blendEquations.max = GL_MAX_EXT;
          }
          var extInstancing = extensions.angle_instanced_arrays;
          var extDrawBuffers = extensions.webgl_draw_buffers;
          var extVertexArrays = extensions.oes_vertex_array_object;
          var currentState = {
            dirty: true,
            profile: config2.profile
          };
          var nextState = {};
          var GL_STATE_NAMES = [];
          var GL_FLAGS = {};
          var GL_VARIABLES = {};
          function propName(name) {
            return name.replace(".", "_");
          }
          function stateFlag(sname, cap, init2) {
            var name = propName(sname);
            GL_STATE_NAMES.push(sname);
            nextState[name] = currentState[name] = !!init2;
            GL_FLAGS[name] = cap;
          }
          function stateVariable(sname, func, init2) {
            var name = propName(sname);
            GL_STATE_NAMES.push(sname);
            if (Array.isArray(init2)) {
              currentState[name] = init2.slice();
              nextState[name] = init2.slice();
            } else {
              currentState[name] = nextState[name] = init2;
            }
            GL_VARIABLES[name] = func;
          }
          stateFlag(S_DITHER, GL_DITHER);
          stateFlag(S_BLEND_ENABLE, GL_BLEND);
          stateVariable(S_BLEND_COLOR, "blendColor", [0, 0, 0, 0]);
          stateVariable(
            S_BLEND_EQUATION,
            "blendEquationSeparate",
            [GL_FUNC_ADD, GL_FUNC_ADD]
          );
          stateVariable(
            S_BLEND_FUNC,
            "blendFuncSeparate",
            [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]
          );
          stateFlag(S_DEPTH_ENABLE, GL_DEPTH_TEST, true);
          stateVariable(S_DEPTH_FUNC, "depthFunc", GL_LESS);
          stateVariable(S_DEPTH_RANGE, "depthRange", [0, 1]);
          stateVariable(S_DEPTH_MASK, "depthMask", true);
          stateVariable(S_COLOR_MASK, S_COLOR_MASK, [true, true, true, true]);
          stateFlag(S_CULL_ENABLE, GL_CULL_FACE);
          stateVariable(S_CULL_FACE, "cullFace", GL_BACK);
          stateVariable(S_FRONT_FACE, S_FRONT_FACE, GL_CCW);
          stateVariable(S_LINE_WIDTH, S_LINE_WIDTH, 1);
          stateFlag(S_POLYGON_OFFSET_ENABLE, GL_POLYGON_OFFSET_FILL);
          stateVariable(S_POLYGON_OFFSET_OFFSET, "polygonOffset", [0, 0]);
          stateFlag(S_SAMPLE_ALPHA, GL_SAMPLE_ALPHA_TO_COVERAGE);
          stateFlag(S_SAMPLE_ENABLE, GL_SAMPLE_COVERAGE);
          stateVariable(S_SAMPLE_COVERAGE, "sampleCoverage", [1, false]);
          stateFlag(S_STENCIL_ENABLE, GL_STENCIL_TEST);
          stateVariable(S_STENCIL_MASK, "stencilMask", -1);
          stateVariable(S_STENCIL_FUNC, "stencilFunc", [GL_ALWAYS, 0, -1]);
          stateVariable(
            S_STENCIL_OPFRONT,
            "stencilOpSeparate",
            [GL_FRONT, GL_KEEP, GL_KEEP, GL_KEEP]
          );
          stateVariable(
            S_STENCIL_OPBACK,
            "stencilOpSeparate",
            [GL_BACK, GL_KEEP, GL_KEEP, GL_KEEP]
          );
          stateFlag(S_SCISSOR_ENABLE, GL_SCISSOR_TEST);
          stateVariable(
            S_SCISSOR_BOX,
            "scissor",
            [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]
          );
          stateVariable(
            S_VIEWPORT,
            S_VIEWPORT,
            [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]
          );
          var sharedState = {
            gl,
            context: contextState,
            strings: stringStore,
            next: nextState,
            current: currentState,
            draw: drawState,
            elements: elementState,
            buffer: bufferState,
            shader: shaderState,
            attributes: attributeState.state,
            vao: attributeState,
            uniforms: uniformState,
            framebuffer: framebufferState,
            extensions,
            timer: timer2,
            isBufferArgs
          };
          var sharedConstants = {
            primTypes,
            compareFuncs,
            blendFuncs,
            blendEquations,
            stencilOps,
            glTypes,
            orientationType
          };
          check$1.optional(function() {
            sharedState.isArrayLike = isArrayLike;
          });
          if (extDrawBuffers) {
            sharedConstants.backBuffer = [GL_BACK];
            sharedConstants.drawBuffer = loop(limits.maxDrawbuffers, function(i) {
              if (i === 0) {
                return [0];
              }
              return loop(i, function(j) {
                return GL_COLOR_ATTACHMENT0$2 + j;
              });
            });
          }
          var drawCallCounter = 0;
          function createREGLEnvironment() {
            var env = createEnvironment();
            var link = env.link;
            var global2 = env.global;
            env.id = drawCallCounter++;
            env.batchId = "0";
            var SHARED = link(sharedState);
            var shared = env.shared = {
              props: "a0"
            };
            Object.keys(sharedState).forEach(function(prop) {
              shared[prop] = global2.def(SHARED, ".", prop);
            });
            check$1.optional(function() {
              env.CHECK = link(check$1);
              env.commandStr = check$1.guessCommand();
              env.command = link(env.commandStr);
              env.assert = function(block, pred, message) {
                block(
                  "if(!(",
                  pred,
                  "))",
                  this.CHECK,
                  ".commandRaise(",
                  link(message),
                  ",",
                  this.command,
                  ");"
                );
              };
              sharedConstants.invalidBlendCombinations = invalidBlendCombinations;
            });
            var nextVars = env.next = {};
            var currentVars = env.current = {};
            Object.keys(GL_VARIABLES).forEach(function(variable) {
              if (Array.isArray(currentState[variable])) {
                nextVars[variable] = global2.def(shared.next, ".", variable);
                currentVars[variable] = global2.def(shared.current, ".", variable);
              }
            });
            var constants = env.constants = {};
            Object.keys(sharedConstants).forEach(function(name) {
              constants[name] = global2.def(JSON.stringify(sharedConstants[name]));
            });
            env.invoke = function(block, x) {
              switch (x.type) {
                case DYN_FUNC$1:
                  var argList = [
                    "this",
                    shared.context,
                    shared.props,
                    env.batchId
                  ];
                  return block.def(
                    link(x.data),
                    ".call(",
                    argList.slice(0, Math.max(x.data.length + 1, 4)),
                    ")"
                  );
                case DYN_PROP$1:
                  return block.def(shared.props, x.data);
                case DYN_CONTEXT$1:
                  return block.def(shared.context, x.data);
                case DYN_STATE$1:
                  return block.def("this", x.data);
                case DYN_THUNK:
                  x.data.append(env, block);
                  return x.data.ref;
                case DYN_CONSTANT$1:
                  return x.data.toString();
                case DYN_ARRAY$1:
                  return x.data.map(function(y) {
                    return env.invoke(block, y);
                  });
              }
            };
            env.attribCache = {};
            var scopeAttribs = {};
            env.scopeAttrib = function(name) {
              var id2 = stringStore.id(name);
              if (id2 in scopeAttribs) {
                return scopeAttribs[id2];
              }
              var binding = attributeState.scope[id2];
              if (!binding) {
                binding = attributeState.scope[id2] = new AttributeRecord2();
              }
              var result = scopeAttribs[id2] = link(binding);
              return result;
            };
            return env;
          }
          function parseProfile(options) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var profileEnable;
            if (S_PROFILE in staticOptions) {
              var value = !!staticOptions[S_PROFILE];
              profileEnable = createStaticDecl(function(env, scope) {
                return value;
              });
              profileEnable.enable = value;
            } else if (S_PROFILE in dynamicOptions) {
              var dyn = dynamicOptions[S_PROFILE];
              profileEnable = createDynamicDecl(dyn, function(env, scope) {
                return env.invoke(scope, dyn);
              });
            }
            return profileEnable;
          }
          function parseFramebuffer(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            if (S_FRAMEBUFFER in staticOptions) {
              var framebuffer = staticOptions[S_FRAMEBUFFER];
              if (framebuffer) {
                framebuffer = framebufferState.getFramebuffer(framebuffer);
                check$1.command(framebuffer, "invalid framebuffer object");
                return createStaticDecl(function(env2, block) {
                  var FRAMEBUFFER = env2.link(framebuffer);
                  var shared = env2.shared;
                  block.set(
                    shared.framebuffer,
                    ".next",
                    FRAMEBUFFER
                  );
                  var CONTEXT = shared.context;
                  block.set(
                    CONTEXT,
                    "." + S_FRAMEBUFFER_WIDTH,
                    FRAMEBUFFER + ".width"
                  );
                  block.set(
                    CONTEXT,
                    "." + S_FRAMEBUFFER_HEIGHT,
                    FRAMEBUFFER + ".height"
                  );
                  return FRAMEBUFFER;
                });
              } else {
                return createStaticDecl(function(env2, scope) {
                  var shared = env2.shared;
                  scope.set(
                    shared.framebuffer,
                    ".next",
                    "null"
                  );
                  var CONTEXT = shared.context;
                  scope.set(
                    CONTEXT,
                    "." + S_FRAMEBUFFER_WIDTH,
                    CONTEXT + "." + S_DRAWINGBUFFER_WIDTH
                  );
                  scope.set(
                    CONTEXT,
                    "." + S_FRAMEBUFFER_HEIGHT,
                    CONTEXT + "." + S_DRAWINGBUFFER_HEIGHT
                  );
                  return "null";
                });
              }
            } else if (S_FRAMEBUFFER in dynamicOptions) {
              var dyn = dynamicOptions[S_FRAMEBUFFER];
              return createDynamicDecl(dyn, function(env2, scope) {
                var FRAMEBUFFER_FUNC = env2.invoke(scope, dyn);
                var shared = env2.shared;
                var FRAMEBUFFER_STATE = shared.framebuffer;
                var FRAMEBUFFER = scope.def(
                  FRAMEBUFFER_STATE,
                  ".getFramebuffer(",
                  FRAMEBUFFER_FUNC,
                  ")"
                );
                check$1.optional(function() {
                  env2.assert(
                    scope,
                    "!" + FRAMEBUFFER_FUNC + "||" + FRAMEBUFFER,
                    "invalid framebuffer object"
                  );
                });
                scope.set(
                  FRAMEBUFFER_STATE,
                  ".next",
                  FRAMEBUFFER
                );
                var CONTEXT = shared.context;
                scope.set(
                  CONTEXT,
                  "." + S_FRAMEBUFFER_WIDTH,
                  FRAMEBUFFER + "?" + FRAMEBUFFER + ".width:" + CONTEXT + "." + S_DRAWINGBUFFER_WIDTH
                );
                scope.set(
                  CONTEXT,
                  "." + S_FRAMEBUFFER_HEIGHT,
                  FRAMEBUFFER + "?" + FRAMEBUFFER + ".height:" + CONTEXT + "." + S_DRAWINGBUFFER_HEIGHT
                );
                return FRAMEBUFFER;
              });
            } else {
              return null;
            }
          }
          function parseViewportScissor(options, framebuffer, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            function parseBox(param) {
              if (param in staticOptions) {
                var box = staticOptions[param];
                check$1.commandType(box, "object", "invalid " + param, env.commandStr);
                var isStatic2 = true;
                var x = box.x | 0;
                var y = box.y | 0;
                var w, h;
                if ("width" in box) {
                  w = box.width | 0;
                  check$1.command(w >= 0, "invalid " + param, env.commandStr);
                } else {
                  isStatic2 = false;
                }
                if ("height" in box) {
                  h = box.height | 0;
                  check$1.command(h >= 0, "invalid " + param, env.commandStr);
                } else {
                  isStatic2 = false;
                }
                return new Declaration(
                  !isStatic2 && framebuffer && framebuffer.thisDep,
                  !isStatic2 && framebuffer && framebuffer.contextDep,
                  !isStatic2 && framebuffer && framebuffer.propDep,
                  function(env2, scope) {
                    var CONTEXT = env2.shared.context;
                    var BOX_W = w;
                    if (!("width" in box)) {
                      BOX_W = scope.def(CONTEXT, ".", S_FRAMEBUFFER_WIDTH, "-", x);
                    }
                    var BOX_H = h;
                    if (!("height" in box)) {
                      BOX_H = scope.def(CONTEXT, ".", S_FRAMEBUFFER_HEIGHT, "-", y);
                    }
                    return [x, y, BOX_W, BOX_H];
                  }
                );
              } else if (param in dynamicOptions) {
                var dynBox = dynamicOptions[param];
                var result = createDynamicDecl(dynBox, function(env2, scope) {
                  var BOX = env2.invoke(scope, dynBox);
                  check$1.optional(function() {
                    env2.assert(
                      scope,
                      BOX + "&&typeof " + BOX + '==="object"',
                      "invalid " + param
                    );
                  });
                  var CONTEXT = env2.shared.context;
                  var BOX_X = scope.def(BOX, ".x|0");
                  var BOX_Y = scope.def(BOX, ".y|0");
                  var BOX_W = scope.def(
                    '"width" in ',
                    BOX,
                    "?",
                    BOX,
                    ".width|0:",
                    "(",
                    CONTEXT,
                    ".",
                    S_FRAMEBUFFER_WIDTH,
                    "-",
                    BOX_X,
                    ")"
                  );
                  var BOX_H = scope.def(
                    '"height" in ',
                    BOX,
                    "?",
                    BOX,
                    ".height|0:",
                    "(",
                    CONTEXT,
                    ".",
                    S_FRAMEBUFFER_HEIGHT,
                    "-",
                    BOX_Y,
                    ")"
                  );
                  check$1.optional(function() {
                    env2.assert(
                      scope,
                      BOX_W + ">=0&&" + BOX_H + ">=0",
                      "invalid " + param
                    );
                  });
                  return [BOX_X, BOX_Y, BOX_W, BOX_H];
                });
                if (framebuffer) {
                  result.thisDep = result.thisDep || framebuffer.thisDep;
                  result.contextDep = result.contextDep || framebuffer.contextDep;
                  result.propDep = result.propDep || framebuffer.propDep;
                }
                return result;
              } else if (framebuffer) {
                return new Declaration(
                  framebuffer.thisDep,
                  framebuffer.contextDep,
                  framebuffer.propDep,
                  function(env2, scope) {
                    var CONTEXT = env2.shared.context;
                    return [
                      0,
                      0,
                      scope.def(CONTEXT, ".", S_FRAMEBUFFER_WIDTH),
                      scope.def(CONTEXT, ".", S_FRAMEBUFFER_HEIGHT)
                    ];
                  }
                );
              } else {
                return null;
              }
            }
            var viewport = parseBox(S_VIEWPORT);
            if (viewport) {
              var prevViewport = viewport;
              viewport = new Declaration(
                viewport.thisDep,
                viewport.contextDep,
                viewport.propDep,
                function(env2, scope) {
                  var VIEWPORT = prevViewport.append(env2, scope);
                  var CONTEXT = env2.shared.context;
                  scope.set(
                    CONTEXT,
                    "." + S_VIEWPORT_WIDTH,
                    VIEWPORT[2]
                  );
                  scope.set(
                    CONTEXT,
                    "." + S_VIEWPORT_HEIGHT,
                    VIEWPORT[3]
                  );
                  return VIEWPORT;
                }
              );
            }
            return {
              viewport,
              scissor_box: parseBox(S_SCISSOR_BOX)
            };
          }
          function parseAttribLocations(options, attributes) {
            var staticOptions = options.static;
            var staticProgram = typeof staticOptions[S_FRAG] === "string" && typeof staticOptions[S_VERT] === "string";
            if (staticProgram) {
              if (Object.keys(attributes.dynamic).length > 0) {
                return null;
              }
              var staticAttributes = attributes.static;
              var sAttributes = Object.keys(staticAttributes);
              if (sAttributes.length > 0 && typeof staticAttributes[sAttributes[0]] === "number") {
                var bindings = [];
                for (var i = 0; i < sAttributes.length; ++i) {
                  check$1(typeof staticAttributes[sAttributes[i]] === "number", "must specify all vertex attribute locations when using vaos");
                  bindings.push([staticAttributes[sAttributes[i]] | 0, sAttributes[i]]);
                }
                return bindings;
              }
            }
            return null;
          }
          function parseProgram(options, env, attribLocations) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            function parseShader(name) {
              if (name in staticOptions) {
                var id2 = stringStore.id(staticOptions[name]);
                check$1.optional(function() {
                  shaderState.shader(shaderType[name], id2, check$1.guessCommand());
                });
                var result = createStaticDecl(function() {
                  return id2;
                });
                result.id = id2;
                return result;
              } else if (name in dynamicOptions) {
                var dyn = dynamicOptions[name];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var str2 = env2.invoke(scope, dyn);
                  var id3 = scope.def(env2.shared.strings, ".id(", str2, ")");
                  check$1.optional(function() {
                    scope(
                      env2.shared.shader,
                      ".shader(",
                      shaderType[name],
                      ",",
                      id3,
                      ",",
                      env2.command,
                      ");"
                    );
                  });
                  return id3;
                });
              }
              return null;
            }
            var frag = parseShader(S_FRAG);
            var vert = parseShader(S_VERT);
            var program = null;
            var progVar;
            if (isStatic(frag) && isStatic(vert)) {
              program = shaderState.program(vert.id, frag.id, null, attribLocations);
              progVar = createStaticDecl(function(env2, scope) {
                return env2.link(program);
              });
            } else {
              progVar = new Declaration(
                frag && frag.thisDep || vert && vert.thisDep,
                frag && frag.contextDep || vert && vert.contextDep,
                frag && frag.propDep || vert && vert.propDep,
                function(env2, scope) {
                  var SHADER_STATE = env2.shared.shader;
                  var fragId;
                  if (frag) {
                    fragId = frag.append(env2, scope);
                  } else {
                    fragId = scope.def(SHADER_STATE, ".", S_FRAG);
                  }
                  var vertId;
                  if (vert) {
                    vertId = vert.append(env2, scope);
                  } else {
                    vertId = scope.def(SHADER_STATE, ".", S_VERT);
                  }
                  var progDef = SHADER_STATE + ".program(" + vertId + "," + fragId;
                  check$1.optional(function() {
                    progDef += "," + env2.command;
                  });
                  return scope.def(progDef + ")");
                }
              );
            }
            return {
              frag,
              vert,
              progVar,
              program
            };
          }
          function parseDraw(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var staticDraw = {};
            var vaoActive = false;
            function parseVAO() {
              if (S_VAO in staticOptions) {
                var vao2 = staticOptions[S_VAO];
                if (vao2 !== null && attributeState.getVAO(vao2) === null) {
                  vao2 = attributeState.createVAO(vao2);
                }
                vaoActive = true;
                staticDraw.vao = vao2;
                return createStaticDecl(function(env2) {
                  var vaoRef = attributeState.getVAO(vao2);
                  if (vaoRef) {
                    return env2.link(vaoRef);
                  } else {
                    return "null";
                  }
                });
              } else if (S_VAO in dynamicOptions) {
                vaoActive = true;
                var dyn = dynamicOptions[S_VAO];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var vaoRef = env2.invoke(scope, dyn);
                  return scope.def(env2.shared.vao + ".getVAO(" + vaoRef + ")");
                });
              }
              return null;
            }
            var vao = parseVAO();
            var elementsActive = false;
            function parseElements() {
              if (S_ELEMENTS in staticOptions) {
                var elements2 = staticOptions[S_ELEMENTS];
                staticDraw.elements = elements2;
                if (isBufferArgs(elements2)) {
                  var e = staticDraw.elements = elementState.create(elements2, true);
                  elements2 = elementState.getElements(e);
                  elementsActive = true;
                } else if (elements2) {
                  elements2 = elementState.getElements(elements2);
                  elementsActive = true;
                  check$1.command(elements2, "invalid elements", env.commandStr);
                }
                var result = createStaticDecl(function(env2, scope) {
                  if (elements2) {
                    var result2 = env2.link(elements2);
                    env2.ELEMENTS = result2;
                    return result2;
                  }
                  env2.ELEMENTS = null;
                  return null;
                });
                result.value = elements2;
                return result;
              } else if (S_ELEMENTS in dynamicOptions) {
                elementsActive = true;
                var dyn = dynamicOptions[S_ELEMENTS];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var shared = env2.shared;
                  var IS_BUFFER_ARGS = shared.isBufferArgs;
                  var ELEMENT_STATE = shared.elements;
                  var elementDefn = env2.invoke(scope, dyn);
                  var elements3 = scope.def("null");
                  var elementStream = scope.def(IS_BUFFER_ARGS, "(", elementDefn, ")");
                  var ifte = env2.cond(elementStream).then(elements3, "=", ELEMENT_STATE, ".createStream(", elementDefn, ");").else(elements3, "=", ELEMENT_STATE, ".getElements(", elementDefn, ");");
                  check$1.optional(function() {
                    env2.assert(
                      ifte.else,
                      "!" + elementDefn + "||" + elements3,
                      "invalid elements"
                    );
                  });
                  scope.entry(ifte);
                  scope.exit(
                    env2.cond(elementStream).then(ELEMENT_STATE, ".destroyStream(", elements3, ");")
                  );
                  env2.ELEMENTS = elements3;
                  return elements3;
                });
              } else if (vaoActive) {
                return new Declaration(
                  vao.thisDep,
                  vao.contextDep,
                  vao.propDep,
                  function(env2, scope) {
                    return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.elements + ".getElements(" + env2.shared.vao + ".currentVAO.elements):null");
                  }
                );
              }
              return null;
            }
            var elements = parseElements();
            function parsePrimitive() {
              if (S_PRIMITIVE in staticOptions) {
                var primitive2 = staticOptions[S_PRIMITIVE];
                staticDraw.primitive = primitive2;
                check$1.commandParameter(primitive2, primTypes, "invalid primitve", env.commandStr);
                return createStaticDecl(function(env2, scope) {
                  return primTypes[primitive2];
                });
              } else if (S_PRIMITIVE in dynamicOptions) {
                var dynPrimitive = dynamicOptions[S_PRIMITIVE];
                return createDynamicDecl(dynPrimitive, function(env2, scope) {
                  var PRIM_TYPES = env2.constants.primTypes;
                  var prim = env2.invoke(scope, dynPrimitive);
                  check$1.optional(function() {
                    env2.assert(
                      scope,
                      prim + " in " + PRIM_TYPES,
                      "invalid primitive, must be one of " + Object.keys(primTypes)
                    );
                  });
                  return scope.def(PRIM_TYPES, "[", prim, "]");
                });
              } else if (elementsActive) {
                if (isStatic(elements)) {
                  if (elements.value) {
                    return createStaticDecl(function(env2, scope) {
                      return scope.def(env2.ELEMENTS, ".primType");
                    });
                  } else {
                    return createStaticDecl(function() {
                      return GL_TRIANGLES$1;
                    });
                  }
                } else {
                  return new Declaration(
                    elements.thisDep,
                    elements.contextDep,
                    elements.propDep,
                    function(env2, scope) {
                      var elements2 = env2.ELEMENTS;
                      return scope.def(elements2, "?", elements2, ".primType:", GL_TRIANGLES$1);
                    }
                  );
                }
              } else if (vaoActive) {
                return new Declaration(
                  vao.thisDep,
                  vao.contextDep,
                  vao.propDep,
                  function(env2, scope) {
                    return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.primitive:" + GL_TRIANGLES$1);
                  }
                );
              }
              return null;
            }
            function parseParam(param, isOffset) {
              if (param in staticOptions) {
                var value = staticOptions[param] | 0;
                if (isOffset) {
                  staticDraw.offset = value;
                } else {
                  staticDraw.instances = value;
                }
                check$1.command(!isOffset || value >= 0, "invalid " + param, env.commandStr);
                return createStaticDecl(function(env2, scope) {
                  if (isOffset) {
                    env2.OFFSET = value;
                  }
                  return value;
                });
              } else if (param in dynamicOptions) {
                var dynValue = dynamicOptions[param];
                return createDynamicDecl(dynValue, function(env2, scope) {
                  var result = env2.invoke(scope, dynValue);
                  if (isOffset) {
                    env2.OFFSET = result;
                    check$1.optional(function() {
                      env2.assert(
                        scope,
                        result + ">=0",
                        "invalid " + param
                      );
                    });
                  }
                  return result;
                });
              } else if (isOffset) {
                if (elementsActive) {
                  return createStaticDecl(function(env2, scope) {
                    env2.OFFSET = 0;
                    return 0;
                  });
                } else if (vaoActive) {
                  return new Declaration(
                    vao.thisDep,
                    vao.contextDep,
                    vao.propDep,
                    function(env2, scope) {
                      return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.offset:0");
                    }
                  );
                }
              } else if (vaoActive) {
                return new Declaration(
                  vao.thisDep,
                  vao.contextDep,
                  vao.propDep,
                  function(env2, scope) {
                    return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.instances:-1");
                  }
                );
              }
              return null;
            }
            var OFFSET = parseParam(S_OFFSET, true);
            function parseVertCount() {
              if (S_COUNT in staticOptions) {
                var count2 = staticOptions[S_COUNT] | 0;
                staticDraw.count = count2;
                check$1.command(
                  typeof count2 === "number" && count2 >= 0,
                  "invalid vertex count",
                  env.commandStr
                );
                return createStaticDecl(function() {
                  return count2;
                });
              } else if (S_COUNT in dynamicOptions) {
                var dynCount = dynamicOptions[S_COUNT];
                return createDynamicDecl(dynCount, function(env2, scope) {
                  var result2 = env2.invoke(scope, dynCount);
                  check$1.optional(function() {
                    env2.assert(
                      scope,
                      "typeof " + result2 + '==="number"&&' + result2 + ">=0&&" + result2 + "===(" + result2 + "|0)",
                      "invalid vertex count"
                    );
                  });
                  return result2;
                });
              } else if (elementsActive) {
                if (isStatic(elements)) {
                  if (elements) {
                    if (OFFSET) {
                      return new Declaration(
                        OFFSET.thisDep,
                        OFFSET.contextDep,
                        OFFSET.propDep,
                        function(env2, scope) {
                          var result2 = scope.def(
                            env2.ELEMENTS,
                            ".vertCount-",
                            env2.OFFSET
                          );
                          check$1.optional(function() {
                            env2.assert(
                              scope,
                              result2 + ">=0",
                              "invalid vertex offset/element buffer too small"
                            );
                          });
                          return result2;
                        }
                      );
                    } else {
                      return createStaticDecl(function(env2, scope) {
                        return scope.def(env2.ELEMENTS, ".vertCount");
                      });
                    }
                  } else {
                    var result = createStaticDecl(function() {
                      return -1;
                    });
                    check$1.optional(function() {
                      result.MISSING = true;
                    });
                    return result;
                  }
                } else {
                  var variable = new Declaration(
                    elements.thisDep || OFFSET.thisDep,
                    elements.contextDep || OFFSET.contextDep,
                    elements.propDep || OFFSET.propDep,
                    function(env2, scope) {
                      var elements2 = env2.ELEMENTS;
                      if (env2.OFFSET) {
                        return scope.def(
                          elements2,
                          "?",
                          elements2,
                          ".vertCount-",
                          env2.OFFSET,
                          ":-1"
                        );
                      }
                      return scope.def(elements2, "?", elements2, ".vertCount:-1");
                    }
                  );
                  check$1.optional(function() {
                    variable.DYNAMIC = true;
                  });
                  return variable;
                }
              } else if (vaoActive) {
                var countVariable = new Declaration(
                  vao.thisDep,
                  vao.contextDep,
                  vao.propDep,
                  function(env2, scope) {
                    return scope.def(env2.shared.vao, ".currentVAO?", env2.shared.vao, ".currentVAO.count:-1");
                  }
                );
                return countVariable;
              }
              return null;
            }
            var primitive = parsePrimitive();
            var count = parseVertCount();
            var instances = parseParam(S_INSTANCES, false);
            return {
              elements,
              primitive,
              count,
              instances,
              offset: OFFSET,
              vao,
              vaoActive,
              elementsActive,
              static: staticDraw
            };
          }
          function parseGLState(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var STATE = {};
            GL_STATE_NAMES.forEach(function(prop) {
              var param = propName(prop);
              function parseParam(parseStatic, parseDynamic) {
                if (prop in staticOptions) {
                  var value = parseStatic(staticOptions[prop]);
                  STATE[param] = createStaticDecl(function() {
                    return value;
                  });
                } else if (prop in dynamicOptions) {
                  var dyn = dynamicOptions[prop];
                  STATE[param] = createDynamicDecl(dyn, function(env2, scope) {
                    return parseDynamic(env2, scope, env2.invoke(scope, dyn));
                  });
                }
              }
              switch (prop) {
                case S_CULL_ENABLE:
                case S_BLEND_ENABLE:
                case S_DITHER:
                case S_STENCIL_ENABLE:
                case S_DEPTH_ENABLE:
                case S_SCISSOR_ENABLE:
                case S_POLYGON_OFFSET_ENABLE:
                case S_SAMPLE_ALPHA:
                case S_SAMPLE_ENABLE:
                case S_DEPTH_MASK:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "boolean", prop, env.commandStr);
                      return value;
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          "typeof " + value + '==="boolean"',
                          "invalid flag " + prop,
                          env2.commandStr
                        );
                      });
                      return value;
                    }
                  );
                case S_DEPTH_FUNC:
                  return parseParam(
                    function(value) {
                      check$1.commandParameter(value, compareFuncs, "invalid " + prop, env.commandStr);
                      return compareFuncs[value];
                    },
                    function(env2, scope, value) {
                      var COMPARE_FUNCS = env2.constants.compareFuncs;
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + " in " + COMPARE_FUNCS,
                          "invalid " + prop + ", must be one of " + Object.keys(compareFuncs)
                        );
                      });
                      return scope.def(COMPARE_FUNCS, "[", value, "]");
                    }
                  );
                case S_DEPTH_RANGE:
                  return parseParam(
                    function(value) {
                      check$1.command(
                        isArrayLike(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number" && value[0] <= value[1],
                        "depth range is 2d array",
                        env.commandStr
                      );
                      return value;
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===2&&typeof " + value + '[0]==="number"&&typeof ' + value + '[1]==="number"&&' + value + "[0]<=" + value + "[1]",
                          "depth range must be a 2d array"
                        );
                      });
                      var Z_NEAR = scope.def("+", value, "[0]");
                      var Z_FAR = scope.def("+", value, "[1]");
                      return [Z_NEAR, Z_FAR];
                    }
                  );
                case S_BLEND_FUNC:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "object", "blend.func", env.commandStr);
                      var srcRGB = "srcRGB" in value ? value.srcRGB : value.src;
                      var srcAlpha = "srcAlpha" in value ? value.srcAlpha : value.src;
                      var dstRGB = "dstRGB" in value ? value.dstRGB : value.dst;
                      var dstAlpha = "dstAlpha" in value ? value.dstAlpha : value.dst;
                      check$1.commandParameter(srcRGB, blendFuncs, param + ".srcRGB", env.commandStr);
                      check$1.commandParameter(srcAlpha, blendFuncs, param + ".srcAlpha", env.commandStr);
                      check$1.commandParameter(dstRGB, blendFuncs, param + ".dstRGB", env.commandStr);
                      check$1.commandParameter(dstAlpha, blendFuncs, param + ".dstAlpha", env.commandStr);
                      check$1.command(
                        invalidBlendCombinations.indexOf(srcRGB + ", " + dstRGB) === -1,
                        "unallowed blending combination (srcRGB, dstRGB) = (" + srcRGB + ", " + dstRGB + ")",
                        env.commandStr
                      );
                      return [
                        blendFuncs[srcRGB],
                        blendFuncs[dstRGB],
                        blendFuncs[srcAlpha],
                        blendFuncs[dstAlpha]
                      ];
                    },
                    function(env2, scope, value) {
                      var BLEND_FUNCS = env2.constants.blendFuncs;
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + "&&typeof " + value + '==="object"',
                          "invalid blend func, must be an object"
                        );
                      });
                      function read(prefix, suffix) {
                        var func = scope.def(
                          '"',
                          prefix,
                          suffix,
                          '" in ',
                          value,
                          "?",
                          value,
                          ".",
                          prefix,
                          suffix,
                          ":",
                          value,
                          ".",
                          prefix
                        );
                        check$1.optional(function() {
                          env2.assert(
                            scope,
                            func + " in " + BLEND_FUNCS,
                            "invalid " + prop + "." + prefix + suffix + ", must be one of " + Object.keys(blendFuncs)
                          );
                        });
                        return func;
                      }
                      var srcRGB = read("src", "RGB");
                      var dstRGB = read("dst", "RGB");
                      check$1.optional(function() {
                        var INVALID_BLEND_COMBINATIONS = env2.constants.invalidBlendCombinations;
                        env2.assert(
                          scope,
                          INVALID_BLEND_COMBINATIONS + ".indexOf(" + srcRGB + '+", "+' + dstRGB + ") === -1 ",
                          "unallowed blending combination for (srcRGB, dstRGB)"
                        );
                      });
                      var SRC_RGB = scope.def(BLEND_FUNCS, "[", srcRGB, "]");
                      var SRC_ALPHA = scope.def(BLEND_FUNCS, "[", read("src", "Alpha"), "]");
                      var DST_RGB = scope.def(BLEND_FUNCS, "[", dstRGB, "]");
                      var DST_ALPHA = scope.def(BLEND_FUNCS, "[", read("dst", "Alpha"), "]");
                      return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA];
                    }
                  );
                case S_BLEND_EQUATION:
                  return parseParam(
                    function(value) {
                      if (typeof value === "string") {
                        check$1.commandParameter(value, blendEquations, "invalid " + prop, env.commandStr);
                        return [
                          blendEquations[value],
                          blendEquations[value]
                        ];
                      } else if (typeof value === "object") {
                        check$1.commandParameter(
                          value.rgb,
                          blendEquations,
                          prop + ".rgb",
                          env.commandStr
                        );
                        check$1.commandParameter(
                          value.alpha,
                          blendEquations,
                          prop + ".alpha",
                          env.commandStr
                        );
                        return [
                          blendEquations[value.rgb],
                          blendEquations[value.alpha]
                        ];
                      } else {
                        check$1.commandRaise("invalid blend.equation", env.commandStr);
                      }
                    },
                    function(env2, scope, value) {
                      var BLEND_EQUATIONS = env2.constants.blendEquations;
                      var RGB = scope.def();
                      var ALPHA = scope.def();
                      var ifte = env2.cond("typeof ", value, '==="string"');
                      check$1.optional(function() {
                        function checkProp(block, name, value2) {
                          env2.assert(
                            block,
                            value2 + " in " + BLEND_EQUATIONS,
                            "invalid " + name + ", must be one of " + Object.keys(blendEquations)
                          );
                        }
                        checkProp(ifte.then, prop, value);
                        env2.assert(
                          ifte.else,
                          value + "&&typeof " + value + '==="object"',
                          "invalid " + prop
                        );
                        checkProp(ifte.else, prop + ".rgb", value + ".rgb");
                        checkProp(ifte.else, prop + ".alpha", value + ".alpha");
                      });
                      ifte.then(
                        RGB,
                        "=",
                        ALPHA,
                        "=",
                        BLEND_EQUATIONS,
                        "[",
                        value,
                        "];"
                      );
                      ifte.else(
                        RGB,
                        "=",
                        BLEND_EQUATIONS,
                        "[",
                        value,
                        ".rgb];",
                        ALPHA,
                        "=",
                        BLEND_EQUATIONS,
                        "[",
                        value,
                        ".alpha];"
                      );
                      scope(ifte);
                      return [RGB, ALPHA];
                    }
                  );
                case S_BLEND_COLOR:
                  return parseParam(
                    function(value) {
                      check$1.command(
                        isArrayLike(value) && value.length === 4,
                        "blend.color must be a 4d array",
                        env.commandStr
                      );
                      return loop(4, function(i) {
                        return +value[i];
                      });
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===4",
                          "blend.color must be a 4d array"
                        );
                      });
                      return loop(4, function(i) {
                        return scope.def("+", value, "[", i, "]");
                      });
                    }
                  );
                case S_STENCIL_MASK:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "number", param, env.commandStr);
                      return value | 0;
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          "typeof " + value + '==="number"',
                          "invalid stencil.mask"
                        );
                      });
                      return scope.def(value, "|0");
                    }
                  );
                case S_STENCIL_FUNC:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "object", param, env.commandStr);
                      var cmp = value.cmp || "keep";
                      var ref = value.ref || 0;
                      var mask = "mask" in value ? value.mask : -1;
                      check$1.commandParameter(cmp, compareFuncs, prop + ".cmp", env.commandStr);
                      check$1.commandType(ref, "number", prop + ".ref", env.commandStr);
                      check$1.commandType(mask, "number", prop + ".mask", env.commandStr);
                      return [
                        compareFuncs[cmp],
                        ref,
                        mask
                      ];
                    },
                    function(env2, scope, value) {
                      var COMPARE_FUNCS = env2.constants.compareFuncs;
                      check$1.optional(function() {
                        function assert() {
                          env2.assert(
                            scope,
                            Array.prototype.join.call(arguments, ""),
                            "invalid stencil.func"
                          );
                        }
                        assert(value + "&&typeof ", value, '==="object"');
                        assert(
                          '!("cmp" in ',
                          value,
                          ")||(",
                          value,
                          ".cmp in ",
                          COMPARE_FUNCS,
                          ")"
                        );
                      });
                      var cmp = scope.def(
                        '"cmp" in ',
                        value,
                        "?",
                        COMPARE_FUNCS,
                        "[",
                        value,
                        ".cmp]",
                        ":",
                        GL_KEEP
                      );
                      var ref = scope.def(value, ".ref|0");
                      var mask = scope.def(
                        '"mask" in ',
                        value,
                        "?",
                        value,
                        ".mask|0:-1"
                      );
                      return [cmp, ref, mask];
                    }
                  );
                case S_STENCIL_OPFRONT:
                case S_STENCIL_OPBACK:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "object", param, env.commandStr);
                      var fail = value.fail || "keep";
                      var zfail = value.zfail || "keep";
                      var zpass = value.zpass || "keep";
                      check$1.commandParameter(fail, stencilOps, prop + ".fail", env.commandStr);
                      check$1.commandParameter(zfail, stencilOps, prop + ".zfail", env.commandStr);
                      check$1.commandParameter(zpass, stencilOps, prop + ".zpass", env.commandStr);
                      return [
                        prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                        stencilOps[fail],
                        stencilOps[zfail],
                        stencilOps[zpass]
                      ];
                    },
                    function(env2, scope, value) {
                      var STENCIL_OPS = env2.constants.stencilOps;
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + "&&typeof " + value + '==="object"',
                          "invalid " + prop
                        );
                      });
                      function read(name) {
                        check$1.optional(function() {
                          env2.assert(
                            scope,
                            '!("' + name + '" in ' + value + ")||(" + value + "." + name + " in " + STENCIL_OPS + ")",
                            "invalid " + prop + "." + name + ", must be one of " + Object.keys(stencilOps)
                          );
                        });
                        return scope.def(
                          '"',
                          name,
                          '" in ',
                          value,
                          "?",
                          STENCIL_OPS,
                          "[",
                          value,
                          ".",
                          name,
                          "]:",
                          GL_KEEP
                        );
                      }
                      return [
                        prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                        read("fail"),
                        read("zfail"),
                        read("zpass")
                      ];
                    }
                  );
                case S_POLYGON_OFFSET_OFFSET:
                  return parseParam(
                    function(value) {
                      check$1.commandType(value, "object", param, env.commandStr);
                      var factor = value.factor | 0;
                      var units = value.units | 0;
                      check$1.commandType(factor, "number", param + ".factor", env.commandStr);
                      check$1.commandType(units, "number", param + ".units", env.commandStr);
                      return [factor, units];
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + "&&typeof " + value + '==="object"',
                          "invalid " + prop
                        );
                      });
                      var FACTOR = scope.def(value, ".factor|0");
                      var UNITS = scope.def(value, ".units|0");
                      return [FACTOR, UNITS];
                    }
                  );
                case S_CULL_FACE:
                  return parseParam(
                    function(value) {
                      var face = 0;
                      if (value === "front") {
                        face = GL_FRONT;
                      } else if (value === "back") {
                        face = GL_BACK;
                      }
                      check$1.command(!!face, param, env.commandStr);
                      return face;
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + '==="front"||' + value + '==="back"',
                          "invalid cull.face"
                        );
                      });
                      return scope.def(value, '==="front"?', GL_FRONT, ":", GL_BACK);
                    }
                  );
                case S_LINE_WIDTH:
                  return parseParam(
                    function(value) {
                      check$1.command(
                        typeof value === "number" && value >= limits.lineWidthDims[0] && value <= limits.lineWidthDims[1],
                        "invalid line width, must be a positive number between " + limits.lineWidthDims[0] + " and " + limits.lineWidthDims[1],
                        env.commandStr
                      );
                      return value;
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          "typeof " + value + '==="number"&&' + value + ">=" + limits.lineWidthDims[0] + "&&" + value + "<=" + limits.lineWidthDims[1],
                          "invalid line width"
                        );
                      });
                      return value;
                    }
                  );
                case S_FRONT_FACE:
                  return parseParam(
                    function(value) {
                      check$1.commandParameter(value, orientationType, param, env.commandStr);
                      return orientationType[value];
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + '==="cw"||' + value + '==="ccw"',
                          "invalid frontFace, must be one of cw,ccw"
                        );
                      });
                      return scope.def(value + '==="cw"?' + GL_CW + ":" + GL_CCW);
                    }
                  );
                case S_COLOR_MASK:
                  return parseParam(
                    function(value) {
                      check$1.command(
                        isArrayLike(value) && value.length === 4,
                        "color.mask must be length 4 array",
                        env.commandStr
                      );
                      return value.map(function(v) {
                        return !!v;
                      });
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===4",
                          "invalid color.mask"
                        );
                      });
                      return loop(4, function(i) {
                        return "!!" + value + "[" + i + "]";
                      });
                    }
                  );
                case S_SAMPLE_COVERAGE:
                  return parseParam(
                    function(value) {
                      check$1.command(typeof value === "object" && value, param, env.commandStr);
                      var sampleValue = "value" in value ? value.value : 1;
                      var sampleInvert = !!value.invert;
                      check$1.command(
                        typeof sampleValue === "number" && sampleValue >= 0 && sampleValue <= 1,
                        "sample.coverage.value must be a number between 0 and 1",
                        env.commandStr
                      );
                      return [sampleValue, sampleInvert];
                    },
                    function(env2, scope, value) {
                      check$1.optional(function() {
                        env2.assert(
                          scope,
                          value + "&&typeof " + value + '==="object"',
                          "invalid sample.coverage"
                        );
                      });
                      var VALUE = scope.def(
                        '"value" in ',
                        value,
                        "?+",
                        value,
                        ".value:1"
                      );
                      var INVERT = scope.def("!!", value, ".invert");
                      return [VALUE, INVERT];
                    }
                  );
              }
            });
            return STATE;
          }
          function parseUniforms(uniforms, env) {
            var staticUniforms = uniforms.static;
            var dynamicUniforms = uniforms.dynamic;
            var UNIFORMS = {};
            Object.keys(staticUniforms).forEach(function(name) {
              var value = staticUniforms[name];
              var result;
              if (typeof value === "number" || typeof value === "boolean") {
                result = createStaticDecl(function() {
                  return value;
                });
              } else if (typeof value === "function") {
                var reglType = value._reglType;
                if (reglType === "texture2d" || reglType === "textureCube") {
                  result = createStaticDecl(function(env2) {
                    return env2.link(value);
                  });
                } else if (reglType === "framebuffer" || reglType === "framebufferCube") {
                  check$1.command(
                    value.color.length > 0,
                    'missing color attachment for framebuffer sent to uniform "' + name + '"',
                    env.commandStr
                  );
                  result = createStaticDecl(function(env2) {
                    return env2.link(value.color[0]);
                  });
                } else {
                  check$1.commandRaise('invalid data for uniform "' + name + '"', env.commandStr);
                }
              } else if (isArrayLike(value)) {
                result = createStaticDecl(function(env2) {
                  var ITEM = env2.global.def(
                    "[",
                    loop(value.length, function(i) {
                      check$1.command(
                        typeof value[i] === "number" || typeof value[i] === "boolean",
                        "invalid uniform " + name,
                        env2.commandStr
                      );
                      return value[i];
                    }),
                    "]"
                  );
                  return ITEM;
                });
              } else {
                check$1.commandRaise('invalid or missing data for uniform "' + name + '"', env.commandStr);
              }
              result.value = value;
              UNIFORMS[name] = result;
            });
            Object.keys(dynamicUniforms).forEach(function(key) {
              var dyn = dynamicUniforms[key];
              UNIFORMS[key] = createDynamicDecl(dyn, function(env2, scope) {
                return env2.invoke(scope, dyn);
              });
            });
            return UNIFORMS;
          }
          function parseAttributes(attributes, env) {
            var staticAttributes = attributes.static;
            var dynamicAttributes = attributes.dynamic;
            var attributeDefs = {};
            Object.keys(staticAttributes).forEach(function(attribute) {
              var value = staticAttributes[attribute];
              var id2 = stringStore.id(attribute);
              var record = new AttributeRecord2();
              if (isBufferArgs(value)) {
                record.state = ATTRIB_STATE_POINTER;
                record.buffer = bufferState.getBuffer(
                  bufferState.create(value, GL_ARRAY_BUFFER$2, false, true)
                );
                record.type = 0;
              } else {
                var buffer = bufferState.getBuffer(value);
                if (buffer) {
                  record.state = ATTRIB_STATE_POINTER;
                  record.buffer = buffer;
                  record.type = 0;
                } else {
                  check$1.command(
                    typeof value === "object" && value,
                    "invalid data for attribute " + attribute,
                    env.commandStr
                  );
                  if ("constant" in value) {
                    var constant = value.constant;
                    record.buffer = "null";
                    record.state = ATTRIB_STATE_CONSTANT;
                    if (typeof constant === "number") {
                      record.x = constant;
                    } else {
                      check$1.command(
                        isArrayLike(constant) && constant.length > 0 && constant.length <= 4,
                        "invalid constant for attribute " + attribute,
                        env.commandStr
                      );
                      CUTE_COMPONENTS.forEach(function(c, i) {
                        if (i < constant.length) {
                          record[c] = constant[i];
                        }
                      });
                    }
                  } else {
                    if (isBufferArgs(value.buffer)) {
                      buffer = bufferState.getBuffer(
                        bufferState.create(value.buffer, GL_ARRAY_BUFFER$2, false, true)
                      );
                    } else {
                      buffer = bufferState.getBuffer(value.buffer);
                    }
                    check$1.command(!!buffer, 'missing buffer for attribute "' + attribute + '"', env.commandStr);
                    var offset = value.offset | 0;
                    check$1.command(
                      offset >= 0,
                      'invalid offset for attribute "' + attribute + '"',
                      env.commandStr
                    );
                    var stride = value.stride | 0;
                    check$1.command(
                      stride >= 0 && stride < 256,
                      'invalid stride for attribute "' + attribute + '", must be integer betweeen [0, 255]',
                      env.commandStr
                    );
                    var size = value.size | 0;
                    check$1.command(
                      !("size" in value) || size > 0 && size <= 4,
                      'invalid size for attribute "' + attribute + '", must be 1,2,3,4',
                      env.commandStr
                    );
                    var normalized = !!value.normalized;
                    var type = 0;
                    if ("type" in value) {
                      check$1.commandParameter(
                        value.type,
                        glTypes,
                        "invalid type for attribute " + attribute,
                        env.commandStr
                      );
                      type = glTypes[value.type];
                    }
                    var divisor = value.divisor | 0;
                    check$1.optional(function() {
                      if ("divisor" in value) {
                        check$1.command(
                          divisor === 0 || extInstancing,
                          'cannot specify divisor for attribute "' + attribute + '", instancing not supported',
                          env.commandStr
                        );
                        check$1.command(
                          divisor >= 0,
                          'invalid divisor for attribute "' + attribute + '"',
                          env.commandStr
                        );
                      }
                      var command = env.commandStr;
                      var VALID_KEYS = [
                        "buffer",
                        "offset",
                        "divisor",
                        "normalized",
                        "type",
                        "size",
                        "stride"
                      ];
                      Object.keys(value).forEach(function(prop) {
                        check$1.command(
                          VALID_KEYS.indexOf(prop) >= 0,
                          'unknown parameter "' + prop + '" for attribute pointer "' + attribute + '" (valid parameters are ' + VALID_KEYS + ")",
                          command
                        );
                      });
                    });
                    record.buffer = buffer;
                    record.state = ATTRIB_STATE_POINTER;
                    record.size = size;
                    record.normalized = normalized;
                    record.type = type || buffer.dtype;
                    record.offset = offset;
                    record.stride = stride;
                    record.divisor = divisor;
                  }
                }
              }
              attributeDefs[attribute] = createStaticDecl(function(env2, scope) {
                var cache = env2.attribCache;
                if (id2 in cache) {
                  return cache[id2];
                }
                var result = {
                  isStream: false
                };
                Object.keys(record).forEach(function(key) {
                  result[key] = record[key];
                });
                if (record.buffer) {
                  result.buffer = env2.link(record.buffer);
                  result.type = result.type || result.buffer + ".dtype";
                }
                cache[id2] = result;
                return result;
              });
            });
            Object.keys(dynamicAttributes).forEach(function(attribute) {
              var dyn = dynamicAttributes[attribute];
              function appendAttributeCode(env2, block) {
                var VALUE = env2.invoke(block, dyn);
                var shared = env2.shared;
                var constants = env2.constants;
                var IS_BUFFER_ARGS = shared.isBufferArgs;
                var BUFFER_STATE = shared.buffer;
                check$1.optional(function() {
                  env2.assert(
                    block,
                    VALUE + "&&(typeof " + VALUE + '==="object"||typeof ' + VALUE + '==="function")&&(' + IS_BUFFER_ARGS + "(" + VALUE + ")||" + BUFFER_STATE + ".getBuffer(" + VALUE + ")||" + BUFFER_STATE + ".getBuffer(" + VALUE + ".buffer)||" + IS_BUFFER_ARGS + "(" + VALUE + '.buffer)||("constant" in ' + VALUE + "&&(typeof " + VALUE + '.constant==="number"||' + shared.isArrayLike + "(" + VALUE + ".constant))))",
                    'invalid dynamic attribute "' + attribute + '"'
                  );
                });
                var result = {
                  isStream: block.def(false)
                };
                var defaultRecord = new AttributeRecord2();
                defaultRecord.state = ATTRIB_STATE_POINTER;
                Object.keys(defaultRecord).forEach(function(key) {
                  result[key] = block.def("" + defaultRecord[key]);
                });
                var BUFFER = result.buffer;
                var TYPE = result.type;
                block(
                  "if(",
                  IS_BUFFER_ARGS,
                  "(",
                  VALUE,
                  ")){",
                  result.isStream,
                  "=true;",
                  BUFFER,
                  "=",
                  BUFFER_STATE,
                  ".createStream(",
                  GL_ARRAY_BUFFER$2,
                  ",",
                  VALUE,
                  ");",
                  TYPE,
                  "=",
                  BUFFER,
                  ".dtype;",
                  "}else{",
                  BUFFER,
                  "=",
                  BUFFER_STATE,
                  ".getBuffer(",
                  VALUE,
                  ");",
                  "if(",
                  BUFFER,
                  "){",
                  TYPE,
                  "=",
                  BUFFER,
                  ".dtype;",
                  '}else if("constant" in ',
                  VALUE,
                  "){",
                  result.state,
                  "=",
                  ATTRIB_STATE_CONSTANT,
                  ";",
                  "if(typeof " + VALUE + '.constant === "number"){',
                  result[CUTE_COMPONENTS[0]],
                  "=",
                  VALUE,
                  ".constant;",
                  CUTE_COMPONENTS.slice(1).map(function(n) {
                    return result[n];
                  }).join("="),
                  "=0;",
                  "}else{",
                  CUTE_COMPONENTS.map(function(name, i) {
                    return result[name] + "=" + VALUE + ".constant.length>" + i + "?" + VALUE + ".constant[" + i + "]:0;";
                  }).join(""),
                  "}}else{",
                  "if(",
                  IS_BUFFER_ARGS,
                  "(",
                  VALUE,
                  ".buffer)){",
                  BUFFER,
                  "=",
                  BUFFER_STATE,
                  ".createStream(",
                  GL_ARRAY_BUFFER$2,
                  ",",
                  VALUE,
                  ".buffer);",
                  "}else{",
                  BUFFER,
                  "=",
                  BUFFER_STATE,
                  ".getBuffer(",
                  VALUE,
                  ".buffer);",
                  "}",
                  TYPE,
                  '="type" in ',
                  VALUE,
                  "?",
                  constants.glTypes,
                  "[",
                  VALUE,
                  ".type]:",
                  BUFFER,
                  ".dtype;",
                  result.normalized,
                  "=!!",
                  VALUE,
                  ".normalized;"
                );
                function emitReadRecord(name) {
                  block(result[name], "=", VALUE, ".", name, "|0;");
                }
                emitReadRecord("size");
                emitReadRecord("offset");
                emitReadRecord("stride");
                emitReadRecord("divisor");
                block("}}");
                block.exit(
                  "if(",
                  result.isStream,
                  "){",
                  BUFFER_STATE,
                  ".destroyStream(",
                  BUFFER,
                  ");",
                  "}"
                );
                return result;
              }
              attributeDefs[attribute] = createDynamicDecl(dyn, appendAttributeCode);
            });
            return attributeDefs;
          }
          function parseContext(context) {
            var staticContext = context.static;
            var dynamicContext = context.dynamic;
            var result = {};
            Object.keys(staticContext).forEach(function(name) {
              var value = staticContext[name];
              result[name] = createStaticDecl(function(env, scope) {
                if (typeof value === "number" || typeof value === "boolean") {
                  return "" + value;
                } else {
                  return env.link(value);
                }
              });
            });
            Object.keys(dynamicContext).forEach(function(name) {
              var dyn = dynamicContext[name];
              result[name] = createDynamicDecl(dyn, function(env, scope) {
                return env.invoke(scope, dyn);
              });
            });
            return result;
          }
          function parseArguments(options, attributes, uniforms, context, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            check$1.optional(function() {
              var KEY_NAMES = [
                S_FRAMEBUFFER,
                S_VERT,
                S_FRAG,
                S_ELEMENTS,
                S_PRIMITIVE,
                S_OFFSET,
                S_COUNT,
                S_INSTANCES,
                S_PROFILE,
                S_VAO
              ].concat(GL_STATE_NAMES);
              function checkKeys(dict) {
                Object.keys(dict).forEach(function(key) {
                  check$1.command(
                    KEY_NAMES.indexOf(key) >= 0,
                    'unknown parameter "' + key + '"',
                    env.commandStr
                  );
                });
              }
              checkKeys(staticOptions);
              checkKeys(dynamicOptions);
            });
            var attribLocations = parseAttribLocations(options, attributes);
            var framebuffer = parseFramebuffer(options, env);
            var viewportAndScissor = parseViewportScissor(options, framebuffer, env);
            var draw = parseDraw(options, env);
            var state = parseGLState(options, env);
            var shader = parseProgram(options, env, attribLocations);
            function copyBox(name) {
              var defn = viewportAndScissor[name];
              if (defn) {
                state[name] = defn;
              }
            }
            copyBox(S_VIEWPORT);
            copyBox(propName(S_SCISSOR_BOX));
            var dirty = Object.keys(state).length > 0;
            var result = {
              framebuffer,
              draw,
              shader,
              state,
              dirty,
              scopeVAO: null,
              drawVAO: null,
              useVAO: false,
              attributes: {}
            };
            result.profile = parseProfile(options, env);
            result.uniforms = parseUniforms(uniforms, env);
            result.drawVAO = result.scopeVAO = draw.vao;
            if (!result.drawVAO && shader.program && !attribLocations && extensions.angle_instanced_arrays && draw.static.elements) {
              var useVAO = true;
              var staticBindings = shader.program.attributes.map(function(attr) {
                var binding = attributes.static[attr];
                useVAO = useVAO && !!binding;
                return binding;
              });
              if (useVAO && staticBindings.length > 0) {
                var vao = attributeState.getVAO(attributeState.createVAO({
                  attributes: staticBindings,
                  elements: draw.static.elements
                }));
                result.drawVAO = new Declaration(null, null, null, function(env2, scope) {
                  return env2.link(vao);
                });
                result.useVAO = true;
              }
            }
            if (attribLocations) {
              result.useVAO = true;
            } else {
              result.attributes = parseAttributes(attributes, env);
            }
            result.context = parseContext(context, env);
            return result;
          }
          function emitContext(env, scope, context) {
            var shared = env.shared;
            var CONTEXT = shared.context;
            var contextEnter = env.scope();
            Object.keys(context).forEach(function(name) {
              scope.save(CONTEXT, "." + name);
              var defn = context[name];
              var value = defn.append(env, scope);
              if (Array.isArray(value)) {
                contextEnter(CONTEXT, ".", name, "=[", value.join(), "];");
              } else {
                contextEnter(CONTEXT, ".", name, "=", value, ";");
              }
            });
            scope(contextEnter);
          }
          function emitPollFramebuffer(env, scope, framebuffer, skipCheck) {
            var shared = env.shared;
            var GL = shared.gl;
            var FRAMEBUFFER_STATE = shared.framebuffer;
            var EXT_DRAW_BUFFERS;
            if (extDrawBuffers) {
              EXT_DRAW_BUFFERS = scope.def(shared.extensions, ".webgl_draw_buffers");
            }
            var constants = env.constants;
            var DRAW_BUFFERS = constants.drawBuffer;
            var BACK_BUFFER = constants.backBuffer;
            var NEXT;
            if (framebuffer) {
              NEXT = framebuffer.append(env, scope);
            } else {
              NEXT = scope.def(FRAMEBUFFER_STATE, ".next");
            }
            if (!skipCheck) {
              scope("if(", NEXT, "!==", FRAMEBUFFER_STATE, ".cur){");
            }
            scope(
              "if(",
              NEXT,
              "){",
              GL,
              ".bindFramebuffer(",
              GL_FRAMEBUFFER$2,
              ",",
              NEXT,
              ".framebuffer);"
            );
            if (extDrawBuffers) {
              scope(
                EXT_DRAW_BUFFERS,
                ".drawBuffersWEBGL(",
                DRAW_BUFFERS,
                "[",
                NEXT,
                ".colorAttachments.length]);"
              );
            }
            scope(
              "}else{",
              GL,
              ".bindFramebuffer(",
              GL_FRAMEBUFFER$2,
              ",null);"
            );
            if (extDrawBuffers) {
              scope(EXT_DRAW_BUFFERS, ".drawBuffersWEBGL(", BACK_BUFFER, ");");
            }
            scope(
              "}",
              FRAMEBUFFER_STATE,
              ".cur=",
              NEXT,
              ";"
            );
            if (!skipCheck) {
              scope("}");
            }
          }
          function emitPollState(env, scope, args) {
            var shared = env.shared;
            var GL = shared.gl;
            var CURRENT_VARS = env.current;
            var NEXT_VARS = env.next;
            var CURRENT_STATE = shared.current;
            var NEXT_STATE = shared.next;
            var block = env.cond(CURRENT_STATE, ".dirty");
            GL_STATE_NAMES.forEach(function(prop) {
              var param = propName(prop);
              if (param in args.state) {
                return;
              }
              var NEXT, CURRENT;
              if (param in NEXT_VARS) {
                NEXT = NEXT_VARS[param];
                CURRENT = CURRENT_VARS[param];
                var parts = loop(currentState[param].length, function(i) {
                  return block.def(NEXT, "[", i, "]");
                });
                block(env.cond(parts.map(function(p, i) {
                  return p + "!==" + CURRENT + "[" + i + "]";
                }).join("||")).then(
                  GL,
                  ".",
                  GL_VARIABLES[param],
                  "(",
                  parts,
                  ");",
                  parts.map(function(p, i) {
                    return CURRENT + "[" + i + "]=" + p;
                  }).join(";"),
                  ";"
                ));
              } else {
                NEXT = block.def(NEXT_STATE, ".", param);
                var ifte = env.cond(NEXT, "!==", CURRENT_STATE, ".", param);
                block(ifte);
                if (param in GL_FLAGS) {
                  ifte(
                    env.cond(NEXT).then(GL, ".enable(", GL_FLAGS[param], ");").else(GL, ".disable(", GL_FLAGS[param], ");"),
                    CURRENT_STATE,
                    ".",
                    param,
                    "=",
                    NEXT,
                    ";"
                  );
                } else {
                  ifte(
                    GL,
                    ".",
                    GL_VARIABLES[param],
                    "(",
                    NEXT,
                    ");",
                    CURRENT_STATE,
                    ".",
                    param,
                    "=",
                    NEXT,
                    ";"
                  );
                }
              }
            });
            if (Object.keys(args.state).length === 0) {
              block(CURRENT_STATE, ".dirty=false;");
            }
            scope(block);
          }
          function emitSetOptions(env, scope, options, filter2) {
            var shared = env.shared;
            var CURRENT_VARS = env.current;
            var CURRENT_STATE = shared.current;
            var GL = shared.gl;
            sortState(Object.keys(options)).forEach(function(param) {
              var defn = options[param];
              if (filter2 && !filter2(defn)) {
                return;
              }
              var variable = defn.append(env, scope);
              if (GL_FLAGS[param]) {
                var flag = GL_FLAGS[param];
                if (isStatic(defn)) {
                  if (variable) {
                    scope(GL, ".enable(", flag, ");");
                  } else {
                    scope(GL, ".disable(", flag, ");");
                  }
                } else {
                  scope(env.cond(variable).then(GL, ".enable(", flag, ");").else(GL, ".disable(", flag, ");"));
                }
                scope(CURRENT_STATE, ".", param, "=", variable, ";");
              } else if (isArrayLike(variable)) {
                var CURRENT = CURRENT_VARS[param];
                scope(
                  GL,
                  ".",
                  GL_VARIABLES[param],
                  "(",
                  variable,
                  ");",
                  variable.map(function(v, i) {
                    return CURRENT + "[" + i + "]=" + v;
                  }).join(";"),
                  ";"
                );
              } else {
                scope(
                  GL,
                  ".",
                  GL_VARIABLES[param],
                  "(",
                  variable,
                  ");",
                  CURRENT_STATE,
                  ".",
                  param,
                  "=",
                  variable,
                  ";"
                );
              }
            });
          }
          function injectExtensions(env, scope) {
            if (extInstancing) {
              env.instancing = scope.def(
                env.shared.extensions,
                ".angle_instanced_arrays"
              );
            }
          }
          function emitProfile(env, scope, args, useScope, incrementCounter) {
            var shared = env.shared;
            var STATS = env.stats;
            var CURRENT_STATE = shared.current;
            var TIMER = shared.timer;
            var profileArg = args.profile;
            function perfCounter() {
              if (typeof performance === "undefined") {
                return "Date.now()";
              } else {
                return "performance.now()";
              }
            }
            var CPU_START, QUERY_COUNTER;
            function emitProfileStart(block) {
              CPU_START = scope.def();
              block(CPU_START, "=", perfCounter(), ";");
              if (typeof incrementCounter === "string") {
                block(STATS, ".count+=", incrementCounter, ";");
              } else {
                block(STATS, ".count++;");
              }
              if (timer2) {
                if (useScope) {
                  QUERY_COUNTER = scope.def();
                  block(QUERY_COUNTER, "=", TIMER, ".getNumPendingQueries();");
                } else {
                  block(TIMER, ".beginQuery(", STATS, ");");
                }
              }
            }
            function emitProfileEnd(block) {
              block(STATS, ".cpuTime+=", perfCounter(), "-", CPU_START, ";");
              if (timer2) {
                if (useScope) {
                  block(
                    TIMER,
                    ".pushScopeStats(",
                    QUERY_COUNTER,
                    ",",
                    TIMER,
                    ".getNumPendingQueries(),",
                    STATS,
                    ");"
                  );
                } else {
                  block(TIMER, ".endQuery();");
                }
              }
            }
            function scopeProfile(value) {
              var prev = scope.def(CURRENT_STATE, ".profile");
              scope(CURRENT_STATE, ".profile=", value, ";");
              scope.exit(CURRENT_STATE, ".profile=", prev, ";");
            }
            var USE_PROFILE;
            if (profileArg) {
              if (isStatic(profileArg)) {
                if (profileArg.enable) {
                  emitProfileStart(scope);
                  emitProfileEnd(scope.exit);
                  scopeProfile("true");
                } else {
                  scopeProfile("false");
                }
                return;
              }
              USE_PROFILE = profileArg.append(env, scope);
              scopeProfile(USE_PROFILE);
            } else {
              USE_PROFILE = scope.def(CURRENT_STATE, ".profile");
            }
            var start2 = env.block();
            emitProfileStart(start2);
            scope("if(", USE_PROFILE, "){", start2, "}");
            var end = env.block();
            emitProfileEnd(end);
            scope.exit("if(", USE_PROFILE, "){", end, "}");
          }
          function emitAttributes(env, scope, args, attributes, filter2) {
            var shared = env.shared;
            function typeLength(x) {
              switch (x) {
                case GL_FLOAT_VEC2:
                case GL_INT_VEC2:
                case GL_BOOL_VEC2:
                  return 2;
                case GL_FLOAT_VEC3:
                case GL_INT_VEC3:
                case GL_BOOL_VEC3:
                  return 3;
                case GL_FLOAT_VEC4:
                case GL_INT_VEC4:
                case GL_BOOL_VEC4:
                  return 4;
                default:
                  return 1;
              }
            }
            function emitBindAttribute(ATTRIBUTE, size, record) {
              var GL = shared.gl;
              var LOCATION = scope.def(ATTRIBUTE, ".location");
              var BINDING = scope.def(shared.attributes, "[", LOCATION, "]");
              var STATE = record.state;
              var BUFFER = record.buffer;
              var CONST_COMPONENTS = [
                record.x,
                record.y,
                record.z,
                record.w
              ];
              var COMMON_KEYS = [
                "buffer",
                "normalized",
                "offset",
                "stride"
              ];
              function emitBuffer() {
                scope(
                  "if(!",
                  BINDING,
                  ".buffer){",
                  GL,
                  ".enableVertexAttribArray(",
                  LOCATION,
                  ");}"
                );
                var TYPE = record.type;
                var SIZE;
                if (!record.size) {
                  SIZE = size;
                } else {
                  SIZE = scope.def(record.size, "||", size);
                }
                scope(
                  "if(",
                  BINDING,
                  ".type!==",
                  TYPE,
                  "||",
                  BINDING,
                  ".size!==",
                  SIZE,
                  "||",
                  COMMON_KEYS.map(function(key) {
                    return BINDING + "." + key + "!==" + record[key];
                  }).join("||"),
                  "){",
                  GL,
                  ".bindBuffer(",
                  GL_ARRAY_BUFFER$2,
                  ",",
                  BUFFER,
                  ".buffer);",
                  GL,
                  ".vertexAttribPointer(",
                  [
                    LOCATION,
                    SIZE,
                    TYPE,
                    record.normalized,
                    record.stride,
                    record.offset
                  ],
                  ");",
                  BINDING,
                  ".type=",
                  TYPE,
                  ";",
                  BINDING,
                  ".size=",
                  SIZE,
                  ";",
                  COMMON_KEYS.map(function(key) {
                    return BINDING + "." + key + "=" + record[key] + ";";
                  }).join(""),
                  "}"
                );
                if (extInstancing) {
                  var DIVISOR = record.divisor;
                  scope(
                    "if(",
                    BINDING,
                    ".divisor!==",
                    DIVISOR,
                    "){",
                    env.instancing,
                    ".vertexAttribDivisorANGLE(",
                    [LOCATION, DIVISOR],
                    ");",
                    BINDING,
                    ".divisor=",
                    DIVISOR,
                    ";}"
                  );
                }
              }
              function emitConstant() {
                scope(
                  "if(",
                  BINDING,
                  ".buffer){",
                  GL,
                  ".disableVertexAttribArray(",
                  LOCATION,
                  ");",
                  BINDING,
                  ".buffer=null;",
                  "}if(",
                  CUTE_COMPONENTS.map(function(c, i) {
                    return BINDING + "." + c + "!==" + CONST_COMPONENTS[i];
                  }).join("||"),
                  "){",
                  GL,
                  ".vertexAttrib4f(",
                  LOCATION,
                  ",",
                  CONST_COMPONENTS,
                  ");",
                  CUTE_COMPONENTS.map(function(c, i) {
                    return BINDING + "." + c + "=" + CONST_COMPONENTS[i] + ";";
                  }).join(""),
                  "}"
                );
              }
              if (STATE === ATTRIB_STATE_POINTER) {
                emitBuffer();
              } else if (STATE === ATTRIB_STATE_CONSTANT) {
                emitConstant();
              } else {
                scope("if(", STATE, "===", ATTRIB_STATE_POINTER, "){");
                emitBuffer();
                scope("}else{");
                emitConstant();
                scope("}");
              }
            }
            attributes.forEach(function(attribute) {
              var name = attribute.name;
              var arg = args.attributes[name];
              var record;
              if (arg) {
                if (!filter2(arg)) {
                  return;
                }
                record = arg.append(env, scope);
              } else {
                if (!filter2(SCOPE_DECL)) {
                  return;
                }
                var scopeAttrib = env.scopeAttrib(name);
                check$1.optional(function() {
                  env.assert(
                    scope,
                    scopeAttrib + ".state",
                    "missing attribute " + name
                  );
                });
                record = {};
                Object.keys(new AttributeRecord2()).forEach(function(key) {
                  record[key] = scope.def(scopeAttrib, ".", key);
                });
              }
              emitBindAttribute(
                env.link(attribute),
                typeLength(attribute.info.type),
                record
              );
            });
          }
          function emitUniforms(env, scope, args, uniforms, filter2, isBatchInnerLoop) {
            var shared = env.shared;
            var GL = shared.gl;
            var definedArrUniforms = {};
            var infix;
            for (var i = 0; i < uniforms.length; ++i) {
              var uniform = uniforms[i];
              var name = uniform.name;
              var type = uniform.info.type;
              var size = uniform.info.size;
              var arg = args.uniforms[name];
              if (size > 1) {
                if (!arg) {
                  continue;
                }
                var arrUniformName = name.replace("[0]", "");
                if (definedArrUniforms[arrUniformName]) {
                  continue;
                }
                definedArrUniforms[arrUniformName] = 1;
              }
              var UNIFORM = env.link(uniform);
              var LOCATION = UNIFORM + ".location";
              var VALUE;
              if (arg) {
                if (!filter2(arg)) {
                  continue;
                }
                if (isStatic(arg)) {
                  var value = arg.value;
                  check$1.command(
                    value !== null && typeof value !== "undefined",
                    'missing uniform "' + name + '"',
                    env.commandStr
                  );
                  if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
                    check$1.command(
                      typeof value === "function" && (type === GL_SAMPLER_2D && (value._reglType === "texture2d" || value._reglType === "framebuffer") || type === GL_SAMPLER_CUBE && (value._reglType === "textureCube" || value._reglType === "framebufferCube")),
                      "invalid texture for uniform " + name,
                      env.commandStr
                    );
                    var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
                    scope(GL, ".uniform1i(", LOCATION, ",", TEX_VALUE + ".bind());");
                    scope.exit(TEX_VALUE, ".unbind();");
                  } else if (type === GL_FLOAT_MAT2 || type === GL_FLOAT_MAT3 || type === GL_FLOAT_MAT4) {
                    check$1.optional(function() {
                      check$1.command(
                        isArrayLike(value),
                        "invalid matrix for uniform " + name,
                        env.commandStr
                      );
                      check$1.command(
                        type === GL_FLOAT_MAT2 && value.length === 4 || type === GL_FLOAT_MAT3 && value.length === 9 || type === GL_FLOAT_MAT4 && value.length === 16,
                        "invalid length for matrix uniform " + name,
                        env.commandStr
                      );
                    });
                    var MAT_VALUE = env.global.def("new Float32Array([" + Array.prototype.slice.call(value) + "])");
                    var dim = 2;
                    if (type === GL_FLOAT_MAT3) {
                      dim = 3;
                    } else if (type === GL_FLOAT_MAT4) {
                      dim = 4;
                    }
                    scope(
                      GL,
                      ".uniformMatrix",
                      dim,
                      "fv(",
                      LOCATION,
                      ",false,",
                      MAT_VALUE,
                      ");"
                    );
                  } else {
                    switch (type) {
                      case GL_FLOAT$8:
                        if (size === 1) {
                          check$1.commandType(value, "number", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(
                            isArrayLike(value) && value.length === size,
                            "uniform " + name,
                            env.commandStr
                          );
                        }
                        infix = "1f";
                        break;
                      case GL_FLOAT_VEC2:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "2f";
                        break;
                      case GL_FLOAT_VEC3:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "3f";
                        break;
                      case GL_FLOAT_VEC4:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "4f";
                        break;
                      case GL_BOOL:
                        if (size === 1) {
                          check$1.commandType(value, "boolean", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(
                            isArrayLike(value) && value.length === size,
                            "uniform " + name,
                            env.commandStr
                          );
                        }
                        infix = "1i";
                        break;
                      case GL_INT$3:
                        if (size === 1) {
                          check$1.commandType(value, "number", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(
                            isArrayLike(value) && value.length === size,
                            "uniform " + name,
                            env.commandStr
                          );
                        }
                        infix = "1i";
                        break;
                      case GL_BOOL_VEC2:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "2i";
                        break;
                      case GL_INT_VEC2:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "2i";
                        break;
                      case GL_BOOL_VEC3:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "3i";
                        break;
                      case GL_INT_VEC3:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "3i";
                        break;
                      case GL_BOOL_VEC4:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "4i";
                        break;
                      case GL_INT_VEC4:
                        check$1.command(
                          isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4),
                          "uniform " + name,
                          env.commandStr
                        );
                        infix = "4i";
                        break;
                    }
                    if (size > 1) {
                      infix += "v";
                      value = env.global.def("[" + Array.prototype.slice.call(value) + "]");
                    } else {
                      value = isArrayLike(value) ? Array.prototype.slice.call(value) : value;
                    }
                    scope(
                      GL,
                      ".uniform",
                      infix,
                      "(",
                      LOCATION,
                      ",",
                      value,
                      ");"
                    );
                  }
                  continue;
                } else {
                  VALUE = arg.append(env, scope);
                }
              } else {
                if (!filter2(SCOPE_DECL)) {
                  continue;
                }
                VALUE = scope.def(shared.uniforms, "[", stringStore.id(name), "]");
              }
              if (type === GL_SAMPLER_2D) {
                check$1(!Array.isArray(VALUE), "must specify a scalar prop for textures");
                scope(
                  "if(",
                  VALUE,
                  "&&",
                  VALUE,
                  '._reglType==="framebuffer"){',
                  VALUE,
                  "=",
                  VALUE,
                  ".color[0];",
                  "}"
                );
              } else if (type === GL_SAMPLER_CUBE) {
                check$1(!Array.isArray(VALUE), "must specify a scalar prop for cube maps");
                scope(
                  "if(",
                  VALUE,
                  "&&",
                  VALUE,
                  '._reglType==="framebufferCube"){',
                  VALUE,
                  "=",
                  VALUE,
                  ".color[0];",
                  "}"
                );
              }
              check$1.optional(function() {
                function emitCheck(pred, message) {
                  env.assert(
                    scope,
                    pred,
                    'bad data or missing for uniform "' + name + '".  ' + message
                  );
                }
                function checkType(type2, size2) {
                  if (size2 === 1) {
                    check$1(!Array.isArray(VALUE), "must not specify an array type for uniform");
                  }
                  emitCheck(
                    "Array.isArray(" + VALUE + ") && typeof " + VALUE + '[0]===" ' + type2 + '" || typeof ' + VALUE + '==="' + type2 + '"',
                    "invalid type, expected " + type2
                  );
                }
                function checkVector(n, type2, size2) {
                  if (Array.isArray(VALUE)) {
                    check$1(VALUE.length && VALUE.length % n === 0 && VALUE.length <= n * size2, "must have length of " + (size2 === 1 ? "" : "n * ") + n);
                  } else {
                    emitCheck(
                      shared.isArrayLike + "(" + VALUE + ")&&" + VALUE + ".length && " + VALUE + ".length % " + n + " === 0 && " + VALUE + ".length<=" + n * size2,
                      "invalid vector, should have length of " + (size2 === 1 ? "" : "n * ") + n,
                      env.commandStr
                    );
                  }
                }
                function checkTexture(target) {
                  check$1(!Array.isArray(VALUE), "must not specify a value type");
                  emitCheck(
                    "typeof " + VALUE + '==="function"&&' + VALUE + '._reglType==="texture' + (target === GL_TEXTURE_2D$3 ? "2d" : "Cube") + '"',
                    "invalid texture type",
                    env.commandStr
                  );
                }
                switch (type) {
                  case GL_INT$3:
                    checkType("number", size);
                    break;
                  case GL_INT_VEC2:
                    checkVector(2, "number", size);
                    break;
                  case GL_INT_VEC3:
                    checkVector(3, "number", size);
                    break;
                  case GL_INT_VEC4:
                    checkVector(4, "number", size);
                    break;
                  case GL_FLOAT$8:
                    checkType("number", size);
                    break;
                  case GL_FLOAT_VEC2:
                    checkVector(2, "number", size);
                    break;
                  case GL_FLOAT_VEC3:
                    checkVector(3, "number", size);
                    break;
                  case GL_FLOAT_VEC4:
                    checkVector(4, "number", size);
                    break;
                  case GL_BOOL:
                    checkType("boolean", size);
                    break;
                  case GL_BOOL_VEC2:
                    checkVector(2, "boolean", size);
                    break;
                  case GL_BOOL_VEC3:
                    checkVector(3, "boolean", size);
                    break;
                  case GL_BOOL_VEC4:
                    checkVector(4, "boolean", size);
                    break;
                  case GL_FLOAT_MAT2:
                    checkVector(4, "number", size);
                    break;
                  case GL_FLOAT_MAT3:
                    checkVector(9, "number", size);
                    break;
                  case GL_FLOAT_MAT4:
                    checkVector(16, "number", size);
                    break;
                  case GL_SAMPLER_2D:
                    checkTexture(GL_TEXTURE_2D$3);
                    break;
                  case GL_SAMPLER_CUBE:
                    checkTexture(GL_TEXTURE_CUBE_MAP$2);
                    break;
                }
              });
              var unroll = 1;
              switch (type) {
                case GL_SAMPLER_2D:
                case GL_SAMPLER_CUBE:
                  var TEX = scope.def(VALUE, "._texture");
                  scope(GL, ".uniform1i(", LOCATION, ",", TEX, ".bind());");
                  scope.exit(TEX, ".unbind();");
                  continue;
                case GL_INT$3:
                case GL_BOOL:
                  infix = "1i";
                  break;
                case GL_INT_VEC2:
                case GL_BOOL_VEC2:
                  infix = "2i";
                  unroll = 2;
                  break;
                case GL_INT_VEC3:
                case GL_BOOL_VEC3:
                  infix = "3i";
                  unroll = 3;
                  break;
                case GL_INT_VEC4:
                case GL_BOOL_VEC4:
                  infix = "4i";
                  unroll = 4;
                  break;
                case GL_FLOAT$8:
                  infix = "1f";
                  break;
                case GL_FLOAT_VEC2:
                  infix = "2f";
                  unroll = 2;
                  break;
                case GL_FLOAT_VEC3:
                  infix = "3f";
                  unroll = 3;
                  break;
                case GL_FLOAT_VEC4:
                  infix = "4f";
                  unroll = 4;
                  break;
                case GL_FLOAT_MAT2:
                  infix = "Matrix2fv";
                  break;
                case GL_FLOAT_MAT3:
                  infix = "Matrix3fv";
                  break;
                case GL_FLOAT_MAT4:
                  infix = "Matrix4fv";
                  break;
              }
              if (infix.indexOf("Matrix") === -1 && size > 1) {
                infix += "v";
                unroll = 1;
              }
              if (infix.charAt(0) === "M") {
                scope(GL, ".uniform", infix, "(", LOCATION, ",");
                var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
                var STORAGE = env.global.def("new Float32Array(", matSize, ")");
                if (Array.isArray(VALUE)) {
                  scope(
                    "false,(",
                    loop(matSize, function(i2) {
                      return STORAGE + "[" + i2 + "]=" + VALUE[i2];
                    }),
                    ",",
                    STORAGE,
                    ")"
                  );
                } else {
                  scope(
                    "false,(Array.isArray(",
                    VALUE,
                    ")||",
                    VALUE,
                    " instanceof Float32Array)?",
                    VALUE,
                    ":(",
                    loop(matSize, function(i2) {
                      return STORAGE + "[" + i2 + "]=" + VALUE + "[" + i2 + "]";
                    }),
                    ",",
                    STORAGE,
                    ")"
                  );
                }
                scope(");");
              } else if (unroll > 1) {
                var prev = [];
                var cur = [];
                for (var j = 0; j < unroll; ++j) {
                  if (Array.isArray(VALUE)) {
                    cur.push(VALUE[j]);
                  } else {
                    cur.push(scope.def(VALUE + "[" + j + "]"));
                  }
                  if (isBatchInnerLoop) {
                    prev.push(scope.def());
                  }
                }
                if (isBatchInnerLoop) {
                  scope("if(!", env.batchId, "||", prev.map(function(p, i2) {
                    return p + "!==" + cur[i2];
                  }).join("||"), "){", prev.map(function(p, i2) {
                    return p + "=" + cur[i2] + ";";
                  }).join(""));
                }
                scope(GL, ".uniform", infix, "(", LOCATION, ",", cur.join(","), ");");
                if (isBatchInnerLoop) {
                  scope("}");
                }
              } else {
                check$1(!Array.isArray(VALUE), "uniform value must not be an array");
                if (isBatchInnerLoop) {
                  var prevS = scope.def();
                  scope(
                    "if(!",
                    env.batchId,
                    "||",
                    prevS,
                    "!==",
                    VALUE,
                    "){",
                    prevS,
                    "=",
                    VALUE,
                    ";"
                  );
                }
                scope(GL, ".uniform", infix, "(", LOCATION, ",", VALUE, ");");
                if (isBatchInnerLoop) {
                  scope("}");
                }
              }
            }
          }
          function emitDraw(env, outer, inner, args) {
            var shared = env.shared;
            var GL = shared.gl;
            var DRAW_STATE = shared.draw;
            var drawOptions = args.draw;
            function emitElements() {
              var defn = drawOptions.elements;
              var ELEMENTS2;
              var scope = outer;
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  scope = inner;
                }
                ELEMENTS2 = defn.append(env, scope);
                if (drawOptions.elementsActive) {
                  scope(
                    "if(" + ELEMENTS2 + ")" + GL + ".bindBuffer(" + GL_ELEMENT_ARRAY_BUFFER$2 + "," + ELEMENTS2 + ".buffer.buffer);"
                  );
                }
              } else {
                ELEMENTS2 = scope.def();
                scope(
                  ELEMENTS2,
                  "=",
                  DRAW_STATE,
                  ".",
                  S_ELEMENTS,
                  ";",
                  "if(",
                  ELEMENTS2,
                  "){",
                  GL,
                  ".bindBuffer(",
                  GL_ELEMENT_ARRAY_BUFFER$2,
                  ",",
                  ELEMENTS2,
                  ".buffer.buffer);}",
                  "else if(",
                  shared.vao,
                  ".currentVAO){",
                  ELEMENTS2,
                  "=",
                  env.shared.elements + ".getElements(" + shared.vao,
                  ".currentVAO.elements);",
                  !extVertexArrays ? "if(" + ELEMENTS2 + ")" + GL + ".bindBuffer(" + GL_ELEMENT_ARRAY_BUFFER$2 + "," + ELEMENTS2 + ".buffer.buffer);" : "",
                  "}"
                );
              }
              return ELEMENTS2;
            }
            function emitCount() {
              var defn = drawOptions.count;
              var COUNT2;
              var scope = outer;
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  scope = inner;
                }
                COUNT2 = defn.append(env, scope);
                check$1.optional(function() {
                  if (defn.MISSING) {
                    env.assert(outer, "false", "missing vertex count");
                  }
                  if (defn.DYNAMIC) {
                    env.assert(scope, COUNT2 + ">=0", "missing vertex count");
                  }
                });
              } else {
                COUNT2 = scope.def(DRAW_STATE, ".", S_COUNT);
                check$1.optional(function() {
                  env.assert(scope, COUNT2 + ">=0", "missing vertex count");
                });
              }
              return COUNT2;
            }
            var ELEMENTS = emitElements();
            function emitValue(name) {
              var defn = drawOptions[name];
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  return defn.append(env, inner);
                } else {
                  return defn.append(env, outer);
                }
              } else {
                return outer.def(DRAW_STATE, ".", name);
              }
            }
            var PRIMITIVE = emitValue(S_PRIMITIVE);
            var OFFSET = emitValue(S_OFFSET);
            var COUNT = emitCount();
            if (typeof COUNT === "number") {
              if (COUNT === 0) {
                return;
              }
            } else {
              inner("if(", COUNT, "){");
              inner.exit("}");
            }
            var INSTANCES, EXT_INSTANCING;
            if (extInstancing) {
              INSTANCES = emitValue(S_INSTANCES);
              EXT_INSTANCING = env.instancing;
            }
            var ELEMENT_TYPE = ELEMENTS + ".type";
            var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements) && !drawOptions.vaoActive;
            function emitInstancing() {
              function drawElements() {
                inner(EXT_INSTANCING, ".drawElementsInstancedANGLE(", [
                  PRIMITIVE,
                  COUNT,
                  ELEMENT_TYPE,
                  OFFSET + "<<((" + ELEMENT_TYPE + "-" + GL_UNSIGNED_BYTE$8 + ")>>1)",
                  INSTANCES
                ], ");");
              }
              function drawArrays() {
                inner(
                  EXT_INSTANCING,
                  ".drawArraysInstancedANGLE(",
                  [PRIMITIVE, OFFSET, COUNT, INSTANCES],
                  ");"
                );
              }
              if (ELEMENTS && ELEMENTS !== "null") {
                if (!elementsStatic) {
                  inner("if(", ELEMENTS, "){");
                  drawElements();
                  inner("}else{");
                  drawArrays();
                  inner("}");
                } else {
                  drawElements();
                }
              } else {
                drawArrays();
              }
            }
            function emitRegular() {
              function drawElements() {
                inner(GL + ".drawElements(" + [
                  PRIMITIVE,
                  COUNT,
                  ELEMENT_TYPE,
                  OFFSET + "<<((" + ELEMENT_TYPE + "-" + GL_UNSIGNED_BYTE$8 + ")>>1)"
                ] + ");");
              }
              function drawArrays() {
                inner(GL + ".drawArrays(" + [PRIMITIVE, OFFSET, COUNT] + ");");
              }
              if (ELEMENTS && ELEMENTS !== "null") {
                if (!elementsStatic) {
                  inner("if(", ELEMENTS, "){");
                  drawElements();
                  inner("}else{");
                  drawArrays();
                  inner("}");
                } else {
                  drawElements();
                }
              } else {
                drawArrays();
              }
            }
            if (extInstancing && (typeof INSTANCES !== "number" || INSTANCES >= 0)) {
              if (typeof INSTANCES === "string") {
                inner("if(", INSTANCES, ">0){");
                emitInstancing();
                inner("}else if(", INSTANCES, "<0){");
                emitRegular();
                inner("}");
              } else {
                emitInstancing();
              }
            } else {
              emitRegular();
            }
          }
          function createBody(emitBody, parentEnv, args, program, count) {
            var env = createREGLEnvironment();
            var scope = env.proc("body", count);
            check$1.optional(function() {
              env.commandStr = parentEnv.commandStr;
              env.command = env.link(parentEnv.commandStr);
            });
            if (extInstancing) {
              env.instancing = scope.def(
                env.shared.extensions,
                ".angle_instanced_arrays"
              );
            }
            emitBody(env, scope, args, program);
            return env.compile().body;
          }
          function emitDrawBody(env, draw, args, program) {
            injectExtensions(env, draw);
            if (args.useVAO) {
              if (args.drawVAO) {
                draw(env.shared.vao, ".setVAO(", args.drawVAO.append(env, draw), ");");
              } else {
                draw(env.shared.vao, ".setVAO(", env.shared.vao, ".targetVAO);");
              }
            } else {
              draw(env.shared.vao, ".setVAO(null);");
              emitAttributes(env, draw, args, program.attributes, function() {
                return true;
              });
            }
            emitUniforms(env, draw, args, program.uniforms, function() {
              return true;
            }, false);
            emitDraw(env, draw, draw, args);
          }
          function emitDrawProc(env, args) {
            var draw = env.proc("draw", 1);
            injectExtensions(env, draw);
            emitContext(env, draw, args.context);
            emitPollFramebuffer(env, draw, args.framebuffer);
            emitPollState(env, draw, args);
            emitSetOptions(env, draw, args.state);
            emitProfile(env, draw, args, false, true);
            var program = args.shader.progVar.append(env, draw);
            draw(env.shared.gl, ".useProgram(", program, ".program);");
            if (args.shader.program) {
              emitDrawBody(env, draw, args, args.shader.program);
            } else {
              draw(env.shared.vao, ".setVAO(null);");
              var drawCache = env.global.def("{}");
              var PROG_ID = draw.def(program, ".id");
              var CACHED_PROC = draw.def(drawCache, "[", PROG_ID, "]");
              draw(
                env.cond(CACHED_PROC).then(CACHED_PROC, ".call(this,a0);").else(
                  CACHED_PROC,
                  "=",
                  drawCache,
                  "[",
                  PROG_ID,
                  "]=",
                  env.link(function(program2) {
                    return createBody(emitDrawBody, env, args, program2, 1);
                  }),
                  "(",
                  program,
                  ");",
                  CACHED_PROC,
                  ".call(this,a0);"
                )
              );
            }
            if (Object.keys(args.state).length > 0) {
              draw(env.shared.current, ".dirty=true;");
            }
            if (env.shared.vao) {
              draw(env.shared.vao, ".setVAO(null);");
            }
          }
          function emitBatchDynamicShaderBody(env, scope, args, program) {
            env.batchId = "a1";
            injectExtensions(env, scope);
            function all() {
              return true;
            }
            emitAttributes(env, scope, args, program.attributes, all);
            emitUniforms(env, scope, args, program.uniforms, all, false);
            emitDraw(env, scope, scope, args);
          }
          function emitBatchBody(env, scope, args, program) {
            injectExtensions(env, scope);
            var contextDynamic = args.contextDep;
            var BATCH_ID = scope.def();
            var PROP_LIST = "a0";
            var NUM_PROPS = "a1";
            var PROPS = scope.def();
            env.shared.props = PROPS;
            env.batchId = BATCH_ID;
            var outer = env.scope();
            var inner = env.scope();
            scope(
              outer.entry,
              "for(",
              BATCH_ID,
              "=0;",
              BATCH_ID,
              "<",
              NUM_PROPS,
              ";++",
              BATCH_ID,
              "){",
              PROPS,
              "=",
              PROP_LIST,
              "[",
              BATCH_ID,
              "];",
              inner,
              "}",
              outer.exit
            );
            function isInnerDefn(defn) {
              return defn.contextDep && contextDynamic || defn.propDep;
            }
            function isOuterDefn(defn) {
              return !isInnerDefn(defn);
            }
            if (args.needsContext) {
              emitContext(env, inner, args.context);
            }
            if (args.needsFramebuffer) {
              emitPollFramebuffer(env, inner, args.framebuffer);
            }
            emitSetOptions(env, inner, args.state, isInnerDefn);
            if (args.profile && isInnerDefn(args.profile)) {
              emitProfile(env, inner, args, false, true);
            }
            if (!program) {
              var progCache = env.global.def("{}");
              var PROGRAM = args.shader.progVar.append(env, inner);
              var PROG_ID = inner.def(PROGRAM, ".id");
              var CACHED_PROC = inner.def(progCache, "[", PROG_ID, "]");
              inner(
                env.shared.gl,
                ".useProgram(",
                PROGRAM,
                ".program);",
                "if(!",
                CACHED_PROC,
                "){",
                CACHED_PROC,
                "=",
                progCache,
                "[",
                PROG_ID,
                "]=",
                env.link(function(program2) {
                  return createBody(
                    emitBatchDynamicShaderBody,
                    env,
                    args,
                    program2,
                    2
                  );
                }),
                "(",
                PROGRAM,
                ");}",
                CACHED_PROC,
                ".call(this,a0[",
                BATCH_ID,
                "],",
                BATCH_ID,
                ");"
              );
            } else {
              if (args.useVAO) {
                if (args.drawVAO) {
                  if (isInnerDefn(args.drawVAO)) {
                    inner(env.shared.vao, ".setVAO(", args.drawVAO.append(env, inner), ");");
                  } else {
                    outer(env.shared.vao, ".setVAO(", args.drawVAO.append(env, outer), ");");
                  }
                } else {
                  outer(env.shared.vao, ".setVAO(", env.shared.vao, ".targetVAO);");
                }
              } else {
                outer(env.shared.vao, ".setVAO(null);");
                emitAttributes(env, outer, args, program.attributes, isOuterDefn);
                emitAttributes(env, inner, args, program.attributes, isInnerDefn);
              }
              emitUniforms(env, outer, args, program.uniforms, isOuterDefn, false);
              emitUniforms(env, inner, args, program.uniforms, isInnerDefn, true);
              emitDraw(env, outer, inner, args);
            }
          }
          function emitBatchProc(env, args) {
            var batch = env.proc("batch", 2);
            env.batchId = "0";
            injectExtensions(env, batch);
            var contextDynamic = false;
            var needsContext = true;
            Object.keys(args.context).forEach(function(name) {
              contextDynamic = contextDynamic || args.context[name].propDep;
            });
            if (!contextDynamic) {
              emitContext(env, batch, args.context);
              needsContext = false;
            }
            var framebuffer = args.framebuffer;
            var needsFramebuffer = false;
            if (framebuffer) {
              if (framebuffer.propDep) {
                contextDynamic = needsFramebuffer = true;
              } else if (framebuffer.contextDep && contextDynamic) {
                needsFramebuffer = true;
              }
              if (!needsFramebuffer) {
                emitPollFramebuffer(env, batch, framebuffer);
              }
            } else {
              emitPollFramebuffer(env, batch, null);
            }
            if (args.state.viewport && args.state.viewport.propDep) {
              contextDynamic = true;
            }
            function isInnerDefn(defn) {
              return defn.contextDep && contextDynamic || defn.propDep;
            }
            emitPollState(env, batch, args);
            emitSetOptions(env, batch, args.state, function(defn) {
              return !isInnerDefn(defn);
            });
            if (!args.profile || !isInnerDefn(args.profile)) {
              emitProfile(env, batch, args, false, "a1");
            }
            args.contextDep = contextDynamic;
            args.needsContext = needsContext;
            args.needsFramebuffer = needsFramebuffer;
            var progDefn = args.shader.progVar;
            if (progDefn.contextDep && contextDynamic || progDefn.propDep) {
              emitBatchBody(
                env,
                batch,
                args,
                null
              );
            } else {
              var PROGRAM = progDefn.append(env, batch);
              batch(env.shared.gl, ".useProgram(", PROGRAM, ".program);");
              if (args.shader.program) {
                emitBatchBody(
                  env,
                  batch,
                  args,
                  args.shader.program
                );
              } else {
                batch(env.shared.vao, ".setVAO(null);");
                var batchCache = env.global.def("{}");
                var PROG_ID = batch.def(PROGRAM, ".id");
                var CACHED_PROC = batch.def(batchCache, "[", PROG_ID, "]");
                batch(
                  env.cond(CACHED_PROC).then(CACHED_PROC, ".call(this,a0,a1);").else(
                    CACHED_PROC,
                    "=",
                    batchCache,
                    "[",
                    PROG_ID,
                    "]=",
                    env.link(function(program) {
                      return createBody(emitBatchBody, env, args, program, 2);
                    }),
                    "(",
                    PROGRAM,
                    ");",
                    CACHED_PROC,
                    ".call(this,a0,a1);"
                  )
                );
              }
            }
            if (Object.keys(args.state).length > 0) {
              batch(env.shared.current, ".dirty=true;");
            }
            if (env.shared.vao) {
              batch(env.shared.vao, ".setVAO(null);");
            }
          }
          function emitScopeProc(env, args) {
            var scope = env.proc("scope", 3);
            env.batchId = "a2";
            var shared = env.shared;
            var CURRENT_STATE = shared.current;
            emitContext(env, scope, args.context);
            if (args.framebuffer) {
              args.framebuffer.append(env, scope);
            }
            sortState(Object.keys(args.state)).forEach(function(name) {
              var defn = args.state[name];
              var value = defn.append(env, scope);
              if (isArrayLike(value)) {
                value.forEach(function(v, i) {
                  scope.set(env.next[name], "[" + i + "]", v);
                });
              } else {
                scope.set(shared.next, "." + name, value);
              }
            });
            emitProfile(env, scope, args, true, true);
            [S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(
              function(opt) {
                var variable = args.draw[opt];
                if (!variable) {
                  return;
                }
                scope.set(shared.draw, "." + opt, "" + variable.append(env, scope));
              }
            );
            Object.keys(args.uniforms).forEach(function(opt) {
              var value = args.uniforms[opt].append(env, scope);
              if (Array.isArray(value)) {
                value = "[" + value.join() + "]";
              }
              scope.set(
                shared.uniforms,
                "[" + stringStore.id(opt) + "]",
                value
              );
            });
            Object.keys(args.attributes).forEach(function(name) {
              var record = args.attributes[name].append(env, scope);
              var scopeAttrib = env.scopeAttrib(name);
              Object.keys(new AttributeRecord2()).forEach(function(prop) {
                scope.set(scopeAttrib, "." + prop, record[prop]);
              });
            });
            if (args.scopeVAO) {
              scope.set(shared.vao, ".targetVAO", args.scopeVAO.append(env, scope));
            }
            function saveShader(name) {
              var shader = args.shader[name];
              if (shader) {
                scope.set(shared.shader, "." + name, shader.append(env, scope));
              }
            }
            saveShader(S_VERT);
            saveShader(S_FRAG);
            if (Object.keys(args.state).length > 0) {
              scope(CURRENT_STATE, ".dirty=true;");
              scope.exit(CURRENT_STATE, ".dirty=true;");
            }
            scope("a1(", env.shared.context, ",a0,", env.batchId, ");");
          }
          function isDynamicObject(object) {
            if (typeof object !== "object" || isArrayLike(object)) {
              return;
            }
            var props = Object.keys(object);
            for (var i = 0; i < props.length; ++i) {
              if (dynamic.isDynamic(object[props[i]])) {
                return true;
              }
            }
            return false;
          }
          function splatObject(env, options, name) {
            var object = options.static[name];
            if (!object || !isDynamicObject(object)) {
              return;
            }
            var globals = env.global;
            var keys = Object.keys(object);
            var thisDep = false;
            var contextDep = false;
            var propDep = false;
            var objectRef = env.global.def("{}");
            keys.forEach(function(key) {
              var value = object[key];
              if (dynamic.isDynamic(value)) {
                if (typeof value === "function") {
                  value = object[key] = dynamic.unbox(value);
                }
                var deps = createDynamicDecl(value, null);
                thisDep = thisDep || deps.thisDep;
                propDep = propDep || deps.propDep;
                contextDep = contextDep || deps.contextDep;
              } else {
                globals(objectRef, ".", key, "=");
                switch (typeof value) {
                  case "number":
                    globals(value);
                    break;
                  case "string":
                    globals('"', value, '"');
                    break;
                  case "object":
                    if (Array.isArray(value)) {
                      globals("[", value.join(), "]");
                    }
                    break;
                  default:
                    globals(env.link(value));
                    break;
                }
                globals(";");
              }
            });
            function appendBlock(env2, block) {
              keys.forEach(function(key) {
                var value = object[key];
                if (!dynamic.isDynamic(value)) {
                  return;
                }
                var ref = env2.invoke(block, value);
                block(objectRef, ".", key, "=", ref, ";");
              });
            }
            options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
              thisDep,
              contextDep,
              propDep,
              ref: objectRef,
              append: appendBlock
            });
            delete options.static[name];
          }
          function compileCommand(options, attributes, uniforms, context, stats2) {
            var env = createREGLEnvironment();
            env.stats = env.link(stats2);
            Object.keys(attributes.static).forEach(function(key) {
              splatObject(env, attributes, key);
            });
            NESTED_OPTIONS.forEach(function(name) {
              splatObject(env, options, name);
            });
            var args = parseArguments(options, attributes, uniforms, context, env);
            emitDrawProc(env, args);
            emitScopeProc(env, args);
            emitBatchProc(env, args);
            return extend2(env.compile(), {
              destroy: function() {
                args.shader.program.destroy();
              }
            });
          }
          return {
            next: nextState,
            current: currentState,
            procs: function() {
              var env = createREGLEnvironment();
              var poll = env.proc("poll");
              var refresh = env.proc("refresh");
              var common = env.block();
              poll(common);
              refresh(common);
              var shared = env.shared;
              var GL = shared.gl;
              var NEXT_STATE = shared.next;
              var CURRENT_STATE = shared.current;
              common(CURRENT_STATE, ".dirty=false;");
              emitPollFramebuffer(env, poll);
              emitPollFramebuffer(env, refresh, null, true);
              var INSTANCING;
              if (extInstancing) {
                INSTANCING = env.link(extInstancing);
              }
              if (extensions.oes_vertex_array_object) {
                refresh(env.link(extensions.oes_vertex_array_object), ".bindVertexArrayOES(null);");
              }
              for (var i = 0; i < limits.maxAttributes; ++i) {
                var BINDING = refresh.def(shared.attributes, "[", i, "]");
                var ifte = env.cond(BINDING, ".buffer");
                ifte.then(
                  GL,
                  ".enableVertexAttribArray(",
                  i,
                  ");",
                  GL,
                  ".bindBuffer(",
                  GL_ARRAY_BUFFER$2,
                  ",",
                  BINDING,
                  ".buffer.buffer);",
                  GL,
                  ".vertexAttribPointer(",
                  i,
                  ",",
                  BINDING,
                  ".size,",
                  BINDING,
                  ".type,",
                  BINDING,
                  ".normalized,",
                  BINDING,
                  ".stride,",
                  BINDING,
                  ".offset);"
                ).else(
                  GL,
                  ".disableVertexAttribArray(",
                  i,
                  ");",
                  GL,
                  ".vertexAttrib4f(",
                  i,
                  ",",
                  BINDING,
                  ".x,",
                  BINDING,
                  ".y,",
                  BINDING,
                  ".z,",
                  BINDING,
                  ".w);",
                  BINDING,
                  ".buffer=null;"
                );
                refresh(ifte);
                if (extInstancing) {
                  refresh(
                    INSTANCING,
                    ".vertexAttribDivisorANGLE(",
                    i,
                    ",",
                    BINDING,
                    ".divisor);"
                  );
                }
              }
              refresh(
                env.shared.vao,
                ".currentVAO=null;",
                env.shared.vao,
                ".setVAO(",
                env.shared.vao,
                ".targetVAO);"
              );
              Object.keys(GL_FLAGS).forEach(function(flag) {
                var cap = GL_FLAGS[flag];
                var NEXT = common.def(NEXT_STATE, ".", flag);
                var block = env.block();
                block(
                  "if(",
                  NEXT,
                  "){",
                  GL,
                  ".enable(",
                  cap,
                  ")}else{",
                  GL,
                  ".disable(",
                  cap,
                  ")}",
                  CURRENT_STATE,
                  ".",
                  flag,
                  "=",
                  NEXT,
                  ";"
                );
                refresh(block);
                poll(
                  "if(",
                  NEXT,
                  "!==",
                  CURRENT_STATE,
                  ".",
                  flag,
                  "){",
                  block,
                  "}"
                );
              });
              Object.keys(GL_VARIABLES).forEach(function(name) {
                var func = GL_VARIABLES[name];
                var init2 = currentState[name];
                var NEXT, CURRENT;
                var block = env.block();
                block(GL, ".", func, "(");
                if (isArrayLike(init2)) {
                  var n = init2.length;
                  NEXT = env.global.def(NEXT_STATE, ".", name);
                  CURRENT = env.global.def(CURRENT_STATE, ".", name);
                  block(
                    loop(n, function(i2) {
                      return NEXT + "[" + i2 + "]";
                    }),
                    ");",
                    loop(n, function(i2) {
                      return CURRENT + "[" + i2 + "]=" + NEXT + "[" + i2 + "];";
                    }).join("")
                  );
                  poll(
                    "if(",
                    loop(n, function(i2) {
                      return NEXT + "[" + i2 + "]!==" + CURRENT + "[" + i2 + "]";
                    }).join("||"),
                    "){",
                    block,
                    "}"
                  );
                } else {
                  NEXT = common.def(NEXT_STATE, ".", name);
                  CURRENT = common.def(CURRENT_STATE, ".", name);
                  block(
                    NEXT,
                    ");",
                    CURRENT_STATE,
                    ".",
                    name,
                    "=",
                    NEXT,
                    ";"
                  );
                  poll(
                    "if(",
                    NEXT,
                    "!==",
                    CURRENT,
                    "){",
                    block,
                    "}"
                  );
                }
                refresh(block);
              });
              return env.compile();
            }(),
            compile: compileCommand
          };
        }
        function stats() {
          return {
            vaoCount: 0,
            bufferCount: 0,
            elementsCount: 0,
            framebufferCount: 0,
            shaderCount: 0,
            textureCount: 0,
            cubeCount: 0,
            renderbufferCount: 0,
            maxTextureUnits: 0
          };
        }
        var GL_QUERY_RESULT_EXT = 34918;
        var GL_QUERY_RESULT_AVAILABLE_EXT = 34919;
        var GL_TIME_ELAPSED_EXT = 35007;
        var createTimer = function(gl, extensions) {
          if (!extensions.ext_disjoint_timer_query) {
            return null;
          }
          var queryPool = [];
          function allocQuery() {
            return queryPool.pop() || extensions.ext_disjoint_timer_query.createQueryEXT();
          }
          function freeQuery(query) {
            queryPool.push(query);
          }
          var pendingQueries = [];
          function beginQuery(stats2) {
            var query = allocQuery();
            extensions.ext_disjoint_timer_query.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
            pendingQueries.push(query);
            pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats2);
          }
          function endQuery() {
            extensions.ext_disjoint_timer_query.endQueryEXT(GL_TIME_ELAPSED_EXT);
          }
          function PendingStats() {
            this.startQueryIndex = -1;
            this.endQueryIndex = -1;
            this.sum = 0;
            this.stats = null;
          }
          var pendingStatsPool = [];
          function allocPendingStats() {
            return pendingStatsPool.pop() || new PendingStats();
          }
          function freePendingStats(pendingStats2) {
            pendingStatsPool.push(pendingStats2);
          }
          var pendingStats = [];
          function pushScopeStats(start2, end, stats2) {
            var ps = allocPendingStats();
            ps.startQueryIndex = start2;
            ps.endQueryIndex = end;
            ps.sum = 0;
            ps.stats = stats2;
            pendingStats.push(ps);
          }
          var timeSum = [];
          var queryPtr = [];
          function update() {
            var ptr, i;
            var n = pendingQueries.length;
            if (n === 0) {
              return;
            }
            queryPtr.length = Math.max(queryPtr.length, n + 1);
            timeSum.length = Math.max(timeSum.length, n + 1);
            timeSum[0] = 0;
            queryPtr[0] = 0;
            var queryTime = 0;
            ptr = 0;
            for (i = 0; i < pendingQueries.length; ++i) {
              var query = pendingQueries[i];
              if (extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_AVAILABLE_EXT)) {
                queryTime += extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_EXT);
                freeQuery(query);
              } else {
                pendingQueries[ptr++] = query;
              }
              timeSum[i + 1] = queryTime;
              queryPtr[i + 1] = ptr;
            }
            pendingQueries.length = ptr;
            ptr = 0;
            for (i = 0; i < pendingStats.length; ++i) {
              var stats2 = pendingStats[i];
              var start2 = stats2.startQueryIndex;
              var end = stats2.endQueryIndex;
              stats2.sum += timeSum[end] - timeSum[start2];
              var startPtr = queryPtr[start2];
              var endPtr = queryPtr[end];
              if (endPtr === startPtr) {
                stats2.stats.gpuTime += stats2.sum / 1e6;
                freePendingStats(stats2);
              } else {
                stats2.startQueryIndex = startPtr;
                stats2.endQueryIndex = endPtr;
                pendingStats[ptr++] = stats2;
              }
            }
            pendingStats.length = ptr;
          }
          return {
            beginQuery,
            endQuery,
            pushScopeStats,
            update,
            getNumPendingQueries: function() {
              return pendingQueries.length;
            },
            clear: function() {
              queryPool.push.apply(queryPool, pendingQueries);
              for (var i = 0; i < queryPool.length; i++) {
                extensions.ext_disjoint_timer_query.deleteQueryEXT(queryPool[i]);
              }
              pendingQueries.length = 0;
              queryPool.length = 0;
            },
            restore: function() {
              pendingQueries.length = 0;
              queryPool.length = 0;
            }
          };
        };
        var GL_COLOR_BUFFER_BIT = 16384;
        var GL_DEPTH_BUFFER_BIT = 256;
        var GL_STENCIL_BUFFER_BIT = 1024;
        var GL_ARRAY_BUFFER = 34962;
        var CONTEXT_LOST_EVENT = "webglcontextlost";
        var CONTEXT_RESTORED_EVENT = "webglcontextrestored";
        var DYN_PROP = 1;
        var DYN_CONTEXT = 2;
        var DYN_STATE = 3;
        function find2(haystack, needle) {
          for (var i = 0; i < haystack.length; ++i) {
            if (haystack[i] === needle) {
              return i;
            }
          }
          return -1;
        }
        function wrapREGL(args) {
          var config2 = parseArgs(args);
          if (!config2) {
            return null;
          }
          var gl = config2.gl;
          var glAttributes = gl.getContextAttributes();
          var contextLost = gl.isContextLost();
          var extensionState = createExtensionCache(gl, config2);
          if (!extensionState) {
            return null;
          }
          var stringStore = createStringStore();
          var stats$$1 = stats();
          var extensions = extensionState.extensions;
          var timer2 = createTimer(gl, extensions);
          var START_TIME = clock2();
          var WIDTH = gl.drawingBufferWidth;
          var HEIGHT = gl.drawingBufferHeight;
          var contextState = {
            tick: 0,
            time: 0,
            viewportWidth: WIDTH,
            viewportHeight: HEIGHT,
            framebufferWidth: WIDTH,
            framebufferHeight: HEIGHT,
            drawingBufferWidth: WIDTH,
            drawingBufferHeight: HEIGHT,
            pixelRatio: config2.pixelRatio
          };
          var uniformState = {};
          var drawState = {
            elements: null,
            primitive: 4,
            count: -1,
            offset: 0,
            instances: -1
          };
          var limits = wrapLimits(gl, extensions);
          var bufferState = wrapBufferState(
            gl,
            stats$$1,
            config2,
            destroyBuffer
          );
          var elementState = wrapElementsState(gl, extensions, bufferState, stats$$1);
          var attributeState = wrapAttributeState(
            gl,
            extensions,
            limits,
            stats$$1,
            bufferState,
            elementState,
            drawState
          );
          function destroyBuffer(buffer) {
            return attributeState.destroyBuffer(buffer);
          }
          var shaderState = wrapShaderState(gl, stringStore, stats$$1, config2);
          var textureState = createTextureSet(
            gl,
            extensions,
            limits,
            function() {
              core.procs.poll();
            },
            contextState,
            stats$$1,
            config2
          );
          var renderbufferState = wrapRenderbuffers(gl, extensions, limits, stats$$1, config2);
          var framebufferState = wrapFBOState(
            gl,
            extensions,
            limits,
            textureState,
            renderbufferState,
            stats$$1
          );
          var core = reglCore(
            gl,
            stringStore,
            extensions,
            limits,
            bufferState,
            elementState,
            textureState,
            framebufferState,
            uniformState,
            attributeState,
            shaderState,
            drawState,
            contextState,
            timer2,
            config2
          );
          var readPixels2 = wrapReadPixels(
            gl,
            framebufferState,
            core.procs.poll,
            contextState,
            glAttributes,
            extensions,
            limits
          );
          var nextState = core.next;
          var canvas2 = gl.canvas;
          var rafCallbacks = [];
          var lossCallbacks = [];
          var restoreCallbacks = [];
          var destroyCallbacks = [config2.onDestroy];
          var activeRAF = null;
          function handleRAF() {
            if (rafCallbacks.length === 0) {
              if (timer2) {
                timer2.update();
              }
              activeRAF = null;
              return;
            }
            activeRAF = raf.next(handleRAF);
            poll();
            for (var i = rafCallbacks.length - 1; i >= 0; --i) {
              var cb = rafCallbacks[i];
              if (cb) {
                cb(contextState, null, 0);
              }
            }
            gl.flush();
            if (timer2) {
              timer2.update();
            }
          }
          function startRAF() {
            if (!activeRAF && rafCallbacks.length > 0) {
              activeRAF = raf.next(handleRAF);
            }
          }
          function stopRAF() {
            if (activeRAF) {
              raf.cancel(handleRAF);
              activeRAF = null;
            }
          }
          function handleContextLoss(event) {
            event.preventDefault();
            contextLost = true;
            stopRAF();
            lossCallbacks.forEach(function(cb) {
              cb();
            });
          }
          function handleContextRestored(event) {
            gl.getError();
            contextLost = false;
            extensionState.restore();
            shaderState.restore();
            bufferState.restore();
            textureState.restore();
            renderbufferState.restore();
            framebufferState.restore();
            attributeState.restore();
            if (timer2) {
              timer2.restore();
            }
            core.procs.refresh();
            startRAF();
            restoreCallbacks.forEach(function(cb) {
              cb();
            });
          }
          if (canvas2) {
            canvas2.addEventListener(CONTEXT_LOST_EVENT, handleContextLoss, false);
            canvas2.addEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored, false);
          }
          function destroy() {
            rafCallbacks.length = 0;
            stopRAF();
            if (canvas2) {
              canvas2.removeEventListener(CONTEXT_LOST_EVENT, handleContextLoss);
              canvas2.removeEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored);
            }
            shaderState.clear();
            framebufferState.clear();
            renderbufferState.clear();
            attributeState.clear();
            textureState.clear();
            elementState.clear();
            bufferState.clear();
            if (timer2) {
              timer2.clear();
            }
            destroyCallbacks.forEach(function(cb) {
              cb();
            });
          }
          function compileProcedure(options) {
            check$1(!!options, "invalid args to regl({...})");
            check$1.type(options, "object", "invalid args to regl({...})");
            function flattenNestedOptions(options2) {
              var result = extend2({}, options2);
              delete result.uniforms;
              delete result.attributes;
              delete result.context;
              delete result.vao;
              if ("stencil" in result && result.stencil.op) {
                result.stencil.opBack = result.stencil.opFront = result.stencil.op;
                delete result.stencil.op;
              }
              function merge(name) {
                if (name in result) {
                  var child = result[name];
                  delete result[name];
                  Object.keys(child).forEach(function(prop) {
                    result[name + "." + prop] = child[prop];
                  });
                }
              }
              merge("blend");
              merge("depth");
              merge("cull");
              merge("stencil");
              merge("polygonOffset");
              merge("scissor");
              merge("sample");
              if ("vao" in options2) {
                result.vao = options2.vao;
              }
              return result;
            }
            function separateDynamic(object, useArrays) {
              var staticItems = {};
              var dynamicItems = {};
              Object.keys(object).forEach(function(option) {
                var value = object[option];
                if (dynamic.isDynamic(value)) {
                  dynamicItems[option] = dynamic.unbox(value, option);
                  return;
                } else if (useArrays && Array.isArray(value)) {
                  for (var i = 0; i < value.length; ++i) {
                    if (dynamic.isDynamic(value[i])) {
                      dynamicItems[option] = dynamic.unbox(value, option);
                      return;
                    }
                  }
                }
                staticItems[option] = value;
              });
              return {
                dynamic: dynamicItems,
                static: staticItems
              };
            }
            var context = separateDynamic(options.context || {}, true);
            var uniforms = separateDynamic(options.uniforms || {}, true);
            var attributes = separateDynamic(options.attributes || {}, false);
            var opts = separateDynamic(flattenNestedOptions(options), false);
            var stats$$12 = {
              gpuTime: 0,
              cpuTime: 0,
              count: 0
            };
            var compiled = core.compile(opts, attributes, uniforms, context, stats$$12);
            var draw = compiled.draw;
            var batch = compiled.batch;
            var scope = compiled.scope;
            var EMPTY_ARRAY = [];
            function reserve(count) {
              while (EMPTY_ARRAY.length < count) {
                EMPTY_ARRAY.push(null);
              }
              return EMPTY_ARRAY;
            }
            function REGLCommand(args2, body) {
              var i;
              if (contextLost) {
                check$1.raise("context lost");
              }
              if (typeof args2 === "function") {
                return scope.call(this, null, args2, 0);
              } else if (typeof body === "function") {
                if (typeof args2 === "number") {
                  for (i = 0; i < args2; ++i) {
                    scope.call(this, null, body, i);
                  }
                } else if (Array.isArray(args2)) {
                  for (i = 0; i < args2.length; ++i) {
                    scope.call(this, args2[i], body, i);
                  }
                } else {
                  return scope.call(this, args2, body, 0);
                }
              } else if (typeof args2 === "number") {
                if (args2 > 0) {
                  return batch.call(this, reserve(args2 | 0), args2 | 0);
                }
              } else if (Array.isArray(args2)) {
                if (args2.length) {
                  return batch.call(this, args2, args2.length);
                }
              } else {
                return draw.call(this, args2);
              }
            }
            return extend2(REGLCommand, {
              stats: stats$$12,
              destroy: function() {
                compiled.destroy();
              }
            });
          }
          var setFBO = framebufferState.setFBO = compileProcedure({
            framebuffer: dynamic.define.call(null, DYN_PROP, "framebuffer")
          });
          function clearImpl(_, options) {
            var clearFlags = 0;
            core.procs.poll();
            var c = options.color;
            if (c) {
              gl.clearColor(+c[0] || 0, +c[1] || 0, +c[2] || 0, +c[3] || 0);
              clearFlags |= GL_COLOR_BUFFER_BIT;
            }
            if ("depth" in options) {
              gl.clearDepth(+options.depth);
              clearFlags |= GL_DEPTH_BUFFER_BIT;
            }
            if ("stencil" in options) {
              gl.clearStencil(options.stencil | 0);
              clearFlags |= GL_STENCIL_BUFFER_BIT;
            }
            check$1(!!clearFlags, "called regl.clear with no buffer specified");
            gl.clear(clearFlags);
          }
          function clear(options) {
            check$1(
              typeof options === "object" && options,
              "regl.clear() takes an object as input"
            );
            if ("framebuffer" in options) {
              if (options.framebuffer && options.framebuffer_reglType === "framebufferCube") {
                for (var i = 0; i < 6; ++i) {
                  setFBO(extend2({
                    framebuffer: options.framebuffer.faces[i]
                  }, options), clearImpl);
                }
              } else {
                setFBO(options, clearImpl);
              }
            } else {
              clearImpl(null, options);
            }
          }
          function frame2(cb) {
            check$1.type(cb, "function", "regl.frame() callback must be a function");
            rafCallbacks.push(cb);
            function cancel() {
              var i = find2(rafCallbacks, cb);
              check$1(i >= 0, "cannot cancel a frame twice");
              function pendingCancel() {
                var index = find2(rafCallbacks, pendingCancel);
                rafCallbacks[index] = rafCallbacks[rafCallbacks.length - 1];
                rafCallbacks.length -= 1;
                if (rafCallbacks.length <= 0) {
                  stopRAF();
                }
              }
              rafCallbacks[i] = pendingCancel;
            }
            startRAF();
            return {
              cancel
            };
          }
          function pollViewport() {
            var viewport = nextState.viewport;
            var scissorBox = nextState.scissor_box;
            viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
            contextState.viewportWidth = contextState.framebufferWidth = contextState.drawingBufferWidth = viewport[2] = scissorBox[2] = gl.drawingBufferWidth;
            contextState.viewportHeight = contextState.framebufferHeight = contextState.drawingBufferHeight = viewport[3] = scissorBox[3] = gl.drawingBufferHeight;
          }
          function poll() {
            contextState.tick += 1;
            contextState.time = now2();
            pollViewport();
            core.procs.poll();
          }
          function refresh() {
            textureState.refresh();
            pollViewport();
            core.procs.refresh();
            if (timer2) {
              timer2.update();
            }
          }
          function now2() {
            return (clock2() - START_TIME) / 1e3;
          }
          refresh();
          function addListener(event, callback) {
            check$1.type(callback, "function", "listener callback must be a function");
            var callbacks;
            switch (event) {
              case "frame":
                return frame2(callback);
              case "lost":
                callbacks = lossCallbacks;
                break;
              case "restore":
                callbacks = restoreCallbacks;
                break;
              case "destroy":
                callbacks = destroyCallbacks;
                break;
              default:
                check$1.raise("invalid event, must be one of frame,lost,restore,destroy");
            }
            callbacks.push(callback);
            return {
              cancel: function() {
                for (var i = 0; i < callbacks.length; ++i) {
                  if (callbacks[i] === callback) {
                    callbacks[i] = callbacks[callbacks.length - 1];
                    callbacks.pop();
                    return;
                  }
                }
              }
            };
          }
          var regl2 = extend2(compileProcedure, {
            clear,
            prop: dynamic.define.bind(null, DYN_PROP),
            context: dynamic.define.bind(null, DYN_CONTEXT),
            this: dynamic.define.bind(null, DYN_STATE),
            draw: compileProcedure({}),
            buffer: function(options) {
              return bufferState.create(options, GL_ARRAY_BUFFER, false, false);
            },
            elements: function(options) {
              return elementState.create(options, false);
            },
            texture: textureState.create2D,
            cube: textureState.createCube,
            renderbuffer: renderbufferState.create,
            framebuffer: framebufferState.create,
            framebufferCube: framebufferState.createCube,
            vao: attributeState.createVAO,
            attributes: glAttributes,
            frame: frame2,
            on: addListener,
            limits,
            hasExtension: function(name) {
              return limits.extensions.indexOf(name.toLowerCase()) >= 0;
            },
            read: readPixels2,
            destroy,
            _gl: gl,
            _refresh: refresh,
            poll: function() {
              poll();
              if (timer2) {
                timer2.update();
              }
            },
            now: now2,
            stats: stats$$1
          });
          config2.onDone(null, regl2);
          return regl2;
        }
        return wrapREGL;
      });
    }
  });

  // node_modules/d3-selection/src/namespaces.js
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces_default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
      name = name.slice(i + 1);
    return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
  }

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/array.js
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  // node_modules/d3-selection/src/selectorAll.js
  function empty() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function")
      select = arrayAll(select);
    else
      select = selectorAll_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          subgroups.push(select.call(node, node.__data__, i, group2));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectChild.js
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/selectChildren.js
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update) {
    return new Array(update.length);
  }

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  // node_modules/d3-selection/src/constant.js
  function constant_default(x) {
    return function() {
      return x;
    };
  }

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group2, enter, update, exit, data) {
    var i = 0, node, groupLength = group2.length, dataLength = data.length;
    for (; i < dataLength; ++i) {
      if (node = group2[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group2[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group2, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group2.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group2[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length)
      return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function")
      value = constant_default(value);
    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j], group2 = groups[j], groupLength = group2.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group2, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1)
            i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength)
            ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter)
        enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update)
        update = update.selection();
    }
    if (onexit == null)
      exit.remove();
    else
      onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection(merges, this._parents);
  }

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
      for (var group2 = groups[j], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
        if (node = group2[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4)
            next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare)
      compare = ascending;
    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group2 = groups[j], i = 0, n = group2.length; i < n; ++i) {
        var node = group2[i];
        if (node)
          return node;
      }
    }
    return null;
  }

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this)
      ++size;
    return size;
  }

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback) {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group2 = groups[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          callback.call(node, node.__data__, i, group2);
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttribute(name);
      else
        this.setAttribute(name, v);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttributeNS(fullname.space, fullname.local);
      else
        this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.style.removeProperty(name);
      else
        this.style.setProperty(name, v, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        delete this[name];
      else
        this[name] = v;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n)
        if (!list.contains(names[i]))
          return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling)
      this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling)
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create3 = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create3.apply(this, arguments));
    });
  }

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create3 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create3.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent)
      parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone2 = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
  }
  function selection_cloneDeep() {
    var clone2 = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      return { type: t, name };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on)
        return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i)
        on.length = i;
      else
        delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on)
        for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, options);
      o = { type: typename.type, name: typename.name, value, listener, options };
      if (!on)
        this.__on = [o];
      else
        on.push(o);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i)
      this.each(on(typenames[i], value, options));
    return this;
  }

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type, params) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params)
        event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else
        event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }
  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }
  function dispatch_default(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group2 = groups[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          yield node;
      }
    }
  }

  // node_modules/d3-selection/src/selection/index.js
  var root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: select_default,
    selectAll: selectAll_default,
    selectChild: selectChild_default,
    selectChildren: selectChildren_default,
    filter: filter_default,
    data: data_default,
    enter: enter_default,
    exit: exit_default,
    join: join_default,
    merge: merge_default,
    selection: selection_selection,
    order: order_default,
    sort: sort_default,
    call: call_default,
    nodes: nodes_default,
    node: node_default,
    size: size_default,
    empty: empty_default,
    each: each_default,
    attr: attr_default,
    style: style_default,
    property: property_default,
    classed: classed_default,
    text: text_default,
    html: html_default,
    raise: raise_default,
    lower: lower_default,
    append: append_default,
    insert: insert_default,
    remove: remove_default,
    clone: clone_default,
    datum: datum_default,
    on: on_default,
    dispatch: dispatch_default,
    [Symbol.iterator]: iterator_default
  };
  var selection_default = selection;

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  // node_modules/d3-selection/src/sourceEvent.js
  function sourceEvent_default(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent)
      event = sourceEvent;
    return event;
  }

  // node_modules/d3-selection/src/pointer.js
  function pointer_default(event, node) {
    event = sourceEvent_default(event);
    if (node === void 0)
      node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  // node_modules/d3-dispatch/src/dispatch.js
  var noop = { value: () => {
  } };
  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
        throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames2(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      return { type: t, name };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._, T = parseTypenames2(typename + "", _), t, i = -1, n = T.length;
      if (arguments.length < 2) {
        while (++i < n)
          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
            return t;
        return;
      }
      if (callback != null && typeof callback !== "function")
        throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type)
          _[t] = set(_[t], typename.name, callback);
        else if (callback == null)
          for (t in _)
            _[t] = set(_[t], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy2 = {}, _ = this._;
      for (var t in _)
        copy2[t] = _[t].slice();
      return new Dispatch(copy2);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0)
        for (var args = new Array(n), i = 0, n, t; i < n; ++i)
          args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type))
        throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type))
        throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    }
  };
  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }
  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null)
      type.push({ name, value: callback });
    return type;
  }
  var dispatch_default2 = dispatch;

  // node_modules/d3-timer/src/timer.js
  var frame = 0;
  var timeout = 0;
  var interval = 0;
  var pokeDelay = 1e3;
  var taskHead;
  var taskTail;
  var clockLast = 0;
  var clockNow = 0;
  var clockSkew = 0;
  var clock = typeof performance === "object" && performance.now ? performance : Date;
  var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function")
        throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail)
          taskTail._next = this;
        else
          taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }
  function timerFlush() {
    now();
    ++frame;
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0)
        t._call.call(void 0, e);
      t = t._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay)
      clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time)
          time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame)
      return;
    if (timeout)
      timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity)
        timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval)
        interval = clearInterval(interval);
    } else {
      if (!interval)
        clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // node_modules/d3-timer/src/timeout.js
  function timeout_default(callback, delay, time) {
    var t = new Timer();
    delay = delay == null ? 0 : +delay;
    t.restart((elapsed) => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  // node_modules/d3-transition/src/transition/schedule.js
  var emptyOn = dispatch_default2("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule_default(node, name, id2, index, group2, timing) {
    var schedules = node.__transition;
    if (!schedules)
      node.__transition = {};
    else if (id2 in schedules)
      return;
    create(node, id2, {
      name,
      index,
      group: group2,
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > CREATED)
      throw new Error("too late; already scheduled");
    return schedule;
  }
  function set2(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > STARTED)
      throw new Error("too late; already running");
    return schedule;
  }
  function get2(node, id2) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id2]))
      throw new Error("transition not found");
    return schedule;
  }
  function create(node, id2, self2) {
    var schedules = node.__transition, tween;
    schedules[id2] = self2;
    self2.timer = timer(schedule, 0, self2.time);
    function schedule(elapsed) {
      self2.state = SCHEDULED;
      self2.timer.restart(start2, self2.delay, self2.time);
      if (self2.delay <= elapsed)
        start2(elapsed - self2.delay);
    }
    function start2(elapsed) {
      var i, j, n, o;
      if (self2.state !== SCHEDULED)
        return stop();
      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self2.name)
          continue;
        if (o.state === STARTED)
          return timeout_default(start2);
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } else if (+i < id2) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }
      timeout_default(function() {
        if (self2.state === STARTED) {
          self2.state = RUNNING;
          self2.timer.restart(tick, self2.delay, self2.time);
          tick(elapsed);
        }
      });
      self2.state = STARTING;
      self2.on.call("start", node, node.__data__, self2.index, self2.group);
      if (self2.state !== STARTING)
        return;
      self2.state = STARTED;
      tween = new Array(n = self2.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }
    function tick(elapsed) {
      var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
      while (++i < n) {
        tween[i].call(node, t);
      }
      if (self2.state === ENDING) {
        self2.on.call("end", node, node.__data__, self2.index, self2.group);
        stop();
      }
    }
    function stop() {
      self2.state = ENDED;
      self2.timer.stop();
      delete schedules[id2];
      for (var i in schedules)
        return;
      delete node.__transition;
    }
  }

  // node_modules/d3-transition/src/interrupt.js
  function interrupt_default(node, name) {
    var schedules = node.__transition, schedule, active, empty2 = true, i;
    if (!schedules)
      return;
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) {
        empty2 = false;
        continue;
      }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }
    if (empty2)
      delete node.__transition;
  }

  // node_modules/d3-transition/src/selection/interrupt.js
  function interrupt_default2(name) {
    return this.each(function() {
      interrupt_default(this, name);
    });
  }

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition)
      prototype[key] = definition[key];
    return prototype;
  }

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*";
  var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
  var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  var reHex = /^#([0-9a-f]{3,8})$/;
  var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
  var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
  var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
  var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
  var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
  var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define_default(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0)
      r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define_default(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0)
      h = s = l = NaN;
    else if (l <= 0 || l >= 1)
      h = s = NaN;
    else if (s <= 0)
      h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl)
      return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Hsl();
    if (o instanceof Hsl)
      return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
      if (r === max)
        h = (g - b) / s + (g < b) * 6;
      else if (g === max)
        h = (b - r) / s + 2;
      else
        h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define_default(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  // node_modules/d3-interpolate/src/basis.js
  function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  function basis_default(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/constant.js
  var constant_default2 = (x) => () => x;

  // node_modules/d3-interpolate/src/color.js
  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }
  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
  }

  // node_modules/d3-interpolate/src/rgb.js
  var rgb_default = function rgbGamma(y) {
    var color2 = gamma(y);
    function rgb2(start2, end) {
      var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.r = r(t);
        start2.g = g(t);
        start2.b = b(t);
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
      for (i = 0; i < n; ++i) {
        color2 = rgb(colors[i]);
        r[i] = color2.r || 0;
        g[i] = color2.g || 0;
        b[i] = color2.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color2.opacity = 1;
      return function(t) {
        color2.r = r(t);
        color2.g = g(t);
        color2.b = b(t);
        return color2 + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis_default);
  var rgbBasisClosed = rgbSpline(basisClosed_default);

  // node_modules/d3-interpolate/src/number.js
  function number_default(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  // node_modules/d3-interpolate/src/string.js
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string_default(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i])
          s[i] += bm;
        else
          s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({ i, x: number_default(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2)
        s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    });
  }

  // node_modules/d3-interpolate/src/transform/decompose.js
  var degrees = 180 / Math.PI;
  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose_default(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b))
      a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d)
      c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d))
      c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c)
      a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX,
      scaleY
    };
  }

  // node_modules/d3-interpolate/src/transform/parse.js
  var svgNode;
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
  }
  function parseSvg(value) {
    if (value == null)
      return identity;
    if (!svgNode)
      svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate()))
      return identity;
    value = value.matrix;
    return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  // node_modules/d3-interpolate/src/transform/index.js
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }
    function translate2(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate2(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180)
          b += 360;
        else if (b - a > 180)
          a += 360;
        q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }
    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }
    function scale2(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a, b) {
      var s = [], q = [];
      a = parse(a), b = parse(b);
      translate2(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate2(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale2(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null;
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n)
          s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  // node_modules/d3-interpolate/src/zoom.js
  var epsilon2 = 1e-12;
  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }
  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }
  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }
  var zoom_default = function zoomRho(rho, rho2, rho4) {
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      } else {
        var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }
      i.duration = S * 1e3 * rho / Math.SQRT2;
      return i;
    }
    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };
    return zoom;
  }(Math.SQRT2, 2, 4);

  // node_modules/d3-transition/src/transition/tween.js
  function tweenRemove(id2, name) {
    var tween0, tween1;
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }
      schedule.tween = tween1;
    };
  }
  function tweenFunction(id2, name, value) {
    var tween0, tween1;
    if (typeof value !== "function")
      throw new Error();
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n)
          tween1.push(t);
      }
      schedule.tween = tween1;
    };
  }
  function tween_default(name, value) {
    var id2 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get2(this.node(), id2).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
  }
  function tweenValue(transition2, name, value) {
    var id2 = transition2._id;
    transition2.each(function() {
      var schedule = set2(this, id2);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get2(node, id2).value[name];
    };
  }

  // node_modules/d3-transition/src/transition/interpolate.js
  function interpolate_default(a, b) {
    var c;
    return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
  }

  // node_modules/d3-transition/src/transition/attr.js
  function attrRemove2(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS2(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrConstantNS2(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attrFunctionNS2(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attr_default2(name, value) {
    var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
  }

  // node_modules/d3-transition/src/transition/attrTween.js
  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }
  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }
  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween_default(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    var fullname = namespace_default(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  // node_modules/d3-transition/src/transition/delay.js
  function delayFunction(id2, value) {
    return function() {
      init(this, id2).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id2, value) {
    return value = +value, function() {
      init(this, id2).delay = value;
    };
  }
  function delay_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
  }

  // node_modules/d3-transition/src/transition/duration.js
  function durationFunction(id2, value) {
    return function() {
      set2(this, id2).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id2, value) {
    return value = +value, function() {
      set2(this, id2).duration = value;
    };
  }
  function duration_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
  }

  // node_modules/d3-transition/src/transition/ease.js
  function easeConstant(id2, value) {
    if (typeof value !== "function")
      throw new Error();
    return function() {
      set2(this, id2).ease = value;
    };
  }
  function ease_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
  }

  // node_modules/d3-transition/src/transition/easeVarying.js
  function easeVarying(id2, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function")
        throw new Error();
      set2(this, id2).ease = v;
    };
  }
  function easeVarying_default(value) {
    if (typeof value !== "function")
      throw new Error();
    return this.each(easeVarying(this._id, value));
  }

  // node_modules/d3-transition/src/transition/filter.js
  function filter_default2(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/merge.js
  function merge_default2(transition2) {
    if (transition2._id !== this._id)
      throw new Error();
    for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/on.js
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0)
        t = t.slice(0, i);
      return !t || t === "start";
    });
  }
  function onFunction(id2, name, listener) {
    var on0, on1, sit = start(name) ? init : set2;
    return function() {
      var schedule = sit(this, id2), on = schedule.on;
      if (on !== on0)
        (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }
  function on_default2(name, listener) {
    var id2 = this._id;
    return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
  }

  // node_modules/d3-transition/src/transition/remove.js
  function removeFunction(id2) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition)
        if (+i !== id2)
          return;
      if (parent)
        parent.removeChild(this);
    };
  }
  function remove_default2() {
    return this.on("end.remove", removeFunction(this._id));
  }

  // node_modules/d3-transition/src/transition/select.js
  function select_default3(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selectAll.js
  function selectAll_default2(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selectorAll_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          for (var children2 = select.call(node, node.__data__, i, group2), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
            if (child = children2[k]) {
              schedule_default(child, name, id2, k, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selection.js
  var Selection2 = selection_default.prototype.constructor;
  function selection_default2() {
    return new Selection2(this._groups, this._parents);
  }

  // node_modules/d3-transition/src/transition/style.js
  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }
  function styleRemove2(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function styleFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null)
        string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id2, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
      if (on !== on0 || listener0 !== listener)
        (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }
  function style_default2(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
  }

  // node_modules/d3-transition/src/transition/styleTween.js
  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }
  function styleTween_default(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  // node_modules/d3-transition/src/transition/text.js
  function textConstant2(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction2(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function text_default2(value) {
    return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
  }

  // node_modules/d3-transition/src/transition/textTween.js
  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }
  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function textTween_default(value) {
    var key = "text";
    if (arguments.length < 1)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, textTween(value));
  }

  // node_modules/d3-transition/src/transition/transition.js
  function transition_default() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          var inherit2 = get2(node, id0);
          schedule_default(node, name, id1, i, group2, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups, this._parents, name, id1);
  }

  // node_modules/d3-transition/src/transition/end.js
  function end_default() {
    var on0, on1, that = this, id2 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = { value: reject }, end = { value: function() {
        if (--size === 0)
          resolve();
      } };
      that.each(function() {
        var schedule = set2(this, id2), on = schedule.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule.on = on1;
      });
      if (size === 0)
        resolve();
    });
  }

  // node_modules/d3-transition/src/transition/index.js
  var id = 0;
  function Transition(groups, parents, name, id2) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id2;
  }
  function transition(name) {
    return selection_default().transition(name);
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection_default.prototype;
  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: select_default3,
    selectAll: selectAll_default2,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: filter_default2,
    merge: merge_default2,
    selection: selection_default2,
    transition: transition_default,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: on_default2,
    attr: attr_default2,
    attrTween: attrTween_default,
    style: style_default2,
    styleTween: styleTween_default,
    text: text_default2,
    textTween: textTween_default,
    remove: remove_default2,
    tween: tween_default,
    delay: delay_default,
    duration: duration_default,
    ease: ease_default,
    easeVarying: easeVarying_default,
    end: end_default,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  // node_modules/d3-ease/src/cubic.js
  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  // node_modules/d3-transition/src/selection/transition.js
  var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(node, id2) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id2])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id2} not found`);
      }
    }
    return timing;
  }
  function transition_default2(name) {
    var id2, timing;
    if (name instanceof Transition) {
      id2 = name._id, name = name._name;
    } else {
      id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group2 = groups[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          schedule_default(node, name, id2, i, group2, timing || inherit(node, id2));
        }
      }
    }
    return new Transition(groups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/selection/index.js
  selection_default.prototype.interrupt = interrupt_default2;
  selection_default.prototype.transition = transition_default2;

  // node_modules/d3-drag/src/noevent.js
  var nonpassivecapture = { capture: true, passive: false };
  function noevent_default(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // node_modules/d3-drag/src/nodrag.js
  function nodrag_default(view) {
    var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
    } else {
      root2.__noselect = root2.style.MozUserSelect;
      root2.style.MozUserSelect = "none";
    }
  }
  function yesdrag(view, noclick) {
    var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
    if (noclick) {
      selection2.on("click.drag", noevent_default, nonpassivecapture);
      setTimeout(function() {
        selection2.on("click.drag", null);
      }, 0);
    }
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", null);
    } else {
      root2.style.MozUserSelect = root2.__noselect;
      delete root2.__noselect;
    }
  }

  // node_modules/d3-zoom/src/constant.js
  var constant_default3 = (x) => () => x;

  // node_modules/d3-zoom/src/event.js
  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform: transform2,
    dispatch: dispatch2
  }) {
    Object.defineProperties(this, {
      type: { value: type, enumerable: true, configurable: true },
      sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
      target: { value: target, enumerable: true, configurable: true },
      transform: { value: transform2, enumerable: true, configurable: true },
      _: { value: dispatch2 }
    });
  }

  // node_modules/d3-zoom/src/transform.js
  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var identity2 = new Transform(1, 0, 0);
  transform.prototype = Transform.prototype;
  function transform(node) {
    while (!node.__zoom)
      if (!(node = node.parentNode))
        return identity2;
    return node.__zoom;
  }

  // node_modules/d3-zoom/src/noevent.js
  function nopropagation(event) {
    event.stopImmediatePropagation();
  }
  function noevent_default2(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // node_modules/d3-zoom/src/zoom.js
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === "wheel") && !event.button;
  }
  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }
  function defaultTransform() {
    return this.__zoom || identity2;
  }
  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
  }
  function defaultTouchable() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function defaultConstrain(transform2, extent, translateExtent) {
    var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
    return transform2.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }
  function zoom_default2() {
    var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default2("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
    function zoom(selection2) {
      selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    zoom.transform = function(collection, transform2, point, event) {
      var selection2 = collection.selection ? collection.selection() : collection;
      selection2.property("__zoom", defaultTransform);
      if (collection !== selection2) {
        schedule(collection, transform2, point, event);
      } else {
        selection2.interrupt().each(function() {
          gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
        });
      }
    };
    zoom.scaleBy = function(selection2, k, p, event) {
      zoom.scaleTo(selection2, function() {
        var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };
    zoom.scaleTo = function(selection2, k, p, event) {
      zoom.transform(selection2, function() {
        var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate2(scale2(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };
    zoom.translateBy = function(selection2, x, y, event) {
      zoom.transform(selection2, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };
    zoom.translateTo = function(selection2, x, y, p, event) {
      zoom.transform(selection2, function() {
        var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity2.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };
    function scale2(transform2, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
    }
    function translate2(transform2, p0, p1) {
      var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
      return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
    }
    function centroid(extent2) {
      return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
    }
    function schedule(transition2, transform2, point, event) {
      transition2.on("start.zoom", function() {
        gesture(this, arguments).event(event).start();
      }).on("interrupt.zoom end.zoom", function() {
        gesture(this, arguments).event(event).end();
      }).tween("zoom", function() {
        var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
        return function(t) {
          if (t === 1)
            t = b;
          else {
            var l = i(t), k = w / l[2];
            t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
          }
          g.zoom(null, t);
        };
      });
    }
    function gesture(that, args, clean) {
      return !clean && that.__zooming || new Gesture(that, args);
    }
    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }
    Gesture.prototype = {
      event: function(event) {
        if (event)
          this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform2) {
        if (this.mouse && key !== "mouse")
          this.mouse[1] = transform2.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch")
          this.touch0[1] = transform2.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch")
          this.touch1[1] = transform2.invert(this.touch1[0]);
        this.that.__zoom = transform2;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select_default2(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };
    function wheeled(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      } else if (t.k === k)
        return;
      else {
        g.mouse = [p, t.invert(p)];
        interrupt_default(this);
        g.start();
      }
      noevent_default2(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate2(scale2(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }
    function mousedowned(event, ...args) {
      if (touchending || !filter2.apply(this, arguments))
        return;
      var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
      nodrag_default(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt_default(this);
      g.start();
      function mousemoved(event2) {
        noevent_default2(event2);
        if (!g.moved) {
          var dx = event2.clientX - x0, dy = event2.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event2).zoom("mouse", constrain(translate2(g.that.__zoom, g.mouse[0] = pointer_default(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }
      function mouseupped(event2) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event2.view, g.moved);
        noevent_default2(event2);
        g.event(event2).end();
      }
    }
    function dblclicked(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate2(scale2(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
      noevent_default2(event);
      if (duration > 0)
        select_default2(this).transition().duration(duration).call(schedule, t1, p0, event);
      else
        select_default2(this).call(zoom.transform, t1, p0, event);
    }
    function touchstarted(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer_default(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0)
          g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2])
          g.touch1 = p, g.taps = 0;
      }
      if (touchstarting)
        touchstarting = clearTimeout(touchstarting);
      if (started) {
        if (g.taps < 2)
          touchfirst = p[0], touchstarting = setTimeout(function() {
            touchstarting = null;
          }, touchDelay);
        interrupt_default(this);
        g.start();
      }
    }
    function touchmoved(event, ...args) {
      if (!this.__zooming)
        return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
      noevent_default2(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer_default(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier)
          g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier)
          g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale2(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      } else if (g.touch0)
        p = g.touch0[0], l = g.touch0[1];
      else
        return;
      g.zoom("touch", constrain(translate2(t, p, l), g.extent, translateExtent));
    }
    function touchended(event, ...args) {
      if (!this.__zooming)
        return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
      nopropagation(event);
      if (touchending)
        clearTimeout(touchending);
      touchending = setTimeout(function() {
        touchending = null;
      }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier)
          delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier)
          delete g.touch1;
      }
      if (g.touch1 && !g.touch0)
        g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0)
        g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        if (g.taps === 2) {
          t = pointer_default(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select_default2(this).on("dblclick.zoom");
            if (p)
              p.apply(this, arguments);
          }
        }
      }
    }
    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default3(+_), zoom) : wheelDelta;
    };
    zoom.filter = function(_) {
      return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default3(!!_), zoom) : filter2;
    };
    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default3(!!_), zoom) : touchable;
    };
    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default3([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };
    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };
    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };
    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };
    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };
    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };
    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };
    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };
    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };
    return zoom;
  }

  // node_modules/@cosmograph/cosmos/dist/index.js
  var import_regl = __toESM(require_regl());

  // node_modules/gl-matrix/esm/common.js
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var degree = Math.PI / 180;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0, i = arguments.length;
      while (i--) {
        y += arguments[i] * arguments[i];
      }
      return Math.sqrt(y);
    };

  // node_modules/gl-matrix/esm/mat3.js
  var mat3_exports = {};
  __export(mat3_exports, {
    add: () => add,
    adjoint: () => adjoint,
    clone: () => clone,
    copy: () => copy,
    create: () => create2,
    determinant: () => determinant,
    equals: () => equals,
    exactEquals: () => exactEquals,
    frob: () => frob,
    fromMat2d: () => fromMat2d,
    fromMat4: () => fromMat4,
    fromQuat: () => fromQuat,
    fromRotation: () => fromRotation,
    fromScaling: () => fromScaling,
    fromTranslation: () => fromTranslation,
    fromValues: () => fromValues,
    identity: () => identity3,
    invert: () => invert,
    mul: () => mul,
    multiply: () => multiply,
    multiplyScalar: () => multiplyScalar,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd,
    normalFromMat4: () => normalFromMat4,
    projection: () => projection,
    rotate: () => rotate,
    scale: () => scale,
    set: () => set3,
    str: () => str,
    sub: () => sub,
    subtract: () => subtract,
    translate: () => translate,
    transpose: () => transpose
  });
  function create2() {
    var out = new ARRAY_TYPE(9);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  function clone(a) {
    var out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function set3(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function identity3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function transpose(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20;
    var det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate(out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale(out, a, v) {
    var x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  function fromRotation(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  function normalFromMat4(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  function str(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
  }
  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  function multiplyScalarAndAdd(out, a, b, scale2) {
    out[0] = a[0] + b[0] * scale2;
    out[1] = a[1] + b[1] * scale2;
    out[2] = a[2] + b[2] * scale2;
    out[3] = a[3] + b[3] * scale2;
    out[4] = a[4] + b[4] * scale2;
    out[5] = a[5] + b[5] * scale2;
    out[6] = a[6] + b[6] * scale2;
    out[7] = a[7] + b[7] * scale2;
    out[8] = a[8] + b[8] * scale2;
    return out;
  }
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
  }
  var mul = multiply;
  var sub = subtract;

  // node_modules/@cosmograph/cosmos/dist/index.js
  var defaultNodeColor = "#b3b3b3";
  var defaultNodeSize = 4;
  var defaultLinkColor = "#666666";
  var defaultLinkWidth = 1;
  var defaultBackgroundColor = "#222222";
  var defaultConfigValues = {
    spaceSize: 4096,
    nodeSizeScale: 1,
    linkWidthScale: 1,
    arrowSizeScale: 1,
    renderLinks: true,
    arrowLinks: true,
    linkVisibilityDistanceRange: [50, 150],
    linkVisibilityMinTransparency: 0.25,
    useQuadtree: false,
    simulation: {
      decay: 1e3,
      gravity: 0,
      center: 0,
      repulsion: 0.1,
      repulsionTheta: 1.7,
      repulsionQuadtreeLevels: 12,
      linkSpring: 1,
      linkDistance: 2,
      linkDistRandomVariationRange: [1, 1.2],
      repulsionFromMouse: 2,
      friction: 0.85
    },
    showFPSMonitor: false,
    pixelRatio: 2
  };
  var GraphConfig = class {
    constructor() {
      this.backgroundColor = defaultBackgroundColor;
      this.spaceSize = defaultConfigValues.spaceSize;
      this.nodeColor = defaultNodeColor;
      this.nodeSize = defaultNodeSize;
      this.nodeSizeScale = defaultConfigValues.nodeSizeScale;
      this.linkColor = defaultLinkColor;
      this.linkWidth = defaultLinkWidth;
      this.linkWidthScale = defaultConfigValues.linkWidthScale;
      this.renderLinks = defaultConfigValues.renderLinks;
      this.linkArrows = defaultConfigValues.arrowLinks;
      this.linkArrowsSizeScale = defaultConfigValues.arrowSizeScale;
      this.linkVisibilityDistanceRange = defaultConfigValues.linkVisibilityDistanceRange;
      this.linkVisibilityMinTransparency = defaultConfigValues.linkVisibilityMinTransparency;
      this.useQuadtree = defaultConfigValues.useQuadtree;
      this.simulation = {
        decay: defaultConfigValues.simulation.decay,
        gravity: defaultConfigValues.simulation.gravity,
        center: defaultConfigValues.simulation.center,
        repulsion: defaultConfigValues.simulation.repulsion,
        repulsionTheta: defaultConfigValues.simulation.repulsionTheta,
        repulsionQuadtreeLevels: defaultConfigValues.simulation.repulsionQuadtreeLevels,
        linkSpring: defaultConfigValues.simulation.linkSpring,
        linkDistance: defaultConfigValues.simulation.linkDistance,
        linkDistRandomVariationRange: defaultConfigValues.simulation.linkDistRandomVariationRange,
        repulsionFromMouse: defaultConfigValues.simulation.repulsionFromMouse,
        friction: defaultConfigValues.simulation.friction,
        onStart: void 0,
        onTick: void 0,
        onEnd: void 0,
        onPause: void 0,
        onRestart: void 0
      };
      this.events = {
        onClick: void 0
      };
      this.showFPSMonitor = defaultConfigValues.showFPSMonitor;
      this.pixelRatio = defaultConfigValues.pixelRatio;
    }
    init(config2) {
      const currentConfig = this.getConfig();
      const keys = Object.keys(config2).map((key) => key);
      keys.forEach((key) => {
        if (typeof currentConfig[key] === "object") {
          currentConfig[key] = {
            ...currentConfig[key],
            ...config2[key]
          };
        } else {
          currentConfig[key] = config2[key];
        }
      });
      return currentConfig;
    }
    getConfig() {
      return this;
    }
  };
  function isFunction(value) {
    return typeof value === "function";
  }
  function getValue(d, accessor, index) {
    if (isFunction(accessor))
      return accessor(d, index);
    else
      return accessor;
  }
  function getRgbaColor(value) {
    var _a;
    let rgba2;
    if (Array.isArray(value)) {
      rgba2 = value;
    } else {
      const color$1 = color(value);
      const rgb2 = color$1 === null || color$1 === void 0 ? void 0 : color$1.rgb();
      rgba2 = [(rgb2 === null || rgb2 === void 0 ? void 0 : rgb2.r) || 0, (rgb2 === null || rgb2 === void 0 ? void 0 : rgb2.g) || 0, (rgb2 === null || rgb2 === void 0 ? void 0 : rgb2.b) || 0, (_a = color$1 === null || color$1 === void 0 ? void 0 : color$1.opacity) !== null && _a !== void 0 ? _a : 1];
    }
    return [
      rgba2[0] / 255,
      rgba2[1] / 255,
      rgba2[2] / 255,
      rgba2[3]
    ];
  }
  function readPixels(reglInstance, fbo) {
    let resultPixels = new Float32Array();
    reglInstance({ framebuffer: fbo })(() => {
      resultPixels = reglInstance.read();
    });
    return resultPixels;
  }
  function group(array2, accessor) {
    const groups = /* @__PURE__ */ new Map();
    array2.forEach((item) => {
      const key = accessor(item);
      const group2 = groups.get(key);
      if (group2)
        group2.push(item);
      else
        groups.set(key, [item]);
    });
    return groups;
  }
  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }
  var CoreModule = class {
    constructor(reglInstance, config2, store, data, points) {
      this.reglInstance = reglInstance;
      this.config = config2;
      this.store = store;
      this.data = data;
      if (points)
        this.points = points;
    }
  };
  var calculateCentermassFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nvarying vec4 rgba;void main(){gl_FragColor=rgba;}";
  var calculateCentermassVert = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform float pointsTextureSize;attribute vec2 indexes;varying vec4 rgba;void main(){vec4 pointPosition=texture2D(position,indexes/pointsTextureSize);rgba=vec4(pointPosition.xy,1.0,0.0);gl_Position=vec4(0.0,0.0,0.0,1.0);gl_PointSize=1.0;}";
  var forceFrag$5 = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform sampler2D centermass;uniform float center;uniform float alpha;varying vec2 index;void main(){vec4 pointPosition=texture2D(position,index);vec4 velocity=vec4(0.0);vec4 centermassValues=texture2D(centermass,vec2(0.0));vec2 centermassPosition=centermassValues.xy/centermassValues.b;vec2 distVector=centermassPosition-pointPosition.xy;float dist=sqrt(dot(distVector,distVector));if(dist>0.0){float angle=atan(distVector.y,distVector.x);float addV=alpha*center*dist*0.01;velocity.rg+=addV*vec2(cos(angle),sin(angle));}gl_FragColor=velocity;}";
  function createQuadBuffer(reglInstance) {
    const quadBuffer = reglInstance.buffer(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]));
    return {
      buffer: quadBuffer,
      size: 2
    };
  }
  function createIndexesBuffer(reglInstance, textureSize) {
    const indexes = new Float32Array(textureSize * textureSize * 2);
    for (let y = 0; y < textureSize; y++) {
      for (let x = 0; x < textureSize; x++) {
        const i = y * textureSize * 2 + x * 2;
        indexes[i + 0] = x;
        indexes[i + 1] = y;
      }
    }
    const indexBuffer = reglInstance.buffer(indexes);
    return {
      buffer: indexBuffer,
      size: 2
    };
  }
  var clearFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nvarying vec2 index;void main(){gl_FragColor=vec4(0.0);}";
  var updateVert = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nattribute vec2 quad;varying vec2 index;void main(){index=(quad+1.0)/2.0;gl_Position=vec4(quad,0,1);}";
  var ForceCenter = class extends CoreModule {
    create() {
      const { reglInstance } = this;
      this.centermassFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: new Float32Array(4).fill(0),
          shape: [1, 1, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
    }
    initPrograms() {
      const { reglInstance, config: config2, store, data, points } = this;
      this.clearCentermassCommand = reglInstance({
        frag: clearFrag,
        vert: updateVert,
        framebuffer: this.centermassFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) }
      });
      this.calculateCentermassCommand = reglInstance({
        frag: calculateCentermassFrag,
        vert: calculateCentermassVert,
        framebuffer: () => this.centermassFbo,
        primitive: "points",
        count: () => data.nodes.length,
        attributes: { indexes: createIndexesBuffer(reglInstance, store.pointsTextureSize) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          pointsTextureSize: () => store.pointsTextureSize
        },
        blend: {
          enable: true,
          func: {
            src: "one",
            dst: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: { enable: false, mask: false },
        stencil: { enable: false }
      });
      this.runCommand = reglInstance({
        frag: forceFrag$5,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          centermass: () => this.centermassFbo,
          center: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.center;
          },
          alpha: () => store.alpha
        }
      });
    }
    run() {
      var _a, _b, _c;
      (_a = this.clearCentermassCommand) === null || _a === void 0 ? void 0 : _a.call(this);
      (_b = this.calculateCentermassCommand) === null || _b === void 0 ? void 0 : _b.call(this);
      (_c = this.runCommand) === null || _c === void 0 ? void 0 : _c.call(this);
    }
    destroy() {
      var _a;
      (_a = this.centermassFbo) === null || _a === void 0 ? void 0 : _a.destroy();
    }
  };
  var forceFrag$4 = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform float gravity;uniform float spaceSize;uniform float alpha;varying vec2 index;void main(){vec4 pointPosition=texture2D(position,index);vec4 velocity=vec4(0.0);vec2 centerPosition=vec2(spaceSize/2.0);vec2 distVector=centerPosition-pointPosition.rg;float dist=sqrt(dot(distVector,distVector));if(dist>0.0){float angle=atan(distVector.y,distVector.x);float addV=alpha*gravity*dist*0.1;velocity.rg+=addV*vec2(cos(angle),sin(angle));}gl_FragColor=velocity;}";
  var ForceGravity = class extends CoreModule {
    initPrograms() {
      const { reglInstance, config: config2, store, points } = this;
      this.runCommand = reglInstance({
        frag: forceFrag$4,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          gravity: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.gravity;
          },
          spaceSize: () => config2.spaceSize,
          alpha: () => store.alpha
        }
      });
    }
    run() {
      var _a;
      (_a = this.runCommand) === null || _a === void 0 ? void 0 : _a.call(this);
    }
  };
  function forceFrag$3(maxLinks) {
    return `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D position;
uniform float linkSpring;
uniform float linkDistance;
uniform vec2 linkDistRandomVariationRange;

uniform sampler2D linkFirstIndicesAndAmount;
uniform sampler2D linkIndices;
uniform sampler2D linkBiasAndStrength;
uniform sampler2D linkRandomDistanceFbo;

uniform float pointsTextureSize;
uniform float linksTextureSize;
uniform float alpha;

varying vec2 index;

const float MAX_LINKS = ${maxLinks}.0;

void main() {
  vec4 pointPosition = texture2D(position, index);
  vec4 velocity = vec4(0.0);

  vec4 linkFirstIJAndAmount = texture2D(linkFirstIndicesAndAmount, index);
  float iCount = linkFirstIJAndAmount.r;
  float jCount = linkFirstIJAndAmount.g;
  float linkAmount = linkFirstIJAndAmount.b;
  if (linkAmount > 0.0) {
    for (float i = 0.0; i < MAX_LINKS; i += 1.0) {
      if (i < linkAmount) {
        if (iCount >= linksTextureSize) {
          iCount = 0.0;
          jCount += 1.0;
        }
        vec2 linkTextureIndex = (vec2(iCount, jCount) + 0.5) / linksTextureSize;
        vec4 connectedPointIndex = texture2D(linkIndices, linkTextureIndex);
        vec4 biasAndStrength = texture2D(linkBiasAndStrength, linkTextureIndex);
        vec4 randomMinDistance = texture2D(linkRandomDistanceFbo, linkTextureIndex);
        float bias = biasAndStrength.r;
        float strength = biasAndStrength.g;
        float randomMinLinkDist = randomMinDistance.r * (linkDistRandomVariationRange.g - linkDistRandomVariationRange.r) + linkDistRandomVariationRange.r;
        randomMinLinkDist *= linkDistance;

        iCount += 1.0;

        vec4 connectedPointPosition = texture2D(position, (connectedPointIndex.rg + 0.5) / pointsTextureSize);
        float x = connectedPointPosition.x - (pointPosition.x + velocity.x);
        float y = connectedPointPosition.y - (pointPosition.y + velocity.y);
        float l = sqrt(x * x + y * y);
        l = max(l, randomMinLinkDist * 0.99);
        l = (l - randomMinLinkDist) / l;
        l *= linkSpring * alpha;
        l *= strength;
        l *= bias;
        x *= l;
        y *= l;
        velocity.x += x;
        velocity.y += y;
      }
    }
  }

  gl_FragColor = vec4(velocity.rg, 0.0, 0.0);
}
  `;
  }
  var LinkDirection;
  (function(LinkDirection2) {
    LinkDirection2["OUTCOMING"] = "outcoming";
    LinkDirection2["INCOMING"] = "incoming";
  })(LinkDirection || (LinkDirection = {}));
  var ForceLink = class extends CoreModule {
    constructor() {
      super(...arguments);
      this.linkFirstIndicesAndAmount = new Float32Array();
      this.indices = new Float32Array();
      this.maxPointDegree = 0;
    }
    create(direction) {
      const { reglInstance, store: { pointsTextureSize, linksTextureSize }, data: { links: links2 } } = this;
      this.linkFirstIndicesAndAmount = new Float32Array(pointsTextureSize * pointsTextureSize * 4);
      this.indices = new Float32Array(linksTextureSize * linksTextureSize * 4);
      const linkBiasAndStrengthState = new Float32Array(linksTextureSize * linksTextureSize * 4);
      const linkDistanceState = new Float32Array(linksTextureSize * linksTextureSize * 4);
      const linksByDirection = group(links2, (d) => direction === LinkDirection.INCOMING ? d.to : d.from);
      this.maxPointDegree = 0;
      let linkIndex = 0;
      linksByDirection.forEach((oneDirectionLinks, nodeId) => {
        this.linkFirstIndicesAndAmount[nodeId * 4 + 0] = linkIndex % linksTextureSize;
        this.linkFirstIndicesAndAmount[nodeId * 4 + 1] = Math.floor(linkIndex / linksTextureSize);
        this.linkFirstIndicesAndAmount[nodeId * 4 + 2] = oneDirectionLinks.length;
        oneDirectionLinks.forEach((link) => {
          var _a, _b, _c, _d, _e;
          const connectedNodeId = direction === LinkDirection.OUTCOMING ? link.to : link.from;
          this.indices[linkIndex * 4 + 0] = connectedNodeId % pointsTextureSize;
          this.indices[linkIndex * 4 + 1] = Math.floor(connectedNodeId / pointsTextureSize);
          let bias = ((_a = link.source.degree) !== null && _a !== void 0 ? _a : 0) / (((_b = link.source.degree) !== null && _b !== void 0 ? _b : 0) + ((_c = link.target.degree) !== null && _c !== void 0 ? _c : 0));
          if (direction === LinkDirection.OUTCOMING)
            bias = 1 - bias;
          let strength = 1 / Math.min((_d = link.source.degree) !== null && _d !== void 0 ? _d : 0, (_e = link.target.degree) !== null && _e !== void 0 ? _e : 0);
          strength = Math.sqrt(strength);
          linkBiasAndStrengthState[linkIndex * 4 + 0] = bias;
          linkBiasAndStrengthState[linkIndex * 4 + 1] = strength;
          linkDistanceState[linkIndex * 4] = Math.random();
          linkIndex += 1;
        });
        this.maxPointDegree = Math.max(this.maxPointDegree, oneDirectionLinks.length);
      });
      this.linkFirstIndicesAndAmountFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: this.linkFirstIndicesAndAmount,
          shape: [pointsTextureSize, pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.indicesFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: this.indices,
          shape: [linksTextureSize, linksTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.biasAndStrengthFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: linkBiasAndStrengthState,
          shape: [linksTextureSize, linksTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.randomDistanceFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: linkDistanceState,
          shape: [linksTextureSize, linksTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
    }
    initPrograms() {
      const { reglInstance, config: config2, store, points } = this;
      this.runCommand = reglInstance({
        frag: () => forceFrag$3(this.maxPointDegree),
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          linkSpring: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.linkSpring;
          },
          linkDistance: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.linkDistance;
          },
          linkDistRandomVariationRange: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.linkDistRandomVariationRange;
          },
          linkFirstIndicesAndAmount: () => this.linkFirstIndicesAndAmountFbo,
          linkIndices: () => this.indicesFbo,
          linkBiasAndStrength: () => this.biasAndStrengthFbo,
          linkRandomDistanceFbo: () => this.randomDistanceFbo,
          pointsTextureSize: () => store.pointsTextureSize,
          linksTextureSize: () => store.linksTextureSize,
          alpha: () => store.alpha
        }
      });
    }
    run() {
      var _a;
      (_a = this.runCommand) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    destroy() {
      var _a, _b, _c, _d;
      (_a = this.linkFirstIndicesAndAmountFbo) === null || _a === void 0 ? void 0 : _a.destroy();
      (_b = this.indicesFbo) === null || _b === void 0 ? void 0 : _b.destroy();
      (_c = this.biasAndStrengthFbo) === null || _c === void 0 ? void 0 : _c.destroy();
      (_d = this.randomDistanceFbo) === null || _d === void 0 ? void 0 : _d.destroy();
    }
  };
  var calculateLevelFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nvarying vec4 rgba;void main(){gl_FragColor=rgba;}";
  var calculateLevelVert = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform float pointsTextureSize;uniform float levelTextureSize;uniform float cellSize;attribute vec2 indexes;varying vec4 rgba;void main(){vec4 pointPosition=texture2D(position,indexes/pointsTextureSize);rgba=vec4(pointPosition.rg,1.0,0.0);float n=floor(pointPosition.x/cellSize);float m=floor(pointPosition.y/cellSize);vec2 levelPosition=2.0*(vec2(n,m)+0.5)/levelTextureSize-1.0;gl_Position=vec4(levelPosition,0.0,1.0);gl_PointSize=1.0;}";
  var forceFrag$2 = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform sampler2D levelFbo;uniform float level;uniform float levels;uniform float levelTextureSize;uniform float repulsion;uniform float alpha;uniform float spaceSize;uniform float theta;varying vec2 index;const float MAX_LEVELS_NUM=14.0;vec2 calcAdd(vec2 ij,vec2 pp){vec2 add=vec2(0.0);vec4 centermass=texture2D(levelFbo,ij);if(centermass.r>0.0&&centermass.g>0.0&&centermass.b>0.0){vec2 centermassPosition=vec2(centermass.rg/centermass.b);vec2 distVector=pp-centermassPosition;float l=dot(distVector,distVector);float dist=sqrt(l);if(l>0.0){float angle=atan(distVector.y,distVector.x);float c=alpha*repulsion*centermass.b;float distanceMin2=1.0;if(l<distanceMin2)l=sqrt(distanceMin2*l);float addV=c/sqrt(l);add=addV*vec2(cos(angle),sin(angle));}}return add;}void main(){vec4 pointPosition=texture2D(position,index);float x=pointPosition.x;float y=pointPosition.y;float left=0.0;float top=0.0;float right=spaceSize;float bottom=spaceSize;float n_left=0.0;float n_top=0.0;float n_right=0.0;float n_bottom=0.0;float cellSize=0.0;for(float i=0.0;i<MAX_LEVELS_NUM;i+=1.0){if(i<=level){left+=cellSize*n_left;top+=cellSize*n_top;right-=cellSize*n_right;bottom-=cellSize*n_bottom;cellSize=pow(2.0,levels-i-1.0);float dist_left=x-left;n_left=max(0.0,floor(dist_left/cellSize-theta));float dist_top=y-top;n_top=max(0.0,floor(dist_top/cellSize-theta));float dist_right=right-x;n_right=max(0.0,floor(dist_right/cellSize-theta));float dist_bottom=bottom-y;n_bottom=max(0.0,floor(dist_bottom/cellSize-theta));}}vec4 velocity=vec4(vec2(0.0),1.0,0.0);for(float i=0.0;i<12.0;i+=1.0){for(float j=0.0;j<4.0;j+=1.0){float n=left+cellSize*j;float m=top+cellSize*n_top+cellSize*i;if(n<(left+n_left*cellSize)&&m<bottom){velocity.xy+=calcAdd(vec2(n/cellSize,m/cellSize)/levelTextureSize,pointPosition.xy);}n=left+cellSize*i;m=top+cellSize*j;if(n<(right-n_right*cellSize)&&m<(top+n_top*cellSize)){velocity.xy+=calcAdd(vec2(n/cellSize,m/cellSize)/levelTextureSize,pointPosition.xy);}n=right-n_right*cellSize+cellSize*j;m=top+cellSize*i;if(n<right&&m<(bottom-n_bottom*cellSize)){velocity.xy+=calcAdd(vec2(n/cellSize,m/cellSize)/levelTextureSize,pointPosition.xy);}n=left+n_left*cellSize+cellSize*i;m=bottom-n_bottom*cellSize+cellSize*j;if(n<right&&m<bottom){velocity.xy+=calcAdd(vec2(n/cellSize,m/cellSize)/levelTextureSize,pointPosition.xy);}}}gl_FragColor=velocity;}";
  var forceCenterFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform sampler2D levelFbo;uniform sampler2D randomValues;uniform float levelTextureSize;uniform float repulsion;uniform float alpha;varying vec2 index;vec2 calcAdd(vec2 ij,vec2 pp){vec2 add=vec2(0.0);vec4 centermass=texture2D(levelFbo,ij);if(centermass.r>0.0&&centermass.g>0.0&&centermass.b>0.0){vec2 centermassPosition=vec2(centermass.rg/centermass.b);vec2 distVector=pp-centermassPosition;float l=dot(distVector,distVector);float dist=sqrt(l);if(l>0.0){float angle=atan(distVector.y,distVector.x);float c=alpha*repulsion*centermass.b;float distanceMin2=1.0;if(l<distanceMin2)l=sqrt(distanceMin2*l);float addV=c/sqrt(l);add=addV*vec2(cos(angle),sin(angle));}}return add;}void main(){vec4 pointPosition=texture2D(position,index);vec4 random=texture2D(randomValues,index);vec4 velocity=vec4(0.0);velocity.xy+=calcAdd(pointPosition.xy/levelTextureSize,pointPosition.xy);velocity.xy+=velocity.xy*random.rg;gl_FragColor=velocity;}";
  var ForceManyBody = class extends CoreModule {
    constructor() {
      super(...arguments);
      this.levelsFbos = /* @__PURE__ */ new Map();
      this.quadtreeLevels = 0;
    }
    create() {
      var _a;
      const { reglInstance, config: config2, store } = this;
      this.quadtreeLevels = Math.log2((_a = config2.spaceSize) !== null && _a !== void 0 ? _a : defaultConfigValues.spaceSize);
      for (let i = 0; i < this.quadtreeLevels; i += 1) {
        const levelTextureSize = Math.pow(2, i + 1);
        this.levelsFbos.set(`level[${i}]`, reglInstance.framebuffer({
          shape: [levelTextureSize, levelTextureSize],
          colorType: "float",
          depth: false,
          stencil: false
        }));
      }
      const randomValuesState = new Float32Array(store.pointsTextureSize * store.pointsTextureSize * 4);
      for (let i = 0; i < store.pointsTextureSize * store.pointsTextureSize; ++i) {
        randomValuesState[i * 4] = getRandomValue(-1, 1) * 1e-5;
        randomValuesState[i * 4 + 1] = getRandomValue(-1, 1) * 1e-5;
      }
      this.randomValuesFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: randomValuesState,
          shape: [store.pointsTextureSize, store.pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
    }
    initPrograms() {
      const { reglInstance, config: config2, store, data, points } = this;
      this.clearLevelsCommand = reglInstance({
        frag: clearFrag,
        vert: updateVert,
        framebuffer: (_, props) => props.levelFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) }
      });
      this.calculateLevelsCommand = reglInstance({
        frag: calculateLevelFrag,
        vert: calculateLevelVert,
        framebuffer: (_, props) => props.levelFbo,
        primitive: "points",
        count: () => data.nodes.length,
        attributes: { indexes: createIndexesBuffer(reglInstance, store.pointsTextureSize) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          pointsTextureSize: () => store.pointsTextureSize,
          levelTextureSize: (_, props) => props.levelTextureSize,
          cellSize: (_, props) => props.cellSize
        },
        blend: {
          enable: true,
          func: {
            src: "one",
            dst: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: { enable: false, mask: false },
        stencil: { enable: false }
      });
      this.forceCommand = reglInstance({
        frag: forceFrag$2,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          level: (_, props) => props.level,
          levels: this.quadtreeLevels,
          levelFbo: (_, props) => props.levelFbo,
          levelTextureSize: (_, props) => props.levelTextureSize,
          alpha: () => store.alpha,
          repulsion: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.repulsion;
          },
          spaceSize: () => config2.spaceSize,
          theta: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.repulsionTheta;
          }
        },
        blend: {
          enable: true,
          func: {
            src: "one",
            dst: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: { enable: false, mask: false },
        stencil: { enable: false }
      });
      this.forceFromItsOwnCentermassCommand = reglInstance({
        frag: forceCenterFrag,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          randomValues: () => this.randomValuesFbo,
          levelFbo: (_, props) => props.levelFbo,
          levelTextureSize: (_, props) => props.levelTextureSize,
          alpha: () => store.alpha,
          repulsion: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.repulsion;
          },
          spaceSize: () => config2.spaceSize
        },
        blend: {
          enable: true,
          func: {
            src: "one",
            dst: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: { enable: false, mask: false },
        stencil: { enable: false }
      });
      this.clearVelocityCommand = reglInstance({
        frag: clearFrag,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) }
      });
    }
    run() {
      var _a, _b, _c, _d, _e, _f;
      const { config: config2 } = this;
      for (let i = 0; i < this.quadtreeLevels; i += 1) {
        (_a = this.clearLevelsCommand) === null || _a === void 0 ? void 0 : _a.call(this, { levelFbo: this.levelsFbos.get(`level[${i}]`) });
        const levelTextureSize = Math.pow(2, i + 1);
        const cellSize = ((_b = config2.spaceSize) !== null && _b !== void 0 ? _b : defaultConfigValues.spaceSize) / levelTextureSize;
        (_c = this.calculateLevelsCommand) === null || _c === void 0 ? void 0 : _c.call(this, {
          levelFbo: this.levelsFbos.get(`level[${i}]`),
          levelTextureSize,
          cellSize
        });
      }
      (_d = this.clearVelocityCommand) === null || _d === void 0 ? void 0 : _d.call(this);
      for (let i = 0; i < this.quadtreeLevels; i += 1) {
        const levelTextureSize = Math.pow(2, i + 1);
        (_e = this.forceCommand) === null || _e === void 0 ? void 0 : _e.call(this, {
          levelFbo: this.levelsFbos.get(`level[${i}]`),
          levelTextureSize,
          level: i
        });
        if (i === this.quadtreeLevels - 1) {
          (_f = this.forceFromItsOwnCentermassCommand) === null || _f === void 0 ? void 0 : _f.call(this, {
            levelFbo: this.levelsFbos.get(`level[${i}]`),
            levelTextureSize,
            level: i
          });
        }
      }
    }
    destroy() {
      var _a;
      (_a = this.randomValuesFbo) === null || _a === void 0 ? void 0 : _a.destroy();
      this.levelsFbos.forEach((fbo) => {
        var _a2;
        if ((_a2 = fbo) === null || _a2 === void 0 ? void 0 : _a2._framebuffer.framebuffer) {
          fbo.destroy();
        }
      });
      this.levelsFbos.clear();
    }
  };
  function forceFrag$1(startLevel, maxLevels) {
    startLevel = Math.min(startLevel, maxLevels);
    const delta = maxLevels - startLevel;
    const calcAdd = `
    float dist = sqrt(l);
    if (dist > 0.0) {
      float c = alpha * repulsion * centermass.b;
      addVelocity += calcAdd(vec2(x, y), l, c);
      addVelocity += addVelocity * random.rg;
    }
  `;
    function quad(level) {
      if (level >= maxLevels) {
        return calcAdd;
      } else {
        const groupSize = Math.pow(2, level + 1);
        const iEnding = new Array(level + 1 - delta).fill(0).map((_, l) => `pow(2.0, ${level - (l + delta)}.0) * i${l + delta}`).join("+");
        const jEnding = new Array(level + 1 - delta).fill(0).map((_, l) => `pow(2.0, ${level - (l + delta)}.0) * j${l + delta}`).join("+");
        return `
      for (float ij${level} = 0.0; ij${level} < 4.0; ij${level} += 1.0) {
        float i${level} = 0.0;
        float j${level} = 0.0;
        if (ij${level} == 1.0 || ij${level} == 3.0) i${level} = 1.0;
        if (ij${level} == 2.0 || ij${level} == 3.0) j${level} = 1.0;
        float i = pow(2.0, ${startLevel}.0) * n / width${level + 1} + ${iEnding};
        float j = pow(2.0, ${startLevel}.0) * m / width${level + 1} + ${jEnding};
        float groupPosX = (i + 0.5) / ${groupSize}.0;
        float groupPosY = (j + 0.5) / ${groupSize}.0;
        
        vec4 centermass = texture2D(level[${level}], vec2(groupPosX, groupPosY));
        if (centermass.r > 0.0 && centermass.g > 0.0 && centermass.b > 0.0) {
          float x = centermass.r / centermass.b - pointPosition.r;
          float y = centermass.g / centermass.b - pointPosition.g;
          float l = x * x + y * y;
          if ((width${level + 1} * width${level + 1}) / theta < l) {
            ${calcAdd}
          } else {
            ${quad(level + 1)}
          }
        }
      }
      `;
      }
    }
    return `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D position;
uniform sampler2D randomValues;
uniform float spaceSize;
uniform float repulsion;
uniform float theta;
uniform float alpha;
uniform sampler2D level[${maxLevels}];
varying vec2 index;

vec2 calcAdd(vec2 xy, float l, float c) {
  float distanceMin2 = 1.0;
  if (l < distanceMin2) l = sqrt(distanceMin2 * l);
  float add = c / l;
  return add * xy;
}

void main() {
  vec4 pointPosition = texture2D(position, index);
  vec4 random = texture2D(randomValues, index);

  float width0 = spaceSize;

  vec2 velocity = vec2(0.0);
  vec2 addVelocity = vec2(0.0);

  ${new Array(maxLevels).fill(0).map((_, i) => `float width${i + 1} = width${i} / 2.0;`).join("\n")}

  for (float n = 0.0; n < pow(2.0, ${delta}.0); n += 1.0) {
    for (float m = 0.0; m < pow(2.0, ${delta}.0); m += 1.0) {
      ${quad(delta)}
    }
  }

  velocity -= addVelocity;

  gl_FragColor = vec4(velocity, 0.0, 0.0);
}
`;
  }
  var ForceManyBodyQuadtree = class extends CoreModule {
    constructor() {
      super(...arguments);
      this.levelsFbos = /* @__PURE__ */ new Map();
      this.quadtreeLevels = 0;
    }
    create() {
      var _a;
      const { reglInstance, config: config2, store } = this;
      this.quadtreeLevels = Math.log2((_a = config2.spaceSize) !== null && _a !== void 0 ? _a : defaultConfigValues.spaceSize);
      for (let i = 0; i < this.quadtreeLevels; i += 1) {
        const levelTextureSize = Math.pow(2, i + 1);
        this.levelsFbos.set(`level[${i}]`, reglInstance.framebuffer({
          color: reglInstance.texture({
            data: new Float32Array(levelTextureSize * levelTextureSize * 4),
            shape: [levelTextureSize, levelTextureSize, 4],
            type: "float"
          }),
          depth: false,
          stencil: false
        }));
      }
      const randomValuesState = new Float32Array(store.pointsTextureSize * store.pointsTextureSize * 4);
      for (let i = 0; i < store.pointsTextureSize * store.pointsTextureSize; ++i) {
        randomValuesState[i * 4] = getRandomValue(-1, 1) * 1e-5;
        randomValuesState[i * 4 + 1] = getRandomValue(-1, 1) * 1e-5;
      }
      this.randomValuesFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: randomValuesState,
          shape: [store.pointsTextureSize, store.pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
    }
    initPrograms() {
      var _a, _b;
      const { reglInstance, config: config2, store, data, points } = this;
      this.clearLevelsCommand = reglInstance({
        frag: clearFrag,
        vert: updateVert,
        framebuffer: (_, props) => props.levelFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) }
      });
      this.calculateLevelsCommand = reglInstance({
        frag: calculateLevelFrag,
        vert: calculateLevelVert,
        framebuffer: (_, props) => props.levelFbo,
        primitive: "points",
        count: () => data.nodes.length,
        attributes: { indexes: createIndexesBuffer(reglInstance, store.pointsTextureSize) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          pointsTextureSize: () => store.pointsTextureSize,
          levelTextureSize: (_, props) => props.levelTextureSize,
          cellSize: (_, props) => props.cellSize
        },
        blend: {
          enable: true,
          func: {
            src: "one",
            dst: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: { enable: false, mask: false },
        stencil: { enable: false }
      });
      this.quadtreeCommand = reglInstance({
        frag: forceFrag$1((_b = (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.repulsionQuadtreeLevels) !== null && _b !== void 0 ? _b : this.quadtreeLevels, this.quadtreeLevels),
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          randomValues: () => this.randomValuesFbo,
          spaceSize: () => config2.spaceSize,
          repulsion: () => {
            var _a2;
            return (_a2 = config2.simulation) === null || _a2 === void 0 ? void 0 : _a2.repulsion;
          },
          theta: () => {
            var _a2;
            return (_a2 = config2.simulation) === null || _a2 === void 0 ? void 0 : _a2.repulsionTheta;
          },
          alpha: () => store.alpha,
          ...Object.fromEntries(this.levelsFbos)
        }
      });
    }
    run() {
      var _a, _b, _c, _d;
      const { config: config2 } = this;
      for (let i = 0; i < this.quadtreeLevels; i += 1) {
        (_a = this.clearLevelsCommand) === null || _a === void 0 ? void 0 : _a.call(this, { levelFbo: this.levelsFbos.get(`level[${i}]`) });
        const levelTextureSize = Math.pow(2, i + 1);
        const cellSize = ((_b = config2.spaceSize) !== null && _b !== void 0 ? _b : defaultConfigValues.spaceSize) / levelTextureSize;
        (_c = this.calculateLevelsCommand) === null || _c === void 0 ? void 0 : _c.call(this, {
          levelFbo: this.levelsFbos.get(`level[${i}]`),
          levelTextureSize,
          cellSize
        });
      }
      (_d = this.quadtreeCommand) === null || _d === void 0 ? void 0 : _d.call(this);
    }
    destroy() {
      var _a;
      (_a = this.randomValuesFbo) === null || _a === void 0 ? void 0 : _a.destroy();
      this.levelsFbos.forEach((fbo) => {
        var _a2;
        if ((_a2 = fbo) === null || _a2 === void 0 ? void 0 : _a2._framebuffer.framebuffer) {
          fbo.destroy();
        }
      });
      this.levelsFbos.clear();
    }
  };
  var forceFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform float repulsion;uniform vec2 mousePos;varying vec2 index;void main(){vec4 pointPosition=texture2D(position,index);vec4 velocity=vec4(0.0);vec2 mouse=mousePos;vec2 distVector=mouse-pointPosition.rg;float dist=sqrt(dot(distVector,distVector));dist=max(dist,10.0);float angle=atan(distVector.y,distVector.x);float addV=100.0*repulsion/(dist*dist);velocity.rg-=addV*vec2(cos(angle),sin(angle));gl_FragColor=velocity;}";
  var ForceMouse = class extends CoreModule {
    initPrograms() {
      const { reglInstance, config: config2, store, points } = this;
      this.runCommand = reglInstance({
        frag: forceFrag,
        vert: updateVert,
        framebuffer: () => points === null || points === void 0 ? void 0 : points.velocityFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => points === null || points === void 0 ? void 0 : points.previousPositionFbo,
          mousePos: () => store.mousePosition,
          repulsion: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.repulsionFromMouse;
          }
        }
      });
    }
    run() {
      var _a;
      (_a = this.runCommand) === null || _a === void 0 ? void 0 : _a.call(this);
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var glBench = { exports: {} };
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory();
    })(commonjsGlobal, function() {
      var UISVG = '<div class="gl-box">\n  <svg viewBox="0 0 55 60">\n    <text x="27" y="56" class="gl-fps">00 FPS</text>\n    <text x="28" y="8" class="gl-mem"></text>\n    <rect x="0" y="14" rx="4" ry="4" width="55" height="32"></rect>\n    <polyline class="gl-chart"></polyline>\n  </svg>\n  <svg viewBox="0 0 14 60" class="gl-cpu-svg">\n    <line x1="7" y1="38" x2="7" y2="11" class="opacity"/>\n    <line x1="7" y1="38" x2="7" y2="11" class="gl-cpu" stroke-dasharray="0 27"/>\n    <path d="M5.35 43c-.464 0-.812.377-.812.812v1.16c-.783.1972-1.421.812-1.595 1.624h-1.16c-.435 0-.812.348-.812.812s.348.812.812.812h1.102v1.653H1.812c-.464 0-.812.377-.812.812 0 .464.377.812.812.812h1.131c.1943.783.812 1.392 1.595 1.595v1.131c0 .464.377.812.812.812.464 0 .812-.377.812-.812V53.15h1.653v1.073c0 .464.377.812.812.812.464 0 .812-.377.812-.812v-1.131c.783-.1943 1.392-.812 1.595-1.595h1.131c.464 0 .812-.377.812-.812 0-.464-.377-.812-.812-.812h-1.073V48.22h1.102c.435 0 .812-.348.812-.812s-.348-.812-.812-.812h-1.16c-.1885-.783-.812-1.421-1.595-1.624v-1.131c0-.464-.377-.812-.812-.812-.464 0-.812.377-.812.812v1.073H6.162v-1.073c0-.464-.377-.812-.812-.812zm.58 3.48h2.088c.754 0 1.363.609 1.363 1.363v2.088c0 .754-.609 1.363-1.363 1.363H5.93c-.754 0-1.363-.609-1.363-1.363v-2.088c0-.754.609-1.363 1.363-1.363z"/>\n  </svg>\n  <svg viewBox="0 0 14 60" class="gl-gpu-svg">\n    <line x1="7" y1="38" x2="7" y2="11" class="opacity"/>\n    <line x1="7" y1="38" x2="7" y2="11" class="gl-gpu" stroke-dasharray="0 27"/>\n    <path d="M1.94775 43.3772a.736.736 0 10-.00416 1.472c.58535.00231.56465.1288.6348.3197.07015.18975.04933.43585.04933.43585l-.00653.05405v8.671a.736.736 0 101.472 0v-1.4145c.253.09522.52785.1495.81765.1495h5.267c1.2535 0 2.254-.9752 2.254-2.185v-3.105c0-1.2075-1.00625-2.185-2.254-2.185h-5.267c-.28865 0-.5635.05405-.8165.1495.01806-.16445.04209-.598-.1357-1.0787-.22425-.6072-.9499-1.2765-2.0125-1.2765zm2.9095 3.6455c.42435 0 .7659.36225.7659.8119v2.9785c0 .44965-.34155.8119-.7659.8119s-.7659-.36225-.7659-.8119v-2.9785c0-.44965.34155-.8119.7659-.8119zm4.117 0a2.3 2.3 0 012.3 2.3 2.3 2.3 0 01-2.3 2.3 2.3 2.3 0 01-2.3-2.3 2.3 2.3 0 012.3-2.3z"/>\n  </svg>\n</div>';
      var UICSS = "#gl-bench {\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:1000;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n\n#gl-bench div {\n  position: relative;\n  display: block;\n  margin: 4px;\n  padding: 0 7px 0 10px;\n  background: #6c6;\n  border-radius: 15px;\n  cursor: pointer;\n  opacity: 0.9;\n}\n\n#gl-bench svg {\n  height: 60px;\n  margin: 0 -1px;\n}\n\n#gl-bench text {\n  font-size: 12px;\n  font-family: Helvetica,Arial,sans-serif;\n  font-weight: 700;\n  dominant-baseline: middle;\n  text-anchor: middle;\n}\n\n#gl-bench .gl-mem {\n  font-size: 9px;\n}\n\n#gl-bench line {\n  stroke-width: 5;\n  stroke: #112211;\n  stroke-linecap: round;\n}\n\n#gl-bench polyline {\n  fill: none;\n  stroke: #112211;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 3.5;\n}\n\n#gl-bench rect {\n  fill: #448844;\n}\n\n#gl-bench .opacity {\n  stroke: #448844;\n}\n";
      class GLBench2 {
        constructor(gl, settings = {}) {
          this.css = UICSS;
          this.svg = UISVG;
          this.paramLogger = () => {
          };
          this.chartLogger = () => {
          };
          this.chartLen = 20;
          this.chartHz = 20;
          this.names = [];
          this.cpuAccums = [];
          this.gpuAccums = [];
          this.activeAccums = [];
          this.chart = new Array(this.chartLen);
          this.now = () => performance && performance.now ? performance.now() : Date.now();
          this.updateUI = () => {
            [].forEach.call(this.nodes["gl-gpu-svg"], (node) => {
              node.style.display = this.trackGPU ? "inline" : "none";
            });
          };
          Object.assign(this, settings);
          this.detected = 0;
          this.finished = [];
          this.isFramebuffer = 0;
          this.frameId = 0;
          let rafId, n = 0, t0;
          let loop = (t) => {
            if (++n < 20) {
              rafId = requestAnimationFrame(loop);
            } else {
              this.detected = Math.ceil(1e3 * n / (t - t0) / 70);
              cancelAnimationFrame(rafId);
            }
            if (!t0)
              t0 = t;
          };
          requestAnimationFrame(loop);
          if (gl) {
            const glFinish = async (t, activeAccums) => Promise.resolve(setTimeout(() => {
              gl.getError();
              const dt = this.now() - t;
              activeAccums.forEach((active, i) => {
                if (active)
                  this.gpuAccums[i] += dt;
              });
            }, 0));
            const addProfiler = (fn, self2, target) => function() {
              const t = self2.now();
              fn.apply(target, arguments);
              if (self2.trackGPU)
                self2.finished.push(glFinish(t, self2.activeAccums.slice(0)));
            };
            [
              "drawArrays",
              "drawElements",
              "drawArraysInstanced",
              "drawBuffers",
              "drawElementsInstanced",
              "drawRangeElements"
            ].forEach((fn) => {
              if (gl[fn])
                gl[fn] = addProfiler(gl[fn], this, gl);
            });
            gl.getExtension = ((fn, self2) => function() {
              let ext = fn.apply(gl, arguments);
              if (ext) {
                ["drawElementsInstancedANGLE", "drawBuffersWEBGL"].forEach((fn2) => {
                  if (ext[fn2])
                    ext[fn2] = addProfiler(ext[fn2], self2, ext);
                });
              }
              return ext;
            })(gl.getExtension, this);
          }
          if (!this.withoutUI) {
            if (!this.dom)
              this.dom = document.body;
            let elm = document.createElement("div");
            elm.id = "gl-bench";
            this.dom.appendChild(elm);
            this.dom.insertAdjacentHTML("afterbegin", '<style id="gl-bench-style">' + this.css + "</style>");
            this.dom = elm;
            this.dom.addEventListener("click", () => {
              this.trackGPU = !this.trackGPU;
              this.updateUI();
            });
            this.paramLogger = ((logger, dom, names) => {
              const classes = ["gl-cpu", "gl-gpu", "gl-mem", "gl-fps", "gl-gpu-svg", "gl-chart"];
              const nodes2 = Object.assign({}, classes);
              classes.forEach((c) => nodes2[c] = dom.getElementsByClassName(c));
              this.nodes = nodes2;
              return (i, cpu, gpu, mem, fps, totalTime, frameId) => {
                nodes2["gl-cpu"][i].style.strokeDasharray = (cpu * 0.27).toFixed(0) + " 100";
                nodes2["gl-gpu"][i].style.strokeDasharray = (gpu * 0.27).toFixed(0) + " 100";
                nodes2["gl-mem"][i].innerHTML = names[i] ? names[i] : mem ? "mem: " + mem.toFixed(0) + "mb" : "";
                nodes2["gl-fps"][i].innerHTML = fps.toFixed(0) + " FPS";
                logger(names[i], cpu, gpu, mem, fps, totalTime, frameId);
              };
            })(this.paramLogger, this.dom, this.names);
            this.chartLogger = ((logger, dom) => {
              let nodes2 = { "gl-chart": dom.getElementsByClassName("gl-chart") };
              return (i, chart, circularId) => {
                let points = "";
                let len = chart.length;
                for (let i2 = 0; i2 < len; i2++) {
                  let id2 = (circularId + i2 + 1) % len;
                  if (chart[id2] != void 0) {
                    points = points + " " + (55 * i2 / (len - 1)).toFixed(1) + "," + (45 - chart[id2] * 22 / 60 / this.detected).toFixed(1);
                  }
                }
                nodes2["gl-chart"][i].setAttribute("points", points);
                logger(this.names[i], chart, circularId);
              };
            })(this.chartLogger, this.dom);
          }
        }
        addUI(name) {
          if (this.names.indexOf(name) == -1) {
            this.names.push(name);
            if (this.dom) {
              this.dom.insertAdjacentHTML("beforeend", this.svg);
              this.updateUI();
            }
            this.cpuAccums.push(0);
            this.gpuAccums.push(0);
            this.activeAccums.push(false);
          }
        }
        nextFrame(now2) {
          this.frameId++;
          const t = now2 ? now2 : this.now();
          if (this.frameId <= 1) {
            this.paramFrame = this.frameId;
            this.paramTime = t;
          } else {
            let duration = t - this.paramTime;
            if (duration >= 1e3) {
              const frameCount = this.frameId - this.paramFrame;
              const fps = frameCount / duration * 1e3;
              for (let i = 0; i < this.names.length; i++) {
                const cpu = this.cpuAccums[i] / duration * 100, gpu = this.gpuAccums[i] / duration * 100, mem = performance && performance.memory ? performance.memory.usedJSHeapSize / (1 << 20) : 0;
                this.paramLogger(i, cpu, gpu, mem, fps, duration, frameCount);
                this.cpuAccums[i] = 0;
                Promise.all(this.finished).then(() => {
                  this.gpuAccums[i] = 0;
                  this.finished = [];
                });
              }
              this.paramFrame = this.frameId;
              this.paramTime = t;
            }
          }
          if (!this.detected || !this.chartFrame) {
            this.chartFrame = this.frameId;
            this.chartTime = t;
            this.circularId = 0;
          } else {
            let timespan = t - this.chartTime;
            let hz = this.chartHz * timespan / 1e3;
            while (--hz > 0 && this.detected) {
              const frameCount = this.frameId - this.chartFrame;
              const fps = frameCount / timespan * 1e3;
              this.chart[this.circularId % this.chartLen] = fps;
              for (let i = 0; i < this.names.length; i++) {
                this.chartLogger(i, this.chart, this.circularId);
              }
              this.circularId++;
              this.chartFrame = this.frameId;
              this.chartTime = t;
            }
          }
        }
        begin(name) {
          this.updateAccums(name);
        }
        end(name) {
          this.updateAccums(name);
        }
        updateAccums(name) {
          let nameId = this.names.indexOf(name);
          if (nameId == -1) {
            nameId = this.names.length;
            this.addUI(name);
          }
          const t = this.now();
          const dt = t - this.t0;
          for (let i = 0; i < nameId + 1; i++) {
            if (this.activeAccums[i]) {
              this.cpuAccums[i] += dt;
            }
          }
          this.activeAccums[nameId] = !this.activeAccums[nameId];
          this.t0 = t;
        }
      }
      return GLBench2;
    });
  })(glBench);
  var GLBench = glBench.exports;
  var benchCSS = `
  #gl-bench {
    position:absolute;
    right:0;
    top:0;
    z-index:1000;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  #gl-bench div {
    position: relative;
    display: block;
    margin: 4px;
    padding: 0 7px 0 10px;
    background: #5f69de;
    border-radius: 15px;
    cursor: pointer;
    opacity: 0.9;
  }
  #gl-bench svg {
    height: 60px;
    margin: 0 -1px;
  }
  #gl-bench text {
    font-size: 12px;
    font-family: Helvetica,Arial,sans-serif;
    font-weight: 700;
    dominant-baseline: middle;
    text-anchor: middle;
  }
  #gl-bench .gl-mem {
    font-size: 9px;
  }
  #gl-bench line {
    stroke-width: 5;
    stroke: #112211;
    stroke-linecap: round;
  }
  #gl-bench polyline {
    fill: none;
    stroke: #112211;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3.5;
  }
  #gl-bench rect {
    fill: #8288e4;
  }
  #gl-bench .opacity {
    stroke: #8288e4;
  }
`;
  var FPSMonitor = class {
    constructor(canvas2) {
      this.destroy();
      const gl = canvas2.getContext("webgl") || canvas2.getContext("experimental-webgl");
      this.bench = new GLBench(gl, { css: benchCSS });
    }
    begin() {
      var _a;
      (_a = this.bench) === null || _a === void 0 ? void 0 : _a.begin("frame");
    }
    end(now2) {
      var _a, _b;
      (_a = this.bench) === null || _a === void 0 ? void 0 : _a.end("frame");
      (_b = this.bench) === null || _b === void 0 ? void 0 : _b.nextFrame(now2);
    }
    destroy() {
      this.bench = void 0;
      select_default2("#gl-bench").remove();
    }
  };
  var GraphData = class {
    constructor() {
      this._nodes = [];
      this._links = [];
    }
    setData(inputNodes, inputLinks) {
      const nodes2 = inputNodes.map((n, i) => {
        return {
          ...n,
          degree: 0,
          indegree: 0,
          outdegree: 0,
          index: i
        };
      });
      const nodesObj = {};
      nodes2.forEach((n) => {
        nodesObj[n.id] = n;
      });
      inputLinks.forEach((l) => {
        const sourceNode = nodesObj[l.source];
        const targetNode = nodesObj[l.target];
        if (sourceNode !== void 0 && targetNode !== void 0) {
          sourceNode.outdegree += 1;
          targetNode.indegree += 1;
        }
      });
      nodes2.forEach((n) => {
        var _a, _b;
        if (!n.degree)
          n.degree = ((_a = n.outdegree) !== null && _a !== void 0 ? _a : 0) + ((_b = n.indegree) !== null && _b !== void 0 ? _b : 0);
      });
      nodes2.sort((a, b) => {
        var _a;
        return a.degree - ((_a = b.degree) !== null && _a !== void 0 ? _a : 0);
      });
      nodes2.forEach((n, i) => {
        n.index = i;
      });
      const links2 = inputLinks.map((l) => {
        const sourceNode = nodesObj[l.source];
        const targetNode = nodesObj[l.target];
        if (sourceNode !== void 0 && targetNode !== void 0) {
          return {
            ...l,
            from: sourceNode.index,
            to: targetNode.index,
            source: sourceNode,
            target: targetNode
          };
        } else {
          return void 0;
        }
      }).filter((l) => l !== void 0);
      this._nodes = nodes2;
      this._links = links2;
    }
    get nodes() {
      return this._nodes;
    }
    get links() {
      return this._links;
    }
    findNodeById(id2) {
      return this.nodes.find((node) => node.id.toLowerCase() === id2.toLowerCase());
    }
  };
  var drawStraightFrag = "precision highp float;\n#define GLSLIFY 1\nuniform bool useArrow;varying vec4 rgbaColor;varying vec2 pos;varying float arrowLength;varying float linkWidthArrowWidthRatio;varying float smoothWidthRatio;varying float targetPointSize;float map(float value,float min1,float max1,float min2,float max2){return min2+(value-min1)*(max2-min2)/(max1-min1);}void main(){float opacity=1.0;vec3 color=rgbaColor.rgb;float smoothDelta=smoothWidthRatio/2.0;if(useArrow){float end_arrow=0.5+arrowLength/2.0;float start_arrow=end_arrow-arrowLength;float arrowWidthDelta=linkWidthArrowWidthRatio/2.0;float linkOpacity=rgbaColor.a*smoothstep(0.5-arrowWidthDelta,0.5-arrowWidthDelta-smoothDelta,abs(pos.y));float arrowOpacity=1.0;if(pos.x>start_arrow&&pos.x<start_arrow+arrowLength){float xmapped=map(pos.x,start_arrow,end_arrow,0.0,1.0);arrowOpacity=rgbaColor.a*smoothstep(xmapped-smoothDelta,xmapped,map(abs(pos.y),0.5,0.0,0.0,1.0));if(linkOpacity!=arrowOpacity){linkOpacity+=arrowOpacity;}}opacity=linkOpacity;}else opacity=rgbaColor.a*smoothstep(0.5,0.5-smoothDelta,abs(pos.y));gl_FragColor=vec4(color,opacity);}";
  var drawStraightVert = "precision highp float;\n#define GLSLIFY 1\nattribute vec2 position,pointA,pointB;attribute vec4 color;attribute float width;uniform sampler2D positions;uniform sampler2D particleSize;uniform mat3 transform;uniform float pointsTextureSize;uniform float widthScale;uniform float nodeSizeScale;uniform bool useArrow;uniform float arrowSizeScale;uniform float spaceSize;uniform vec2 screenSize;uniform float ratio;uniform vec2 linkVisibilityDistanceRange;uniform float linkVisibilityMinTransparency;varying vec4 rgbaColor;varying vec2 pos;varying float arrowLength;varying float linkWidthArrowWidthRatio;varying float smoothWidthRatio;varying float targetPointSize;float map(float value,float min1,float max1,float min2,float max2){return min2+(value-min1)*(max2-min2)/(max1-min1);}float pointSize(float size){return size*ratio*min(5.0,max(1.0,transform[0][0]*0.01));}void main(){pos=position;targetPointSize=pointSize(texture2D(particleSize,(pointB+0.5)/pointsTextureSize).r*nodeSizeScale);vec4 pointPositionA=texture2D(positions,(pointA+0.5)/pointsTextureSize);vec4 pointPositionB=texture2D(positions,(pointB+0.5)/pointsTextureSize);vec2 a=pointPositionA.xy;vec2 b=pointPositionB.xy;vec2 xBasis=b-a;vec2 yBasis=normalize(vec2(-xBasis.y,xBasis.x));vec2 distVector=a-b;float linkDist=sqrt(dot(distVector,distVector));float linkDistPx=linkDist*transform[0][0];targetPointSize=(targetPointSize/(2.0*ratio))/linkDistPx;float linkWidth=width*widthScale;float k=2.0;float arrowWidth=max(5.0,linkWidth*k);arrowWidth*=arrowSizeScale;float arrowWidthPx=arrowWidth/transform[0][0];arrowLength=min(0.3,(0.866*arrowWidthPx*2.0)/linkDist);float smoothWidth=2.0;float arrowExtraWidth=arrowWidth-linkWidth;linkWidth+=smoothWidth/2.0;if(useArrow){linkWidth+=arrowExtraWidth;}smoothWidthRatio=smoothWidth/linkWidth;linkWidthArrowWidthRatio=arrowExtraWidth/linkWidth;float linkWidthPx=linkWidth/transform[0][0];vec3 rgbColor=color.rgb;float opacity=color.a*max(linkVisibilityMinTransparency,map(linkDistPx,linkVisibilityDistanceRange.g,linkVisibilityDistanceRange.r,0.0,1.0));rgbaColor=vec4(rgbColor,opacity);vec2 point=a+xBasis*position.x+yBasis*linkWidthPx*position.y;vec2 p=2.0*point/spaceSize-1.0;p*=spaceSize/screenSize;vec3 final=transform*vec3(p,1);gl_Position=vec4(final.rg,0,1);}";
  var Lines = class extends CoreModule {
    create() {
      this.updateColor();
      this.updateWidth();
    }
    initPrograms() {
      const { reglInstance, config: config2, store, data, points } = this;
      const { pointsTextureSize } = store;
      const geometryLinkBuffer = {
        buffer: reglInstance.buffer([
          [0, -0.5],
          [1, -0.5],
          [1, 0.5],
          [0, -0.5],
          [1, 0.5],
          [0, 0.5]
        ]),
        divisor: 0
      };
      const instancePoints = [];
      data.links.forEach((l) => {
        const fromX = l.from % pointsTextureSize;
        const fromY = Math.floor(l.from / pointsTextureSize);
        const toX = l.to % pointsTextureSize;
        const toY = Math.floor(l.to / pointsTextureSize);
        instancePoints.push([fromX, fromY]);
        instancePoints.push([toX, toY]);
      });
      const pointsBuffer = reglInstance.buffer(instancePoints);
      this.drawStraightCommand = reglInstance({
        vert: drawStraightVert,
        frag: drawStraightFrag,
        attributes: {
          position: geometryLinkBuffer,
          pointA: {
            buffer: () => pointsBuffer,
            divisor: 1,
            offset: Float32Array.BYTES_PER_ELEMENT * 0,
            stride: Float32Array.BYTES_PER_ELEMENT * 4
          },
          pointB: {
            buffer: () => pointsBuffer,
            divisor: 1,
            offset: Float32Array.BYTES_PER_ELEMENT * 2,
            stride: Float32Array.BYTES_PER_ELEMENT * 4
          },
          color: {
            buffer: () => this.colorBuffer,
            divisor: 1,
            offset: Float32Array.BYTES_PER_ELEMENT * 0,
            stride: Float32Array.BYTES_PER_ELEMENT * 4
          },
          width: {
            buffer: () => this.widthBuffer,
            divisor: 1,
            offset: Float32Array.BYTES_PER_ELEMENT * 0,
            stride: Float32Array.BYTES_PER_ELEMENT * 1
          }
        },
        uniforms: {
          positions: () => points === null || points === void 0 ? void 0 : points.currentPositionFbo,
          particleSize: () => points === null || points === void 0 ? void 0 : points.sizeFbo,
          transform: () => store.transform,
          pointsTextureSize: () => store.pointsTextureSize,
          nodeSizeScale: () => config2.nodeSizeScale,
          widthScale: () => config2.linkWidthScale,
          useArrow: () => config2.linkArrows,
          arrowSizeScale: () => config2.linkArrowsSizeScale,
          spaceSize: () => config2.spaceSize,
          screenSize: () => store.screenSize,
          ratio: () => config2.pixelRatio,
          linkVisibilityDistanceRange: () => config2.linkVisibilityDistanceRange,
          linkVisibilityMinTransparency: () => config2.linkVisibilityMinTransparency
        },
        cull: {
          enable: true,
          face: "back"
        },
        blend: {
          enable: true,
          func: {
            dstRGB: "one minus src alpha",
            srcRGB: "src alpha",
            dstAlpha: "one minus src alpha",
            srcAlpha: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: {
          enable: false,
          mask: false
        },
        count: 6,
        instances: () => data.links.length
      });
    }
    draw() {
      var _a;
      if (!this.colorBuffer || !this.widthBuffer)
        return;
      (_a = this.drawStraightCommand) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    updateColor() {
      const { reglInstance, config: config2, data: { links: links2 } } = this;
      const instancePoints = [];
      links2.forEach((l) => {
        var _a;
        const c = (_a = getValue(l, config2.linkColor)) !== null && _a !== void 0 ? _a : defaultLinkColor;
        const rgba2 = getRgbaColor(c);
        instancePoints.push(rgba2);
      });
      this.colorBuffer = reglInstance.buffer(instancePoints);
    }
    updateWidth() {
      const { reglInstance, config: config2, data: { links: links2 } } = this;
      const instancePoints = [];
      links2.forEach((l) => {
        const linkWidth = getValue(l, config2.linkWidth);
        instancePoints.push([linkWidth !== null && linkWidth !== void 0 ? linkWidth : defaultLinkWidth]);
      });
      this.widthBuffer = reglInstance.buffer(instancePoints);
    }
    destroy() {
      var _a, _b;
      (_a = this.colorBuffer) === null || _a === void 0 ? void 0 : _a.destroy();
      (_b = this.widthBuffer) === null || _b === void 0 ? void 0 : _b.destroy();
    }
  };
  function createColorBuffer(nodes2, reglInstance, textureSize, colorAccessor) {
    var _a;
    const initialState = new Float32Array(textureSize * textureSize * 4);
    for (const [i, node] of nodes2.entries()) {
      const c = (_a = getValue(node, colorAccessor)) !== null && _a !== void 0 ? _a : defaultNodeColor;
      const rgba2 = getRgbaColor(c);
      initialState[i * 4 + 0] = rgba2[0];
      initialState[i * 4 + 1] = rgba2[1];
      initialState[i * 4 + 2] = rgba2[2];
      initialState[i * 4 + 3] = rgba2[3];
    }
    const initialTexture = reglInstance.texture({
      data: initialState,
      width: textureSize,
      height: textureSize,
      type: "float"
    });
    return reglInstance.framebuffer({
      color: initialTexture,
      depth: false,
      stencil: false
    });
  }
  var drawPointsFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nvarying vec2 index;varying vec3 rgbColor;varying float alpha;const float smoothing=0.9;void main(){if(alpha==0.0){discard;}float r=0.0;float delta=0.0;vec2 cxy=2.0*gl_PointCoord-1.0;r=dot(cxy,cxy);float opacity=alpha*(1.0-smoothstep(smoothing,1.0,r));gl_FragColor=vec4(rgbColor,opacity);}";
  var drawPointsVert = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nattribute vec2 indexes;uniform sampler2D positions;uniform sampler2D particleColor;uniform sampler2D particleSize;uniform float ratio;uniform mat3 transform;uniform float pointsTextureSize;uniform float sizeScale;uniform float spaceSize;uniform vec2 screenSize;varying vec2 index;varying vec3 rgbColor;varying float alpha;float pointSize(float size){return size*ratio*min(5.0,max(1.0,transform[0][0]*0.01));}void main(){index=indexes;vec4 pointPosition=texture2D(positions,(index+0.5)/pointsTextureSize);vec2 point=pointPosition.rg;vec2 p=2.0*point/spaceSize-1.0;p*=spaceSize/screenSize;vec3 final=transform*vec3(p,1);gl_Position=vec4(final.rg,0,1);vec4 pSize=texture2D(particleSize,(index+0.5)/pointsTextureSize);float size=pSize.r*sizeScale;vec4 pColor=texture2D(particleColor,(index+0.5)/pointsTextureSize);rgbColor=pColor.rgb;gl_PointSize=pointSize(size);alpha=pColor.a;}";
  var findPointFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform sampler2D particleSize;uniform float sizeScale;uniform float spaceSize;uniform vec2 screenSize;uniform float ratio;uniform mat3 transform;uniform vec2 selection[2];uniform bool isClick;varying vec2 index;float pointSize(float size){return size*ratio*min(5.0,max(1.0,transform[0][0]*0.01));}void main(){vec4 pointPosition=texture2D(position,index);vec2 p=2.0*pointPosition.rg/spaceSize-1.0;p*=spaceSize/screenSize;vec3 final=transform*vec3(p,1);vec4 pSize=texture2D(particleSize,index);float size=pSize.r*sizeScale;float left=2.0*(selection[0].x-0.5*pointSize(size))/screenSize.x-1.0;float right=2.0*(selection[1].x+0.5*pointSize(size))/screenSize.x-1.0;float top=2.0*(selection[0].y-0.5*pointSize(size))/screenSize.y-1.0;float bottom=2.0*(selection[1].y+0.5*pointSize(size))/screenSize.y-1.0;if(final.x>=left&&final.x<=right&&final.y>=top&&final.y<=bottom){gl_FragColor=vec4(1.0,isClick ? 1.0 : 0.0,1.0,1.0);}else{gl_FragColor=vec4(0.0);}}";
  function createSizeBuffer(nodes2, reglInstance, pointTextureSize, sizeAccessor) {
    const numParticles = nodes2.length;
    const initialState = new Float32Array(pointTextureSize * pointTextureSize * 4);
    for (let i = 0; i < numParticles; ++i) {
      const node = nodes2[i];
      if (node) {
        const size = getValue(node, sizeAccessor);
        initialState[i * 4] = size !== null && size !== void 0 ? size : defaultNodeSize;
      }
    }
    const initialTexture = reglInstance.texture({
      data: initialState,
      width: pointTextureSize,
      height: pointTextureSize,
      type: "float"
    });
    return reglInstance.framebuffer({
      color: initialTexture,
      depth: false,
      stencil: false
    });
  }
  var updatePositionFrag = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D position;uniform sampler2D velocity;uniform float friction;uniform float spaceSize;varying vec2 index;void main(){vec4 pointPosition=texture2D(position,index);vec4 pointVelocity=texture2D(velocity,index);pointVelocity.rg*=friction;pointPosition.rg+=pointVelocity.rg;pointPosition.r=clamp(pointPosition.r,0.0,spaceSize);pointPosition.g=clamp(pointPosition.g,0.0,spaceSize);gl_FragColor=pointPosition;}";
  var Points = class extends CoreModule {
    create() {
      var _a, _b;
      const { reglInstance, config: config2, store, data: { nodes: nodes2 } } = this;
      const { spaceSize } = config2;
      const { pointsTextureSize } = store;
      const numParticles = nodes2.length;
      const initialState = new Float32Array(pointsTextureSize * pointsTextureSize * 4);
      for (let i = 0; i < numParticles; ++i) {
        const node = nodes2[i];
        initialState[i * 4 + 0] = (_a = node === null || node === void 0 ? void 0 : node.x) !== null && _a !== void 0 ? _a : (spaceSize !== null && spaceSize !== void 0 ? spaceSize : defaultConfigValues.spaceSize) * (Math.random() * (0.505 - 0.495) + 0.495);
        initialState[i * 4 + 1] = (_b = node === null || node === void 0 ? void 0 : node.y) !== null && _b !== void 0 ? _b : (spaceSize !== null && spaceSize !== void 0 ? spaceSize : defaultConfigValues.spaceSize) * (Math.random() * (0.505 - 0.495) + 0.495);
      }
      this.currentPositionFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: initialState,
          shape: [pointsTextureSize, pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.previousPositionFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: initialState,
          shape: [pointsTextureSize, pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.velocityFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: new Float32Array(pointsTextureSize * pointsTextureSize * 4).fill(0),
          shape: [pointsTextureSize, pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.selectedFbo = reglInstance.framebuffer({
        color: reglInstance.texture({
          data: initialState,
          shape: [pointsTextureSize, pointsTextureSize, 4],
          type: "float"
        }),
        depth: false,
        stencil: false
      });
      this.updateSize();
      this.updateColor();
    }
    initPrograms() {
      const { reglInstance, config: config2, store, data } = this;
      this.updatePositionCommand = reglInstance({
        frag: updatePositionFrag,
        vert: updateVert,
        framebuffer: () => this.currentPositionFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => this.previousPositionFbo,
          velocity: () => this.velocityFbo,
          friction: () => {
            var _a;
            return (_a = config2.simulation) === null || _a === void 0 ? void 0 : _a.friction;
          },
          spaceSize: () => config2.spaceSize
        }
      });
      this.drawCommand = reglInstance({
        frag: drawPointsFrag,
        vert: drawPointsVert,
        primitive: "points",
        count: () => data.nodes.length,
        attributes: { indexes: createIndexesBuffer(reglInstance, store.pointsTextureSize) },
        uniforms: {
          positions: () => this.currentPositionFbo,
          particleColor: () => this.colorFbo,
          particleSize: () => this.sizeFbo,
          ratio: () => config2.pixelRatio,
          sizeScale: () => config2.nodeSizeScale,
          pointsTextureSize: () => store.pointsTextureSize,
          transform: () => store.transform,
          spaceSize: () => config2.spaceSize,
          screenSize: () => store.screenSize
        },
        blend: {
          enable: true,
          func: {
            dstRGB: "one minus src alpha",
            srcRGB: "src alpha",
            dstAlpha: "one minus src alpha",
            srcAlpha: "one"
          },
          equation: {
            rgb: "add",
            alpha: "add"
          }
        },
        depth: {
          enable: false,
          mask: false
        }
      });
      this.findPointCommand = reglInstance({
        frag: findPointFrag,
        vert: updateVert,
        framebuffer: () => this.selectedFbo,
        primitive: "triangle strip",
        count: 4,
        attributes: { quad: createQuadBuffer(reglInstance) },
        uniforms: {
          position: () => this.currentPositionFbo,
          particleSize: () => this.sizeFbo,
          spaceSize: () => config2.spaceSize,
          screenSize: () => store.screenSize,
          sizeScale: () => config2.nodeSizeScale,
          transform: () => store.transform,
          ratio: () => config2.pixelRatio,
          "selection[0]": () => store.selectedArea[0],
          "selection[1]": () => store.selectedArea[1],
          isClick: (_, props) => props.isClick
        }
      });
    }
    updateColor() {
      const { reglInstance, config: config2, store, data: { nodes: nodes2 } } = this;
      this.colorFbo = createColorBuffer(nodes2, reglInstance, store.pointsTextureSize, config2.nodeColor);
    }
    updateSize() {
      const { reglInstance, config: config2, store, data: { nodes: nodes2 } } = this;
      this.sizeFbo = createSizeBuffer(nodes2, reglInstance, store.pointsTextureSize, config2.nodeSize);
    }
    draw() {
      var _a;
      (_a = this.drawCommand) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    updatePosition() {
      var _a;
      (_a = this.updatePositionCommand) === null || _a === void 0 ? void 0 : _a.call(this);
      this.swapFbo();
    }
    findPoint(isClick) {
      var _a;
      (_a = this.findPointCommand) === null || _a === void 0 ? void 0 : _a.call(this, { isClick });
    }
    destroy() {
      var _a, _b, _c, _d, _e, _f;
      (_a = this.currentPositionFbo) === null || _a === void 0 ? void 0 : _a.destroy();
      (_b = this.previousPositionFbo) === null || _b === void 0 ? void 0 : _b.destroy();
      (_c = this.velocityFbo) === null || _c === void 0 ? void 0 : _c.destroy();
      (_d = this.selectedFbo) === null || _d === void 0 ? void 0 : _d.destroy();
      (_e = this.colorFbo) === null || _e === void 0 ? void 0 : _e.destroy();
      (_f = this.sizeFbo) === null || _f === void 0 ? void 0 : _f.destroy();
    }
    swapFbo() {
      const temp = this.previousPositionFbo;
      this.previousPositionFbo = this.currentPositionFbo;
      this.currentPositionFbo = temp;
    }
  };
  var ALPHA_MIN = 1e-3;
  var Store = class {
    constructor() {
      this.pointsTextureSize = 0;
      this.linksTextureSize = 0;
      this.alpha = 1;
      this.transform = mat3_exports.create();
      this.backgroundColor = [0, 0, 0, 0];
      this.screenSize = [0, 0];
      this.mousePosition = [0, 0];
      this.selectedArea = [[0, 0], [0, 0]];
      this.simulationIsRunning = false;
      this.simulationProgress = 0;
      this.selectedIndices = new Float32Array();
      this.alphaTarget = 0;
      this.alphaDecay = (decay) => 1 - Math.pow(ALPHA_MIN, 1 / decay);
    }
    addAlpha(decay) {
      return (this.alphaTarget - this.alpha) * this.alphaDecay(decay);
    }
  };
  var Zoom = class {
    constructor(store) {
      this.eventTransform = identity2;
      this.behavior = zoom_default2().on("start", () => {
        this.isRunning = true;
      }).on("zoom", (event) => {
        this.eventTransform = event.transform;
        const { eventTransform: { x, y, k }, store: { transform: transform2, screenSize } } = this;
        const w = screenSize[0];
        const h = screenSize[1];
        mat3_exports.projection(transform2, w, h);
        mat3_exports.translate(transform2, transform2, [x, y]);
        mat3_exports.scale(transform2, transform2, [k, k]);
        mat3_exports.translate(transform2, transform2, [w / 2, h / 2]);
        mat3_exports.scale(transform2, transform2, [w / 2, h / 2]);
        mat3_exports.scale(transform2, transform2, [1, -1]);
      }).on("end", () => {
        this.isRunning = false;
      });
      this.isRunning = false;
      this.store = store;
    }
  };
  var Graph = class {
    constructor(canvas2, config2) {
      this.config = new GraphConfig();
      this.requestAnimationFrameId = 0;
      this.isRightClickMouse = false;
      this.graph = new GraphData();
      this.store = new Store();
      this.zoomInstance = new Zoom(this.store);
      this.hasBeenRecentlyDestroyed = false;
      if (config2)
        this.config.init(config2);
      const w = canvas2.clientWidth;
      const h = canvas2.clientHeight;
      this.store.screenSize = [w, h];
      canvas2.width = w * this.config.pixelRatio;
      canvas2.height = h * this.config.pixelRatio;
      if (canvas2.style.width === "" && canvas2.style.height === "") {
        select_default2(canvas2).style("width", "100%").style("height", "100%");
      }
      this.canvas = canvas2;
      select_default2(canvas2).call(this.zoomInstance.behavior).on("click", this.onClick.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("contextmenu", this.onRightClickMouse.bind(this));
      this.reglInstance = (0, import_regl.default)({
        canvas: this.canvas,
        attributes: {
          antialias: false,
          preserveDrawingBuffer: true,
          premultipliedAlpha: false,
          alpha: false
        },
        extensions: ["OES_texture_float", "ANGLE_instanced_arrays"]
      });
      this.points = new Points(this.reglInstance, this.config, this.store, this.graph);
      this.lines = new Lines(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceGravity = new ForceGravity(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceCenter = new ForceCenter(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceManyBody = this.config.useQuadtree ? new ForceManyBodyQuadtree(this.reglInstance, this.config, this.store, this.graph, this.points) : new ForceManyBody(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceLinkIncoming = new ForceLink(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceLinkOutcoming = new ForceLink(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.forceMouse = new ForceMouse(this.reglInstance, this.config, this.store, this.graph, this.points);
      this.store.backgroundColor = getRgbaColor(this.config.backgroundColor);
      if (this.config.showFPSMonitor)
        this.fpsMonitor = new FPSMonitor(this.canvas);
    }
    get progress() {
      return this.store.simulationProgress;
    }
    get simulationIsRunning() {
      return this.store.simulationIsRunning;
    }
    get nodes() {
      return this.graph.nodes;
    }
    get links() {
      return this.graph.links;
    }
    setConfig(config2) {
      var _a;
      const prevConfig = { ...this.config };
      this.config.init(config2);
      if (prevConfig.linkColor !== this.config.linkColor)
        this.lines.updateColor();
      if (prevConfig.nodeColor !== this.config.nodeColor)
        this.points.updateColor();
      if (prevConfig.nodeSize !== this.config.nodeSize)
        this.points.updateSize();
      if (prevConfig.linkWidth !== this.config.linkWidth)
        this.lines.updateWidth();
      if (prevConfig.backgroundColor !== this.config.backgroundColor)
        this.store.backgroundColor = getRgbaColor(this.config.backgroundColor);
      if (prevConfig.spaceSize !== this.config.spaceSize || prevConfig.simulation.repulsionQuadtreeLevels !== this.config.simulation.repulsionQuadtreeLevels)
        this.update(this.store.simulationIsRunning);
      if (prevConfig.showFPSMonitor !== this.config.showFPSMonitor) {
        if (this.config.showFPSMonitor) {
          this.fpsMonitor = new FPSMonitor(this.canvas);
        } else {
          (_a = this.fpsMonitor) === null || _a === void 0 ? void 0 : _a.destroy();
          this.fpsMonitor = void 0;
        }
      }
    }
    setData(nodes2, links2, runSimulation = true) {
      if (!nodes2.length && !links2.length) {
        this.destroy();
        this.reglInstance.clear({
          color: this.store.backgroundColor,
          depth: 1,
          stencil: 0
        });
        return;
      }
      this.graph.setData(nodes2, links2);
      this.update(runSimulation);
    }
    findNodeById(id2) {
      return this.graph.findNodeById(id2);
    }
    selectNodeById(id2) {
      const node = this.graph.findNodeById(id2);
      if (!node)
        return;
      const positionPixels = readPixels(this.reglInstance, this.points.currentPositionFbo);
      const posX = positionPixels[node.index * 4 + 0];
      const posY = positionPixels[node.index * 4 + 1];
      if (posX === void 0 || posY === void 0)
        return;
      const scale2 = 8;
      const translateX = posX - this.config.spaceSize / 2;
      const translateY = posY - this.config.spaceSize / 2;
      select_default2(this.canvas).transition().duration(250).call(this.zoomInstance.behavior.transform, identity2.translate(0, 0).scale(1).translate(-translateX, translateY)).transition().duration(500).call(this.zoomInstance.behavior.scaleTo, scale2);
    }
    zoom(value, duration = 0) {
      select_default2(this.canvas).transition().duration(duration).call(this.zoomInstance.behavior.scaleTo, value);
    }
    getNodePositions() {
      if (this.hasBeenRecentlyDestroyed)
        return {};
      const particlePositionPixels = readPixels(this.reglInstance, this.points.currentPositionFbo);
      return this.graph.nodes.reduce((acc, curr, i) => {
        const posX = particlePositionPixels[i * 4 + 0];
        const posY = particlePositionPixels[i * 4 + 1];
        if (posX !== void 0 && posY !== void 0) {
          acc[curr.id] = {
            x: posX,
            y: posY
          };
        }
        return acc;
      }, {});
    }
    onSelect(selection2) {
      if (selection2) {
        const h = this.store.screenSize[1];
        this.store.selectedArea = [[selection2[0][0], h - selection2[1][1]], [selection2[1][0], h - selection2[0][1]]];
        this.points.findPoint(false);
        const pixels = readPixels(this.reglInstance, this.points.selectedFbo);
        this.store.selectedIndices = pixels.map((pixel, i) => {
          if (i % 4 === 0 && pixel !== 0)
            return i / 4;
          else
            return -1;
        }).filter((d) => d !== -1);
      } else {
        this.store.selectedIndices = new Float32Array();
      }
    }
    get selectedPoints() {
      return this.graph.nodes.filter((n, i) => this.store.selectedIndices.includes(i));
    }
    start(alpha = 1) {
      var _a, _b;
      if (!this.graph.nodes.length)
        return;
      this.store.simulationIsRunning = true;
      this.store.alpha = alpha;
      this.store.simulationProgress = 0;
      (_b = (_a = this.config.simulation).onStart) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.stopFrames();
      this.frame();
    }
    pause() {
      var _a, _b;
      this.store.simulationIsRunning = false;
      (_b = (_a = this.config.simulation).onPause) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    restart() {
      var _a, _b;
      this.store.simulationIsRunning = true;
      (_b = (_a = this.config.simulation).onRestart) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    drawOneFrame() {
      this.store.simulationIsRunning = false;
      this.stopFrames();
      this.frame();
    }
    destroy() {
      var _a;
      this.stopFrames();
      if (this.hasBeenRecentlyDestroyed)
        return;
      this.points.destroy();
      this.lines.destroy();
      this.forceCenter.destroy();
      this.forceLinkIncoming.destroy();
      this.forceLinkOutcoming.destroy();
      (_a = this.forceManyBody) === null || _a === void 0 ? void 0 : _a.destroy();
      this.reglInstance.destroy();
      this.hasBeenRecentlyDestroyed = true;
    }
    create() {
      var _a;
      this.points.create();
      this.lines.create();
      (_a = this.forceManyBody) === null || _a === void 0 ? void 0 : _a.create();
      this.forceLinkIncoming.create(LinkDirection.INCOMING);
      this.forceLinkOutcoming.create(LinkDirection.OUTCOMING);
      this.forceCenter.create();
      this.hasBeenRecentlyDestroyed = false;
    }
    update(runSimulation) {
      const { graph: graph2 } = this;
      this.store.pointsTextureSize = Math.ceil(Math.sqrt(graph2.nodes.length));
      this.store.linksTextureSize = Math.ceil(Math.sqrt(graph2.links.length * 2));
      this.destroy();
      this.create();
      this.initPrograms();
      if (runSimulation) {
        this.start();
      } else {
        this.drawOneFrame();
      }
    }
    initPrograms() {
      var _a;
      this.points.initPrograms();
      this.lines.initPrograms();
      this.forceGravity.initPrograms();
      this.forceLinkIncoming.initPrograms();
      this.forceLinkOutcoming.initPrograms();
      this.forceMouse.initPrograms();
      (_a = this.forceManyBody) === null || _a === void 0 ? void 0 : _a.initPrograms();
      this.forceCenter.initPrograms();
    }
    frame() {
      const { config: { simulation, renderLinks }, store: { alpha, simulationIsRunning } } = this;
      if (alpha < ALPHA_MIN && simulationIsRunning)
        this.end();
      this.requestAnimationFrameId = window.requestAnimationFrame((now2) => {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.fpsMonitor) === null || _a === void 0 ? void 0 : _a.begin();
        this.resizeCanvas();
        if (this.isRightClickMouse) {
          if (!simulationIsRunning)
            this.start(0.1);
          this.forceMouse.run();
          this.points.updatePosition();
        }
        if (simulationIsRunning && !this.zoomInstance.isRunning) {
          if (simulation.gravity) {
            this.forceGravity.run();
            this.points.updatePosition();
          }
          if (simulation.center) {
            this.forceCenter.run();
            this.points.updatePosition();
          }
          (_b = this.forceManyBody) === null || _b === void 0 ? void 0 : _b.run();
          this.points.updatePosition();
          this.forceLinkIncoming.run();
          this.points.updatePosition();
          this.forceLinkOutcoming.run();
          this.points.updatePosition();
          this.store.alpha += this.store.addAlpha((_c = this.config.simulation.decay) !== null && _c !== void 0 ? _c : defaultConfigValues.simulation.decay);
          if (this.isRightClickMouse)
            this.store.alpha = Math.max(this.store.alpha, 0.1);
          this.store.simulationProgress = Math.sqrt(Math.min(1, ALPHA_MIN / this.store.alpha));
          (_e = (_d = this.config.simulation).onTick) === null || _e === void 0 ? void 0 : _e.call(_d, this.store.alpha);
        }
        this.reglInstance.clear({
          color: this.store.backgroundColor,
          depth: 1,
          stencil: 0
        });
        if (renderLinks) {
          this.lines.draw();
        }
        this.points.draw();
        (_f = this.fpsMonitor) === null || _f === void 0 ? void 0 : _f.end(now2);
        this.frame();
      });
    }
    stopFrames() {
      if (this.requestAnimationFrameId)
        window.cancelAnimationFrame(this.requestAnimationFrameId);
    }
    end() {
      var _a, _b;
      this.store.simulationIsRunning = false;
      this.store.simulationProgress = 1;
      (_b = (_a = this.config.simulation).onEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    onClick(event) {
      var _a, _b, _c;
      const h = this.store.screenSize[1];
      this.store.selectedArea = [[event.offsetX, h - event.offsetY], [event.offsetX, h - event.offsetY]];
      this.points.findPoint(true);
      const pixels = readPixels(this.reglInstance, this.points.selectedFbo);
      const selectedIndices = pixels.map((pixel, i) => {
        if (i % 4 === 0 && pixel !== 0)
          return i / 4;
        else
          return 404;
      }).filter((d) => d !== 404);
      this.store.selectedIndices = selectedIndices;
      const clickedId = (_a = selectedIndices[selectedIndices.length - 1]) !== null && _a !== void 0 ? _a : -1;
      const clickedParticle = selectedIndices.length ? this.graph.nodes[clickedId] : void 0;
      (_c = (_b = this.config.events).onClick) === null || _c === void 0 ? void 0 : _c.call(_b, clickedParticle);
    }
    onMouseMove(event) {
      const { x, y, k } = this.zoomInstance.eventTransform;
      const h = this.canvas.clientHeight;
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      const invertedX = (mouseX - x) / k;
      const invertedY = (mouseY - y) / k;
      this.store.mousePosition = [invertedX, h - invertedY];
      this.store.mousePosition[0] -= (this.store.screenSize[0] - this.config.spaceSize) / 2;
      this.store.mousePosition[1] -= (this.store.screenSize[1] - this.config.spaceSize) / 2;
      this.isRightClickMouse = event.which === 3;
    }
    onRightClickMouse(event) {
      event.preventDefault();
    }
    resizeCanvas() {
      const prevWidth = this.canvas.width;
      const prevHeight = this.canvas.height;
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      if (prevWidth !== w * this.config.pixelRatio || prevHeight !== h * this.config.pixelRatio) {
        this.store.screenSize = [w, h];
        this.canvas.width = w * this.config.pixelRatio;
        this.canvas.height = h * this.config.pixelRatio;
        this.reglInstance.poll();
        select_default2(this.canvas).call(this.zoomInstance.behavior.transform, this.zoomInstance.eventTransform);
      }
    }
  };

  // index.js
  var columns = 10;
  var rows = 10;
  var nodes = [];
  for (x = 0; x < columns; x++) {
    for (y = 0; y < rows; y++) {
      nodes.push({
        id: x + y * columns
      });
    }
  }
  var y;
  var x;
  var links = [];
  for (x = 0; x < columns; x++) {
    for (y = 0; y < rows; y++) {
      if (x + 1 < columns)
        links.push({ source: x + y * columns, target: x + 1 + y * columns, value: 1 });
      if (y + 1 < rows)
        links.push({ source: x + y * columns, target: x + (y + 1) * columns, value: 1 });
    }
  }
  var y;
  var x;
  var canvas = document.querySelector("#container");
  var config = {
    backgroundColor: "#151515",
    nodeSize: 3,
    nodeColor: "#984040",
    linkWidth: 0.1,
    linkColor: "#8C8C8C",
    linkArrows: false,
    simulation: {
      repulsion: 0.5
    },
    renderLinks: true,
    events: {
      onClick: (node) => {
        console.log("Clicked node: ", node);
      }
    }
  };
  var graph = new Graph(canvas, config);
  graph.setData(nodes, links);
})();
//# sourceMappingURL=bundle.js.map

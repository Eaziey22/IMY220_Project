"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('mongodb'),
  ObjectId = _require.ObjectId;
var userModel = exports.userModel = /*#__PURE__*/function () {
  function userModel(dbName) {
    _classCallCheck(this, userModel);
    this.collection = dbName.collection("User");
  }
  return _createClass(userModel, [{
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, email, password) {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.collection.insertOne({
                username: username,
                email: email,
                password: password,
                friends: [],
                playlists: [],
                songs: []
              });
            case 2:
              result = _context.sent;
              console.log("User added to database");
              return _context.abrupt("return", result);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function createUser(_x, _x2, _x3) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
  }, {
    key: "userExists",
    value: function () {
      var _userExists = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userEmail) {
        var user;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.collection.findOne({
                email: userEmail
              });
            case 2:
              user = _context2.sent;
              return _context2.abrupt("return", user);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function userExists(_x4) {
        return _userExists.apply(this, arguments);
      }
      return userExists;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uEmail) {
        var user;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.collection.findOne({
                email: uEmail
              });
            case 2:
              user = _context3.sent;
              return _context3.abrupt("return", user);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function login(_x5) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var users;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.collection.find({}).toArray();
            case 2:
              users = _context4.sent;
              return _context4.abrupt("return", users);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }
      return getAllUsers;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(userId) {
        var user;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.collection.findOne({
                _id: new ObjectId(userId)
              });
            case 2:
              user = _context5.sent;
              console.log(user);
              return _context5.abrupt("return", user);
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getUserById(_x6) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId, updateData) {
        var result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $set: updateData
              });
            case 2:
              result = _context6.sent;
              console.log("user updated");
              return _context6.abrupt("return", result.modifiedCount > 0 ? result : null);
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function updateUser(_x7, _x8) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(userId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.collection.deleteOne({
                _id: new ObjectId(userId)
              });
            case 2:
              result = _context7.sent;
              return _context7.abrupt("return", result.deletedCount);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function deleteUser(_x9) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
  }, {
    key: "addFriend",
    value: function () {
      var _addFriend = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId, friendId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $addToSet: {
                  friends: new ObjectId(friendId)
                }
              });
            case 2:
              result = _context8.sent;
              console.log("friend added to friends");
              return _context8.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function addFriend(_x10, _x11) {
        return _addFriend.apply(this, arguments);
      }
      return addFriend;
    }()
  }, {
    key: "removeFriend",
    value: function () {
      var _removeFriend = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(userId, friendId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $pull: {
                  friends: new ObjectId(friendId)
                }
              });
            case 2:
              result = _context9.sent;
              console.log("friend removed from friends");
              return _context9.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function removeFriend(_x12, _x13) {
        return _removeFriend.apply(this, arguments);
      }
      return removeFriend;
    }()
  }, {
    key: "addSongToSongs",
    value: function () {
      var _addSongToSongs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(userId, songId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $addToSet: {
                  songs: new ObjectId(songId)
                }
              });
            case 2:
              result = _context10.sent;
              console.log("song added to songs");
              return _context10.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function addSongToSongs(_x14, _x15) {
        return _addSongToSongs.apply(this, arguments);
      }
      return addSongToSongs;
    }()
  }, {
    key: "removeSongFromSongs",
    value: function () {
      var _removeSongFromSongs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(userId, songId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $pull: {
                  songs: new ObjectId(songId)
                }
              });
            case 2:
              result = _context11.sent;
              console.log("song removed from songs");
              return _context11.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function removeSongFromSongs(_x16, _x17) {
        return _removeSongFromSongs.apply(this, arguments);
      }
      return removeSongFromSongs;
    }()
  }, {
    key: "addplaylistToPlaylists",
    value: function () {
      var _addplaylistToPlaylists = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(userId, playlistId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $addToSet: {
                  playlists: new ObjectId(playlistId)
                }
              });
            case 2:
              result = _context12.sent;
              console.log("playlist added to Playlists");
              return _context12.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function addplaylistToPlaylists(_x18, _x19) {
        return _addplaylistToPlaylists.apply(this, arguments);
      }
      return addplaylistToPlaylists;
    }()
  }, {
    key: "removePlaylistFromPlaylists",
    value: function () {
      var _removePlaylistFromPlaylists = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(userId, playlistId) {
        var result;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.collection.updateOne({
                _id: new ObjectId(userId)
              }, {
                $pull: {
                  playlists: new ObjectId(playlistId)
                }
              });
            case 2:
              result = _context13.sent;
              console.log("playlist removed from playlists");
              return _context13.abrupt("return", result.modifiedCount);
            case 5:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function removePlaylistFromPlaylists(_x20, _x21) {
        return _removePlaylistFromPlaylists.apply(this, arguments);
      }
      return removePlaylistFromPlaylists;
    }()
  }]);
}();
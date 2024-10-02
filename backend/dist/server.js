"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _mongodb = require("mongodb");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userModel = require("./userModel");
var _playlistModel = require("./playlistModel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();

//import { userClass } from "./userClass";

var connectionString = process.env.MONGO_URI;
var client = new _mongodb.MongoClient(connectionString);
var db;
var User;
var Playlist;
var Song;
var path = require('path');
//CREATE APP
var app = (0, _express["default"])();
app.use(_express["default"].json());
client.connect().then(function () {
  console.log("Connected to mongoDB");
  db = client.db("Project_DB");
  User = new _userModel.userModel(db);
  Playlist = new _playlistModel.playlistModel(db);
})["catch"](function (error) {
  console.error("Error connecting to MongoDB: ".concat(error));
});

//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(_express["default"]["static"](path.join(__dirname, '../../frontend/public')));
app.post("/register", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, email, password, userEmailExists, hashedPassword, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return User.userExists(email);
        case 4:
          userEmailExists = _context.sent;
          if (!userEmailExists) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: "User with Email: ".concat(email, " already exists")
          }));
        case 7:
          _context.next = 9;
          return _bcrypt["default"].hash(password, 10);
        case 9:
          hashedPassword = _context.sent;
          _context.next = 12;
          return User.createUser(username, email, hashedPassword);
        case 12:
          user = _context.sent;
          res.status(201).json(user);
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log("Error registering user: ".concat(_context.t0));
          res.status(500).json({
            error: "Error registering user"
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, user, isPwValid;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return User.login(email);
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 7:
          _context2.next = 9;
          return _bcrypt["default"].compare(password, user.password);
        case 9:
          isPwValid = _context2.sent;
          if (isPwValid) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: "Invalid password"
          }));
        case 12:
          return _context2.abrupt("return", res.status(200).json({
            message: "Login successful",
            userId: user._id
          }));
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error("could not login user: ".concat(_context2.t0));
          res.status(500).json({
            message: "Internal server error"
          });
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/getUser/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, usr;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return User.getUserById(id);
        case 4:
          usr = _context3.sent;
          if (usr) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json({
            message: "User with userId: ".concat(id, " retrieved successfully"),
            user: usr
          }));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.log("Error getting user by id: ".concat(_context3.t0));
          res.status(500).json({
            error: "Error getting user"
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.put("/updateUser/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 4:
          _context4.next = 6;
          return User.updateUser(id, req.body);
        case 6:
          result = _context4.sent;
          if (result) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Unable to update user"
          }));
        case 9:
          return _context4.abrupt("return", res.status(200).json({
            message: "User with id: ".concat(id, " updated"),
            result: result
          }));
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          console.log("Error updating user: ".concat(_context4.t0));
          res.status(500).json({
            error: "Error updating user"
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app["delete"]("/deleteUser/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, result, pl;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 4:
          _context5.next = 6;
          return User.deleteUser(id);
        case 6:
          result = _context5.sent;
          if (result) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Unable to delete user"
          }));
        case 9:
          _context5.next = 11;
          return Playlist.deleteUserPlaylists(id);
        case 11:
          pl = _context5.sent;
          if (pl) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Unable to delete user's playlists"
          }));
        case 14:
          return _context5.abrupt("return", res.status(200).json({
            message: "User with id: ".concat(id, " deleted"),
            result: result
          }));
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](1);
          console.log("Error deleting user: ".concat(_context5.t0));
          res.status(500).json({
            error: "Error deleting user"
          });
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 17]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.post("/createPlaylist", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, playlistName, ownerId, songs, playlist;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, playlistName = _req$body3.playlistName, ownerId = _req$body3.ownerId, songs = _req$body3.songs;
          _context6.next = 4;
          return Playlist.createPlaylist(playlistName, ownerId, songs);
        case 4:
          playlist = _context6.sent;
          res.status(201).json(playlist);
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log("Error creating a new playlist: ".concat(_context6.t0));
          res.status(500).json({
            error: "Error creating a new playlist"
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.get("/getPlaylist/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, pl;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context7.next = 6;
          return Playlist.getPlaylistById(id);
        case 6:
          pl = _context7.sent;
          if (pl) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 9:
          return _context7.abrupt("return", res.status(200).json({
            message: "Playlist with playlistId: ".concat(id, " retrieved successfully"),
            playlist: pl
          }));
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](1);
          console.log("Error getting playlist by id: ".concat(_context7.t0));
          res.status(500).json({
            error: "Error getting playlist"
          });
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app.get("/getPlaylists/:id", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, pl;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          userId = req.params.id;
          _context8.prev = 1;
          if (_mongodb.ObjectId.isValid(userId)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 4:
          _context8.next = 6;
          return Playlist.getUserPlaylists(userId);
        case 6:
          pl = _context8.sent;
          if (pl) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "Playlists not found"
          }));
        case 9:
          return _context8.abrupt("return", res.status(200).json({
            message: "User with userId: ".concat(userId, "'s playlists retrieved successfully"),
            playlists: pl
          }));
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](1);
          console.log("Error getting user's playlists: ".concat(_context8.t0));
          res.status(500).json({
            error: "Error getting user's playlists"
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
app.put("/updatePlaylist/:id", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context9.next = 6;
          return Playlist.updatePlaylist(id, req.body);
        case 6:
          result = _context9.sent;
          if (result) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "Unable to update playlist"
          }));
        case 9:
          return _context9.abrupt("return", res.status(200).json({
            message: "Playlist with id: ".concat(id, " updated"),
            result: result
          }));
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](1);
          console.log("Error updating playlist: ".concat(_context9.t0));
          res.status(500).json({
            error: "Error updating playlist"
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.put("/playlists/:playlistId/songs/:songId", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$params, playlistId, songId, modifiedCount;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _req$params = req.params, playlistId = _req$params.playlistId, songId = _req$params.songId;
          _context10.prev = 1;
          _context10.next = 4;
          return User.addSongToPlaylist(playlistId, songId);
        case 4:
          modifiedCount = _context10.sent;
          if (!(modifiedCount === 0)) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: "Playlist not found or song already exists."
          }));
        case 7:
          return _context10.abrupt("return", res.status(200).json({
            message: "Song added to playlist successfully."
          }));
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](1);
          console.log("Error adding song to playlist: ".concat(_context10.t0));
          res.status(500).json({
            error: "Error adding song to playlist."
          });
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 10]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app["delete"]("/deletePlaylist/:id", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var PlaylistId, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          PlaylistId = req.params.id;
          _context11.prev = 1;
          if (_mongodb.ObjectId.isValid(PlaylistId)) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context11.next = 6;
          return Playlist.deletePlaylist(PlaylistId);
        case 6:
          result = _context11.sent;
          if (result) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: "Unable to delete playlist"
          }));
        case 9:
          return _context11.abrupt("return", res.status(200).json({
            message: "Playlist with id: ".concat(PlaylistId, " deleted"),
            result: result
          }));
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](1);
          console.log("Error deleting playlist: ".concat(_context11.t0));
          res.status(500).json({
            error: "Error deleting playlist"
          });
        case 16:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 12]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

//PORT TO LISTEN TO
app.listen(3001, function () {
  console.log("Listening on localhost:3001");
});
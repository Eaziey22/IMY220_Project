"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _mongodb = require("mongodb");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userModel = require("./userModel");
var _playlistModel = require("./playlistModel");
var _songModel = require("./songModel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var multer = require("multer");

//const jwt = require('jsonwebtoken');
//const secretKey = process.env.Secret_Key

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

//const storage = multer.memoryStorage(); 
//const upload = multer({ storage: storage });

var upload = multer({
  dest: path.join(__dirname, '../../frontend/public/assets/images/profilePictures')
});
app.use(_express["default"].json({
  limit: '50mb'
}));
app.use(_express["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
client.connect().then(function () {
  console.log("Connected to mongoDB");
  db = client.db("Project_DB");
  User = new _userModel.userModel(db);
  Playlist = new _playlistModel.playlistModel(db);
  Song = new _songModel.songModel(db);
})["catch"](function (error) {
  console.error("Error connecting to MongoDB: ".concat(error));
});

//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(_express["default"]["static"](path.join(__dirname, '../../frontend/public')));
app.post("/auth/register", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, surname, username, email, password, bio, pronouns, instagram, facebook, twitter, userEmailExists, hashedPassword, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname, username = _req$body.username, email = _req$body.email, password = _req$body.password, bio = _req$body.bio, pronouns = _req$body.pronouns, instagram = _req$body.instagram, facebook = _req$body.facebook, twitter = _req$body.twitter;
          _context.next = 4;
          return User.userExists(email);
        case 4:
          userEmailExists = _context.sent;
          if (!userEmailExists) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            status: "error",
            message: "Email address already exists"
          }));
        case 7:
          _context.next = 9;
          return _bcrypt["default"].hash(password, 10);
        case 9:
          hashedPassword = _context.sent;
          _context.next = 12;
          return User.createUser(name, surname, username, email, hashedPassword, bio, pronouns, instagram, facebook, twitter);
        case 12:
          user = _context.sent;
          //const tkn = jwt.sign({userId: user._id, email: user.email}, secretKey, {expiresIn: '2h'});

          console.log("User:", user);
          res.status(201).json({
            status: "success",
            message: "user registered successfully",
            data: {
              userId: user.insertedId
            }
            /*data : {token : tkn }*/
          });
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.log("Error registering user: ".concat(_context.t0));
          res.status(500).json({
            status: "error",
            error: "Internal server error"
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/auth/login", /*#__PURE__*/function () {
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
            status: "error",
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
            status: "error",
            message: "Invalid password"
          }));
        case 12:
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            message: "Login successful",
            /*data :{token: tkn}*/
            data: {
              userId: user._id
            }
          }));
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error("could not login user: ".concat(_context2.t0));
          res.status(500).json({
            status: "error",
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
          if (_mongodb.ObjectId.isValid(id)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format"
          }));
        case 4:
          _context3.next = 6;
          return User.getUserById(id);
        case 6:
          usr = _context3.sent;
          console.log(usr);
          if (usr) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            status: "error",
            message: "User not found"
          }));
        case 10:
          return _context3.abrupt("return", res.status(200).json({
            status: "success",
            message: "User with userId: ".concat(id, " retrieved successfully"),
            data: {
              userId: usr._id,
              username: usr.username,
              friends: usr.friends,
              profilePicture: usr.profilePicture,
              name: usr.name,
              surname: usr.surname,
              pronouns: usr.pronouns,
              bio: usr.bio,
              instagram: usr.instagram,
              twitter: usr.twitter,
              facebook: usr.facebook,
              email: usr.email
            }
          }));
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.log("Error getting user by id: ".concat(_context3.t0));
          res.status(500).json({
            status: "error",
            error: "Internal server error"
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.put("/updateUser/:id", upload.single('profilePicture'), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, updateData, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          updateData = {};
          _context4.prev = 2;
          if (_mongodb.ObjectId.isValid(id)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format"
          }));
        case 5:
          updateData = req.body;
          if (req.file) {
            updateData.profilePicture = "/assets/images/profilePictures/".concat(req.file.filename);
          }
          _context4.next = 9;
          return User.updateUser(id, updateData);
        case 9:
          result = _context4.sent;
          if (result) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to update user"
          }));
        case 12:
          return _context4.abrupt("return", res.status(200).json({
            status: "success",
            message: "User with id: ".concat(id, " updated"),
            data: {
              modifiedCount: result
            }
          }));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](2);
          console.log("Error updating user: ".concat(_context4.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 15]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app["delete"]("/deleteUser/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, result, pl, sngs;
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
            status: "error",
            message: "Invalid user ID format"
          }));
        case 4:
          _context5.next = 6;
          return User.deleteUser(id);
        case 6:
          result = _context5.sent;
          if (!(result === 0)) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to delete user"
          }));
        case 9:
          _context5.next = 11;
          return Playlist.deleteUserPlaylists(id);
        case 11:
          pl = _context5.sent;
          if (!(pl === 0)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to delete user's playlists"
          }));
        case 14:
          _context5.next = 16;
          return Song.deleteUserSongs(id);
        case 16:
          sngs = _context5.sent;
          if (!(sngs === 0)) {
            _context5.next = 19;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to delete user's songs"
          }));
        case 19:
          return _context5.abrupt("return", res.status(200).json({
            status: "success",
            message: "User with id: ".concat(id, " deleted"),
            data: {
              deletedCount: result
            }
          }));
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](1);
          console.log("Error deleting user: ".concat(_context5.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 22]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.get("/user/getFriends/:userId", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId, user, friends;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.userId;
          _context6.prev = 1;
          if (_mongodb.ObjectId.isValid(userId)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format"
          }));
        case 4:
          _context6.next = 6;
          return User.getUserById(userId);
        case 6:
          user = _context6.sent;
          if (user) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            status: "error",
            message: "User not found"
          }));
        case 9:
          _context6.next = 11;
          return User.getFriends(user.friends);
        case 11:
          friends = _context6.sent;
          return _context6.abrupt("return", res.status(200).json({
            status: "success",
            message: "Friends retrieved successfully",
            data: {
              friends: friends
            }
          }));
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](1);
          console.log("Error fetching friends: ".concat(_context6.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 15]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.put("/user/:userId/addFriend/:friendId", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$params, userId, friendId, result, result2, updatedUser, updatedFriend;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$params = req.params, userId = _req$params.userId, friendId = _req$params.friendId;
          _context7.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(userId) || !_mongodb.ObjectId.isValid(friendId))) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user or friend ID format"
          }));
        case 4:
          _context7.next = 6;
          return User.addFriend(userId, friendId);
        case 6:
          result = _context7.sent;
          _context7.next = 9;
          return User.addFriend(friendId, userId);
        case 9:
          result2 = _context7.sent;
          if (!(result === 0 && result2 === 0)) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to add friend"
          }));
        case 12:
          _context7.next = 14;
          return User.getUserById(userId);
        case 14:
          updatedUser = _context7.sent;
          _context7.next = 17;
          return User.getUserById(friendId);
        case 17:
          updatedFriend = _context7.sent;
          return _context7.abrupt("return", res.status(200).json({
            status: "success",
            message: "Friend with id: ".concat(friendId, " added to friends"),
            data: {
              updatedCount: result,
              user: updatedUser,
              friend: updatedFriend
            }
          }));
        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](1);
          console.log("Error adding friend: ".concat(_context7.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 21]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app.put('/user/:userId/like/:playlistId', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$params2, userId, playlistId, result, updatedUser;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$params2 = req.params, userId = _req$params2.userId, playlistId = _req$params2.playlistId;
          _context8.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(userId) || !_mongodb.ObjectId.isValid(playlistId))) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user or playlist ID format"
          }));
        case 4:
          _context8.next = 6;
          return User.addToLikedPlaylists(userId, playlistId);
        case 6:
          result = _context8.sent;
          console.log("result:", result);
          if (!(result === 0)) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to add playlist to liked playlists"
          }));
        case 10:
          _context8.next = 12;
          return User.getUserById(userId);
        case 12:
          updatedUser = _context8.sent;
          return _context8.abrupt("return", res.status(200).json({
            status: "success",
            message: "Playlist with id: ".concat(playlistId, " added to liked playlists"),
            data: {
              updatedCount: result,
              user: updatedUser
            }
          }));
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](1);
          console.log("Error adding liked playlist: ".concat(_context8.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 16]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
app.put('/user/:userId/unlike/:playlistId', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$params3, userId, playlistId, result, updatedUser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$params3 = req.params, userId = _req$params3.userId, playlistId = _req$params3.playlistId;
          _context9.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(userId) || !_mongodb.ObjectId.isValid(playlistId))) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user or playlist ID format"
          }));
        case 4:
          _context9.next = 6;
          return User.removeFromLikedPlaylists(userId, playlistId);
        case 6:
          result = _context9.sent;
          if (!(result === 0)) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to add playlist to liked playlists"
          }));
        case 9:
          _context9.next = 11;
          return User.getUserById(userId);
        case 11:
          updatedUser = _context9.sent;
          return _context9.abrupt("return", res.status(200).json({
            status: "success",
            message: "playlist with id: ".concat(friendId, " removed from playlists"),
            data: {
              updatedCount: result,
              user: updatedUser
            }
          }));
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](1);
          console.log("Error removing playlist from liked playlists: ".concat(_context9.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 15]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.get('/user/getLikedPlaylists/:userId', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var userId, likedPlaylists;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.params.userId;
          _context10.prev = 1;
          console.log(userId);
          if (_mongodb.ObjectId.isValid(userId)) {
            _context10.next = 5;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format "
          }));
        case 5:
          _context10.next = 7;
          return User.getLikedPlaylists(userId);
        case 7:
          likedPlaylists = _context10.sent;
          if (likedPlaylists) {
            _context10.next = 10;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            status: "error",
            message: "Liked Playlists not found"
          }));
        case 10:
          return _context10.abrupt("return", res.status(200).json({
            status: "success",
            message: "User with userId: ".concat(userId, "'s liked playlists retrieved successfully"),
            data: {
              likedPlaylists: likedPlaylists
            }
          }));
        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](1);
          console.log("Error getting user's playlists: ".concat(_context10.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 17:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 13]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app.get("/user/getSuggestedFriends/:userId", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var userId, user, suggestedFriends;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          userId = req.params.userId;
          _context11.prev = 1;
          if (_mongodb.ObjectId.isValid(userId)) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format"
          }));
        case 4:
          _context11.next = 6;
          return User.getUserById(userId);
        case 6:
          user = _context11.sent;
          if (user) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            status: "error",
            message: "User not found"
          }));
        case 9:
          _context11.next = 11;
          return User.getSuggestedFriends(user.friends, userId);
        case 11:
          suggestedFriends = _context11.sent;
          return _context11.abrupt("return", res.status(200).json({
            status: "success",
            message: "Friends retrieved successfully",
            data: {
              suggestedFriends: suggestedFriends
            }
          }));
        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](1);
          console.log("Error fetching friends: ".concat(_context11.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 15]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.put("/user/:userId/removeFriend/:friendId", /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$params4, userId, friendId, result, result2, updatedUser, updatedFriend;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _req$params4 = req.params, userId = _req$params4.userId, friendId = _req$params4.friendId;
          _context12.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(userId) || !_mongodb.ObjectId.isValid(friendId))) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user or friend ID format"
          }));
        case 4:
          _context12.next = 6;
          return User.removeFriend(userId, friendId);
        case 6:
          result = _context12.sent;
          _context12.next = 9;
          return User.removeFriend(friendId, userId);
        case 9:
          result2 = _context12.sent;
          if (!(result === 0 && result2 === 0)) {
            _context12.next = 12;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to remove friend"
          }));
        case 12:
          _context12.next = 14;
          return User.getUserById(userId);
        case 14:
          updatedUser = _context12.sent;
          _context12.next = 17;
          return User.getUserById(friendId);
        case 17:
          updatedFriend = _context12.sent;
          return _context12.abrupt("return", res.status(200).json({
            status: "success",
            message: "Friend with id: ".concat(friendId, " removed from friends"),
            data: {
              updatedCount: result,
              user: updatedUser,
              friend: updatedFriend
            }
          }));
        case 21:
          _context12.prev = 21;
          _context12.t0 = _context12["catch"](1);
          console.log("Error removing friend: ".concat(_context12.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 25:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 21]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.post("/playlists/createPlaylist", upload.single('coverImage'), /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body3, playlistName, ownerId, category, description, hashtags, coverImage, songs, user, pl;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$body3 = req.body, playlistName = _req$body3.playlistName, ownerId = _req$body3.ownerId, category = _req$body3.category, description = _req$body3.description, hashtags = _req$body3.hashtags;
          coverImage = null;
          if (req.file) {
            coverImage = "/assets/images/profilePictures/".concat(req.file.filename);
          }
          songs = req.body.songs ? JSON.parse(req.body.songs) : []; //const likedPlaylists = req.body.likedPlaylists ? JSON.parse(req.body.likedPlaylists) : [];
          //const coverImage = req.file ? req.file.filename : null;
          _context13.next = 7;
          return User.getUserById(ownerId);
        case 7:
          user = _context13.sent;
          _context13.next = 10;
          return Playlist.createPlaylist(playlistName, ownerId, songs, category, description, coverImage, hashtags, user.username);
        case 10:
          pl = _context13.sent;
          _context13.next = 13;
          return User.addPlaylistToPlaylists(ownerId, pl._id);
        case 13:
          res.status(201).json({
            status: "success",
            message: "playlist created successfully",
            data: {
              playlist: pl
            }
          });
          _context13.next = 20;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          console.log("Error creating a new playlist: ".concat(_context13.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
app.get("/playlists/getPlaylist/:id", /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var id, pl;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          id = req.params.id;
          _context14.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context14.next = 4;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context14.next = 6;
          return Playlist.getPlaylistById(id);
        case 6:
          pl = _context14.sent;
          if (pl) {
            _context14.next = 9;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            status: "error",
            message: "Playlist not found"
          }));
        case 9:
          return _context14.abrupt("return", res.status(200).json({
            status: "success",
            message: "Playlist with playlistId: ".concat(id, " retrieved successfully"),
            data: {
              playlist: pl
            }
          }));
        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](1);
          console.log("Error getting playlist by id: ".concat(_context14.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 12]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app.get("/playlists/getUserPlaylists/:id", /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var userId, pl;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          userId = req.params.id;
          _context15.prev = 1;
          if (_mongodb.ObjectId.isValid(userId)) {
            _context15.next = 4;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid user ID format"
          }));
        case 4:
          _context15.next = 6;
          return Playlist.getUserPlaylists(userId);
        case 6:
          pl = _context15.sent;
          if (pl) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            status: "error",
            message: "Playlists not found"
          }));
        case 9:
          return _context15.abrupt("return", res.status(200).json({
            status: "success",
            message: "User with userId: ".concat(userId, "'s playlists retrieved successfully"),
            data: {
              playlists: pl
            }
          }));
        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](1);
          console.log("Error getting user's playlists: ".concat(_context15.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 16:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1, 12]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
app.put("/playlists/updatePlaylist/:id", upload.single('coverImage'), /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var id, updateData, result, result2;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          id = req.params.id;
          updateData = {};
          _context16.prev = 2;
          if (_mongodb.ObjectId.isValid(id)) {
            _context16.next = 5;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid playlist ID format"
          }));
        case 5:
          updateData = req.body;
          if (req.file) {
            updateData.coverImage = "/assets/images/profilePictures/".concat(req.file.filename);
          } else {
            updateData.coverImage = "";
          }
          console.log("updateDatat: ", updateData);
          _context16.next = 10;
          return Playlist.updatePlaylist(id, updateData);
        case 10:
          result = _context16.sent;
          console.log("updated playlist count: ", result);
          _context16.next = 14;
          return Playlist.getPlaylistById(id);
        case 14:
          result2 = _context16.sent;
          console.log("updated playlist: ", result2);
          if (result) {
            _context16.next = 18;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to update playlist"
          }));
        case 18:
          return _context16.abrupt("return", res.status(200).json({
            status: "success",
            message: "Playlist with id: ".concat(id, " updated"),
            data: {
              modifiedCount: result,
              playlistData: result2
            }
          }));
        case 21:
          _context16.prev = 21;
          _context16.t0 = _context16["catch"](2);
          console.log("Error updating playlist: ".concat(_context16.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 25:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 21]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app.put("/playlists/addSong/:playlistId/songs/:songId", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$params5, playlistId, songId, modifiedCount;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _req$params5 = req.params, playlistId = _req$params5.playlistId, songId = _req$params5.songId; //console.log("songAndPlaylist: ", playlistId, songId);
          _context17.prev = 1;
          _context17.next = 4;
          return Playlist.addSongToPlaylist(playlistId, songId);
        case 4:
          modifiedCount = _context17.sent;
          if (!(modifiedCount === 0)) {
            _context17.next = 7;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            status: "error",
            message: "Playlist not found or song already exists."
          }));
        case 7:
          return _context17.abrupt("return", res.status(200).json({
            status: "success",
            message: "Song added to playlist successfully.",
            data: {
              UpdatedCount: modifiedCount
            }
          }));
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](1);
          console.log("Error adding song to playlist: ".concat(_context17.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[1, 10]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
app.put("/playlists/removeSong/:playlistId/songs/:songId", /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var _req$params6, playlistId, songId, modifiedCount;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _req$params6 = req.params, playlistId = _req$params6.playlistId, songId = _req$params6.songId;
          _context18.prev = 1;
          _context18.next = 4;
          return Playlist.removeSongFromPlaylist(playlistId, songId);
        case 4:
          modifiedCount = _context18.sent;
          if (!(modifiedCount === 0)) {
            _context18.next = 7;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            status: "error",
            message: "Playlist not found or song not found."
          }));
        case 7:
          return _context18.abrupt("return", res.status(200).json({
            status: "success",
            message: "Song removed from playlist successfully.",
            data: {
              updateCount: modifiedCount
            }
          }));
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](1);
          console.log("Error removing song from playlist: ".concat(_context18.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 14:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[1, 10]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
app["delete"]("/playlists/deletePlaylist/:ownerId/:id", /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _req$params7, ownerId, id, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _req$params7 = req.params, ownerId = _req$params7.ownerId, id = _req$params7.id;
          _context19.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(id) || !_mongodb.ObjectId.isValid(ownerId))) {
            _context19.next = 4;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid playlist or User ID format"
          }));
        case 4:
          _context19.next = 6;
          return Playlist.deletePlaylist(id);
        case 6:
          result = _context19.sent;
          if (result) {
            _context19.next = 9;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            status: "error",
            message: "Unable to delete playlist"
          }));
        case 9:
          _context19.next = 11;
          return User.removePlaylistFromPlaylists(ownerId, id);
        case 11:
          return _context19.abrupt("return", res.status(200).json({
            status: "success",
            message: "Playlist with id: ".concat(id, " deleted"),
            data: {
              deletedCount: result
            }
          }));
        case 14:
          _context19.prev = 14;
          _context19.t0 = _context19["catch"](1);
          console.log("Error deleting playlist: ".concat(_context19.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 18:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1, 14]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app.post("/songs/addSong", upload.single("file"), /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var _req$body4, name, artistName, genre, album, ownerId, file, addedSong;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _req$body4 = req.body, name = _req$body4.name, artistName = _req$body4.artistName, genre = _req$body4.genre, album = _req$body4.album, ownerId = _req$body4.ownerId;
          file = req.file;
          console.log("artist1: ", file);
          _context20.prev = 3;
          _context20.next = 6;
          return Song.addSong(name, artistName, genre, album, file, ownerId);
        case 6:
          addedSong = _context20.sent;
          _context20.next = 9;
          return User.addSongToSongs(ownerId, addedSong._id);
        case 9:
          return _context20.abrupt("return", res.status(201).json({
            status: "success",
            message: "song added to your songs",
            data: {
              song: addedSong
            }
          }));
        case 12:
          _context20.prev = 12;
          _context20.t0 = _context20["catch"](3);
          console.log("Error adding song: ".concat(_context20.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 16:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[3, 12]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
app["delete"]("/songs/deleteSong/:ownerId/:songId", /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _req$params8, ownerId, songId, dCount;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _req$params8 = req.params, ownerId = _req$params8.ownerId, songId = _req$params8.songId;
          _context21.prev = 1;
          if (!(!_mongodb.ObjectId.isValid(songId) || !_mongodb.ObjectId.isValid(ownerId))) {
            _context21.next = 4;
            break;
          }
          return _context21.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid song or owner ID format"
          }));
        case 4:
          _context21.next = 6;
          return Song.deleteSong(songId);
        case 6:
          dCount = _context21.sent;
          if (!(dCount === 0)) {
            _context21.next = 9;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            status: "error",
            message: 'song not found or already deleted'
          }));
        case 9:
          _context21.next = 11;
          return User.removeSongFromSongs(ownerId, songId);
        case 11:
          return _context21.abrupt("return", res.status(200).json({
            status: "success",
            message: "song deleted from your Songs",
            data: {
              deletedCount: dCount
            }
          }));
        case 14:
          _context21.prev = 14;
          _context21.t0 = _context21["catch"](1);
          console.log("Error deleting song: ".concat(_context21.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 18:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[1, 14]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
app.get("/songs/getSong/:id", /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var id, sng;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          id = req.params.id;
          _context22.prev = 1;
          if (_mongodb.ObjectId.isValid(id)) {
            _context22.next = 4;
            break;
          }
          return _context22.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid song ID format"
          }));
        case 4:
          _context22.next = 6;
          return Song.getSongById(id);
        case 6:
          sng = _context22.sent;
          if (sng) {
            _context22.next = 9;
            break;
          }
          return _context22.abrupt("return", res.status(404).json({
            status: "error",
            message: "Song not found"
          }));
        case 9:
          return _context22.abrupt("return", res.status(200).json({
            status: "success",
            message: "Song with songId: ".concat(id, " retrieved successfully"),
            data: {
              song: sng
            }
          }));
        case 12:
          _context22.prev = 12;
          _context22.t0 = _context22["catch"](1);
          console.log("Error getting song by id: ".concat(_context22.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 16:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[1, 12]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
app.get("/playlist/getPlaylistSongs/:playlistId", /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var playlistId, songIds, sngs, _iterator, _step, songId, sng;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          playlistId = req.params.playlistId;
          _context23.prev = 1;
          if (_mongodb.ObjectId.isValid(playlistId)) {
            _context23.next = 4;
            break;
          }
          return _context23.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context23.next = 6;
          return Playlist.getSongsFromPlaylist(playlistId);
        case 6:
          songIds = _context23.sent;
          console.log(songIds);
          sngs = [];
          _iterator = _createForOfIteratorHelper(songIds);
          _context23.prev = 10;
          _iterator.s();
        case 12:
          if ((_step = _iterator.n()).done) {
            _context23.next = 20;
            break;
          }
          songId = _step.value;
          _context23.next = 16;
          return Song.getSongById(songId);
        case 16:
          sng = _context23.sent;
          sngs.push(sng);
        case 18:
          _context23.next = 12;
          break;
        case 20:
          _context23.next = 25;
          break;
        case 22:
          _context23.prev = 22;
          _context23.t0 = _context23["catch"](10);
          _iterator.e(_context23.t0);
        case 25:
          _context23.prev = 25;
          _iterator.f();
          return _context23.finish(25);
        case 28:
          if (sngs) {
            _context23.next = 30;
            break;
          }
          return _context23.abrupt("return", res.status(404).json({
            status: "error",
            message: "Songs from playlist not found"
          }));
        case 30:
          return _context23.abrupt("return", res.status(200).json({
            status: "success",
            message: "Songs from playlist with playlistId: ".concat(playlistId, " retrieved successfully"),
            data: {
              songs: sngs
            }
          }));
        case 33:
          _context23.prev = 33;
          _context23.t1 = _context23["catch"](1);
          console.log("Error getting songs from playlist by id: ".concat(_context23.t1));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 37:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[1, 33], [10, 22, 25, 28]]);
  }));
  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());
app.get("/songs/getUserSongs/:userId", /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var userId, sngs;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          userId = req.params.userId;
          _context24.prev = 1;
          if (_mongodb.ObjectId.isValid(userId)) {
            _context24.next = 4;
            break;
          }
          return _context24.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid song ID format"
          }));
        case 4:
          _context24.next = 6;
          return Song.getUserSongs(userId);
        case 6:
          sngs = _context24.sent;
          if (sngs) {
            _context24.next = 9;
            break;
          }
          return _context24.abrupt("return", res.status(404).json({
            status: "error",
            message: "User Songs not found"
          }));
        case 9:
          return _context24.abrupt("return", res.status(200).json({
            status: "success",
            message: "User Songs retrieved successfully",
            data: {
              songs: sngs
            }
          }));
        case 12:
          _context24.prev = 12;
          _context24.t0 = _context24["catch"](1);
          console.log("Error getting user songs: ".concat(_context24.t0));
          res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        case 16:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[1, 12]]);
  }));
  return function (_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}());

//PORT TO LISTEN TO
app.listen(3001, function () {
  console.log("Listening on localhost:3001");
});
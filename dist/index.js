"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Error", {
  enumerable: true,
  get: function get() {
    return _BasicComponent.Error;
  }
});
Object.defineProperty(exports, "Loading", {
  enumerable: true,
  get: function get() {
    return _BasicComponent.Loading;
  }
});
Object.defineProperty(exports, "Success", {
  enumerable: true,
  get: function get() {
    return _BasicComponent.Success;
  }
});
Object.defineProperty(exports, "Initialize", {
  enumerable: true,
  get: function get() {
    return _BasicComponent.Initialize;
  }
});
Object.defineProperty(exports, "Cancel", {
  enumerable: true,
  get: function get() {
    return _BasicComponent.Cancel;
  }
});
Object.defineProperty(exports, "FetchHooks", {
  enumerable: true,
  get: function get() {
    return _FetchHooks.FetchHooks;
  }
});
Object.defineProperty(exports, "FetchTSHooks", {
  enumerable: true,
  get: function get() {
    return _FetchTSHooks.FetchTSHooks;
  }
});
Object.defineProperty(exports, "FetchProvider", {
  enumerable: true,
  get: function get() {
    return _FetchTSHooks.FetchProvider;
  }
});
Object.defineProperty(exports, "Method", {
  enumerable: true,
  get: function get() {
    return _MethodHttp.MethodHttp;
  }
});
Object.defineProperty(exports, "status", {
  enumerable: true,
  get: function get() {
    return _ApiStatus.ApiStatus;
  }
});
exports["default"] = void 0;

var _Fetch = _interopRequireDefault(require("./Fetch"));

var _BasicComponent = require("./BasicComponent");

var _FetchHooks = require("./FetchHooks");

var _FetchTSHooks = require("./FetchTSHooks");

var _MethodHttp = require("./MethodHttp");

var _ApiStatus = require("./ApiStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _Fetch["default"];
exports["default"] = _default;
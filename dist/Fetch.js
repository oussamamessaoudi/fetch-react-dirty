"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _ApiStatus = _interopRequireDefault(require("./ApiStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Fetch =
/*#__PURE__*/
function (_Component) {
  _inherits(Fetch, _Component);

  function Fetch(props) {
    var _this;

    _classCallCheck(this, Fetch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Fetch).call(this, props));
    _this.source = null;
    _this.state = {
      status: _ApiStatus["default"].INITIALIZED,
        httpStatus: 0,
      response: {}
    };
    return _this;
  }

  _createClass(Fetch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          url = _this$props.url,
          method = _this$props.method,
          data = _this$props.data,
          children = _this$props.children;
      var CancelToken = _axios["default"].CancelToken;
      this.source = CancelToken.source();
      this.setState({
        status: _ApiStatus["default"].LOADING
      });
      this.axios = (0, _axios["default"])({
        url: url,
        method: method,
        data: data,
        cancelToken: this.source.token
      }).then(function (response) {
        // handle success
        _this2.setState({
          status: _ApiStatus["default"].SUCCESS,
            response: response.data,
            httpStatus: response.status
        });
      })["catch"](function (thrown) {
        // handle error
          if (_axios["default"].isCancel(thrown)) {
          } else {
          _this2.setState({
            status: _ApiStatus["default"].ERROR,
              response: thrown.response,
              httpStatus: thrown.response.status
          });
        }
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
        this.children = _react["default"].Children.toArray(this.props.children).reduce(function (total, currentValue) {
            var child = currentValue.type.name.toUpperCase();
            if (total[child]) return _objectSpread({}, total, _defineProperty({}, child, [].concat(_toConsumableArray(total[child]), [currentValue]))); else return _objectSpread({}, total, _defineProperty({}, child, [currentValue]));
      }, {});
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          status = _this$state.status,
          response = _this$state.response,
          httpStatus = _this$state.httpStatus;
        if (this.children[status]) return this.children[status].map(function (child) {
            return _react["default"].cloneElement(child, {
                response: response,
                httpStatus: httpStatus
            });
        }); else return null;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.source) {
        this.source.cancel('Operation canceled by component unmounted.');
      }
    }
  }]);

  return Fetch;
}(_react.Component);

exports["default"] = Fetch;
Fetch.defaultProps = {
  method: 'get',
  data: {}
};
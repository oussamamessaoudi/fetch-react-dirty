"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _ApiStatus = _interopRequireDefault(require("./ApiStatus"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
}

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    if (obj != null) {
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

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
                    data = _this$props.data;
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
                        response: response.data
                    });
                })["catch"](function (thrown) {
                    // handle error
                    if (_axios["default"].isCancel(thrown)) {
                        console.log('Request canceled', thrown.message);
                    } else {
                        _this2.setState({
                            status: _ApiStatus["default"].ERROR,
                            response: thrown.response
                        });
                    }
                });
            }
        }, {
            key: "render",
            value: function render() {
                var children = this.props.children;
                var _this$state = this.state,
                    status = _this$state.status,
                    response = _this$state.response;
                return children(status, response);
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
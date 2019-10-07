"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchHooks = void 0;

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

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(source, true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(source).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
    } else {
        obj[key] = value;
    }
    return obj;
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

var FetchHooks = function FetchHooks(_ref) {
    var url = _ref.url,
        method = _ref.method,
        data = _ref.data,
        children = _ref.children;

    var _React$useState = _react["default"].useState({}),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var _React$useState3 = _react["default"].useState([]),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        childrenMap = _React$useState4[0],
        setChildrenMap = _React$useState4[1];

    (0, _react.useEffect)(function () {
        var source = _axios["default"].CancelToken.source();

        setState({
            status: _ApiStatus["default"].LOADING
        });
        (0, _axios["default"])({
            url: url,
            method: method,
            data: data,
            cancelToken: source.token
        }).then(function (response) {
            // handle success
            setState({
                status: _ApiStatus["default"].SUCCESS,
                response: response.data,
                httpStatus: response.status
            });
        })["catch"](function (thrown) {
            // handle error
            if (_axios["default"].isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                setState({
                    status: _ApiStatus["default"].ERROR,
                    response: thrown.response,
                    httpStatus: thrown.response.status
                });
            }
        });
        return function () {
            if (source) {
                source.cancel('Operation canceled by component unmounted.');
            }
        };
    }, [url, method, data]);
    (0, _react.useEffect)(function () {
        setChildrenMap(_react["default"].Children.toArray(children).reduce(function (total, currentValue) {
            var child = currentValue.type.name.toUpperCase();
            if (total[child]) return _objectSpread({}, total, _defineProperty({}, child, [].concat(_toConsumableArray(total[child]), [currentValue]))); else return _objectSpread({}, total, _defineProperty({}, child, [currentValue]));
        }, {}));
    }, [children]);
    if (childrenMap[state.status]) return childrenMap[state.status].map(function (child) {
        return _react["default"].cloneElement(child, {
            response: state.response,
            httpStatus: state.httpStatus
        });
    }); else return null;
};

exports.FetchHooks = FetchHooks;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Error = Error;
exports.Success = Success;
exports.Loading = Loading;
exports.Initialize = Initialize;
exports.Cancel = Cancel;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
}

function BasicComponent(_ref) {
    var response = _ref.response,
        httpStatus = _ref.httpStatus,
        children = _ref.children;
    if (typeof children === 'function') return children(response, httpStatus); else return children;
}

function Error(props) {
    return _react["default"].createElement(BasicComponent, props);
}

function Success(props) {
    return _react["default"].createElement(BasicComponent, props);
}

function Loading(props) {
    return _react["default"].createElement(BasicComponent, props);
}

function Initialize(props) {
    return _react["default"].createElement(BasicComponent, props);
}

function Cancel(props) {
    return _react["default"].createElement(BasicComponent, props);
}
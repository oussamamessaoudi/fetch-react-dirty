"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: true
});

var BasicComponent_1 = __importDefault(require("./BasicComponent"));

var Error = function Error(props) {
    return tsx(BasicComponent_1["default"], Object.assign({}, props));
};
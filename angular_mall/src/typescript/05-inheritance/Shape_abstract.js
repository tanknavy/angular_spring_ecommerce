"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeAbs = void 0;
var ShapeAbs = /** @class */ (function () {
    function ShapeAbs(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(ShapeAbs.prototype, "x", {
        //get/set accessors...
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    ShapeAbs.prototype.getInfo = function () {
        return "x=" + this._x + ",y=" + this._y;
    };
    return ShapeAbs;
}());
exports.ShapeAbs = ShapeAbs;

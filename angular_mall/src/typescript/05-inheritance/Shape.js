"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
var Shape = /** @class */ (function () {
    function Shape(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Shape.prototype, "x", {
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
    Shape.prototype.getInfo = function () {
        return "x=" + this._x + ",y=" + this._y;
    };
    return Shape;
}());
exports.Shape = Shape;
// let s1 = new Shape(2,3)
// s1.x = 12
// console.log(s1.x)
// console.log(s1.getInfo())
// console.log(s1)

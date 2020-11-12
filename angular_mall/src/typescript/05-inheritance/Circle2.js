"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle2 = void 0;
var Shape_abstract_1 = require("./Shape_abstract");
var pi = 3.14;
var Circle2 = /** @class */ (function (_super) {
    __extends(Circle2, _super);
    function Circle2(theX, theY, _radius) {
        var _this = _super.call(this, theX, theY) || this;
        _this._radius = _radius;
        return _this;
    }
    Object.defineProperty(Circle2.prototype, "radius", {
        //get/set accessor...
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: false,
        configurable: true
    });
    Circle2.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this) + (",radius=" + this._radius);
    };
    Circle2.prototype.calculateArea = function () {
        return this.radius * this.radius * pi;
    };
    return Circle2;
}(Shape_abstract_1.ShapeAbs));
exports.Circle2 = Circle2;

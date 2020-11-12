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
exports.Rectangle2 = void 0;
var Shape_abstract_1 = require("./Shape_abstract");
var Rectangle2 = /** @class */ (function (_super) {
    __extends(Rectangle2, _super);
    function Rectangle2(theX, theY, _width, //私有字段属性在构造器中自动赋值
    _length) {
        var _this = _super.call(this, theX, theY) //父类构造器,
         || this;
        _this._width = _width;
        _this._length = _length;
        return _this;
    }
    Object.defineProperty(Rectangle2.prototype, "width", {
        //set/get accessors
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle2.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    //override父类方法
    Rectangle2.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this) + (",widtdh=" + this._width + ", length=" + this._length);
    };
    Rectangle2.prototype.calculateArea = function () {
        return this._width * this._length;
    };
    return Rectangle2;
}(Shape_abstract_1.ShapeAbs));
exports.Rectangle2 = Rectangle2;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shape_1 = require("./Shape");
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var Circle2_1 = require("./Circle2");
var Rectangle2_1 = require("./Rectangle2");
var s1 = new Shape_1.Shape(2, 3);
s1.x = 12;
console.log(s1.x);
console.log(s1.getInfo());
console.log(s1);
var c1 = new Circle_1.Circle(2, 3, 10);
console.log(c1);
var r1 = new Rectangle_1.Rectangle(0, 0, 21, 23);
console.log(r1);
var shapes = []; //父类类型
shapes.push(s1);
shapes.push(c1);
shapes.push(r1);
for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
    var x = shapes_1[_i];
    console.log(x);
}
console.log("---------------abstract class------------------");
//let s2 = new ShapeAbs(2,3) //抽象类不可以实例化
var c2 = new Circle2_1.Circle2(2, 3, 5);
var r2 = new Rectangle2_1.Rectangle2(0, 0, 5, 7);
var shapes2 = []; //抽象类作为父类类型
//shapes2.push(s1)
shapes2.push(c2);
shapes2.push(r2);
for (var _a = 0, shapes2_1 = shapes2; _a < shapes2_1.length; _a++) {
    var x = shapes2_1[_a];
    console.log(x);
    console.log(x.getInfo());
    console.log(x.calculateArea());
}

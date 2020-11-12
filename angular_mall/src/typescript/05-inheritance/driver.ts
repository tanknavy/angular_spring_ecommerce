import {Shape} from './Shape'
import {Circle} from './Circle'
import {Rectangle} from './Rectangle'
import { ShapeAbs } from './Shape_abstract'
import {Circle2} from './Circle2'
import {Rectangle2} from './Rectangle2'


let s1 = new Shape(2,3)
s1.x = 12
console.log(s1.x)
console.log(s1.getInfo())
console.log(s1)

let c1 = new Circle(2,3,10)
console.log(c1)

let r1 = new Rectangle(0,0,21,23)
console.log(r1)


let shapes:Shape[] = [] //父类类型
shapes.push(s1)
shapes.push(c1)
shapes.push(r1)

for(let x of shapes){
    console.log(x)
}

console.log("---------------abstract class------------------")
//let s2 = new ShapeAbs(2,3) //抽象类不可以实例化
let c2 = new Circle2(2,3,5)
let r2 = new Rectangle2(0,0,5,7)

let shapes2: ShapeAbs[] = [] //抽象类作为父类类型
//shapes2.push(s1)
shapes2.push(c2)
shapes2.push(r2)

for (let x of shapes2) {
    console.log(x)
    console.log(x.getInfo())
    console.log(x.calculateArea())
}


//module就是一个文件，能够export class,function.variable,另外一个文件import
import Teacher from './class_stand' //注意，在import上述文件时，也会执行其中可执行的语句!

let t01 = new Teacher("carl", "cheng");
//console.log(p01.lastName)
t01.firstName = "david" //注意,不是使用函数()的方式
console.log(t01.firstName) //注意,不是使用函数()的方式
console.log(t01)
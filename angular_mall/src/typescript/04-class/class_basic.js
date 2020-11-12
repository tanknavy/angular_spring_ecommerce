//编译错误时tsc也会产生js文件，tsc --noEmitOnError file.ts 组织

//common js中类是通过函数实现的，如果new出来就是类对象，如果直接调用就是function
function Customer(theFirst, theLast) {
    this.firstName = theFirst;
    this.lastName = theLast;
    console.log("构造函数被调用了...")
}
 
var c01 = new Customer("alex", "cheng");
console.log(c01);
var c02 = Customer("tom","cheng")
console.log(c02) //返回为空，undefined


//es6 格式创建class
class Student{
    constructor(theFirst, theLast){
        this.firstName = theFirst;
        this.lastName = theLast;
        console.log("构造函数被调用了...")
    }
}

class Employee{
    firstName
    lastName
    position
}

var s01 = new Student("alex", "cheng");
console.log(s01);

var e01 = new Employee();
e01.firstName="bob"
e01.lastName="trump"
console.log(e01)





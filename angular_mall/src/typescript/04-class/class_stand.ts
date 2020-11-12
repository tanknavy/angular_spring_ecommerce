//------------------------------------------------------------
//Accessors are only available when targeting ECMAScript 5 and higher.
//注意:accessors set/get写法只有es5以上才ok
//解决办法1：>tsc --target ES5 --noEmitOnError customer.js
//解决办法2: 配置tsconfig.json文件,然后>tsc 编译全部

 export default class Teacher { //不加default在import时要使用{}解构
    //访问修饰符,public(默认外部class都可以访问), protected(当前class和subclasses可访问), priavte(当前class中可以访问)
    //和java的access modifier惊人相似，java是public(都可以), protected(当前包，子类), default(当前包,),private(当前类中)

    //properties
    //第一版:
    // private _firstName: string; //_命名习惯,没有magic
    // private _lastName: string; //在vs中光标移动到行数然后点击，可以像eclipse一样产生对应方法

    // //constructor关键字，和js中保持一致，java中是同名的
    // constructor(theFirst: string, theLast: string) {
    //     this._firstName = theFirst;
    //     this._lastName = theLast;
    //     console.log("User构造函数...")
    // }

    
    //第二版: class的属性和构造器简写, 属性和属性值自动赋值
    constructor(private _firstName:string, 
        private _lastName:string){ //私有属性并且单行时,vs的左边提示器才可以自动产生set/get
    }

    //accessors - Get/Set 使用访问器
    set firstName(value: string) { // set,get后面空格
        this._firstName = value;
    }

    get firstName(): string {
        return this._firstName;
    }


    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

}


//注意: export上述class时，这里的语句都会被执行
let t01 = new Teacher("adm", "cheng");
//console.log(p01.lastName)
t01.firstName = "bob" //注意,不是使用函数()的方式
console.log(t01.firstName) //注意,不是使用函数()的方式
console.log(t01)

//编译错误时tsc也会产生js文件，tsc --noEmitOnError file.ts 阻止错误时产生js文件

class Customer{
    //访问修饰符,public(默认外部class都可以访问), protected(当前class和subclasses可访问), priavte(当前class中可以访问)
    //和java的access modifier惊人相似，java是public(都可以), protected(当前包，子类), default(当前包,),private(当前类中)
    
    //properties
    firstName: string; //默认public
    lastName: string;

    //constructor关键字，和js中保持一致，java中是同名的
    constructor(theFirst:string, theLast:string){
        this.firstName = theFirst;
        this.lastName = theLast;
        console.log("Customer构造函数...")
    }
}

let c01 = new Customer("alex","cheng");
console.log(c01)

//--------------------------------------------------------------------
class Parter {
    //访问修饰符,public(默认外部class都可以访问), protected(当前class和subclasses可访问), priavte(当前class中可以访问)
    //和java的access modifier惊人相似，java是public(都可以), protected(当前包，子类), default(当前包,),private(当前类中)

    //properties
    private firstName: string;
    private lastName: string;

    //constructor关键字，和js中保持一致，java中是同名的
    constructor(theFirst: string, theLast: string) {
        this.firstName = theFirst;
        this.lastName = theLast;
        console.log("Parter构造函数...")
    }

    //setter/getter
    public setFirstName(theFirst:string){
        this.firstName = theFirst
    }

    public getFistName():string{
        return this.firstName
    }
}

let p01 = new Parter("bob", "cheng");
//console.log(p01.lastName)
p01.setFirstName("tom")
console.log(p01.getFistName())
console.log(p01)


//------------------------------------------------------------
//Accessors are only available when targeting ECMAScript 5 and higher.
//注意:accessors set/get写法只有es5以上才ok
//解决办法1：>tsc --target ES5 --noEmitOnError customer.js
//解决办法2: 配置tsconfig.json文件

class User {
    //访问修饰符,public(默认外部class都可以访问), protected(当前class和subclasses可访问), priavte(当前class中可以访问)
    //和java的access modifier惊人相似，java是public(都可以), protected(当前包，子类), default(当前包,),private(当前类中)

    //properties
    private _firstName: string; //_命名习惯,没有magis
    private _lastName: string; //在vs中光标移动到行数然后点击，可以像eclipse一样产生对应方法


    //constructor关键字，和js中保持一致，java中是同名的
    constructor(theFirst: string, theLast: string) {
        this._firstName = theFirst;
        this._lastName = theLast;
        console.log("User构造函数...")
    }

    //accessors - Get/Set 使用访问器
    set firstName(value: string){ // set,get后面空格
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

let u01 = new User("jack", "cheng");
//console.log(p01.lastName)
u01.firstName = "david" //注意,不是使用函数()的方式
console.log(u01.firstName) //注意,不是使用函数()的方式
console.log(u01)
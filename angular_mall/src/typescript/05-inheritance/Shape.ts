export class Shape{
    constructor(private _x:number, private _y:number){
    }

    //get/set accessors...
    get x():number{
        return this._x
    } 

    set x(value: number){
        this._x = value
    }

    getInfo():string{
        return `x=${this._x},y=${this._y}`
    }
}

// let s1 = new Shape(2,3)
// s1.x = 12
// console.log(s1.x)
// console.log(s1.getInfo())
// console.log(s1)

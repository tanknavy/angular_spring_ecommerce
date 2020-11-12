export abstract class ShapeAbs {
    constructor(
        private _x: number, 
        private _y: number) {
    }

    //get/set accessors...
    get x(): number {
        return this._x
    }

    set x(value: number) {
        this._x = value
    }

    getInfo(): string {
        return `x=${this._x},y=${this._y}`
    }

    abstract calculateArea():number; //抽象方法，实体类去实现
}
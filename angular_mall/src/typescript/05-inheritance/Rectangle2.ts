import { ShapeAbs } from './Shape_abstract'

export class Rectangle2 extends ShapeAbs {

    constructor(theX: number, theY: number,
        private _width: number, //私有字段属性在构造器中自动赋值
        private _length: number) { //私有字段属性在构造器中自动赋值
        super(theX, theY) //父类构造器,
    }

    //set/get accessors
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }

    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        this._length = value;
    }

    //override父类方法
    getInfo(): string {
        return super.getInfo() + `,widtdh=${this._width}, length=${this._length}`;
    }

    calculateArea(): number {
        return this._width * this._length
    }
}
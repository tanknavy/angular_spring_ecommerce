import { ShapeAbs} from './Shape_abstract'
const pi:number = 3.14
export class Circle2 extends ShapeAbs {

    constructor(theX: number, theY: number,
        private _radius: number) { //子类中的属性，
        super(theX, theY); //父类的构造函数
    }

    //get/set accessor...
    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    getInfo(): string { //override父类方法
        return super.getInfo() + `,radius=${this._radius}`
    }

    calculateArea(): number {
        return this.radius * this.radius * pi
    }
}
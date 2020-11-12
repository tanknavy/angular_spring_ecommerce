export class Product { //类似java entity, 用于REST返回json数据的映射，无需构造器和方法
    id: number;
    sku: string;
    // category:number; //db总是category id, 在front-end这个id没有显示的需要
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
}

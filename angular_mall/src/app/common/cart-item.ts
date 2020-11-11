import { Product } from './product';

export class CartItem { //向购物车添加一项商品
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number; //该商品在购物车中的数量，默认为1

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})

//这个service是angular组件之间调用，product service是调用后端给前端消费
export class CartService {

  cartItems: CartItem[] = [];//购物车清单

  totalPrice: Subject<number> = new Subject<number>();//Subject是Observable的子类，用于publish发布event到全部subscriber
  totalQuantity: Subject<number> = new Subject<number>();//Subject是Observable的子类，用于publish发布event到全部subscriber


  constructor() { console.log("CartService构造函数被调用") }

  //数据生产者
  addToCart(theCartItem: CartItem) { //添加一个件商品
    //检查是否有item
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    //array.find()替代loop查找，返回第一个item,如果没有返回undefined

    if (this.cartItems.length > 0) { //购物车不为空
      // for (let tempItem of this.cartItems) {
      //   if (tempItem.id === theCartItem.id) {
      //     existingCartItem = tempItem; //购物有同类商品
      //     //tempItem.quantity += 1;//该商品再增加一键
      //     break;
      //   }
      // }

      //上述for find重构, 返回第一个符合条件的元素
      existingCartItem = this.cartItems.find(tempItem => tempItem.id === theCartItem.id) //有则返回item无则undefined

      alreadyExistsInCart = (existingCartItem != undefined)//是否有同类商品
    }


    if (alreadyExistsInCart) { //有则更新，无则添加
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    //添加上平后计算总价和数量
    this.computeCartTotals();
  }

  //计算总价和数量
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentItem of this.cartItems) {
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }

    //publish new values，发布最新数据给subscribers
    this.totalPrice.next(totalPriceValue); //next重新发布
    this.totalQuantity.next(totalQuantityValue);

    //记录cart data为了debug
    this.logCartData(totalPriceValue, totalQuantityValue);

  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contens of the cart');
    for (let tempItem of this.cartItems) { //sub total
      const subTotalPrice = tempItem.quantity * tempItem.unitPrice;
      console.log(`name:${tempItem.name}, quantity=${tempItem.quantity}, unitPrices=${tempItem.unitPrice}, subTotalPrice=${subTotalPrice}`)
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('---------------------------------')
  }


  decrementQty(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals(); //重新计算
    }
  }

  //从cartItem array中移除元素，使用findIndex查找定位并splice移除掉
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === theCartItem.id)
    if (itemIndex > -1) { //如果array中找到该元素
      this.cartItems.splice(itemIndex, 1); //删除该索引元素，有可能后面往前移动
      this.computeCartTotals(); //重新计算cartItem
    }
  }


}

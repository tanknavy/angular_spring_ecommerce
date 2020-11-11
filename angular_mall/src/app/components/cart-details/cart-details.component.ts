import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails()
  }

  listCartDetails() {
    //订阅cartserver取得cart items
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //计算
    this.cartService.computeCartTotals();
  }

  incrementQty(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem) //添加一个商品，而不是只是变化数字
  }

  //减少该商品一个
  decrementQty(theCartItem: CartItem) { //该商品减少一个
    this.cartService.decrementQty(theCartItem);
  }

  remove(theCartItem: CartItem) { //完全移除该商品
    this.cartService.remove(theCartItem);
  }
}

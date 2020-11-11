import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})

//定于cartservcie得到最新的购物车列表
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
    console.log("CartStatus组件构造函数调用...")//test
  }

  ngOnInit(): void {
    this.updateCartStatus()
  }

  updateCartStatus() {
    //subscibe to the cart totalPrice,totalQuantity;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data //从cartServcie订阅数据
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data //从cartServcie订阅数据
    )
  }

}

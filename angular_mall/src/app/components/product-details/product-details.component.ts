import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //1.html中要共享的属性/数据
  product: Product;

  //2.构造函数依赖注入当前route,便于从path里面拿到上个组件传递的data; 可能还要注入service用于拿数据
  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //3.ngOninit()中订阅由于ActivateRoute变化(新的请求参数)而刷新数据
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  //
  handleProductDetails() {
    //get id param string, convert to number with "+"
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}

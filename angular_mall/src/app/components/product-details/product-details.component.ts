import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //1.html中要共享的属性/数据
  //product: Product; //async call，html尝试访问product，如果product没有初始化会报错，后面会正常显示
  product: Product = new Product(); //防止html报错，初始化一个对象！
  // <img src="{{product?.imageUrl}}" class="detail-img" >//也可以在html中加?不访问空对象

  //2.构造函数依赖注入当前route,便于从path里面拿到上个组件传递的data; 可能还要注入service用于拿数据...
  constructor(
    private productService: ProductService, //数据service
    private route: ActivatedRoute,//当前路由
    //https://www.codegrepper.com/code-examples/delphi/router+link+previous+page+angular
    private _location: Location) { //当前位置
  }

  ngOnInit(): void {
    //3.ngOninit()中订阅由于ActivateRoute变化(新的请求参数)而刷新数据
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  //商品详情
  handleProductDetails() {
    //get id param string, convert to number with "+"
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    //注意这是async call，html尝试访问product，如果product没有初始化会报错，后面有了数据就会正常显示，这就是angular的data binding
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  //回到上一页，构造函数中先要初始化
  backClicked() {
    this._location.back()
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[]; //数据可以被view中共享，别的html引入该selector后

  constructor(private productService: ProductService) { }

  ngOnInit(): void { //数据绑定属性初始化，只调用一次，在任何view或子内容之前
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log("Product Categories=" + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

}

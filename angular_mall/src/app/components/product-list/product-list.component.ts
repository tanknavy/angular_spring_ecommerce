import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

//A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. 
//Define an ngOnInit() method to handle any additional initialization tasks.
export class ProductListComponent implements OnInit { //生命周期hook，在初始化data-bound属性后
  //num = 0; count = 0; //测试
  products: Product[]; //组件中的属性(数据)可以分享给view视图，
  currentCategoryId: number; //从链接得到
  currentCategoryName: string; //增加功能，链接没有，根据id得到

  //搜索提交
  searchMode: boolean;

  constructor(private productService: ProductService, //依赖注入servcie，就是向backend请求数据
    private route: ActivatedRoute) { } //当前的路由

  //类似@PostConstruct, 在构造函数以后执行
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {//一旦users请求()有变化，就去请求新数据
      this.listProducts(); //subscribe根据请求/路由拿数据数据
    });
  }


  //根据前端用户输入参数this.route.snapshot.paramMap.has('id')，决定向server发送请求拿数据
  listProducts() {
    //用户提交搜索，搜索路由给search组件,search组件交给product-list组件渲染
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); //从search组件到product组件，使用route的path传递数据

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');//路由参数中获得参数值

    this.productService.searchProducts(theKeyword).subscribe(
      data => { this.products = data }
    )

    this.currentCategoryName = 'all'//

  }

  //重构
  handleListProducts() {
    //检查请求中是否"id"参数可以用
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');//请求是否有参数id，比如localhost:8090/api/category/3,这个3在routes的的path里面指定变量:id接受
    //console.log("listProducts hasCategoryId:" + hasCategoryId) //test
    if (hasCategoryId) {
      //转换"id"参数string到number,使用"+"快捷转换
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id');

      //menu组件已经知道id和name了，这里就借用一下，不然还要去后端查询
      this.currentCategoryName = this.route.snapshot.paramMap.get('name'); //有id必然有categoryName, 从链接间接获取到name
      console.log(`listProducts: ${this.currentCategoryId}, ${this.currentCategoryName}`) //test
    } else {
      //如果不指定，默认1
      this.currentCategoryId = 4;
      this.currentCategoryName = 'Luggage';
    }
    //console.log(`listProducts hasCategoryId: ${hasCategoryId} , ${this.currentCategoryId}`) //test

    //被依赖注入的service中获得数据
    //this.productService.getProductList().subscribe(//订阅service数据
    this.productService.getProductList(this.currentCategoryId).subscribe(//根据id, 监视变化及时更新
      data => {
        this.products = data;
      }
    )
  }

}

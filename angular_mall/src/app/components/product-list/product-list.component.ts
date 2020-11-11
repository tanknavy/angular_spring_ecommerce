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

  searchMode: boolean;//搜索提交

  //分页属性
  thePageNumber: number = 1; //初始页，rest是0开始,angular是1
  thePageSize: number = 10; //为0表示按照后端返回的size
  theTotalElements: number = 0;
  previouseCategoryId: number = 1; //用于比较品类是否一致
  previouseKeyword: string = null;//用于搜索词变换

  constructor(private productService: ProductService, //依赖注入servcie，就是向backend请求数据
    private route: ActivatedRoute) { } //当前的路由

  //类似@PostConstruct, 在构造函数以后执行
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {//一旦users请求()有变化，就去请求新数据
      this.listProducts(); //subscribe根据请求/路由拿数据数据
    });
  }


  //根据前端用户输入参数this.route.snapshot.paramMap.has('id')，决定向server发送请求拿数据
  listProducts() { //区分是搜索结果还是品类结果
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

    //没有分页
    // this.productService.searchProducts(theKeyword).subscribe(
    //   data => { this.products = data }
    // )

    //分页
    //如果keyword发生变化，
    if (this.previouseKeyword != theKeyword) {
      this.thePageNumber = 1; //每次重新搜索，查询时，应该将重置到第一页，否则上个查询在第9页，而这次查询只有1页，但是还请求第9页就错误啦
    }
    this.previouseKeyword = theKeyword

    this.productService.searchProductsPaginate(
      this.thePageNumber - 1, //page从1开始，但是rest从0
      this.thePageSize,
      theKeyword).subscribe(
        this.processResult()
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
      // this.currentCategoryId = 1;
      // this.currentCategoryName = 'Books';

      //如果不指定id还是想一网打尽
      this.currentCategoryId = 0; //表示全部分类
      this.currentCategoryName = 'All';

    }
    //console.log(`listProducts hasCategoryId: ${hasCategoryId} , ${this.currentCategoryId}`) //test

    //注释是为了增加paginate功能
    // //被依赖注入的service中获得数据
    // //this.productService.getProductList().subscribe(//订阅service数据
    // this.productService.getProductList(this.currentCategoryId).subscribe(//根据id, 监视变化更新到data, data再刷新到html
    //   data => {
    //     this.products = data;
    //   }
    // )

    //增加分页功能，
    //检查是否有different category，
    //如果是不同的category id, thePageNumber重设为1，因为不同品类，又重新开始
    if (this.previouseCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1; //换了新品类，重新从第1页开始显示
    }
    this.previouseCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`) //测试

    this.productService.getProductListPaginate(//page从1，rest从0开始
      this.thePageNumber - 1,
      this.thePageSize, //每页大小
      this.currentCategoryId)
      .subscribe(this.processResult()); //返回有product[]和page的json串如何处理？ 

  }

  //处理带有page信息的json结果
  processResult() {//返回一个函数
    return data => { //subscribe需要一个callback函数，这里return会返回，如果不写return，subscribe就会接受一个null
      this.products = data._embedded.products; //componenet中属性和rest返回的json结果映射
      this.thePageNumber = data.page.number + 1; //spring data rest from 0, pagination from 1
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number) {//容许用户指定pageSize
    this.thePageSize = pageSize;
    this.thePageNumber = 1; //改变了pageSize重置到第一页
    this.listProducts();//内容也要重新刷新
  }

}

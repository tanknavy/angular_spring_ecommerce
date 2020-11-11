import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponent } from './components/search/search.component'

import { HttpClientModule } from '@angular/common/http' //ajax调用后端
import { ProductService } from './services/product.service';//服务，类似mvc的controller,控制model/data

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component' //路由

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component' //导入模块使用pagination功能

//配置路由,默认是prefix匹配(重要)，前面相同，所以要长路径写在短路径前面，否则出错
const routes: Routes = [
  //{ path: 'category/:id', component: ProductListComponent },//当路径匹配时，new这个组件
  { path: 'category/:id/:name', component: ProductListComponent },//只请求id, 自动带上categoryName,
  { path: 'category', component: ProductListComponent },// 比上个category/:id要短，写在下面，
  { path: 'products', component: ProductListComponent },//当路径匹配时，new这个组件
  //{ path: 'products', component: SalesPersonListComponent },//测试

  //扩展的
  { path: 'search/:keyword', component: ProductListComponent }, //输入keyword搜索也是一个路由，因为要刷新内容
  { path: 'products/:id', component: ProductDetailsComponent }, //商品详情页，注意prefix的route
  { path: 'cart-details', component: CartDetailsComponent },//购物车详情

  //空的和默认的放最下面,重定向
  { path: '', redirectTo: '/products', pathMatch: 'full' },//空路径，pathMatch㤇完全匹配
  { path: '**', redirectTo: '/products', pathMatch: 'full' }//以上都不匹配时
]

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),//路由模块
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //http,ajx
    NgbModule //使用NgbModule中的功能
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

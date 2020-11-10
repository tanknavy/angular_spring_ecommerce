import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http' //ajax调用后端
import { ProductService } from './services/product.service';//服务，类似mvc的controller,控制model/data

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component' //路由

//配置路由
const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },//当路径匹配时，new这个组件
  { path: 'category', component: ProductListComponent },//当路径匹配时，new这个组件
  { path: 'products', component: ProductListComponent },//当路径匹配时，new这个组件
  //{ path: 'products', component: SalesPersonListComponent },//测试
  { path: '', redirectTo: '/products', pathMatch: 'full' },//空路径，pathMatch㤇完全匹配
  { path: '**', redirectTo: '/products', pathMatch: 'full' }//以上都不匹配时
]

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),//路由模块
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'; //rxjs;reactive java script
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService { //http请求拿数据，同步的？1

  //private baseUrl = 'http://192.168.1.187:8090/api/products?size=100';
  private baseUrl = 'http://192.168.1.187:8090/api/products'; //后面接search的话，这里千万不能加?size=
  private categoryUrl = 'http://192.168.1.187:8090/api/product-category';

  constructor(private httpClient: HttpClient) { } //依赖注入httpClient

  //get返回一个observable, 
  //pipe映射JSON数据从spring data rest到Product array
  //第一版：
  //getProductList(): Observable<Product[]> { //全部查询
  //第二版：根据id查询
  getProductList(theCategoryId: number): Observable<Product[]> {//如何根据id查询
    //@TODO：based on URL
    //使用spring data rest下的search url
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`; //js支持这种`${}`解析变量为字符串
    console.log(`getProductList: ${searchUrl}`) //test

    //return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe( //url
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe( //url
      map(response => response._embedded.productCategory)
    );
  }

}

//从spring data rest的_embedded entry里 unwraps JSON
//http://localhost:8090/api/products 返回的json{_embedded: {products: []}}, 这里将[]中每个元素转成typescript里面的类Product
//typescript里面interface除了method还有属性的规范
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }

}

//http://192.168.1.187:8090/api/product-category
interface GetResponseProductCategory { //接口除了定义method，ts还定义属性规范，属性可以使集合类型，就是type set
  _embedded: {
    productCategory: ProductCategory[];
  }
}

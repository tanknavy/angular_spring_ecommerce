import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'; //rxjs;reactive java script
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //http请求拿数据，同步的？1
  //private baseUrl = 'http://192.168.1.187:8090/api/products?size=100';
  private baseUrl = 'http://192.168.1.187:8090/api/products'; //后面接search的话，这里千万不能加?size=
  private categoryUrl = 'http://192.168.1.187:8090/api/product-category';

  constructor(private httpClient: HttpClient) {
    console.log("ProductService构造函数被调用...")
  } //依赖注入httpClient

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
    return this.getProducts(searchUrl);
  }

  //getProductList添加分页功能
  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number,): Observable<GetResponseProducts> { //返回不再是Product[]数据，而是GetResponseProducts接口类型(有分页信息)
    //@TODO：based on URL
    //使用spring data rest下的search url
    //js支持这种`${}`解析变量为字符串

    // const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    //   + `&page=${thePage}&size=${thePageSize}`; //分页

    let searchUrl = '';
    if (theCategoryId != 0) { //0表示全部查询
      searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
        + `&page=${thePage}&size=${thePageSize}`; //品类查询，分页
    } else {
      searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`; //全部查询，分页
    }

    console.log(`getProductListPaginate: ${searchUrl}`) //test
    //getProductList(): Observable<Product[]> { //全部查询

    //return this.getProducts(searchUrl); //不再是返回Observable<Product[]>
    return this.httpClient.get<GetResponseProducts>(searchUrl); //返回带有products[]和page的json了
  }

  //refactor, 公共部分代码提取出来
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  //获取商品分类
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe( //url
      map(response => response._embedded.productCategory)
    );
  }

  //搜索商品
  searchProducts(theKeyword: string): Observable<Product[]> {
    //@TODO：based on URL
    //使用spring data rest下的search url
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; //js支持这种`${}`解析变量为字符串
    console.log(`searchProducts: ${searchUrl}`) //test

    return this.getProducts(searchUrl);

  }

  //搜索商品,分页
  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {
    //@TODO：based on URL
    //使用spring data rest下的search url
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`; //js支持这种`${}`解析变量为字符串
    console.log(`searchProducts: ${searchUrl}`) //test

    //return this.getProducts(searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl); //返回带有products[]和page的json了

  }


  //商品详情
  getProduct(theProductId: number): Observable<Product> { //返回一个商品，不是结合
    const productUrl = `${this.baseUrl}/${theProductId}`; //js支持这种`${}`解析变量为字符串
    //console.log(`getProduct: ${searchUrl}`) //test
    //return this.getProducts(searchUrl);
    return this.httpClient.get<Product>(productUrl); //由于这个rest请求返回json格式product，直接转了
  }

}

//从spring data rest的_embedded entry里 unwraps JSON
//http://localhost:8090/api/products 返回的json{_embedded: {products: []}}, 这里将[]中每个元素转成typescript里面的类Product
//typescript里面interface除了method还有属性的规范,
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}



//http://192.168.1.187:8090/api/product-category
interface GetResponseProductCategory { //接口除了定义method，ts还定义属性规范，属性可以使集合类型，就是type set
  _embedded: {
    productCategory: ProductCategory[];
  }
}

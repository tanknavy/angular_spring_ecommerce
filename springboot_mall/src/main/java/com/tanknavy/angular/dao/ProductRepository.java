package com.tanknavy.angular.dao;

import com.tanknavy.angular.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

//默认endporints就是/product
//http://localhost:8090/api/products
@CrossOrigin("http://192.168.1.187:4200")
public interface ProductRepository extends JpaRepository<Product, Long> { //entity和primary key

    //https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.query-creation
    //https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
    //REST和JPS支持查询操作方法，findBy, readBy, queryBy
    //以下方法中spring会执行select * from product where category_id=?操作, product有id和category, 怎么判断是category id？
    //spring data rest会在Product下面找Category属性,发现Category对应ProductCategory, 然后下面找id,
    //比如findByCategoryCategoryName就是找Product类下的Category属性->ProductCategory->categoryName属性
    //假如ProductCategory下面有CategoryName，还有Category，那怎么办？
    //暴露endpoint   http://localhost:8090/api/products/findByCategoryid?id=3/search/findByCategoryId
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    //Page<Product> findByCategoryCategoryName(@RequestParam("id") Long id, Pageable pageable);//这样是可行的

    //select * from product where name like concat('%',:name,'%')
    //http://localhost:8090/api/products/search/findByNameContaining?name=python
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}

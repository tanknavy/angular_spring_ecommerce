package com.tanknavy.angular.dao;

import com.tanknavy.angular.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//因为默认endpoints是entity加s，这里就是productCategorys, 如下定制
//注释中属性分别是Json entry的名字， /product-category
@CrossOrigin("http://192.168.1.187:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {//entity和primary key

}

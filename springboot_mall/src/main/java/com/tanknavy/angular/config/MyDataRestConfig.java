package com.tanknavy.angular.config;

import com.tanknavy.angular.entity.Product;
import com.tanknavy.angular.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.Set;

/**
 * Author: Alex Cheng 11/7/2020 10:39 PM
 */

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired //自动注入JPA entity manager
    public MyDataRestConfig(EntityManager theEntityManager){//构造函数
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        //使用postman测试disable的效果, 405 method not allowed
        //暂时rest只提供read only 服务
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        //disable HTTP methods for entiry Product
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure( (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        //disable HTTP methods for entiry ProductCategory
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure( (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        //call an internal helper method
        exposeIds(config);

    }
    
    //REST默认不会显示entity的id
    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids

        //1.从entity manager得到全部entity class
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        //2.创建entity type的数据组
        ArrayList<Class> entityClasses = new ArrayList<>();
        //3.对每个entity,获得JavaType
        for (EntityType<?> entity : entities) {
            entityClasses.add(entity.getJavaType());
        }

        //4.expose entity ids 对entity/types数组每个类型
        Class[] domainTypes = entityClasses.toArray(new Class[0]); //list放到数组中，如果arr足够大，否则创建相同大小的array
        config.exposeIdsFor(domainTypes);

    }


}

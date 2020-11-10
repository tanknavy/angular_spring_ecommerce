package com.tanknavy.angular.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

/**
 * Author: Alex Cheng 11/7/2020 10:09 PM
 */


@Entity
@Table(name="product_category")
// @Data -- known bug
@Getter
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//数据库自增主键
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    //测试栏位， REST如何处理Product下的findByCategoryCategoryName,发现是优先匹配category而不是categoryName,
//    @Column(name = "category")
//    private String category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") //一对多
    private Set<Product> products;

}

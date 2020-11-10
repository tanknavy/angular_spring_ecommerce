package com.tanknavy.angular.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Author: Alex Cheng 11/7/2020 10:04 PM
 */

@Entity
@Table(name="product")
// @Data -- known
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//数据库自增主键
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) //多对一
    private ProductCategory category;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated; //创建时

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated; //更新时
}

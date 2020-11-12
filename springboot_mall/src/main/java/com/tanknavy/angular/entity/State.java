package com.tanknavy.angular.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Author: Alex Cheng 11/11/2020 6:10 PM
 */

@Entity
@Table(name = "state")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id") //table中字段
    private Country country; //java中属性, JPA中方便findByCountryCode这样
}

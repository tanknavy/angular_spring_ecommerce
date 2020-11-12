package com.tanknavy.angular.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Author: Alex Cheng 11/11/2020 5:44 PM
 */

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    // one-to-many
    @OneToMany(mappedBy = "country") //和引用表state的country属性映射
    @JsonIgnore //jackson的忽略states,REST的json结果不再显示
    private List<State> states;
}

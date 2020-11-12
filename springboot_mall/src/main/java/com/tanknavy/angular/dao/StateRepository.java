package com.tanknavy.angular.dao;

import com.tanknavy.angular.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://192.168.1.187:4200")
@RepositoryRestResource
//@RepositoryRestResource(collectionResourceRel = "states", path = "states")
public interface StateRepository extends JpaRepository<State, Integer> {

    //http://192.168.1.187:8090/api/states/search/findByCountryCode?code=us
    List<State>  findByCountryCode(@Param("code") String code); //param
    //List<State>  findByCountryCode2(@RequestParam("code") String code);//web param
}

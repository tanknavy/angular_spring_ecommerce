import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //路由组件第一件事就是依赖注入router
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //搜索组件提交搜索后，
  doSearch(value: string) {
    console.log(`value=${value}`)
    //当前路由navigateByUrl转到search路由
    this.router.navigateByUrl(`/search/${value}`); //nagigateByUrl路由数据到search route
  }

}

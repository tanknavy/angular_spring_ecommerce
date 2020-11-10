import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {
  //ng generate class sales-person-list/SalesPerson创建相关类以后
  //初始化本地数据测试sample data, 对象数组
  salesPersonList: SalesPerson[] = [
    new SalesPerson("adm", "cheng", "adm@gmail.com", 5200),
    new SalesPerson("bob", "cheng", "bob@gmail.com", 3210),
    new SalesPerson("carl", "cheng", "carl@gmail.com", 6200),
    new SalesPerson("david", "cheng", "david@gmail.com", 5600)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

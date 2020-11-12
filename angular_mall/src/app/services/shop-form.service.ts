import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';//reactive JavaScript
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = 'http://192.168.1.187:8090/api/countries';
  private statesUrl = 'http://192.168.1.187:8090/api/states';

  constructor(private httpClient: HttpClient) {
    console.log('ShopFormService构造函数初始化')
  }


  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}` //search endpoint
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //用于下拉的月份列表,从当前月份起
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth)
    }
    // for (let theMonth = 1; theMonth < startMonth; theMonth++) {
    //   data.push(theMonth)
    // }

    // totalPrice: Subject<number> = new Subject<number>(); //对某个字段包装成subject类型用于订阅
    // this.totalPrice.next(totalPriceValue); //生产数据，next发布数据
    // this.cartService.totalPrice.subscribe() //其它组件订阅数据
    return of(data); //rexjs中of包装object为Observable类型，Observable类型会被subscribe，async data

  }

  //下拉年份，当前年份+10
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    //从当前year开始，
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear)
    }
    return of(data) //rexjs中of包装object为Observable类型，Observable类型会被subscribe，async data
  }
}


interface GetResponseCountries { //和REST的json数据映射起来
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates { //和REST的json数据映射起来
  _embedded: {
    states: State[];
  }
}
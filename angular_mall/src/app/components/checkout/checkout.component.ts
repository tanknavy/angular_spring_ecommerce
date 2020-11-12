import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';//先要在module中引入ReactiveFormsModule
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


//重点， html中form的值和class(ctroller)中如何交互？
export class CheckoutComponent implements OnInit {

  //要和html分享的数据
  checkoutFormGroup: FormGroup;

  //下来的日期使用service依照当前时间来创建动态array
  totalPrice: number = 0;
  totalQuantity: number = 0;

  //信用卡year和month下拉从service取数据
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  //country、state下来从数据库取数据
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  //在copy ship to bill时，ship的state变化也要让bill变化，不是copy一次,而是sync
  copyShip2BillChecked: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private shopFormService: ShopFormService) { } //依赖注入form

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({ //form group,json对象
      //一组表单(reactive form), 校验器

      //1. 客户基本信息表单
      customer: this.formBuilder.group({
        //firstName: [''], //使用一组Validators,定制notOnlyWhitespace
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhitespace]), //不能全是空格符

        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

        //angular的email校验器不检查域名, pattern校验
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),

      //2. 地址表
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
      }),

      //3. 地址表单
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
      }),

      //4.信用卡表单
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''], //默认已选当前月份
        expirationYear: [''],
      })

    });

    //price,quantity
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    //populate credit card months/years
    //获取credit card months/years列表
    const startMonth: number = new Date().getMonth() + 1; //js中月份从0开始
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("shopFormService get credit card months: " + JSON.stringify(data)); //数组转字符串
        this.creditCardMonths = data;
      }
    )

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("shopFormService get credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    //populate countries
    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("getCountries" + JSON.stringify(data));
        this.countries = data;
      }
    )
  }

  //为了在html的表单validator显示error message，html中会调用这些方法
  // <div * ngIf="shippingAddressCountry.invalid && (shippingAddressCountry.dirty || shippingAddressCountry.touched)" //在html中
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  //html中shippingAddress校验，失败显示error message
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  //html中billingAddress校验，失败显示error messsage
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billpingAddress.country'); }

  //html中credit cart检验 ,失败显示error messsage
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creidtCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  //formGroup中全部form一起提交时
  onSubmit() {
    console.log("Handling checkout sumbit button..");

    //提交表单时错误全部飘红
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched(); //标记
    }

    console.log(this.checkoutFormGroup.get('customer').value); //从当前formGroup的customer这个form中拿到全部值
    console.log(this.checkoutFormGroup.get('customer').value.email);//get从当前customer这个form的email字段取得值
    console.log(this.totalPrice)

  }

  //从一个form全部赋值到另外一个form, 只会在checked时同步，并不会一只同步
  copyShippingAddressToBillingAddress(event) { //chekc后将ship form的值复制到bill form中
    if (event.target.checked) { //checkbox is checked
      //注意，setValue和用户手动设置触发有区别，用户手动选择会有event事件，而这里没有触发change事件
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value); //复制了每一个值(选中的)，不包括下拉列表

      //bug fix:选择country会刷新state, 但当copy时,state下拉依然为空，copy只是选中的,但是states array中依然为空
      this.billingAddressStates = this.shippingAddressStates;

      this.copyShip2BillChecked = true;

    } else {
      this.checkoutFormGroup.controls.billingAddress.reset(); //不选择就重置为空
      //bug fix
      this.billingAddressStates = [];
      this.copyShip2BillChecked = false;

    }
  }

  //form中year和month下拉框的相互依赖问题
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard"); //从form组中拿到一个form
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);//当前页面中选择的value
    const currentYear: number = new Date().getFullYear();
    //页面选择的year和当前year
    let startMonth: number;
    if (selectedYear == currentYear) {
      startMonth = new Date().getMonth() + 1; //js中year从0开始
    } else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe( //从service中拿到month列表
      data => {
        console.log(`handleMonthsAndYears: ${startMonth}`);
        this.creditCardMonths = data; //给class中的属性赋值，UI(view)显示class(controller)的属性的值(model)，class中处理这个值
      }
    )

  }


  //form中country和state下拉框相互依赖问题
  //bug,使用copy from ship to bill后，由于手动选择country触发change事件才会刷新state,选中copy后，这种情况没有触发state下拉
  getStates(formGroupName: string) { //那个form
    const formGroup = this.checkoutFormGroup.get(formGroupName); //哪个form，根据名称

    //html form中select下拉, 选中后该value就是country
    // <option * ngFor="let country of countries" [ngValue] = "country" >
    //   {{ country.name }
    //form中值为country的,这个country不是此form中country这个属性，而是
    const countryCode = formGroup.value.country.code; //在UI中为form中country这个属性设置了值“country"是个对象,[ngValue]="country"
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}, country name: ${countryName}`);

    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        console.log(`getStates: ${data}`);
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
          //如果copy from ship to bill被选中，billing还需要同步变化，越搞越复杂
          //TODO
          //this.billingAddressStates = data;
          // if (this.copyShip2BillChecked) { //copy ship to bill时，同步变化
          //   //注意，setValue和用户手动设置触发有区别，用户手动选择会有event事件，而这里没有触发change事件
          //   this.checkoutFormGroup.controls.billingAddress
          //     .setValue(this.checkoutFormGroup.controls.shippingAddress.value); //复制了每一个值(选中的)，不包括下拉列表
          //   //bug fix:选择country会刷新state, 但当copy时,state下拉依然为空，copy只是选中的,但是states array中依然为空
          //   this.billingAddressStates = this.shippingAddressStates;
          //}
        } else {
          this.billingAddressStates = data;
        }

        //默认选择第一个, 给这个form中state属性设置值
        formGroup.get('state').setValue(data[0]) //将获得的states第一个item作为表单states的选中项
      }
    );


  }

}

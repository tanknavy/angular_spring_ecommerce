import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {

    //静态方法，wihtespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {
        //如果输入string仅仅包含空格
        if ((control.value != null) && (control.value.trim().length === 0)) {
            //invalid, 返回一个对象，这个key名称要和html中firstName.errors.notOnlyWhitespace一致
            return { 'notOnlyWhitespace': true };//校验的error key， HTML中会检查
        } else {
            return null; //检验通过，返回null
        }
    }
}

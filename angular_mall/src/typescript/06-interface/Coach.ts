//typescript的interface和java类似，但是可以包含property字段，并且字段可以使type set比如{string, number}

export interface Coach{
    name:string; //typescript的接口可以有属性字段
    getDailyWorkout():string; //未实现的方法
}
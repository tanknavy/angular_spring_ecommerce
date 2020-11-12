namespace types { //类似package概念，module指一个文件，pacakge/namespace一般一个文件夹

    //typescipt是strongly-typed语言, var:type 类似scala，只有type放在var前
    let found: boolean = false
    let grade: number = 88.5
    let firstName: string = "Carl"
    let lastName: string = 'Cheng' //单双引号都可以
    //grade = "Best" //type mismatch类型b

    //Type: any类型，类似java的Object, scala的Any
    let myData: any = 50.8 //任意类型，但是会丢失type-safety
    myData = "Better"
    console.log("Hi " + firstName + " " + lastName)

    //js中支持`${var}`这样格式
    console.log(`${grade} ${found} ${myData}`)
    console.log(`Hi ${firstName} ${lastName}`) //template strings
}
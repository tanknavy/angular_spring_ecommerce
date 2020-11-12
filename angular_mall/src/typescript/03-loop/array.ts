/**
 * js支持的5中loop
 * for, for/in(对象的属性列表), for/of(可迭代对象的元素列表), while, do/while
 */

let reviews: number[] = [5, 4, 5, 2, 3, 1]
for (let i = 0; i < reviews.length; i++) {
    //console.log(reviews[i])
}

//let x: number
//for (x in reviews) { // x in :迭代一个对象的属性
for (let x of reviews) { // x of：迭代一个可迭代对象比如array,string,map...
    //console.log(reviews[x]) //对象属性时
    console.log(x) //of可迭代对象的元素
}

//typescript里的Arrays一直是growable/dynamic动态可增长的
let sports: string[] = ["hiking", "soccer", "badminton", "tennis"]
sports.push("swim")
for (let x of sports) {
    if (x == "soccer") { //两个等号三个等号都可以
        console.log(`my favoriate: ${x}`)
    }
    else {
        console.log(x)
    }

}
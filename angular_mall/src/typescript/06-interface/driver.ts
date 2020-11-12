import {Coach} from "./Coach"
import { GolfCoach } from "./GolfCoach";
import { TennisCoach } from "./TennisCoach";

let tennisCoach = new TennisCoach("DeyueKovic")
//console.log(tennisCoach.getDailyWorkout())

let golfCoach = new GolfCoach("Woods")
//console.log(golfCoach.getDailyWorkout())

let coachs: Coach[] = [] //使用接口
coachs.push(tennisCoach)
coachs.push(golfCoach)

for (let x of coachs){ //of集合元素，in对象属性
    console.log(x.getDailyWorkout())
}


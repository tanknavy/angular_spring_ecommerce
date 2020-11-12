"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GolfCoach_1 = require("./GolfCoach");
var TennisCoach_1 = require("./TennisCoach");
var tennisCoach = new TennisCoach_1.TennisCoach("DeyueKovic");
//console.log(tennisCoach.getDailyWorkout())
var golfCoach = new GolfCoach_1.GolfCoach("Woods");
//console.log(golfCoach.getDailyWorkout())
var coachs = []; //使用接口
coachs.push(tennisCoach);
coachs.push(golfCoach);
for (var _i = 0, coachs_1 = coachs; _i < coachs_1.length; _i++) {
    var x = coachs_1[_i];
    console.log(x.getDailyWorkout());
}

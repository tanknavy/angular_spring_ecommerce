import { Coach } from "./Coach";

export class GolfCoach implements Coach{
    name: string; //实现接口
    constructor(name:string){
        this.name = name
    }

    getDailyWorkout(): string {
        return "GolfCoach: play with Tiger"
    }
    
}
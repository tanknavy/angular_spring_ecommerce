import { Coach } from "./Coach";

export class TennisCoach implements Coach{
    name: string
    constructor(name:string){
        this.name = name
    }
    getDailyWorkout(): string {
        return this.name + " TennisCoach: play with Feddera"
    }    
    
}
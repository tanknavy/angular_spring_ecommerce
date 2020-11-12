"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TennisCoach = void 0;
var TennisCoach = /** @class */ (function () {
    function TennisCoach(name) {
        this.name = name;
    }
    TennisCoach.prototype.getDailyWorkout = function () {
        return this.name + " TennisCoach: play with Feddera";
    };
    return TennisCoach;
}());
exports.TennisCoach = TennisCoach;

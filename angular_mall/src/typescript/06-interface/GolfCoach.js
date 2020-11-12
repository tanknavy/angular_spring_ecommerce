"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GolfCoach = void 0;
var GolfCoach = /** @class */ (function () {
    function GolfCoach(name) {
        this.name = name;
    }
    GolfCoach.prototype.getDailyWorkout = function () {
        return "GolfCoach: play with Tiger";
    };
    return GolfCoach;
}());
exports.GolfCoach = GolfCoach;

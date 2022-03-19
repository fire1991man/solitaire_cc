
import { _decorator, Component, Node } from 'cc';
 
export class Utils {
    public static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static getRandomInt(max: number) : number{
        return Math.floor(Math.random() * max);
    }
}

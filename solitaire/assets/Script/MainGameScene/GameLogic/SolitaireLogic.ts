import { CardData, Suit } from "../../Data/CardData";
import { log } from 'cc';
import { IShuffle } from "./Shuffle/IShuffle";

 export class SolitaireLogic {

    private cards : CardData[] = null;
    private shuffleFunc : IShuffle = null;

    constructor(shuffleFunc : IShuffle){
        this.cards = new Array<CardData>();
        this.initCard(this.cards);
        this.shuffleFunc = shuffleFunc;
        this.shuffleFunc.Shuffle(this.cards);
    }

    private initCard(cards : CardData[]) : void{
        
        let enumSuits = new Array<string>();
        for (let name in Suit) {
            if (typeof Suit[name] === 'number' ) {
                enumSuits.push(name);
                log(name);
            }
        }

        for( let suit in enumSuits){
            for(let i = 1; i <= 13;i++){
                var temp = enumSuits[suit];
                var enumValue : Suit = (<any>Suit)[enumSuits[suit]];
                cards.push(new CardData(i,enumValue));
            }
        }
    }
 }

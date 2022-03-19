
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../../Data/CardData';
import { Utils } from '../../../Utils/Utils';
import { IShuffle } from './IShuffle';

 
export class SimpleShuffle implements IShuffle {
    Shuffle(cards: CardData[]): void {
        let length = cards.length;
        for(let i = 0; i < length;i++){
            let randomIndex : number = Utils.getRandomInt(length);
            let tempCard = cards[i];
            cards[i] = cards[randomIndex];
            cards[randomIndex] = tempCard;
        }
        
    }

}
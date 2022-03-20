
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../../Data/CardData';
import { Pile } from './Pile';

export class FoundationPile extends Pile {
    constructor(index : number){
        super();
        this.index = index;
    }

    public allowAddCards(cardAddeds: CardData[]): boolean {
        return cardAddeds.length == 1;
    }
}
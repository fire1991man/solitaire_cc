
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../../Data/CardData';

export class Pile {
    protected cards : CardData[] = null;
    protected index : number = 0;

    public get Index(){
        return this.index;
    }

    constructor(){
        this.cards = [];
    }

    public addCards(cardAddeds: CardData[]) : void{
        Array.prototype.push.apply(this.cards, cardAddeds);
    }

    public addCard(cardAdded: CardData) : void{
        this.cards.push(cardAdded);
    }

    public allowAddCards(cardAddeds: CardData[]) : boolean{
        return cardAddeds.length > 0;
    }

}


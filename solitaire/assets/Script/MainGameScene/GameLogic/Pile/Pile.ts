
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../../Data/CardData';

export class Pile {
    protected cards : CardData[] = null;
    protected index : number = 0;

    public get Cards(){
        return this.cards;
    }

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

    public getCardByIndex(index : number) : CardData{
        if(index < 0 || index >= this.cards.length)
            return null;
        return this.cards[index];
    }

    public getLastCard() : CardData{
        return this.getCardByIndex(this.cards.length-1);
    }

    public removeCardsFromIndex(index : number) : CardData[]{
        return this.cards.splice(index,this.cards.length-index);
    }

    public removeLastCard() : CardData[]{
        return this.removeCardsFromIndex(this.cards.length-1);
    }

}



import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../Data/CardData';
import { Pile } from '../GameLogic/Pile/Pile';
 
export enum Command{
    NONE = -1,
    SHUFFLE = 0,
    DEAL_CARDS = 1,
    OPEN_LAST_CARD_PILE = 2,
}

export class GameCommandData {
    protected command : Command = Command.NONE;
    public get Command(){
        return this.command;
    }
}

export class ShuffleCommand extends GameCommandData{
    constructor(){
        super();
        this.command = Command.SHUFFLE;
    }
}

export class DealCardsCommand extends GameCommandData{
    private tableauPiles : Pile[] = null;
    private stockCardNumber : number = 0;

    get TableauPiles(){
        return this.tableauPiles;
    }

    constructor(tableauPiles : Pile[], stockCardNumber : number){
        super();
        this.command = Command.DEAL_CARDS;
        this.tableauPiles = tableauPiles;
        this.stockCardNumber = stockCardNumber;
    }
}

export class OpenLastCardPileCommand extends GameCommandData{

    private lastCardPerPiles : CardData[] = null;

    get LastCardPerPiles(){
        return this.lastCardPerPiles;
    }

    constructor(lastCardPerPiles : CardData[]){
        super();
        this.command = Command.OPEN_LAST_CARD_PILE;
        this.lastCardPerPiles = lastCardPerPiles;
    }
}
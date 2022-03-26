
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../Data/CardData';
import { Pile } from '../GameLogic/Pile/Pile';
 
export enum Command{
    NONE = -1,
    SHUFFLE = 0,
    DEAL_CARDS = 1,
    OPEN_LAST_CARD_PILE = 2,
    STOCK_TO_WATSE =3,
    REFILL_STOCK = 4,
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

export class StockToWasteCommand extends GameCommandData{
    private cardData : CardData = null;
    public get CardData(){
        return this.cardData;
    }

    constructor(cardData : CardData){
        super();
        this.command = Command.STOCK_TO_WATSE;
        this.cardData = cardData;
    }
}

export class RefillStockCommand extends GameCommandData{
   
    private numberCard : number = 0;

    public get NumberCard() {
         return this.numberCard;
    }

    constructor(numberCard : number){
        super();
        this.command = Command.REFILL_STOCK;
        this.numberCard = numberCard;
    }
}
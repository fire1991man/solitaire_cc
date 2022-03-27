
import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../Data/CardData';
import { Pile } from '../GameLogic/Pile/Pile';
 
export enum Command{
    NONE = -1,
    SHUFFLE = 0,
    DEAL_CARDS = 1,
    OPEN_LAST_CARD_ALL_TABLEAU = 2,
    STOCK_TO_WATSE =3,
    REFILL_STOCK = 4,
    SHAKE_CARD_TABLEAU = 5,
    SHAKE_CARD_FOUNDATION = 6,
    SHAKE_CARD_WASTE = 7,
    MOVE_TABLEAU_TO_FOUNDATION = 8,
    MOVE_TABLEAU_TO_TABLEAU = 9,
    MOVE_FOUNDATION_TO_TABLEAU = 10,
    MOVE_WASTE_TO_FOUNDATION = 11,
    MOVE_WASTE_TO_TABLEAU = 12,
    OPEN_LAST_CARD_TABLEAU = 13,
    GAME_RESULT = 14,
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

export class OpenLastCardAllTableauCommand extends GameCommandData{

    private lastCardPerPiles : CardData[] = null;

    get LastCardPerPiles(){
        return this.lastCardPerPiles;
    }

    constructor(lastCardPerPiles : CardData[]){
        super();
        this.command = Command.OPEN_LAST_CARD_ALL_TABLEAU;
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

export class ShakeCardTaleauCommand extends GameCommandData{
   
    private tableauIndex : number = 0;
    private cardIndex : number = 0;

    public get CardIndex() {
         return this.cardIndex;
    }

    public get TableauIndex() {
        return this.tableauIndex;
   }

    constructor(cardIndex : number, tableauIndex : number){
        super();
        this.command = Command.SHAKE_CARD_TABLEAU;
        this.cardIndex = cardIndex;
        this.tableauIndex = tableauIndex;
    }
}

export class ShakeCardFoundationCommand extends GameCommandData{
   
    private foundationIndex : number = 0;
    private cardIndex : number = 0;

    public get CardIndex() {
         return this.cardIndex;
    }

    public get FoundationIndex() {
        return this.foundationIndex;
   }

    constructor(cardIndex : number, foundationIndex : number){
        super();
        this.command = Command.SHAKE_CARD_FOUNDATION;
        this.cardIndex = cardIndex;
        this.foundationIndex = foundationIndex;
    }
}

export class ShakeCardWasteCommand extends GameCommandData{
   
    constructor(){
        super();
        this.command = Command.SHAKE_CARD_WASTE;
    }
}

export class MoveTableauToFoundationCommand extends GameCommandData{
   
    private startIndex : number = 0;
    private endIndex : number = 0;
    private cardIndex : number = 0;
    private cardDatas : CardData[] = null;

    public get StartIndex() {
         return this.startIndex;
    }

    public get EndIndex() {
        return this.endIndex;
    }

    public get CardIndex() {
        return this.cardIndex;
    }

    public get CardDatas() {
        return this.cardDatas;
    }

    constructor(startIndex : number, endIndex : number,
                 cardIndex : number, cardDatas : CardData[]){
        super();
        this.command = Command.MOVE_TABLEAU_TO_FOUNDATION;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.cardIndex = cardIndex;
        this.cardDatas = cardDatas;
    }
}

export class MoveTableauToTableauCommand extends GameCommandData{
   
    private startIndex : number = 0;
    private endIndex : number = 0;
    private cardIndex : number = 0;
    private cardDatas : CardData[] = null;

    public get StartIndex() {
         return this.startIndex;
    }

    public get EndIndex() {
        return this.endIndex;
    }

    public get CardIndex() {
        return this.cardIndex;
    }

    public get CardDatas() {
        return this.cardDatas;
    }

    constructor(startIndex : number, endIndex : number,
                 cardIndex : number, cardDatas : CardData[]){
        super();
        this.command = Command.MOVE_TABLEAU_TO_TABLEAU;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.cardIndex = cardIndex;
        this.cardDatas = cardDatas;
    }
}

export class MoveFoundationToTableauCommand extends GameCommandData{
   
    private startIndex : number = 0;
    private endIndex : number = 0;
    private cardIndex : number = 0;
    private cardDatas : CardData[] = null;

    public get StartIndex() {
        return this.startIndex;
    }

    public get EndIndex() {
       return this.endIndex;
    }

    public get CardIndex() {
       return this.cardIndex;
    }

    public get CardDatas() {
       return this.cardDatas;
    }

    constructor(startIndex : number, endIndex : number,
                 cardIndex : number, cardDatas : CardData[]){
        super();
        this.command = Command.MOVE_FOUNDATION_TO_TABLEAU;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.cardIndex = cardIndex;
        this.cardDatas = cardDatas;
    }
}

export class MoveWasteToTableauCommand extends GameCommandData{
   
    private endIndex : number = 0;
    private cardIndex : number = 0;
    private cardDatas : CardData[] = null;

    public get EndIndex() {
       return this.endIndex;
    }

    public get CardIndex() {
       return this.cardIndex;
    }

    public get CardDatas() {
       return this.cardDatas;
    }

    constructor( endIndex : number, cardIndex : number, cardDatas : CardData[]){
        super();
        this.command = Command.MOVE_WASTE_TO_TABLEAU;
        this.endIndex = endIndex;
        this.cardIndex = cardIndex;
        this.cardDatas = cardDatas;
    }
}

export class MoveWasteToFoundationCommand extends GameCommandData{
   
    private endIndex : number = 0;
    private cardIndex : number = 0;
    private cardDatas : CardData[] = null;

    public get EndIndex() {
       return this.endIndex;
    }

    public get CardIndex() {
       return this.cardIndex;
    }

    public get CardDatas() {
       return this.cardDatas;
    }

    constructor(endIndex : number, cardIndex : number, cardDatas : CardData[]){
        super();
        this.command = Command.MOVE_WASTE_TO_FOUNDATION;
        this.endIndex = endIndex;
        this.cardIndex = cardIndex;
        this.cardDatas = cardDatas;
    }
}

export class OpenLastCardTableauCommand extends GameCommandData{

    private cardData : CardData = null;
    private index : number = 0;
    
    public get CardData() : CardData {
        return this.cardData;
    }
     
    public 
    public get Index() : number {
        return this.index;
    }
    

    constructor(cardData : CardData, index : number ){
        super();
        this.command = Command.OPEN_LAST_CARD_TABLEAU;
        this.cardData = cardData;
        this.index = index;
    }
}

export class GameResultCommand extends GameCommandData{

    private isWin : boolean = false;
    
    public get IsWin() : boolean {
        return this.isWin;
    }
    
    constructor(isWin : boolean){
        super();
        this.command = Command.GAME_RESULT;
        this.isWin = isWin;
    }
}
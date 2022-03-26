import { CardData, Suit } from "../../Data/CardData";
import { log } from 'cc';
import { IShuffle } from "./Shuffle/IShuffle";
import { DealCardsCommand, GameCommandData, OpenLastCardPileCommand, RefillStockCommand, ShuffleCommand, StockToWasteCommand } from "../GameCommand/GameCommand";
import { Pile } from "./Pile/Pile";
import { StockPile } from "./Pile/StockPile";
import { WastePile } from "./Pile/WastePile";
import { FoundationPile } from "./Pile/FoundationPile";
import { TableauPile } from "./Pile/TableauPile";

 export class SolitaireLogic {

    private readonly FOUNDTION_PILE : number = 4;
    private readonly TABLUE_PILE : number = 7;

    public processCommand : (gameCommandDatas : GameCommandData[]) => void = null;

    private cards : CardData[] = null;
    private shuffleAlgorithm : IShuffle = null;

    private stockPile : Pile = null;
    private watsePile : Pile = null;
    private foundationPiles : Pile[] = null;
    private tableauPiles : Pile[] = null;
    private checkMovePiles : Pile[] = null;

    constructor(shuffle : IShuffle){
        this.cards = new Array<CardData>();
        this.initCard(this.cards);
        this.initPiles();
        this.shuffleAlgorithm = shuffle;
    }

    private initPiles() : void{
        this.checkMovePiles = [];
        this.stockPile = new StockPile();
        this.watsePile = new WastePile();
        //
        this.foundationPiles = [];
        for(let i = 0; i < this.FOUNDTION_PILE;i++){
            this.foundationPiles.push(new FoundationPile(i));
        }
        //
        this.tableauPiles = [];
        for(let i = 0; i < this.TABLUE_PILE;i++){
            this.tableauPiles.push(new TableauPile(i));
        }
        //
        Array.prototype.push.apply(this.checkMovePiles, this.foundationPiles);
        Array.prototype.push.apply(this.checkMovePiles, this.tableauPiles);
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

    public StartGame() : void{
        //shuffle
        this.shuffleAlgorithm.Shuffle(this.cards);
        // close all card
        this.cards.forEach((card)=>{
            card.isOpen = false;
        });

        let lastCardPerPiles : CardData[] = [];
        for(let i = 0; i < this.TABLUE_PILE;i++){
            for(let j = 0; j < this.tableauPiles[i].Index+1;j++){
                var cardPop = this.cards.pop();
                this.tableauPiles[i].addCard(cardPop);
                if(j == this.tableauPiles[i].Index){
                    cardPop.isOpen = true ;
                    lastCardPerPiles.push(cardPop);
                }
            }
        }

        var remainCards = this.cards.splice(0,this.cards.length);
        this.stockPile.addCards(remainCards);
        //
        let gameCommandDatas : GameCommandData[] = [];
        gameCommandDatas.push(new ShuffleCommand());
        gameCommandDatas.push(new DealCardsCommand(this.tableauPiles,this.stockPile.Cards.length));
        gameCommandDatas.push(new OpenLastCardPileCommand(lastCardPerPiles));

        if(this.processCommand != null)
            this.processCommand(gameCommandDatas);
    }

    public CheckCardFromTableau(tableauIndex: number, cardIndex : number) : void{
        log("CheckCardFromTableau - tableauIndex: " + tableauIndex + " - cardIndex: " + cardIndex);
    }

    public CheckCardFromFoundation(foundationIndex: number,cardIndex : number) : void{
        log("CheckCardFromFoundation - foundationIndex: " + foundationIndex + " - cardIndex: " + cardIndex);
    }

    public CheckCardFromWaste(cardIndex : number) : void{
        log("CheckCardFromWaste - cardIndex: " + cardIndex);
    }

    public CheckCardFromStock(cardIndex : number) : void{
        log("CheckCardFromStock - cardIndex: " + cardIndex);
        let gameCommandDatas : GameCommandData[] = [];
        // refill
        if(cardIndex == -1){
            while(this.watsePile.Cards.length > 0){
                var cardData = this.watsePile.Cards.pop();
                cardData.isOpen = false;
                this.stockPile.Cards.push(cardData);
            }
            gameCommandDatas.push(new RefillStockCommand(this.stockPile.Cards.length));
        }
        else{
            let lastCardStock = this.stockPile.Cards.pop();
            lastCardStock.isOpen = true;
            this.watsePile.Cards.push(lastCardStock);
            
            gameCommandDatas.push(new StockToWasteCommand(lastCardStock));
            
        }
        if(this.processCommand != null)
                this.processCommand(gameCommandDatas);
    }

 }

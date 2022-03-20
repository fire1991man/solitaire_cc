import { CardData, Suit } from "../../Data/CardData";
import { log } from 'cc';
import { IShuffle } from "./Shuffle/IShuffle";
import { Pile } from "./CardHolder/Pile";
import { StockPile } from "./CardHolder/StockPile";
import { WastePile } from "./CardHolder/WastePile";
import { FoundationPile } from "./CardHolder/FoundationPile";
import { TableauPile } from "./CardHolder/TableauPile";
import { DealCardsCommand, GameCommandData, OpenLastCardPileCommand, ShuffleCommand } from "../GameCommand/GameCommand";

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
        this.shuffleAlgorithm.Shuffle(this.cards);
        for(let i = 0; i < this.TABLUE_PILE;i++){
            for(let j = 0; j < this.tableauPiles[i].Index+1;j++){
                var cardPop = this.cards.pop();
                this.tableauPiles[i].addCard(cardPop);
            }
        }

        var remainCards = this.cards.splice(0,this.cards.length);
        this.stockPile.addCards(remainCards);
        //
        let gameCommandDatas : GameCommandData[] = [];
        gameCommandDatas.push(new ShuffleCommand());
        gameCommandDatas.push(new DealCardsCommand(this.tableauPiles,this.stockPile.Cards.length));
        gameCommandDatas.push(new OpenLastCardPileCommand());

        if(this.processCommand != null)
            this.processCommand(gameCommandDatas);
    }
 }

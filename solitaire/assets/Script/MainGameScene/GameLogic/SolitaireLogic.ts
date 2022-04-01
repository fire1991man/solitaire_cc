import { CardData, Suit } from "../../Data/CardData";
import { log } from 'cc';
import { IShuffle } from "./Shuffle/IShuffle";
import { Command, DealCardsCommand, GameCommandData, GameResultCommand, MoveFoundationToTableauCommand, MoveTableauToFoundationCommand, MoveTableauToTableauCommand, MoveWasteToFoundationCommand, MoveWasteToTableauCommand, OpenLastCardAllTableauCommand, OpenLastCardTableauCommand, RefillStockCommand, ShakeCardFoundationCommand, ShakeCardTaleauCommand, ShakeCardWasteCommand, ShuffleCommand, StockToWasteCommand, UndoFoundationToTableauCommand, UndoRefillStockCommand, UndoStockToWasteCommand, UndoTableauToFoundationCommand, UndoTableauToTableauCommand, UndoWasteToFoundationCommand, UndoWasteToTableauCommand } from "../GameCommand/GameCommand";
import { Pile } from "./Pile/Pile";
import { StockPile } from "./Pile/StockPile";
import { WastePile } from "./Pile/WastePile";
import { FoundationPile } from "./Pile/FoundationPile";
import { TableauPile } from "./Pile/TableauPile";

class ResultCheckMove{
    constructor(endPileIndex : number, cardDatas : CardData[] ){
        this.endPileIndex = endPileIndex;
        this.cardDatas = cardDatas;
    }

    public endPileIndex : number = 0;
    public cardDatas : CardData[] = null;
}

export class SolitaireLogic {

    private readonly FOUNDTION_PILE : number = 4;
    private readonly TABLUE_PILE : number = 7;

    public processCommand : (gameCommandDatas : GameCommandData[]) => void = null;

    private cards : CardData[] = null;
    private replayCards : CardData[] = null;
    private shuffleAlgorithm : IShuffle = null;

    private stockPile : Pile = null;
    private watsePile : Pile = null;
    private foundationPiles : Pile[] = null;
    private tableauPiles : Pile[] = null;
    private checkMovePiles : Pile[] = null;
    private undoCommand : GameCommandData[] = null;
    

    constructor(shuffle : IShuffle){
        this.undoCommand = [];
        this.cards = new Array<CardData>();
        this.replayCards = new Array<CardData>();
        this.initCard();
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

    private initCard() : void{
        
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
                this.cards.push(new CardData(i,enumValue));
                this.replayCards.push(new CardData(i,enumValue));
            }
        }
    }

    private collectAllCards() : void{
        var stockCards = this.stockPile.removeCardsFromIndex(0);
        if(stockCards != null || stockCards.length != 0)
            Array.prototype.push.apply(this.cards, stockCards);
        //
        var wasteCards = this.watsePile.removeCardsFromIndex(0);
        if(wasteCards != null || wasteCards.length != 0)
            Array.prototype.push.apply(this.cards, wasteCards);
        //
        this.foundationPiles.forEach((foundation)=>{
            var foundationCards = foundation.removeCardsFromIndex(0);
            if(foundationCards != null || foundationCards.length != 0)
                Array.prototype.push.apply(this.cards, foundationCards);
        });
        //
        this.tableauPiles.forEach((tableau)=>{
            var tableauCards = tableau.removeCardsFromIndex(0);
            if(tableauCards != null || tableauCards.length != 0)
                Array.prototype.push.apply(this.cards, tableauCards);
        });
    }

    public StartGame(isNewGame : boolean) : void{

        this.undoCommand.length = 0;
        this.collectAllCards();
        //shuffle
        if(isNewGame){
            this.shuffleAlgorithm.Shuffle(this.cards);
            for(let i = 0; i < this.cards.length;i++){
                this.replayCards[i].updateData(this.cards[i]);
            }
        }
        // replay
        else{
            for(let i = 0; i < this.replayCards.length;i++){
                this.cards[i].updateData(this.replayCards[i]);
            }
        }
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
        gameCommandDatas.push(new OpenLastCardAllTableauCommand(lastCardPerPiles));

        if(this.processCommand != null)
            this.processCommand(gameCommandDatas);
    }

    private checkCardInFoundation(cardData : CardData,choosePile :  Pile,
                                     foundationIndex: number, cardIndex : number) : ResultCheckMove{
        let isLastCard = cardIndex == choosePile.Cards.length - 1;
        for(let i = 0 ; i < this.foundationPiles.length;i++){
            // avoid check in same foudation
            if(i == foundationIndex)
                continue;
                
            let foundationPile = this.foundationPiles[i];
            if(isLastCard){
                if(foundationPile.Cards.length == 0 ){
                    if(cardData.rank != CardData.RANK_A)
                        continue;
                    // add card A to empty foundation
                    let cardPops = choosePile.removeCardsFromIndex(cardIndex);
                    Array.prototype.push.apply(foundationPile.Cards, cardPops);
                    return new ResultCheckMove(i,cardPops);
                }
                else{
                    let lastCardInFoundation = foundationPile.getLastCard();
                    if(lastCardInFoundation.suit != cardData.suit)
                        continue;
                    if(cardData.rank - lastCardInFoundation.rank != 1)
                        continue;
                    // add card to foundation
                    let cardPops = choosePile.removeCardsFromIndex(cardIndex);
                    Array.prototype.push.apply(foundationPile.Cards, cardPops);
                    return new ResultCheckMove(i,cardPops);
                }
            }
        }
        return null;
    }

    private checkCardInTableau(cardData : CardData, choosePile: Pile,
                         tableauIndex : number, cardIndex : number) : ResultCheckMove{
        for(let i = 0 ; i < this.tableauPiles.length;i++){
            // avoid check in same tableau
            if(i == tableauIndex)
                continue;

            let tableauPile = this.tableauPiles[i];
            if(tableauPile.Cards.length == 0 ){
                if(cardData.rank != CardData.RANK_K)
                    continue;
                // add card K to empty foundation
                let cardPops = choosePile.removeCardsFromIndex(cardIndex);
                Array.prototype.push.apply(tableauPile.Cards, cardPops);
                return new ResultCheckMove(i,cardPops);
            }
            else{
                let lastCardInTabeau = tableauPile.getLastCard();
                if(lastCardInTabeau.isRed == cardData.isRed)
                    continue;
                if(lastCardInTabeau.rank - cardData.rank != 1)
                    continue;
                // add card to tableau
                let cardPops = choosePile.removeCardsFromIndex(cardIndex);
                Array.prototype.push.apply(tableauPile.Cards, cardPops);
                return new ResultCheckMove(i,cardPops);
            }
        }
        return null;
    }

    public CheckCardFromTableau(tableauIndex: number, cardIndex : number) : void{
        log("CheckCardFromTableau - tableauIndex: " + tableauIndex + " - cardIndex: " + cardIndex);
        let choosePile = this.tableauPiles[tableauIndex];
        let cardData = choosePile.getCardByIndex(cardIndex);
        
        if(cardData == null)
            return;
        
        // card is close
        let gameCommandDatas : GameCommandData[] = [];
        if(!cardData.isOpen){
            gameCommandDatas.push(new ShakeCardTaleauCommand(cardIndex,tableauIndex));
        }
        else{
            let resultCheckMove = this.checkCardInFoundation(cardData,choosePile,-1,cardIndex);

            if( resultCheckMove != null){
                gameCommandDatas.push(new MoveTableauToFoundationCommand(tableauIndex,
                                            resultCheckMove.endPileIndex,cardIndex,resultCheckMove.cardDatas)); 
                // open last card start tableau
                var lastCardInStartTableau = this.tableauPiles[tableauIndex].getLastCard();
                let isOpenLastCard = lastCardInStartTableau != null ? lastCardInStartTableau.isOpen : true;
                if(lastCardInStartTableau != null && !lastCardInStartTableau.isOpen){
                    lastCardInStartTableau.isOpen = true;
                    gameCommandDatas.push(new OpenLastCardTableauCommand(lastCardInStartTableau,tableauIndex));  
                }
                // check win
                if(this.isWinGame())
                    gameCommandDatas.push(new GameResultCommand(true));
                // Undo
                this.undoCommand.push(new UndoTableauToFoundationCommand(isOpenLastCard,resultCheckMove.endPileIndex,tableauIndex));
            }   
            else{
                resultCheckMove = this.checkCardInTableau(cardData,choosePile,tableauIndex,cardIndex);
                if( resultCheckMove != null){
                    gameCommandDatas.push(new MoveTableauToTableauCommand(tableauIndex,
                                            resultCheckMove.endPileIndex,cardIndex,resultCheckMove.cardDatas));
                    // open last card start tableau
                    var lastCardInStartTableau = this.tableauPiles[tableauIndex].getLastCard();
                    let isOpenLastCard = lastCardInStartTableau != null ? lastCardInStartTableau.isOpen : true;
                    if(lastCardInStartTableau != null && !lastCardInStartTableau.isOpen){
                        lastCardInStartTableau.isOpen = true;
                        gameCommandDatas.push(new OpenLastCardTableauCommand(lastCardInStartTableau,tableauIndex));
                    }
                    // Undo
                    let tableauEndCardAddIndex = this.tableauPiles[resultCheckMove.endPileIndex].Cards.length - resultCheckMove.cardDatas.length;
                    this.undoCommand.push(new UndoTableauToTableauCommand(isOpenLastCard,tableauIndex,
                                                                        resultCheckMove.endPileIndex,tableauEndCardAddIndex));
                }
                else
                    gameCommandDatas.push(new ShakeCardTaleauCommand(cardIndex,tableauIndex));
            }
        }

        if(this.processCommand != null)
                this.processCommand(gameCommandDatas);
    }

    public CheckCardFromFoundation(foundationIndex: number,cardIndex : number) : void{
        log("CheckCardFromFoundation - foundationIndex: " + foundationIndex + " - cardIndex: " + cardIndex);
        let choosePile = this.foundationPiles[foundationIndex];
        let cardData = choosePile.getCardByIndex(cardIndex);

        if(cardData == null)
            return;
        let gameCommandDatas : GameCommandData[] = [];
        let resultCheckMove = this.checkCardInTableau(cardData,choosePile,-1,cardIndex);
        if( resultCheckMove != null){
            gameCommandDatas.push(new MoveFoundationToTableauCommand(foundationIndex,
                                    resultCheckMove.endPileIndex,cardIndex,resultCheckMove.cardDatas));
            // Undo
            this.undoCommand.push(new UndoFoundationToTableauCommand(foundationIndex,resultCheckMove.endPileIndex));
        }
        else
            gameCommandDatas.push(new ShakeCardFoundationCommand(cardIndex,foundationIndex));

        if(this.processCommand != null)
            this.processCommand(gameCommandDatas);
    }

    public CheckCardFromWaste(cardIndex : number) : void{
        log("CheckCardFromWaste - cardIndex: " + cardIndex);

        let choosePile = this.watsePile;
        let cardData = choosePile.getCardByIndex(cardIndex);

        if(cardData == null)
            return;
        let gameCommandDatas : GameCommandData[] = [];

        let resultCheckMove = this.checkCardInFoundation(cardData,choosePile,-1,cardIndex);

        if( resultCheckMove != null){
            gameCommandDatas.push(new MoveWasteToFoundationCommand(
                                            resultCheckMove.endPileIndex,cardIndex,resultCheckMove.cardDatas));  
            if(this.isWinGame())
                gameCommandDatas.push(new GameResultCommand(true));
            // Undo
            this.undoCommand.push(new UndoWasteToFoundationCommand( resultCheckMove.endPileIndex));
        }   
        else{
            resultCheckMove = this.checkCardInTableau(cardData,choosePile,-1,cardIndex);
            if( resultCheckMove != null){
                gameCommandDatas.push(new MoveWasteToTableauCommand(
                                        resultCheckMove.endPileIndex,cardIndex,resultCheckMove.cardDatas));
                // Undo
                this.undoCommand.push(new UndoWasteToTableauCommand( resultCheckMove.endPileIndex));
            }
            else
                gameCommandDatas.push(new ShakeCardWasteCommand());
           
        }

        if(this.processCommand != null)
                this.processCommand(gameCommandDatas);
    }

    public CheckCardFromStock(cardIndex : number) : void{
        log("CheckCardFromStock - cardIndex: " + cardIndex);
        let gameCommandDatas : GameCommandData[] = [];
        // refill
        if(cardIndex == -1){
            if(this.watsePile.Cards.length == 0)
                return;
            while(this.watsePile.Cards.length > 0){
                var cardData = this.watsePile.Cards.pop();
                cardData.isOpen = false;
                this.stockPile.Cards.push(cardData);
            }
            gameCommandDatas.push(new RefillStockCommand(this.stockPile.Cards.length));
             // undo
             this.undoCommand.push(new UndoRefillStockCommand());
        }
        else{
            let lastCardStock = this.stockPile.Cards.pop();
            lastCardStock.isOpen = true;
            this.watsePile.Cards.push(lastCardStock);
            
            gameCommandDatas.push(new StockToWasteCommand(lastCardStock));
            // undo
            this.undoCommand.push(new UndoStockToWasteCommand());
        }

        if(this.processCommand != null)
            this.processCommand(gameCommandDatas);
    }

    public undo() : void{
        if(this.undoCommand.length == 0)
            return;
        let gameCommandDatas : GameCommandData[] = [];
        //
        var gameCommand = this.undoCommand.pop();
        switch(gameCommand.Command){
            case Command.UNDO_STOCK_TO_WASTE:
                {
                    var lastCardWaste = this.watsePile.Cards.pop();
                    lastCardWaste.isOpen = false;
                    this.stockPile.Cards.push(lastCardWaste);
                    //
                    gameCommandDatas.push(gameCommand);
                }
                break;
            case Command.UNDO_REFILL_STOCK:
                {
                    while(this.stockPile.Cards.length != 0){
                        var cardData = this.stockPile.Cards.pop();
                        cardData.isOpen = true;
                        this.watsePile.Cards.push(cardData);
                    }
                    //
                    let undoRefilStock = <UndoRefillStockCommand>gameCommand;
                    undoRefilStock.updateData(this.watsePile.Cards);
                    //
                    gameCommandDatas.push(undoRefilStock);
                }
                break;
                case Command.UNDO_TABLEAU_TO_FOUNDATION:
                    {
                        let undoTableauToFoundation = <UndoTableauToFoundationCommand>gameCommand;
                        let cardData = this.foundationPiles[undoTableauToFoundation.FoundationIndex].removeLastCard();
                        //
                        let tableauPile = this.tableauPiles[undoTableauToFoundation.TableauIndex];
                        let lastCardPile = tableauPile.getLastCard();
                        let lastCardTableauIndex = tableauPile.Cards.length;
                        if(lastCardPile != null)
                            lastCardPile.isOpen = undoTableauToFoundation.IsOpenLastCard;  
                        tableauPile.addCard(cardData[0]);
                        //
                        undoTableauToFoundation.updateData(cardData[0],lastCardTableauIndex);
                        //
                        gameCommandDatas.push(undoTableauToFoundation);
                    }
                    break;
                case Command.UNDO_FOUNDATION_TO_TABLEAU:
                    {
                        let undoFoundationToTableau = <UndoFoundationToTableauCommand>gameCommand;
                        let cardData = this.tableauPiles[undoFoundationToTableau.TableauIndex].removeLastCard();
                        this.foundationPiles[undoFoundationToTableau.FoundationIndex].addCard(cardData[0]);
                        undoFoundationToTableau.updateData(cardData[0]);
                        //
                        gameCommandDatas.push(undoFoundationToTableau);
                    }
                    break;
                case Command.UNDO_WASTE_TO_TABLEAU:
                    {
                        let undoWasteToTabeau = <UndoWasteToTableauCommand>gameCommand;
                        let cardData = this.tableauPiles[undoWasteToTabeau.TableauIndex].removeLastCard();
                        this.watsePile.addCard(cardData[0]);
                        undoWasteToTabeau.updateData(cardData[0]);
                        //
                        gameCommandDatas.push(undoWasteToTabeau);
                    }
                    break;
                case Command.UNDO_WASTE_TO_FOUNDATION:
                    {
                        let undoWasteToFoundation = <UndoWasteToFoundationCommand>gameCommand;
                        let cardData = this.foundationPiles[undoWasteToFoundation.FoundationIndex].removeLastCard();
                        this.watsePile.addCard(cardData[0]);
                        undoWasteToFoundation.updateData(cardData[0]);
                        //
                        gameCommandDatas.push(undoWasteToFoundation);
                    }
                    break;
                case Command.UNDO_TABLEAU_TO_TABLEAU:
                    {
                        let undoTableauToTableauCommand = <UndoTableauToTableauCommand>gameCommand;
                        let cardData = this.tableauPiles[undoTableauToTableauCommand.TableauEndIndex].removeCardsFromIndex(undoTableauToTableauCommand.TableauEndCardAddIndex);
                        //
                        let tableauStartPile = this.tableauPiles[undoTableauToTableauCommand.TableauStartIndex];
                        let lastCardStartPile = tableauStartPile.getLastCard();
                        let lastCardTableauIndex = tableauStartPile.Cards.length;
                        if(lastCardStartPile != null)
                        lastCardStartPile.isOpen = undoTableauToTableauCommand.IsOpenLastCard;  
                        tableauStartPile.addCards(cardData);
                        //
                        undoTableauToTableauCommand.updateData(cardData,lastCardTableauIndex);
                        //
                        gameCommandDatas.push(undoTableauToTableauCommand);
                    }
                    break;
        }

        if(this.processCommand != null)
        this.processCommand(gameCommandDatas);
    }

    private isWinGame() : boolean{
        for(let i = 0; i < this.foundationPiles.length;i++){
            var foundation = this.foundationPiles[i];
            if(foundation.Cards.length != 13)
                return false;
        }
        return true;
    }

 }


import { _decorator, Component, Node, log, Prefab, instantiate } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { Utils } from '../Utils/Utils';
import { CardView } from './Card/CardView';
import { Command, DealCardsCommand, GameCommandData, GameResultCommand, MoveFoundationToTableauCommand, MoveTableauToFoundationCommand, MoveTableauToTableauCommand, MoveWasteToFoundationCommand, MoveWasteToTableauCommand, OpenLastCardAllTableauCommand, OpenLastCardTableauCommand, RefillStockCommand, ShakeCardFoundationCommand, ShakeCardTaleauCommand, ShakeCardWasteCommand, ShuffleCommand, StockToWasteCommand } from './GameCommand/GameCommand';
import { StockPile } from './GameLogic/Pile/StockPile';
import { SimpleShuffle } from './GameLogic/Shuffle/SimpleShuffle';
import { SureWinTemplateShuffle } from './GameLogic/Shuffle/SureWinTemplateShuffle';
import { SolitaireLogic } from './GameLogic/SolitaireLogic';
import { FoundationPileView } from './PileView/FoundationPileView';
import { PileView } from './PileView/PileView';
import { StockPileView } from './PileView/StockPileView';
import { TableauPileView } from './PileView/TableauPileView';
import { WastePileView } from './PileView/WastePileView';
const { ccclass, property } = _decorator;
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
    @property(Node)
    private blockTouchLayer : Node = null;

    @property(Prefab)
    private cardPrefab : Prefab = null;

    @property(Node)
    private topLayer : Node = null;

    @property(StockPileView)
    private stockView : StockPileView = null;

    @property(WastePileView)
    private wasteView : WastePileView = null;

    @property(FoundationPileView)
    private foundationViews : FoundationPileView[] = [];

    @property(TableauPileView)
    private tableauPileViews : TableauPileView[] = [];

    private cardViews : CardView[] = null;

    private solitaireLogic : SolitaireLogic = null;
    start () {
        this.solitaireLogic = new SolitaireLogic(new SureWinTemplateShuffle());
        this.solitaireLogic.processCommand = this.processCommand.bind(this);
        this.createAllCards();
        this.initPile();
        this.solitaireLogic.StartGame();
    }

    private initPile() : void{
        this.stockView.touchEndCallback = this.onStockTouchEnd.bind(this);
        //
        this.wasteView.touchEndCallback = this.onCheckPileTouchEnd.bind(this);
        //
        for(let i = 0; i < this.foundationViews.length;i++){
            let foundationView = this.foundationViews[i];
            foundationView.touchEndCallback = this.onCheckPileTouchEnd.bind(this);
            foundationView.init(i);
        }
        //
        for(let i = 0; i < this.tableauPileViews.length;i++){
            let tableauView = this.tableauPileViews[i];
            tableauView.touchEndCallback = this.onCheckPileTouchEnd.bind(this);
            tableauView.init(i);
        }
    }

    public Click(): void{
        this.solitaireLogic.StartGame();
    }    

    private async processCommand(gameCommandDatas : GameCommandData[]){
        this.blockTouchLayer.active = true;
        for(let i = 0; i < gameCommandDatas.length;i++){
            let gameCommandData  = gameCommandDatas[i];
            switch(gameCommandData.Command){
                case Command.SHUFFLE:
                    {
                        await this.processShuffle(<ShuffleCommand> gameCommandData);
                    }
                    break;
                case Command.DEAL_CARDS:
                    {
                        await this.processDealCards(<DealCardsCommand> gameCommandData);
                    }
                    break;
                case Command.OPEN_LAST_CARD_ALL_TABLEAU:
                    {
                        await this.processOpenLastCardAllTableau(<OpenLastCardAllTableauCommand> gameCommandData);
                    }
                    break;
                case Command.STOCK_TO_WATSE:
                    {
                        await this.processStockToWaste(<StockToWasteCommand> gameCommandData);
                    }
                    break;
                case Command.REFILL_STOCK:
                    {
                        await this.processRefillStock(<RefillStockCommand> gameCommandData);
                    }
                    break;
                case Command.SHAKE_CARD_TABLEAU:
                    {
                        await this.processShakeCardTableau(<ShakeCardTaleauCommand> gameCommandData);
                    }
                    break;
                case Command.SHAKE_CARD_FOUNDATION:
                    {
                        await this.processShakeCardFoundation(<ShakeCardFoundationCommand> gameCommandData);
                    }
                    break;
                case Command.SHAKE_CARD_WASTE:
                    {
                        await this.processShakeCardWaste(<ShakeCardWasteCommand> gameCommandData);
                    }
                    break;
                case Command.MOVE_TABLEAU_TO_TABLEAU:
                    {
                        await this.processMoveTableauToTableau(<MoveTableauToTableauCommand> gameCommandData);
                    }
                    break;
                case Command.MOVE_FOUNDATION_TO_TABLEAU:
                    {
                        await this.processMoveFoundationToTableau(<MoveFoundationToTableauCommand> gameCommandData);
                    }
                    break;
                case Command.MOVE_TABLEAU_TO_FOUNDATION:
                    {
                        await this.processMoveTableauToFoundation(<MoveTableauToFoundationCommand> gameCommandData);
                    }
                    break;
                case Command.MOVE_WASTE_TO_FOUNDATION:
                    {
                        await this.processMoveWasteToFoundation(<MoveWasteToFoundationCommand> gameCommandData);
                    }
                    break;
                case Command.MOVE_WASTE_TO_TABLEAU:
                    {
                        await this.processMoveWasteToTableau(<MoveWasteToTableauCommand> gameCommandData);
                    }
                    break;
                case Command.OPEN_LAST_CARD_TABLEAU:
                    {
                        await this.processOpenLastCardTableau(<OpenLastCardTableauCommand> gameCommandData);
                    }
                    break;
                case Command.GAME_RESULT:
                    {
                        await this.processGameResult(<GameResultCommand> gameCommandData);
                    }
                    break;
            }
        }
        this.blockTouchLayer.active = false;
    }

    private createAllCards() : void{
        this.cardViews = [];
        for(let i = 0; i < 52;i++){
            let cardView = instantiate(this.cardPrefab).getComponent(CardView);
            cardView.node.setParent(this.topLayer);
            cardView.node.setWorldPosition(this.stockView.node.worldPosition);
            this.cardViews.push(cardView);
        }
    }
    

    private async processShuffle(shuffleCommand : ShuffleCommand){
        log("processShuffle");
        await Utils.sleep(500);
    }

    private async processDealCards(dealCardsCommand : DealCardsCommand){
        log("processDealCards");
        let tableauPile = dealCardsCommand.TableauPiles;
        let index = 0;
        for( let i = 0; i < tableauPile.length;i++){
            let tempCardViews : CardView[] = [];
            for(let j = 0; j < tableauPile[i].Cards.length;j++){
                let cardData = tableauPile[i].Cards[j];
                let tempCardView = this.cardViews[index++];
                tempCardView.UpdateData(cardData,false);
                tempCardViews.push(tempCardView);
            }
            this.tableauPileViews[i].addCards(tempCardViews);
        }

        let remainCardViews = this.cardViews.slice(index,this.cardViews.length);
        this.stockView.addCards(remainCardViews);
        await Utils.sleep(500);
    }

    private async processOpenLastCardAllTableau( openLastCardAllTableauCommand : OpenLastCardAllTableauCommand){
        log("processOpenLastCardAllTableau");
        let lastCardPerPiles = openLastCardAllTableauCommand.LastCardPerPiles;
        for(let i = 0; i < lastCardPerPiles.length;i++){
            let cardData = lastCardPerPiles[i];
            let lastCardView = this.tableauPileViews[i].getLastCard();
            if(lastCardView == null)
                continue;
            lastCardView.UpdateData(cardData,cardData.isOpen);
            lastCardView.flipOpen();
        }
    }

    private async processStockToWaste( stockToWasteCommand : StockToWasteCommand){
        let cardView = this.stockView.removeLastCard();
        if(cardView == null)
            return;
        let cardData = stockToWasteCommand.CardData;
        this.changeCardToTopLayer(cardView);
        cardView.UpdateData(cardData,false);
        cardView.flipOpen(()=>{
            let destinationWorldPos = this.wasteView.getCardWorldPosByIndex(0);
            cardView.move(destinationWorldPos,()=>{
                this.wasteView.addCard(cardView);
            });
        });
        await Utils.sleep(350);
    }

    private async processRefillStock( refillStockCommand : RefillStockCommand){
        let numberCard = refillStockCommand.NumberCard;
        let destinationWorldPos = this.stockView.getCardWorldPosByIndex(0);
        while(numberCard-- > 0){
            let tempCardView = this.wasteView.removeLastCard();
            tempCardView.flipClose(()=>{
                tempCardView.move(destinationWorldPos,()=>{
                    this.stockView.addCard(tempCardView);
                });
            });
        }
        await Utils.sleep(350);
    }

    private async processShakeCardTableau( shakeCardTableauCommand : ShakeCardTaleauCommand){
        let tableauIndex = shakeCardTableauCommand.TableauIndex;
        let cardIndex = shakeCardTableauCommand.CardIndex;
        var cardView = this.tableauPileViews[tableauIndex].getCardByIndex(cardIndex);
        if(cardView == null)
            return;
        cardView.shake();
        await Utils.sleep(100);
    }

    private async processShakeCardFoundation( shakeCardFoundationCommand : ShakeCardFoundationCommand){
        let tableauIndex = shakeCardFoundationCommand.FoundationIndex;
        let cardIndex = shakeCardFoundationCommand.CardIndex;
        var cardView = this.foundationViews[tableauIndex].getCardByIndex(cardIndex);
        if(cardView == null)
            return;
        cardView.shake();
        await Utils.sleep(100);
    }

    private async processShakeCardWaste( shakeCardWasteCommand : ShakeCardWasteCommand){
        var cardView = this.wasteView.getLastCard();
        if(cardView == null)
            return;
        cardView.shake();
        await Utils.sleep(100);
    }

    private moveCardToPile(cardDatas : CardData[], cardViewPops : CardView[], endPile: PileView) : void{
        let numberCardEndPile = endPile.NumberCard;
        for(let i = 0; i < cardViewPops.length;i++){
            cardViewPops[i].UpdateData(cardDatas[i],cardDatas[i].isOpen);
            this.changeCardToTopLayer(cardViewPops[i]);
            let destinationWorldPos = endPile.getCardWorldPosByIndex(numberCardEndPile + i);
            cardViewPops[i].move(destinationWorldPos,()=>{
                endPile.addCard(cardViewPops[i]);
            });
        }
    }

    private async processMoveTableauToTableau( moveTableauToTableauCommand : MoveTableauToTableauCommand){
        let startIndex = moveTableauToTableauCommand.StartIndex;
        let endIndex = moveTableauToTableauCommand.EndIndex;
        let cardIndex = moveTableauToTableauCommand.CardIndex;
        let cardDatas = moveTableauToTableauCommand.CardDatas;
        //
        let cardViewPops = this.tableauPileViews[startIndex].removeCardsFromIndex(cardIndex);
        let endPile = this.tableauPileViews[endIndex];
        this.moveCardToPile(cardDatas,cardViewPops,endPile);
        this.tableauPileViews[startIndex].resize();
        await Utils.sleep(350);
    }

    private async processMoveTableauToFoundation( moveTableauToTableauCommand : MoveTableauToFoundationCommand){
        let startIndex = moveTableauToTableauCommand.StartIndex;
        let endIndex = moveTableauToTableauCommand.EndIndex;
        let cardIndex = moveTableauToTableauCommand.CardIndex;
        let cardDatas = moveTableauToTableauCommand.CardDatas;
        //
        let cardViewPops = this.tableauPileViews[startIndex].removeCardsFromIndex(cardIndex);
        let endPile = this.foundationViews[endIndex];
        this.moveCardToPile(cardDatas,cardViewPops,endPile);
        this.tableauPileViews[startIndex].resize();
        await Utils.sleep(350);

    }
    
    private async processMoveFoundationToTableau( moveFoundationToTableauCommand : MoveFoundationToTableauCommand){
        let startIndex = moveFoundationToTableauCommand.StartIndex;
        let endIndex = moveFoundationToTableauCommand.EndIndex;
        let cardIndex = moveFoundationToTableauCommand.CardIndex;
        let cardDatas = moveFoundationToTableauCommand.CardDatas;
        //
        let cardViewPops = this.foundationViews[startIndex].removeCardsFromIndex(cardIndex);
        let endPile = this.tableauPileViews[endIndex];
        this.moveCardToPile(cardDatas,cardViewPops,endPile);
        await Utils.sleep(350);
    }

    private async processMoveWasteToTableau( moveWasteToTableauCommand : MoveWasteToTableauCommand){
        let endIndex = moveWasteToTableauCommand.EndIndex;
        let cardIndex = moveWasteToTableauCommand.CardIndex;
        let cardDatas = moveWasteToTableauCommand.CardDatas;
        //
        let cardViewPops = this.wasteView.removeCardsFromIndex(cardIndex);
        let endPile = this.tableauPileViews[endIndex];
        this.moveCardToPile(cardDatas,cardViewPops,endPile);
        await Utils.sleep(350);
    }

    private async processMoveWasteToFoundation( moveWasteToFoundationCommand : MoveWasteToFoundationCommand){
        let endIndex = moveWasteToFoundationCommand.EndIndex;
        let cardIndex = moveWasteToFoundationCommand.CardIndex;
        let cardDatas = moveWasteToFoundationCommand.CardDatas;
        //
        let cardViewPops = this.wasteView.removeCardsFromIndex(cardIndex);
        let endPile = this.foundationViews[endIndex];
        this.moveCardToPile(cardDatas,cardViewPops,endPile);
        await Utils.sleep(350);
    }

    private async processOpenLastCardTableau( openLastCardTableauCommand : OpenLastCardTableauCommand){
        let cardData = openLastCardTableauCommand.CardData;
        let index = openLastCardTableauCommand.Index;

        let lastCardView = this.tableauPileViews[index].getLastCard();
        lastCardView.UpdateData(cardData,false);
        lastCardView.flipOpen();
        await Utils.sleep(320);
    }

    private async processGameResult( gameResultCommand : GameResultCommand){
        log("processGameResult - isWin: " + gameResultCommand.IsWin);

    }

    private changeCardToTopLayer(cardView : CardView){
        let worldPos = cardView.node.worldPosition;
        cardView.node.setParent(this.topLayer);
        cardView.node.worldPosition = worldPos;
    }

    private onStockTouchEnd(pile: PileView, cardIndex : number) : void{
        this.solitaireLogic.CheckCardFromStock(cardIndex);
    }

    private onCheckPileTouchEnd(pile: PileView,cardIndex : number) : void{
        if(cardIndex == -1)
            return;
        if(pile instanceof TableauPileView){
            this.solitaireLogic.CheckCardFromTableau(pile.Index, cardIndex);
        }
        else if(pile instanceof FoundationPileView){
            this.solitaireLogic.CheckCardFromFoundation(pile.Index, cardIndex);
        }
        else if(pile instanceof WastePileView){
            this.solitaireLogic.CheckCardFromWaste(cardIndex);
        }
    }
}

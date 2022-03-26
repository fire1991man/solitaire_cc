
import { _decorator, Component, Node, log, Prefab, instantiate } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { Utils } from '../Utils/Utils';
import { CardView } from './Card/CardView';
import { Command, DealCardsCommand, GameCommandData, OpenLastCardPileCommand, RefillStockCommand, ShuffleCommand, StockToWasteCommand } from './GameCommand/GameCommand';
import { StockPile } from './GameLogic/Pile/StockPile';
import { SimpleShuffle } from './GameLogic/Shuffle/SimpleShuffle';
import { SolitaireLogic } from './GameLogic/SolitaireLogic';
import { FoundationPileView } from './PileView/FoundationPileView';
import { PileView } from './PileView/PileView';
import { StockPileView } from './PileView/StockPileView';
import { TableauPileView } from './PileView/TableauPileView';
import { WastePileView } from './PileView/WastePileView';
const { ccclass, property } = _decorator;
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
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
        this.solitaireLogic = new SolitaireLogic(new SimpleShuffle());
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
                case Command.OPEN_LAST_CARD_PILE:
                    {
                        await this.processOpenLastCardPile(<OpenLastCardPileCommand> gameCommandData);
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
            }
        }
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

    private async processOpenLastCardPile( openLastCardPileCommand : OpenLastCardPileCommand){
        log("processOpenLastCardPile");
        let lastCardPerPiles = openLastCardPileCommand.LastCardPerPiles;
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

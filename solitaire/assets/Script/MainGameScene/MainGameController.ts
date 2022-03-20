
import { _decorator, Component, Node, log } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { Utils } from '../Utils/Utils';
import { CardView } from './Card/CardView';
import { Command, DealCardsCommand, GameCommandData, OpenLastCardPileCommand, ShuffleCommand } from './GameCommand/GameCommand';
import { SimpleShuffle } from './GameLogic/Shuffle/SimpleShuffle';
import { SolitaireLogic } from './GameLogic/SolitaireLogic';
const { ccclass, property } = _decorator;
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
    @property(CardView)
    card : CardView = null;

    private solitaireLogic : SolitaireLogic = null;
    start () {
        this.solitaireLogic = new SolitaireLogic(new SimpleShuffle());
        this.solitaireLogic.processCommand = this.processCommand.bind(this);
    }

    public Click(): void{
        this.solitaireLogic.StartGame();
    }    

    private processCommand(gameCommandDatas : GameCommandData[]) : void{
        for(let i = 0; i < gameCommandDatas.length;i++){
            let gameCommandData  = gameCommandDatas[i];
            switch(gameCommandData.Command){
                case Command.SHUFFLE:
                    {
                        this.processShuffle(<ShuffleCommand> gameCommandData);
                    }
                    break;
                case Command.DEAL_CARDS:
                    {
                        this.processDealCards(<DealCardsCommand> gameCommandData);
                    }
                    break;
                case Command.OPEN_LAST_CARD_PILE:
                    {
                        this.processOpenLastCardPile(<OpenLastCardPileCommand> gameCommandData);
                    }
                    break;
            }
        }
    }

   

    private processShuffle(shuffleCommand : ShuffleCommand) : void{
        log("processShuffle");
    }

    private processDealCards(dealCardsCommand : DealCardsCommand) : void{
        log("processDealCards");
    }

    private processOpenLastCardPile( oenLastCardPileCommand : OpenLastCardPileCommand) : void{
        log("processOpenLastCardPile");
    }
}

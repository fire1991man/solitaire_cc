
import { _decorator, Component, Node, log } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { Utils } from '../Utils/Utils';
import { CardView } from './Card/CardView';
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
    }

    public Click(): void{
        this.solitaireLogic.StartGame();
    }    
}


import { _decorator, Component, Node } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { CardView } from './Card/CardView';
const { ccclass, property } = _decorator;
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
    @property(CardView)
    card : CardView = null;

    cardData : CardData;
    start () {
        
        this.card.UpdateData(new CardData(1,Suit.Heart));
    }

    public Click(): void{
        this.card.flip();
    }
}

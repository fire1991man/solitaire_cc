
import { _decorator, Component, Node, Vec2 } from 'cc';
import { CardView } from '../Card/CardView';
const { ccclass, property } = _decorator;
 
@ccclass('PileView')
export abstract class PileView extends Component {

    protected readonly _CARD_SIZE : Vec2 = new Vec2(95,151);

    protected cards : CardView[] = null;

    public addCards(cards : CardView[]) : void{

    }

    public updateSize(numberCards : number) : void {

    }
//    public getCardPosByIndex(index : number) : Vec2{

//    }
}

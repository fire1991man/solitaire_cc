
import { _decorator, Component, Node, Vec2, UITransform, Vec3 } from 'cc';
import { CardView } from '../Card/CardView';
const { ccclass, property } = _decorator;
 
@ccclass('PileView')
export abstract class PileView extends Component {

    protected readonly CARD_SIZE : Vec2 = new Vec2(95,151);

    protected cards : CardView[] = null;
    protected height : number = 0;

    start(){
        this.cards = [];
    }

    public addCards(cards : CardView[]) : void{
        this.updateSize(cards.length);
        for(let i = 0; i < cards.length;i++){
            cards[i].node.setParent(this.node);
            cards[i].node.setPosition(this.getCardPosByIndex(i));
            this.cards.push(cards[i]);
        }
    }

    protected updateSize(numberCards : number) : void {
        this.height = this.getComponent(UITransform).contentSize.y;
    }

    public getCardPosByIndex(index : number) : Vec3{
        return new Vec3(0,0);
    }

    public getCardByIndex(index : number) : CardView{
        if(index < 0 || index >= this.cards.length)
            return null;
        return this.cards[index];
    }

    public getLastCard() : CardView{
        return this.getCardByIndex(this.cards.length-1);
    }
}

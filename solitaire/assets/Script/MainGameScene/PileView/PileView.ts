
import { _decorator, Component, Node, Vec2, UITransform, Vec3, SystemEvent, EventTouch } from 'cc';
import { CardView } from '../Card/CardView';
const { ccclass, property } = _decorator;
 
@ccclass('PileView')
export abstract class PileView extends Component {

    private index : number;
    
    public get Index() : number {
        return this.index;
    }
    
    public touchEndCallback : (pile : PileView ,index : number) => void = null;
    protected readonly CARD_SIZE : Vec2 = new Vec2(95,151);

    protected cards : CardView[] = null;
    protected height : number = 0;

    public get NumberCard() {
        return this.cards.length;
    }

    start(){
        this.cards = [];
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this,true);
    }

    public init(index: number) : void{
        this.index = index;
    }

    public resize() : void{
        this.updateSize(this.cards.length);
        this.reArrangeCardPosition();
    }

    public addCards(cards : CardView[]) : void{
        this.updateSize(cards.length);
        
        for(let i = 0; i < cards.length;i++){
            cards[i].node.setParent(this.node);
            cards[i].node.setPosition(this.getCardPosByIndex(i));
            this.cards.push(cards[i]);
        }
    }

    public addCard(card : CardView) : void{
        let newPos = this.getCardPosByIndex(this.cards.length);
        this.updateSize(this.cards.length + 1); 
        card.node.setParent(this.node);
        card.node.setPosition(newPos);
        this.cards.push(card);
        this.reArrangeCardPosition();
    }

    protected reArrangeCardPosition():void{
        
    }

    protected updateSize(numberCards : number) : void {
        this.height = this.getComponent(UITransform).contentSize.y;
    }

    protected getCardPosByIndex(index : number) : Vec3{
        return new Vec3(0,0);
    }

    public getCardWorldPosByIndex(index : number) : Vec3{
        const nodeAUITrans = this.node.getComponent(UITransform)!;
        let worldPos = new Vec3();
        nodeAUITrans.convertToWorldSpaceAR(this.getCardPosByIndex(index),worldPos);
        return worldPos;
    }

    public getCardByIndex(index : number) : CardView{
        if(index < 0 || index >= this.cards.length)
            return null;
        return this.cards[index];
    }

    public getLastCard() : CardView{
        return this.getCardByIndex(this.cards.length-1);
    }

    public removeLastCard() : CardView{
        if(this.cards.length == 0)
            return null;
        return this.cards.pop();
    }

    public removeCardsFromIndex(index : number) : CardView[]{
        return this.cards.splice(index,this.cards.length-index);
    }

    protected onTouchEnd(touch: EventTouch) : void{
        if(this.touchEndCallback != null){
            let cardIndex = this.cards.length > 0 ? this.cards.length-1 : -1;
            this.touchEndCallback(this,cardIndex);
        }
    }
}

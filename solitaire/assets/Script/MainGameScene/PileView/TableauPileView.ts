
import { _decorator, Component, Node, UITransform, Vec2, math, Vec3, EventTouch } from 'cc';
import { PileView } from './PileView';
const { ccclass, property } = _decorator;
 
@ccclass('TableauPileView')
export class TableauPileView extends PileView {
    private readonly CARD_SPACE_Y : number = 75;
    

    public updateSize(numberCards: number): void {
        let height = this.CARD_SIZE.y + (numberCards - 1) * this.CARD_SPACE_Y;
        height = height < this.CARD_SIZE.y ? this.CARD_SIZE.y : height;
        this.getComponent(UITransform).setContentSize( new math.Size(this.CARD_SIZE.x,height));
        super.updateSize(numberCards);
    }

    public getCardPosByIndex(index: number) : Vec3{
        return new Vec3(0,this.height/2 - this.CARD_SIZE.y/2 - index*this.CARD_SPACE_Y);
    }

    protected reArrangeCardPosition() : void{
        for(let i = 0; i < this.cards.length;i++){
            this.cards[i].node.setPosition(this.getCardPosByIndex(i));
        }
    }
   
    protected onTouchEnd(touch: EventTouch) : void{
        
        let touchLocUI = touch.getUILocation();
        const uiSpaceWorldPos = new Vec3(touchLocUI.x, touchLocUI.y, 0);
        const nodeAUITrans = this.node.getComponent(UITransform)!;
        let localPos : Vec3 = new Vec3();
        nodeAUITrans.convertToNodeSpaceAR(uiSpaceWorldPos, localPos);
        //
        let cardIndex = 0;
        if( localPos.y <= (-this.height/2 + this.CARD_SIZE.y))
            cardIndex = this.cards.length -1;
        else{
            cardIndex = ( this.height/2 - localPos.y)/this.CARD_SPACE_Y;
            cardIndex = Math.floor(cardIndex);
        }
    
        if(this.touchEndCallback != null){
            cardIndex = this.cards.length > 0 ? cardIndex : -1;
            this.touchEndCallback(this,cardIndex);
        }
    }
}

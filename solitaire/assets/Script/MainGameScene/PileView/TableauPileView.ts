
import { _decorator, Component, Node, UITransform, Vec2, math, Vec3 } from 'cc';
import { PileView } from './PileView';
const { ccclass, property } = _decorator;
 
@ccclass('TableauPileView')
export class TableauPileView extends PileView {
    private readonly CARD_SPACE_Y : number = 75;
    

    public updateSize(numberCards: number): void {
        let height = this.CARD_SIZE.y + (numberCards - 1) * this.CARD_SPACE_Y;
        this.getComponent(UITransform).setContentSize( new math.Size(this.CARD_SIZE.x,height));
        super.updateSize(numberCards);
    }

    public getCardPosByIndex(index: number) : Vec3{
        return new Vec3(0,this.height/2 - this.CARD_SIZE.y - (index -1)*this.CARD_SPACE_Y);
    }
   
}

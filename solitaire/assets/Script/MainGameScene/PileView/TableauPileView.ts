
import { _decorator, Component, Node, UITransform, Vec2, math } from 'cc';
import { PileView } from './PileView';
const { ccclass, property } = _decorator;
 
@ccclass('TableauPileView')
export class TableauPileView extends PileView {
    private readonly _CARD_SPACE_Y : number
    

    public updateSize(numberCards: number): void {
        let height = this._CARD_SIZE.y + (numberCards - 1) * this._CARD_SPACE_Y;
        this.getComponent(UITransform).setContentSize( new math.Size(this._CARD_SIZE.x,height));
    }
   
}

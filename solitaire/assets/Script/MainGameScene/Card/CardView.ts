
import { _decorator, Component, Node, Label, Sprite, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('CardView')
export class CardView extends Component {
    @property(Label)
    private rankTxt: Label = null;

    @property(Sprite)
    private smallSuit : Sprite = null;

    @property(Sprite)
    private bigSuit : Sprite = null;

    @property(Node)
    private cardBack : Node = null;

    start () {
        
    }

    public flip() : void{
        const curPos = this.node.position;
        tween(this.node)
        .call(()=>this.cardBack.active = true)
        .delay(0.5)
        .to(0.05, {scale: v3(1.5,1.15,1), position: v3(curPos.x,curPos.y+45,curPos.z)})
        .delay(0.02)
        .to(0.12, {eulerAngles: v3(0,90,0)})
        .call(()=>this.cardBack.active = false)
        .to(0.2, {scale: v3(1,1,1),eulerAngles: v3(0,0,0), position: v3(curPos.x,curPos.y,curPos.z)})

        .start();
    }
}



import { _decorator, Component, Node, Label, Sprite, tween, v3, Color, Texture2D, SpriteFrame, Vec3 } from 'cc';
import { CardData, Suit } from '../../Data/CardData';
const { ccclass, property } = _decorator;
 
@ccclass('CardView')
export class CardView extends Component {

    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private heartSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private diamondSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private clubSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private spadeSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private blackJSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private redJSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private blackQSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private redQSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private blackKSpr : SpriteFrame = null;
    @property({ group: { name: 'SpriteFrame' }, type: SpriteFrame }) 
    private redKSpr : SpriteFrame = null;


    @property(Label)
    private rankTxt: Label = null;

    @property(Sprite)
    private smallSuit : Sprite = null;

    @property(Sprite)
    private bigSuit : Sprite = null;

    @property(Node)
    private cardBack : Node = null;

    public Close() : void{
        this.cardBack.active = true;
    }

    public UpdateData(cardData: CardData, isOpen : boolean) : void{
        this.cardBack.active = !isOpen;
        switch(cardData.rank){
            case 11:
                {
                    this.rankTxt.string = "J";
                    this.bigSuit.spriteFrame = cardData.isRed ? this.redJSpr : this.blackJSpr;
                    this.bigSuit.node.scale = new Vec3(0.75,0.75);
                }
                break;
            case 12:
                {
                    this.rankTxt.string = "Q";
                    this.bigSuit.spriteFrame = cardData.isRed ? this.redQSpr : this.blackQSpr;
                    this.bigSuit.node.scale = new Vec3(0.75,0.75);
                }
                break;
            case 13:
                {
                    this.rankTxt.string = "K";
                    this.bigSuit.spriteFrame = cardData.isRed ? this.redKSpr : this.blackKSpr;
                    this.bigSuit.node.scale = new Vec3(0.75,0.75);
                }
                break;
            default:
                {
                    this.bigSuit.node.scale = new Vec3(0.55,0.55);
                    this.rankTxt.string = cardData.rank == CardData.RANK_A ? "A" : cardData.rank.toString();
                    switch(cardData.suit){
                        case Suit.Heart:
                            this.bigSuit.spriteFrame = this.heartSpr;
                            break;
                        case Suit.Club:
                            this.bigSuit.spriteFrame = this.clubSpr;
                            break;
                        case Suit.Diamond:
                            this.bigSuit.spriteFrame = this.diamondSpr;
                            break;
                        case Suit.Spade:
                            this.bigSuit.spriteFrame = this.spadeSpr;
                            break;
                        }
                }
                break;
            }

        switch(cardData.suit){
            case Suit.Heart:
                this.smallSuit.spriteFrame = this.heartSpr;
                break;
            case Suit.Club:
                this.smallSuit.spriteFrame = this.clubSpr;
                break;
            case Suit.Diamond:
                this.smallSuit.spriteFrame = this.diamondSpr;
                break;
            case Suit.Spade:
                this.smallSuit.spriteFrame = this.spadeSpr;
                break;
            }
        this.rankTxt.color = cardData.isRed? Color.RED : Color.BLACK;
    }

    public flipOpen(callback : Function = null) : void{
        const curPos = this.node.position;
        tween(this.node)
        .call(()=>this.cardBack.active = true)
        .to(0.05, {scale: v3(1.5,1.15,1), position: v3(curPos.x,curPos.y+45,curPos.z)})
        .delay(0.02)
        .to(0.12, {eulerAngles: v3(0,90,0)})
        .call(()=>this.cardBack.active = false)
        .to(0.2, {scale: v3(1,1,1),eulerAngles: v3(0,0,0), position: v3(curPos.x,curPos.y,curPos.z)})
        .call(()=>{
            if(callback != null)
                callback();
        })
        .start();
    }

    public flipClose(callback : Function = null) : void{
        const curPos = this.node.position;
        tween(this.node)
        .to(0.05, {scale: v3(1.5,1.15,1), position: v3(curPos.x,curPos.y+45,curPos.z)})
        .delay(0.02)
        .to(0.12, {eulerAngles: v3(0,-90,0)})
        .call(()=>this.cardBack.active = true)
        .to(0.2, {scale: v3(1,1,1),eulerAngles: v3(0,0,0), position: v3(curPos.x,curPos.y,curPos.z)})
        .call(()=>{
            if(callback != null)
                callback();
        })
        .start();
    }

    public move(worldPos: Vec3, callback : Function = null,delay : number = 0) : void{
        tween(this.node)
        .delay(delay)
        .to(0.2,{worldPosition : worldPos})
        .call(()=>{
            if(callback != null)
                callback();
        })
        .start();
    }

    public shake() : void{
        const curPos = this.node.position;
        tween(this.node)
        .to(0.035, {position: v3(curPos.x + 10,curPos.y,curPos.z)})
        .to(0.035, {position: v3(curPos.x - 10,curPos.y,curPos.z)})
        .to(0.035, {position: v3(curPos.x,curPos.y,curPos.z)})
        .start();
    }
}


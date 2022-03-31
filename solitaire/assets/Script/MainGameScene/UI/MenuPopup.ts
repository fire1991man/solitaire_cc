
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('MenuPopup')
export class MenuPopup extends Component {

    public newgameClickCallback : () => void = null;
    public replayClickCallback : () => void = null;

    @property(Label)
    private titleTxt : Label = null;

    public show(title : string) : void{
        this.titleTxt.string = title;
        this.node.active = true;
    }

    private hide() : void{
        this.node.active = false;
    }

    public onNewGameClick() : void{
        if(this.newgameClickCallback != null)
            this.newgameClickCallback();
        this.hide();
    }

    public onReplayClick() : void{
        if(this.replayClickCallback != null)
            this.replayClickCallback();
        this.hide();
    }

    public onCloseClick() : void{
        this.hide();
    }
}

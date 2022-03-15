
import { _decorator, Component, Node } from 'cc';
import { CardView } from './Card/CardView';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MainGameController
 * DateTime = Tue Mar 15 2022 23:45:44 GMT+0700 (Indochina Time)
 * Author = fireman1991
 * FileBasename = MainGameController.ts
 * FileBasenameNoExtension = MainGameController
 * URL = db://assets/Script/MainGameScene/MainGameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
    @property(CardView)
    card : CardView = null;

    start () {
        // [3]
    }

    public Click(): void{
        this.card.flip();
    }
}

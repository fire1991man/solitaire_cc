
import { _decorator, Component, Node, log } from 'cc';
import { CardData, Suit } from '../Data/CardData';
import { CardView } from './Card/CardView';
const { ccclass, property } = _decorator;
 
@ccclass('MainGameController')
export class MainGameController extends Component {
    
    @property(CardView)
    card : CardView = null;

    cardData : CardData;
    start () {
        let enumSuits = new Array<string>();
        for (let name in Suit) {
            if (typeof Suit[name] === 'number' ) {
                enumSuits.push(name);
            } 
        }
        let cardDatas = new Array<CardData>();
        for( let suit in enumSuits){
            for(let i = 1; i <= 13;i++){
                var temp = enumSuits[suit];
                var enumValue : Suit = (<any>Suit)[enumSuits[suit]];
                cardDatas.push(new CardData(i,enumValue));
            }
        }

        
        this.card.UpdateData(new CardData(1,Suit.Heart));
        this.delayExample(cardDatas);
    }

    public Click(): void{
        this.card.flip();
    }

    async delayExample(cardDatas : Array<CardData>) {
        for( let i = 0; i < cardDatas.length;i++){
            let cardData = cardDatas[i];
            this.card.UpdateData(new CardData(cardData.rank,cardData.suit));
            await this.sleep(1000);
        }
      }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

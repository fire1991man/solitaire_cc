
import { _decorator, Component, Node } from 'cc';
import { CardData, Suit } from '../../../Data/CardData';
import { IShuffle } from './IShuffle';
const { ccclass, property } = _decorator;
 
@ccclass('SureWinTemplateShuffle')
export class SureWinTemplateShuffle implements IShuffle {
    Shuffle(cards: CardData[]): void {
        cards[0] = new CardData(1,Suit.Heart);
        cards[1] = new CardData(2,Suit.Heart);
        cards[2] = new CardData(3,Suit.Heart);
        cards[3] = new CardData(4,Suit.Heart);
        cards[4] = new CardData(5,Suit.Heart);
        cards[5] = new CardData(6,Suit.Heart);
        cards[6] = new CardData(7,Suit.Heart);
        cards[7] = new CardData(8,Suit.Heart);
        cards[8] = new CardData(9,Suit.Heart);
        cards[9] = new CardData(10,Suit.Heart);
        cards[10] = new CardData(11,Suit.Heart);
        cards[11] = new CardData(12,Suit.Heart);
        cards[12] = new CardData(13,Suit.Heart);

        cards[13] = new CardData(1,Suit.Diamond);
        cards[14] = new CardData(2,Suit.Diamond);
        cards[15] = new CardData(3,Suit.Diamond);
        cards[16] = new CardData(4,Suit.Diamond);
        cards[17] = new CardData(5,Suit.Diamond);
        cards[18] = new CardData(6,Suit.Diamond);
        cards[19] = new CardData(7,Suit.Diamond);
        cards[20] = new CardData(8,Suit.Diamond);
        cards[21] = new CardData(9,Suit.Diamond);
        cards[22] = new CardData(10,Suit.Diamond);
        cards[23] = new CardData(11,Suit.Diamond);
        cards[24] = new CardData(12,Suit.Diamond);
        cards[25] = new CardData(13,Suit.Diamond);

        cards[26] = new CardData(1,Suit.Club);
        cards[27] = new CardData(2,Suit.Club);
        cards[28] = new CardData(3,Suit.Club);
        cards[29] = new CardData(4,Suit.Club);
        cards[30] = new CardData(5,Suit.Club);
        cards[31] = new CardData(6,Suit.Club);
        cards[32] = new CardData(7,Suit.Club);
        cards[33] = new CardData(8,Suit.Club);
        cards[34] = new CardData(9,Suit.Club);
        cards[35] = new CardData(10,Suit.Club);
        cards[36] = new CardData(11,Suit.Club);
        cards[37] = new CardData(12,Suit.Club);
        cards[38] = new CardData(13,Suit.Club);

        cards[39] = new CardData(1,Suit.Spade);
        cards[40] = new CardData(2,Suit.Spade);
        cards[41] = new CardData(3,Suit.Spade);
        cards[42] = new CardData(4,Suit.Spade);
        cards[43] = new CardData(5,Suit.Spade);
        cards[44] = new CardData(6,Suit.Spade);
        cards[45] = new CardData(7,Suit.Spade);
        cards[46] = new CardData(8,Suit.Spade);
        cards[47] = new CardData(9,Suit.Spade);
        cards[48] = new CardData(10,Suit.Spade);
        cards[49] = new CardData(11,Suit.Spade);
        cards[50] = new CardData(12,Suit.Spade);
        cards[51] = new CardData(13,Suit.Spade);
        
        
    }

}



import { _decorator, Component, Node } from 'cc';
import { CardData } from '../../../Data/CardData';

export interface IShuffle {
     Shuffle(cards: CardData[]): void;
}

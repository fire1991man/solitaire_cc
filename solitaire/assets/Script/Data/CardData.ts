
export enum Suit{
    Heart = 0,
    Spade = 1, 
    Diamond = 2,
    Club = 3,
}

export class CardData {
    public suit : Suit = Suit.Heart;
    public rank : number = 0;
    public isRed : boolean;
    constructor(rank: number, suit: Suit){
        this.suit = suit;
        this.rank = rank;
        this.isRed = this.suit === Suit.Heart ||  this.suit === Suit.Diamond;
    }
}


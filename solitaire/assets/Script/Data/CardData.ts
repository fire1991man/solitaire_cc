
export enum Suit{
    Heart = 0,
    Spade = 1, 
    Diamond = 2,
    Club = 3,
}

export class CardData {

    public static readonly RANK_A : number = 1;
    public static readonly RANK_K : number = 13;

    public suit : Suit = Suit.Heart;
    public rank : number = 0;
    public isRed : boolean;
    public isOpen : boolean;

    constructor(rank: number, suit: Suit){
        this.suit = suit;
        this.rank = rank;
        this.isRed = this.suit === Suit.Heart ||  this.suit === Suit.Diamond;
    }

    public updateData(cardData : CardData) : void{
        this.suit = cardData.suit;
        this.rank = cardData.rank;
        this.isRed = cardData.isRed;
        this.isOpen = cardData.isOpen;
    }
}


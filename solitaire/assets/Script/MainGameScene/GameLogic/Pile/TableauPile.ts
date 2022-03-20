
import { _decorator, Component, Node } from 'cc';
import { Pile } from './Pile';

export class TableauPile extends Pile {
    constructor(index : number){
        super();
        this.index = index;
    }
}
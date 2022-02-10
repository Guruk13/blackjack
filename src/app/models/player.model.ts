import * as internal from "stream";
import {Card} from './cards.model';
import {Playerhand} from './playerHand'

export interface Player {
    name:string
    id: number,
    chips:number,
    isOut: boolean,
    isDeciding:boolean,

}

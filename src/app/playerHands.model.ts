import * as internal from "stream";
import {Card} from './cards.model'

export interface PlayerHand {
    name:string
    id: number,
    money:number,
    hand: Array<Card>
}

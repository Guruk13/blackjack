import * as internal from "stream";
import {Card} from './cards.model'

export interface Playerhand {
    chipsraised:number , 
    cards: Array<Card> ; 
}
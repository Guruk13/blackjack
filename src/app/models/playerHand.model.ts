import * as internal from "stream";
import {Card} from './cards.model'
import { PossessedCard } from "./possessedCards.model";

export interface PlayerHand {
    userId:number,
    id:number
    chipsraised:number,
    possessedCardsCollection: Array<Card>, 
}
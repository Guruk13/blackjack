import * as internal from "stream";
import {Card} from './cards.model'
import { PossessedCard } from "./possessedCards.model";


//possessedCardId is the first card id due to technical limitattions (possessedcard collection cannot be used within array state.method)
export interface PlayerHand {
    userId:number,
    id: string, 
    chipsraised:number,
    possessedCardsCollection: Array<Card>, 
}
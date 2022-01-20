import * as internal from "stream";
import {Card} from './cards.model'

export interface PlayerHand {
    id: number,
    hand: Array<Card>
}

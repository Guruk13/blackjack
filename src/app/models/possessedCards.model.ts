import * as internal from "stream";
import { Card } from "./cards.model";

export interface PossessedCard extends Card {
    userId : number; 
    hand:number;
}

import * as internal from "stream";
import { Card } from "./cards.model";

export interface PossessedCard extends Card {
    //to allow for composition, ids shoudld be string 
    userId:number;
    handId: number

}

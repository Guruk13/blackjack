import * as internal from "stream";

export interface Card {
    title?:string
    id: string,
    suit: string,
    handValue:number,
    rank:number,
}

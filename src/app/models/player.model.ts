import * as internal from "stream";

export interface Player {
    name:string
    //id is useless...
    id: number,
    chips:number,
    isOut: boolean,
    isDeciding:boolean,

}

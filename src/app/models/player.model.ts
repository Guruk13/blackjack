import * as internal from "stream";

export interface Player {
    name:string
    id: number,
    chips:number,
    isOut: boolean,
    isDeciding:boolean,
    splits:number,

}

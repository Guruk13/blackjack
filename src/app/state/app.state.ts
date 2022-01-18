import { Card } from "../cards.model";

export interface AppState {
  pack: ReadonlyArray<Card>  ;
  hand: ReadonlyArray<string>  ;
}
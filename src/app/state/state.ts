import { Card } from "../cards.model";
import { PlayerHand } from "app/playerHands.model";

export interface AppState {
  pack: ReadonlyArray<string>  ;
  playerHand: ReadonlyArray<PlayerHand>  ;
}
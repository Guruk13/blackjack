import { Card } from "../cards.model";
import { PlayerHand } from "app/playerHands.model";
import { PossessedCard } from "app/possessedCards.model";

export interface AppState {
  pack: ReadonlyArray<string>  ;
  possessedCard: ReadonlyArray<PossessedCard>  ;
  playerHand: ReadonlyArray<PlayerHand> ;
}
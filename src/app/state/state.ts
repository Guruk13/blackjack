import { Card } from "../models/cards.model";
import { Player } from "../models/playerHands.model";
import { PossessedCard } from "../models/possessedCards.model";

export interface AppState {
  pack: ReadonlyArray<string>  ;
  possessedCard: ReadonlyArray<PossessedCard>  ;
  playerHand: ReadonlyArray<Player> ;
}
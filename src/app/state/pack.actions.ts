import { createAction, props } from '@ngrx/store';
import { Card } from '../cards.model';
import { PlayerHand } from '../playerHands.model'

export const addCard = createAction(
  '[Pack] add card',
  props<{ cardId: string }>()
);

export const drawCard = createAction(
  '[Pack] draw a Card',
  props<{ cardId: string }>() //random card 
);

export const createdPack = createAction(
  'Create pack with x deck, unshuffled success ',
  props<{ somepack: ReadonlyArray<Card> }>()
);

export interface DealCardPayload {
  playerIdToDeal: number,
  cardToDeal: Card
}

export const dealCard = createAction(
  'Dealing a random card to a player',
  props<{
    tempoplayer: PlayerHand,
    cardToDeal: Card
  }>()
)

export const createPlayers = createAction(
  '[Players] Creating players... success',
  props<{ somePlayers: ReadonlyArray<PlayerHand> }>()
)

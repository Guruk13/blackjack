import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../cards.model';
import { Player } from '../players.model'

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

export interface DealCardPayload{
  playerIdToDeal: number,
  cardToDeal: Card
}

export const dealCard = createAction(
  'Dealt a random card to a player',
  props<{  playerIdToDeal: number,
    cardToDeal: Card }>()
)
import { createAction, props } from '@ngrx/store';
import { Card } from '../cards.model';
 
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
  props<{ pack: ReadonlyArray<Card> }>()
);
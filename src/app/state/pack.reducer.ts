import { createReducer, on } from '@ngrx/store';

import { createdPack, dealCard,} from './pack.actions';
import { Card } from '../models/cards.model'

export const initialState: ReadonlyArray<Card> = [];

export const packReducer = createReducer(
  initialState,
  on(createdPack, (state, { somepack }) => somepack),
  on(dealCard, (state, { cardToDeal }) => state.filter((card) => card.id !== cardToDeal.id)),
);


import { createReducer, on } from '@ngrx/store';

import { createdPack, drawCard } from './pack.actions';
import { Card } from '../cards.model'

export const initialState: ReadonlyArray<Card> = [];

export const packReducer = createReducer(
  initialState,
  on(createdPack, (state, { pack }) => pack),
  
);
import { createReducer, on } from '@ngrx/store';
import { addCard, dealCard, drawCard } from './pack.actions';
 
export const initialState: ReadonlyArray<string> = [];
 
export const handsReducer = createReducer(
  initialState,
  on(drawCard, (state, { cardId }) => state.filter((id) => id !== cardId)),
  on(addCard, (state, { cardId }) => {
    if (state.indexOf(cardId) > -1) return state;
 
    return [...state, cardId];
  })

);
import { createReducer, on } from '@ngrx/store';
import { addCard, drawCard } from './pack.actions';
 
export const initialState: ReadonlyArray<string> = [];
 
export const handsReducer = createReducer(
  initialState,
  on(addCard, (state, { cardId }) => state.filter((id) => id !== cardId)),
  on(drawCard, (state, { cardId }) => {
    if (state.indexOf(cardId) > -1) return state;
 
    return [...state, cardId];
  })
);
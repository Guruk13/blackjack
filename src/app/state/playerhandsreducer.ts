import { createReducer, on } from '@ngrx/store';
import { addCard, dealCard, drawCard, createPlayers } from './pack.actions';
import { PlayerHand, } from 'app/playerHands.model';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),
  on(dealCard, (state, { tempoplayer }) => ({ ...state,   })),
  

);  
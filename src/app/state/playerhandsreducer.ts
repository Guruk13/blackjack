import { createReducer, on } from '@ngrx/store';
import { createImmerReducer } from 'ngrx-immer/store'
import { addCard, dealCard, drawCard, createPlayers } from './pack.actions';
import { PlayerHand, } from 'app/playerHands.model';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createImmerReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),
  on(dealCard, (state, { tempoplayer, cardToDeal }) => {
    return {
      ...state,
      [tempoplayer.id] : {
        ...state[tempoplayer.id],
        id: tempoplayer.id,
        hand: [...state[tempoplayer.id].hand, cardToDeal]
      }
    }
  })



);
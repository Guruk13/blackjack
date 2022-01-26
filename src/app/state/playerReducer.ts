import { createReducer, on } from '@ngrx/store';
import { createImmerReducer } from 'ngrx-immer/store'
import { addCard, dealCard, drawCard, createPlayers } from './pack.actions';
import { Player } from '../models/playerHands.model';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<Player> = [];

export const playerReducer = createReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),
  on(dealCard, (state, { tempoplayer, cardToDeal }) => {
    return {
      ...state,
      [tempoplayer.id] : {
        ...state[tempoplayer.id],
        id: tempoplayer.id,

      }
    }
  })



);
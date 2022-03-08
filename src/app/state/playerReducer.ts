import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {  createPlayers, changeChipCount, resetSplits, acessor, splitPair, winChips,deleteAll } from './pack.actions';

import { Player } from '../models/player.model';


export const initialState: ReadonlyArray<Player> = [];

export const playerReducer = createReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),
  on(deleteAll, (state) => initialState),
  //using ImmerOn because entity would need to be implemented,
  immerOn(changeChipCount, (state, { playerId, pchips }) => {
    //could use find 
    state.find((x) => {
      if (x.id === playerId) {
        x.chips = pchips;
      }
    })
    return state
  }),

  immerOn(acessor, (state, { player }) => {
    let toReplace = state.findIndex(x => x.id == player.id);
    state[toReplace] = player;
  }),

  //resets SplitCOunt
  immerOn(resetSplits, (state, { playerId }) => {

    state.find(x => x.id == playerId).splits = 0;


  }),

  //resets SplitCOunt
  immerOn(winChips, (state, { playerId, pchips }) => {
    state.find(x => x.id == playerId).chips += pchips;
  }),

  immerOn(splitPair, (state, { hand }) => {
    let player = state.find(x => x.id == hand.userId);
    player.splits += 1;
    player.chips -= hand.chipsRaised;
  }),






)















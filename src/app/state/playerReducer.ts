import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { isOut, createPlayers, changeChipCount, resetSplits, acessor, splitPair, winChips } from './pack.actions';
import { shiftDecision } from './pack.actions';
import { Player } from '../models/player.model';


export const initialState: ReadonlyArray<Player> = [];

export const playerReducer = createReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),
  //overly complicated because of my lack of awareness of entities 
  on(shiftDecision, (state, { currentPlayer, nextPlayer, currentIndex, nextIndex }) => {
    let array = [
      ...state,
    ]
    array[currentIndex] = { ...currentPlayer, isDeciding: false };
    if (nextPlayer && nextIndex) {
      array[nextIndex] = { ...nextPlayer, isDeciding: true, }
    }
    return array

  }),
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

  // This player isOut of the Round 
  immerOn(isOut, (state, { playerId, }) => {
    //could use find 
    state.find((x) => {
      if (x.id === playerId) {
        x.isOut = true;
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

    let hand = state.find(x => x.id == playerId)

  }),

  //resets SplitCOunt
  immerOn(winChips, (state, { playerId, pchips }) => {
    state.find(x => x.id == playerId).chips += pchips;
  }),

  immerOn(splitPair, (state, { hand }) => {
    let player  = state.find(x => x.id == hand.userId);
    player.splits += 1;
    player.chips -= hand.chipsRaised;
  }),






)















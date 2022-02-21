import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, drawCard, createPlayers, changeChipCount,splitPair, raiseInitialBet } from './pack.actions';
import { shiftDecision } from './pack.actions';
import { Player } from '../models/player.model';
import { state } from '@angular/animations';
import {Card } from "../models/cards.model"

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
  immerOn(changeChipCount, ( state,{ playerId, chips }) => {
    //could use find 
    state.map((x)=>{
      if(x.id === playerId){
        x.chips = x.chips + chips
      }
    })
    return state
  },
  ),
)















import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, drawCard, createPlayers, changeChipCount,splitPair } from './pack.actions';
import { shiftDecision } from './pack.actions';
import { Player } from '../models/player.model';
import { state } from '@angular/animations';
import {Card } from "../models/cards.model"
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Playerhand } from 'app/models/playerHand';

export const initialState: ReadonlyArray<Player> = [];

export const playerReducer = createReducer(
  initialState,
  on(createPlayers, (state, { somePlayers }) => somePlayers),

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
  immerOn(dealCard, ( state,{ tempoplayer, cardToDeal, handIndex }) => {
    state.find((player) =>player.id == tempoplayer.id).hands[handIndex].cards.push(cardToDeal);
    return state
  }),
  immerOn(splitPair,(state,{tempoplayer, pairedHandIndex}) =>{
    //splicing the second card 
    let card = state.find((player)=>player.id == tempoplayer.id).hands[pairedHandIndex].cards.splice(1,2); 
    let futurePlayerhand:Playerhand ={chipsraised: 0, cards:[card[0]] }
    state.find((player) =>player.id ==tempoplayer.id)
    .hands.splice(pairedHandIndex+1,1, futurePlayerhand)
  }
)
)














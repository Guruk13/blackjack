import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard,splitPair, } from './pack.actions';

import { PossessedCard } from 'app/models/possessedCards.model';
import { Playerhand } from 'app/models/playerHand';

export const initialState: ReadonlyArray<Playerhand> = [];

export const posssessedCardReducer = createReducer(
  initialState,

/*   immerOn(dealCard, ( state,{ tempoplayer, cardToDeal , handIndex }) => {
    let newPossCard:PossessedCard = {userId: tempoplayer.id, handInd: handIndex ,...cardToDeal}
    state.push(newPossCard);
  }), */

  immerOn(splitPair, ( state,{ tempoplayer, pairedHandIndex }) => {
    let playerhandIndex =state.findIndex((playerHand)=>{
      return (tempoplayer.id == playerHand.userId && pairedHandIndex == playerHand.handId)
    })
    let newHand= state[playerhandIndex]
    newHand.handId ++; 
    state.splice(playerhandIndex+1,0, newHand)

  }),
)
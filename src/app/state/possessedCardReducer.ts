import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, drawCard, createPlayers, changeChipCount,splitPair, raiseInitialBet } from './pack.actions';

import { Playerhand } from 'app/models/playerHand';
import { PossessedCard } from 'app/models/possessedCards.model';

export const initialState: ReadonlyArray<PossessedCard> = [];

export const posssessedCardReducer = createReducer(
  initialState,

  immerOn(dealCard, ( state,{ tempoplayer, cardToDeal , handIdentifier }) => {
    let newPossCard:PossessedCard = {userId: tempoplayer.id, handId: handIdentifier ,...cardToDeal}
    state.push(newPossCard);
  }),
  immerOn(splitPair, ( state,{ tempoplayer, pairedHandId }) => {
    let cardNumber = 0 ; 
    //dirty
    state.map((possCard:PossessedCard)=>{
      if (tempoplayer.id == possCard.userId && pairedHandId == possCard.handId){
        if(cardNumber==1){
          //this is the second Card, put it into another hand 
          possCard.handId = pairedHandId ;
        }
        cardNumber++;
      }

    })
  }),
)














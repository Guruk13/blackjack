import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard,splitPair, createHands } from './pack.actions';
import { state } from '@angular/animations';

import { PossessedCard } from 'app/models/possessedCards.model';
import { PlayerHand } from 'app/models/playerHand.model';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(dealCard, ( state,{ tempoplayer, cardToDeal , handIdentifier, chipsFirsthand}) => {
    //create a hand if it's the first 
    //logic should'nt be in reducers but february is my deadline 
    let firstHand = state.find((hand) => (hand.userId == tempoplayer.id && hand.id == handIdentifier) ) 
    if(!firstHand &&  handIdentifier == 0 ){
      let handToPush:PlayerHand = {userId : tempoplayer.id , id:handIdentifier, chipsraised: chipsFirsthand, possessedCardsCollection: [cardToDeal] }
      state.push(handToPush)
    }else{
      firstHand.possessedCardsCollection.push(cardToDeal)
    }
  }), 



  immerOn(splitPair, ( state,{ hand }) => {
    let newhand:PlayerHand;

    let card = state.find((handToFind) => 
      {
        console.log("haha");
        console.log(hand)
        console.log()
      return handToFind == hand 
      }
      ).possessedCardsCollection.slice(1,2)
    newhand = {...hand, possessedCardsCollection:[card[0]]}
    state.push(newhand)

  })


)
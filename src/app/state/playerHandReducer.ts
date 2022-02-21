import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, splitPair, createHands, emptyHand } from './pack.actions';
import { state } from '@angular/animations';

import { PossessedCard } from 'app/models/possessedCards.model';
import { PlayerHand } from 'app/models/playerHand.model';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier }) => {
    let firstHand = state.find((hand) => 
      hand.userId === tempoplayer.id && handIdentifier === hand.id)

    firstHand.possessedCardsCollection.push(cardToDeal)
  
  }),

  immerOn(emptyHand, (state, { tempoplayer, }) => {
      let handToPush:PlayerHand = {userId : tempoplayer.id, id: "firstHand", chipsraised: 0, possessedCardsCollection:[]  }
      state.push(handToPush);
  }),


  //accepts a two card hand
  immerOn(splitPair, (state, { hand }) => {
    let newhand: PlayerHand;
    //cannot use find in an array
      let theIndex = state.findIndex((handToFind) =>

      handToFind.id == hand.id
      &&
      handToFind.userId == hand.userId
    );
    //rebuilding hand ... @ODD
    let handToRepush:PlayerHand = {...state[theIndex], possessedCardsCollection:[state[theIndex].possessedCardsCollection[0]]}
    let card = state[theIndex].possessedCardsCollection.slice(1,2);
    state[theIndex] = handToRepush;

    newhand = { ...hand, possessedCardsCollection: [card[0]], id: card[0].id }
    state.splice(theIndex+1,0, newhand)

  })


)

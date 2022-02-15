import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, splitPair, createHands } from './pack.actions';
import { state } from '@angular/animations';

import { PossessedCard } from 'app/models/possessedCards.model';
import { PlayerHand } from 'app/models/playerHand.model';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier, chipsFirsthand }) => {
    //create a hand if it's the first
    //logic should'nt be in reducers but february is my deadline
    let firstHand = state.find((hand) => (hand.userId == tempoplayer.id ))
    //let firstHand = state.find((hand) => (hand.userId == tempoplayer.id && hand.id == handIdentifier))
    if (!firstHand) {
      let handToPush:PlayerHand = {userId : tempoplayer.id, id: cardToDeal.id, chipsraised: chipsFirsthand, possessedCardsCollection: [cardToDeal] }
      state.push(handToPush)
    } else {
      firstHand.possessedCardsCollection.push(cardToDeal)
    }
  }),



  immerOn(splitPair, (state, { hand }) => {
    let newhand: PlayerHand;

    //console.log(hand.possessedCardsCollection[0])
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
    state.push(newhand)

  })


)

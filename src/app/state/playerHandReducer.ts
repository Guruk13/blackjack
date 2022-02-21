import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, splitPair, createHands, emptyHand, setSplittable, changeChipCount } from './pack.actions';
import { state } from '@angular/animations';

import { PossessedCard } from 'app/models/possessedCards.model';
import { PlayerHand } from 'app/models/playerHand.model';
import { first } from 'rxjs/operators';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(setSplittable, (state, { id, userId, yesOrNo }) => {
     state.find((hand) => hand.userId === userId && id === hand.id).splittable = yesOrNo;
  }),


  //splitability is decided here , would've used pipe but state is undefined when trying to dispatch within select observeable and would've looped within subscribe
  immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier }) => {
    let firstHand = state.find((hand) =>
      hand.userId === tempoplayer.id && handIdentifier === hand.id)
    firstHand.possessedCardsCollection.push(cardToDeal)
    firstHand.splittable = false ; 
    if(firstHand.possessedCardsCollection.length == 2){
      firstHand.splittable = true;
    }
  
  }),

  immerOn(emptyHand, (state, { tempoplayer, }) => {
    let handToPush: PlayerHand = { userId: tempoplayer.id, id: "firstHand", chipsraised: 0, possessedCardsCollection: [], splittable: false }
    state.push(handToPush);
  }),

  //accepts a two card hand
  immerOn(splitPair, (state, { hand }) => {
    console.log(state);
    let newhand: PlayerHand;
    //cannot use find in an array
    let theIndex = state.findIndex((handToFind) =>

      handToFind.id == hand.id
      &&
      handToFind.userId == hand.userId
    );
    //rebuilding hand ... @ODD
    let handToRepush: PlayerHand = { ...state[theIndex], possessedCardsCollection: [state[theIndex].possessedCardsCollection[0]] }
    let card = state[theIndex].possessedCardsCollection.slice(1, 2);
    state[theIndex] = handToRepush;

    newhand = { ...hand, possessedCardsCollection: [card[0]], id: card[0].id }
    state.splice(theIndex + 1, 0, newhand)
  }),

  immerOn(changeChipCount, (state, { playerId, newchipsraised, handId }) => {
    state.find((hand) => hand.userId === playerId && handId === hand.id).chipsraised = newchipsraised
 }),






)

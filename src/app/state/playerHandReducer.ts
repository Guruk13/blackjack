import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, splitPair, createHands, emptyHand, setSplittable, changeChipCount } from './pack.actions';
import { state } from '@angular/animations';

import { PossessedCard } from 'app/models/possessedCards.model';
import { PlayerHand } from 'app/models/playerHand.model';
import { first } from 'rxjs/operators';
import {Card} from '../models/cards.model'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(setSplittable, (state, { id, userId, statusSplittable }) => {
     state.find((hand) => hand.userId === userId && id === hand.id).status = statusSplittable ;
  }),


  //splitability is decided here , would've used pipe but state is undefined when trying to dispatch within select observeable and would've looped within subscribe
  immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier }) => {
    let firstHand = state.find((hand) =>
      hand.userId === tempoplayer.id && handIdentifier === hand.id)
    firstHand.possessedCardsCollection.push(cardToDeal)
    firstHand.status != "splittable" ; 
    if(firstHand.possessedCardsCollection.length == 2){
      if(firstHand.possessedCardsCollection[0].id[0] == firstHand.possessedCardsCollection[1].id[0])
      firstHand.status = "splittable";
    }
    firstHand.cardsValue = determineValue(firstHand.possessedCardsCollection); 
  
  }),

  immerOn(emptyHand, (state, { tempoplayer, }) => {
    let handToPush: PlayerHand = { userId: tempoplayer.id, id: "firstHand", chipsraised: 0, possessedCardsCollection: [], status:"ok" , chipscommited: 0 ,cardsValue: 0 }
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
    let handToRepush: PlayerHand = { ...state[theIndex], possessedCardsCollection: [state[theIndex].possessedCardsCollection[0]] }
    let card = state[theIndex].possessedCardsCollection.slice(1, 2);
    state[theIndex] = handToRepush;

    newhand = { ...hand, possessedCardsCollection: [card[0]], id: card[0].id, cardsValue: determineValue([card[0]]),status: determineStatus(determineValue([card[0]]),[card[0]])  }
    state.splice(theIndex + 1, 0, newhand)
  }),

  immerOn(changeChipCount, (state, { playerId, newchipsraised, handId }) => {
    state.find((hand) => hand.userId === playerId && handId === hand.id).chipsraised = newchipsraised
 }),

)

//returns a value and a status. Does best so value stays under 21 
function determineValue(posCardCol : Array<Card>){

  let valueHand :number = 0  ; 
  let numberofAces = 0 ; 
  posCardCol.forEach((x)=>  {
    valueHand += x.handValue
    if(x.title=="Ace"){
      numberofAces +=1;
    }
  })
  //substracting necessary values  to be under 21 
  let i = 0
  while(i<numberofAces && valueHand > 21 ) {
    i++;
    if(valueHand>21){
      valueHand -= 10 ;
    }
  };

  return valueHand;
}


function determineStatus(valueHand, posCardCol){

  let status :string ; 
  status = "ok"; 
  if(valueHand>21){
    status = "busted" ;
  }
  if(posCardCol.length==2){
    if(posCardCol[0].id[0] == posCardCol[1].id[0] ){
      status="splittable"
    }
  }

  return status;

}

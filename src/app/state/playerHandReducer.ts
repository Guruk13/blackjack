import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  dealCard,
  splitPair,
  createHands,
  emptyHand, setSplittable,
  changeChipCount,
  trash,
  commitChips,
  setDoubleable,
  setWinloss
} from './pack.actions';
import { PlayerHand } from 'app/models/playerHand.model';
import { Card } from '../models/cards.model'


export const initialState: ReadonlyArray<PlayerHand> = [];

export const playerHandsReducer = createReducer(
  initialState,
  on(createHands, (state, { someHands }) => someHands),

  immerOn(setSplittable, (state, { id, userId, statusSplittable }) => {
    state.find((hand) => hand.userId === userId && id === hand.id).status = statusSplittable;
  }),

  immerOn(setDoubleable, (state, { id, userId, doubleable }) => {
    state.find((hand) => hand.userId === userId && id === hand.id).doubleable = doubleable;
  }),


  immerOn(setWinloss, (state, { id, userId, winlossString, chipGained }) => {
    let hand = state.find((hand) => hand.userId === userId && id === hand.id)
    hand.winloss = winlossString;
    hand.chipsGainsRatio = chipGained;
  }),




  immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier }) => {
    let firstHand = state.find((hand) =>
      hand.userId === tempoplayer.id && handIdentifier === hand.id)

    firstHand.possessedCardsCollection.push(cardToDeal)
    firstHand.cardsValue = determineValue(firstHand.possessedCardsCollection);
    firstHand.status = determineStatus(firstHand.cardsValue, firstHand.possessedCardsCollection, tempoplayer.splits);
  }),

  immerOn(emptyHand, (state, { tempoplayer, }) => {
    let handToPush: PlayerHand = {
      userId: tempoplayer.id,
      id: "firstHand",
      chipsRaised: 0,
      possessedCardsCollection: [],
      status: null, chipsCommited: 0,
      cardsValue: null,
      doubleable: true
    }
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
    //rebuilding hand 
    let handToRepush: PlayerHand = { ...state[theIndex], possessedCardsCollection: [state[theIndex].possessedCardsCollection[0]], 
      cardsValue:determineValue([state[theIndex].possessedCardsCollection[0]]) ,
      status: null,
    
    }
    let card = state[theIndex].possessedCardsCollection.slice(1, 2);
    state[theIndex] = handToRepush;

    newhand = {
      ...hand,
      possessedCardsCollection: [card[0]],
      id: card[0].id, cardsValue: determineValue([card[0]]),
      status: determineStatus(determineValue([card[0]]),
        [card[0]], 1)
    }
    state.splice(theIndex + 1, 0, newhand)
  }),

  immerOn(changeChipCount, (state, { playerId, newchipsraised, handId }) => {
    state.find((hand) => hand.userId === playerId && handId === hand.id).chipsRaised = newchipsraised
  }),

  

  immerOn(trash, (state, { playerId, }) => {
    let newstate = state.filter(x => x.userId != playerId)
    return newstate
  }),

  immerOn(commitChips, (state, { playerHand }) => {
    let index = state.findIndex(x => x.userId == playerHand.userId && x.id == playerHand.id);
    let handTocommit = state[index];
    handTocommit.chipsCommited = handTocommit.chipsRaised;
    handTocommit.chipsRaised = 0;
    state[index] = handTocommit;
  }),
)



  //splitability is decided here , would've used pipe but state is undefined when trying to dispatch within select observeable and would've looped within subscribe
//returns a value and a status. Does best so value stays under 21 
function determineValue(posCardCol: Array<Card>) {
  let valueHand: number = 0;
  let numberofAces = 0;
  posCardCol.forEach((x) => {
    valueHand += x.handValue
    if (x.title == "Ace") {
      numberofAces += 1;
    }
  })
  //substracting necessary values  to be under 21 
  let i = 0
  while (i < numberofAces && valueHand > 21) {
    i++;
    if (valueHand > 21) {
      valueHand -= 10;
    }
  };
  return valueHand;
}

function determineStatus(valueHand, posCardCol, splits) {
  let status: string;
  status = null;
  if (valueHand > 21) {
    status = "busted";
  }
  if (posCardCol.length == 2) {
    //@test
    if (posCardCol[0].rank == posCardCol[1].rank) {
      status = "splittable";
    }
    //this is a natural blackjak 
    if (valueHand == 21 ) {
      status = "blackjack";
    }
  }
  return status;
}

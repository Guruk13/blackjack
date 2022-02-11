import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayerHand } from 'app/models/playerHand.model';
import { Player } from '../models/player.model';
import { PossessedCard } from '../models/possessedCards.model';
import { playerHandsReducer } from './playerHandReducer';


export const selectPlayerHand = createFeatureSelector<ReadonlyArray<PlayerHand>>('playerHands');




export const selectPlayerHandCollection = (id: number) =>
  createSelector(selectPlayerHand, (playerHands) => {
    
    let aplayer =  playerHands.find((playerHand) => playerHand.userId == id )
    return aplayer}
    )

    export const selectPlayerHandCollections = (id: number) =>
    createSelector(selectPlayerHand, (playerHands) => {
      
      let aplayer =  playerHands.filter((playerHand) => playerHand.userId == id )
      console.log(aplayer);
      return aplayer}
      )
    
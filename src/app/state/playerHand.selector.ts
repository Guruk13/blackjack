import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayerHand } from 'app/models/playerHand.model';
import { Player } from '../models/player.model';
import { PossessedCard } from '../models/possessedCards.model';
import { playerHandsReducer } from './playerHandReducer';


export const selectPlayerHand = createFeatureSelector<ReadonlyArray<PlayerHand>>('playerHands');




export const selectPlayerHandVanilla = 
  createSelector(selectPlayerHand, (playerHands) => playerHands)

export const selectPlayerHandCollections = (id: number) =>
  createSelector(selectPlayerHand, (playerHands) => {
    let aplayer = playerHands.filter((playerHand) => playerHand.userId == id)
    return aplayer
  }
  )

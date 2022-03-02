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
    let somePH = playerHands.filter((playerHand) => playerHand.userId == id)
    return somePH
  })

export const selectPlayerHandByIds = (playerId, id) =>
  createSelector(selectPlayerHand, (playerHands) => {
    let aplayerHand = playerHands.find((playerHand) => (playerHand.userId == playerId && playerHand.id == id))
    return aplayerHand;
  })


export const selectFirstHands = () =>
  createSelector(selectPlayerHand, (playerHands) => {
    let somePH = playerHands.filter((playerHand) => playerHand.userId != 0 && playerHand.id == "firstHand")
    return somePH
  })

export const selectPHwithoutHouse = (id: number) =>
  createSelector(selectPlayerHand, (playerHands) => {
    let somePH = playerHands.filter((playerHand) => playerHand.userId != id)
    return somePH
  })


  export const selectPHashand = (id: number) =>
  createSelector(selectPlayerHand, (playerHands) => {
     playerHands.filter((playerHand) => playerHand.userId == id)

  })


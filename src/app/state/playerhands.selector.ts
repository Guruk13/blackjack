import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayerHand } from 'app/playerHands.model';

export const selectPlayerHandState = createFeatureSelector<ReadonlyArray<PlayerHand>>('playerHand');

export const selectPlayerById = (id: number) =>
  createSelector(selectPlayerHandState, (playerhandselected) => playerhandselected[id]);

export const selectAllPlayers = () =>
  createSelector(selectPlayerHandState, (players) => players.filter(
    (player) => {player.name != "Mr.House"}
      
  ))


export const selectDealer = () =>
  createSelector(selectPlayerHandState, (players) => players.filter(
    player =>
      player.name == "Mr.House"
  ))

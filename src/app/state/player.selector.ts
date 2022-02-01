import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Player } from '../models/player.model';
import { PossessedCard } from '../models/possessedCards.model';

export const selectPlayers = createFeatureSelector<ReadonlyArray<Player>>('players');

export const selectCards = createFeatureSelector<ReadonlyArray<PossessedCard>>('possessedCard');



export const selectDealer =
  createSelector(selectPlayers, (players) => {
    return players.find(
      (player: Player) =>
        player.name === "Mr.House"
    )
  });

export const selectPlayerById = (id: number) =>
  createSelector(selectPlayers, (playersSelected) => playersSelected[id]);



export const selectAllPlayers =
  createSelector(selectPlayers, (players) => {
    return players.filter(
      (player) => player.name != "Mr.House"
    )
  });


//Players that are still playing 
export const selectUnfoldedPlayers =
  createSelector(selectAllPlayers, (players) =>
    players.filter(
      player => player.isOut == false
    ).reverse()
  )

export const selectDecidingPLayer =
  createSelector(selectUnfoldedPlayers, (players) =>
    players.find(
      player => player.isDeciding == true
    ))

export const selectPossessedCards = (playerId: number) =>
  createSelector(selectCards, (cards) =>
    cards.filter(
      card => (card.userId == playerId)
    )
  )











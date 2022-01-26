import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Player } from '../models/player.model';
import { PossessedCard } from '../models/possessedCards.model';

export const selectPlayers = createFeatureSelector<ReadonlyArray<Player>>('players');

export const selectPossessedCards = createFeatureSelector<ReadonlyArray<PossessedCard>>('possessedCard');

export const selectPlayerById = (id: number) =>
  createSelector(selectPlayers, (playersSelected) => playersSelected[id]);

export const selectAllPlayers = () =>
  createSelector(selectPlayers, (players) => players.filter(
    (player) => { player.name != "Mr.House" }

  ))

  export const selectCardsp = () =>
  createSelector(selectPossessedCards, (cards) => cards.filter(
    card =>
      card.userId == 0
  ))




export const selectDealer = () =>
  createSelector(selectPlayers, (players) => players.find(
    player =>
      player.name == "Mr.House"
  ))







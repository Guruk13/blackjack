import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Player } from '../models/player.model';
import { PossessedCard } from '../models/possessedCards.model';

export const selectPlayers = createFeatureSelector<ReadonlyArray<Player>>('players');

export const selectPH = createFeatureSelector<ReadonlyArray<PossessedCard>>('playerHands');



export const selectDealer =
  createSelector(selectPlayers, (players) => {
    return players.find(
      (player: Player) =>
        player.id === 0
    )
  });

export const selectPlayerById = (id: number) =>
  createSelector(selectPlayers, (playersSelected) => playersSelected[id]);



export const selectAllPlayers =
  createSelector(selectPlayers, (players) => players.filter(
      (player) => player.id != 0
    )
  );


    export const selectPwithhands = createSelector(
      selectAllPlayers,
      selectPH,
      (players, phs) => {
        return players.filter((player) => phs.find((ph) => player.id === ph.userId));
      }
    );


import { createSelector, createFeatureSelector } from '@ngrx/store';
import { create } from 'domain';
import { Card } from '../cards.model';
import { PlayerHand } from 'app/playerHands.model';

export const selectPack = createFeatureSelector<ReadonlyArray<Card>>('pack');

export const selectPlayerHandState = createFeatureSelector<ReadonlyArray<PlayerHand>>('playerHand');

export const selectPlayerHand = (id: number) =>
  createSelector(selectPlayerHandState, (playerhandselected) => playerhandselected[id]);
  //createSelector(selectPlayerHandState, (playerhandselected) =>  playerhandselected.find((p) => {p.id === id }) );

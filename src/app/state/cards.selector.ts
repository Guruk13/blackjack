import { createSelector, createFeatureSelector } from '@ngrx/store';
import { create } from 'domain';
import { Card } from '../cards.model';

export const selectCards = createFeatureSelector<ReadonlyArray<Card>>('pack');

export const selectPickRandomOne = createSelector(selectCards,
  (packa) => {
    return packa[Math.floor(Math.random() * packa.length)]
  }
)
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Card } from '../cards.model';

export const selectCards = createFeatureSelector<ReadonlyArray<Card>>('pack');

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('hand');

export const selectCardCollection = createSelector(
  selectCards,
  selectCollectionState,
  (pack, hands) => {
    return hands.map((id) => pack.find((card) => card.id === id));
  }
);
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { create } from 'domain';
import { Card } from '../cards.model';

export const selectCards = createFeatureSelector<ReadonlyArray<Card>>('pack');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('hand');

export const selectCardCollection = createSelector(selectCards, selectCollectionState,
  (pack, hand) => { 
    console.log("selecting...");
    return hand.map((id) => pack.find((card) => card.id === id ));
    
  }
);
export const selectPickRandomOne = createSelector(selectCards,
   (pack) => {
     console.log("picking a random card...."); 
     return pack[Math.floor(Math.random() * pack.length)]
   }
  )
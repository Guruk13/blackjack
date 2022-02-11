import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addCard, dealCard, drawCard, createPlayers, changeChipCount,splitPair, raiseInitialBet } from './pack.actions';

import { PlayerHand } from 'app/models/playerHand.model';
import { PossessedCard } from 'app/models/possessedCards.model';

export const initialState: ReadonlyArray<PossessedCard> = [];

export const posssessedCardReducer = createReducer(
  initialState,

)














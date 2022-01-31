import { createReducer, on } from '@ngrx/store';
import { createPlayers, dealCard, } from './pack.actions';
import { PossessedCard } from '../models/possessedCards.model';
import { state } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';

export const initialState: ReadonlyArray<PossessedCard> = [];

export const possessedCardReducer = createReducer(

  initialState,

  on(dealCard, (state, { tempoplayer, cardToDeal }) => {
      return [
        ...state,
        {
          ...cardToDeal,
          userId: tempoplayer.id,

        }
      ]
  }

  )



);
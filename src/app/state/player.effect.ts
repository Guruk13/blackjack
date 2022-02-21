import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DealerService } from 'app/dealer.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {shiftDecision} from './pack.actions'

 
@Injectable()
export class MovieEffects {
 

 
  constructor(
    private actions$: Actions,
    private dealerService: DealerService
  ) {}
}
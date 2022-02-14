import * as internal from "stream";
import {Card} from './cards.model'
import { PossessedCard } from "./possessedCards.model";
import{FormControl, FormGroup, Validators} from '@angular/forms';


//possessedCardId is the first card id due to technical limitattions (possessedcard collection cannot be used within array state.method)
export class PlayerHand {
    userId:number;
    id: string; 
    chipsraised:number;
    possessedCardsCollection: Array<Card>;

    static asFormGroup(playerhand: PlayerHand): FormGroup {
      const fg = new FormGroup({

        userId: new FormControl(playerhand.userId, Validators.required),
        id: new FormControl(playerhand.id, Validators.required),
      });
      return fg;
    }


}





//https://stackblitz.com/edit/angular-material-table-with-form-59imvq?file=app%2Falbum.service.ts


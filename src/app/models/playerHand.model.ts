import * as internal from "stream";
import {Card} from './cards.model'
import { PossessedCard } from "./possessedCards.model";
import{FormControl, FormGroup, Validators} from '@angular/forms';


//possessedCardId is the first card id due to technical limitattions (possessedcard collection cannot be used within array state.method)
export interface PlayerHand {
    userId:number;
    id: string;
    chipsraised:number;
    chipscommited: number; 
    possessedCardsCollection: Array<Card>
    status:string;
    cardsValue:number
}





//https://stackblitz.com/edit/angular-material-table-with-form-59imvq?file=app%2Falbum.service.ts


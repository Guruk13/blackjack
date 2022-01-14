import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Card } from './cards.model';


@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor() {

  }


  createPack() {
    let suits = [
      "hearts", "pikes", "spades", "clubs"
    ];

    let deck: Card[] = []


    //generate a new deck 
    suits.forEach(suit => {
      for (let i = 0; i < 13; i++) {
        var newcard = <Card>{};
        newcard.id = i + 1 + suits[0] ;
        newcard.suit = suit;
        switch (i) {
          case 0:
            newcard.title = "Ace";
            break;
          case 10:
            newcard.title = "Jack";
            break;
          case 11:
            newcard.title = "Queen";
            break;
          case 12:
            newcard.title = "King";
            break;
          default:
            break;
        }
        deck.push(newcard)
      }

    })
    return deck  ; //will be pack
  }


}















import { Injectable } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Card } from './card';


@Injectable({
  providedIn: 'root'
})
export class DealerService {

  suits = [
    "hearts", "ikes", "spades", "clubs"
  ];
  deck: Card[] = []
  constructor() {
    this.suits.forEach(suit => {
      for (let i = 0; i < 13; i++) {
        var newcard = <Card>{};
        newcard.number = i + 1;
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
        this.deck.push(newcard)
      }
    });
  }

  getClassicDeck() {
    return this.deck;
  }


}

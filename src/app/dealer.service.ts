import { Injectable } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Card } from './card';


@Injectable({
  providedIn: 'root'
})
export class DealerService {

  suits = [
    "hearts", "pikes", "spades", "clubs"
  ];


  deck:Card[] = [] ; 




  constructor() {
    var tempo:Card[] = [] ; 
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
        tempo.push(newcard)
      }
    });
    this.deck = tempo;
    console.log(tempo)
    

  }

  getClassicDeck() {

    return this.deck;
  }


}

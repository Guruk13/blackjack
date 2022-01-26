import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './models/cards.model';


//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectAllPlayers, selectPlayerById, selectDealer } from './state/player.selector';
import {
  createdPack,
  addCard,
  drawCard,
  dealCard,
  createPlayers
} from './state/pack.actions';
import { Store } from '@ngrx/store';
import { Player } from './models/player.model';



@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private store: Store,) {    

  }

  pack$ = this.store.select(selectCards);
  players$ = this.store.select(selectAllPlayers);
  dealer$ = this.store.select(selectDealer)

  onAdd(cardId: string) {
    this.store.dispatch(addCard({ cardId }));
  }

  dealrandom(playerId: number) {
    let randomCard!: Card;
    let tempoplayer!: Player;
    this.store.select(selectPickRandomOne).subscribe(
      res => { randomCard = res }, error => { console.log("Could'nt pick a random card..") })
    this.store.select(selectPlayerById(playerId)).subscribe(
      (res) => { tempoplayer = res }, error => { console.log("Could'nt find player with id" + playerId) });
    if (tempoplayer != undefined) {

    }
    let tempPayload = { tempoplayer, cardToDeal: randomCard }
    this.store.dispatch(dealCard(tempPayload))
  }

  onRemove(cardId: string) {
    this.store.dispatch(drawCard({ cardId }));
  }

  //generate a new deck 
  createPack() {
    let suits = [
      "hearts", "pikes", "spades", "clubs"
    ];
    let deck: Card[] = []
    suits.forEach(suit => {
      for (let i = 0; i < 13; i++) {
        var newcard = <Card>{};
        newcard.id = i + 1 + suit[0];
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

    let somepack = deck ; 
    this.store.dispatch(createdPack({ somepack }))
    
  }

  initGame() {
    //todo create pack generator + modify card ids 
    this.createPack()
    let imoney: number = 500;
    let dealer: Player = { id: 0, name: "Mr.House", money: imoney }
    let Youc: Player = { id: 1, name: "You", money: imoney };
    let MissFortune: Player = { id: 2, name: "Miss Fortune", money: imoney }
    let some: Player = { id: 2, name: "Theubald", money: imoney }
    let somePlayers: ReadonlyArray<Player> = [dealer, Youc, MissFortune,some]
    this.store.dispatch(createPlayers({ somePlayers }));
    this.game();
  }

  game() {
    this.dealrandom(0);
    this.dealrandom(0);
    this.dealrandom(1);
    this.dealrandom(1);
    this.dealrandom(2);
    this.dealrandom(2);
  }

  selectAllPlayers(){
     let players = this.store.select(selectAllPlayers());
  }

}















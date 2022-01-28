import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './models/cards.model';

//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectUnfoldedPlayers, selectPlayerById, selectDealer } from './state/player.selector';
import {
  createdPack,
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
  //@TODO fix type problem 
  pack$ = this.store.select(selectCards);
  unfoldedplayers$: any;
  dealer$: Observable<Player>;

  dealRandom(playerId: number) {
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

    let somepack = deck;
    this.store.dispatch(createdPack({ somepack }))

  }

  initGame() {

    this.createPack()
    //the dealer is stored in the function below 
    this.addPlayers();
    //selecting dealer + unfolded players into properties 
    this.store.select(selectUnfoldedPlayers).subscribe(res => {
      this.unfoldedplayers$ = res;
    })

    this.dealer$ = this.store.select(selectDealer);

  }
  getDealer(): Observable<Player> {
    return this.dealer$;
  }

  addPlayers() {
    //todo create pack generator + modify card ids 
    let imoney: number = 500;
    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney }
    let You: Player = { id: 1, name: "You", chips: imoney }
    let MissFortune: Player = { id: 2, name: "Miss Fortune", chips: imoney }
    let some: Player = { id: 3, name: "Theubald", chips: imoney }
    let somePlayers: ReadonlyArray<Player> = [dealer, You, MissFortune, some]
    this.store.dispatch(createPlayers({ somePlayers }));
  }


  game() {

  }

  turn() {
    //dealing card to Mr.house
    let houseId: number; 
    this.dealer$.subscribe((res) => {houseId = res.id})
    this.dealRandom(houseId);

    let players: any;
    players = this.unfoldedplayers$;
    //Cards have to be dealt clockwise   
    players.slice().reverse().forEach((x: Player) => (
      this.dealRandom(x.id)))
  }

  test() {
    let random: any;
    this.store.select(selectDealer).subscribe((res) => { random = res });
    console.log(random);
    this.dealRandom(0);
  }




}















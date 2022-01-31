import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './models/cards.model';

//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectUnfoldedPlayers, selectPlayerById, selectDealer, selectDecidingPLayer, selectPlayers } from './state/player.selector';
import {
  createdPack,
  dealCard,
  createPlayers,
  shiftDecision,
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
  decisionIndex: number;

  dealRandom(playerId: number) {
    let randomCard!: Card;
    let tempoplayer!: Player;
    let remainingCards: number


    this.pack$.subscribe((res) => {
      remainingCards = res.length;
    })
    if (remainingCards > 0) {
      this.store.select(selectPickRandomOne).subscribe(
        res => { randomCard = res }, error => { console.log("Could'nt pick a random card..") })
      this.store.select(selectPlayerById(playerId)).subscribe(
        (res) => { tempoplayer = res }, error => { console.log("Could'nt find player with id" + playerId) });
      if (tempoplayer != undefined) {

      }
      let tempPayload = { tempoplayer, cardToDeal: randomCard }
      this.store.dispatch(dealCard(tempPayload));
    }
    else {
      console.log("no cards left");
    }

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
    this.unfoldedplayers$ = this.store.select(selectUnfoldedPlayers);
    this.dealer$ = this.store.select(selectDealer);

    this.unfoldedplayers$.subscribe((res) => {
      this.decisionIndex = res.indexOfLast
    })
  }
  getDealer(): Observable<Player> {
    return this.dealer$;
  }

  addPlayers() {
    //todo create pack generator + modify card ids 
    let imoney: number = 500;

    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney, isDeciding: false, isOut: false, }
    let You: Player = { id: 1, name: "You", chips: imoney, isDeciding: false, isOut: false, }
    let MissFortune: Player = { id: 2, name: "Miss Fortune", chips: imoney, isDeciding: true, isOut: false, }
    let some: Player = { id: 3, name: "Theubald", chips: imoney, isDeciding: false, isOut: false, }
    let somePlayers: ReadonlyArray<Player> = [dealer, You, MissFortune, some]
    this.store.dispatch(createPlayers({ somePlayers }));
  }


  game() {

  }

  dealAll() {

    //dealing card to Mr.house
    let houseId: number;
    this.dealer$.subscribe((res) => { houseId = res.id })
    this.dealRandom(houseId);
    let players: any;
    //@todo check for no players
    this.unfoldedplayers$.subscribe((res) => {
      players = res
    })
    //Cards have to be dealt clockwise   
    players.forEach((x: Player) => (
      this.dealRandom(x.id)))
  }

  shiftDecision() {


    let currentIndex: number;
    let nextIndex: number;
    let currentDecidingIndex: number;
    let currentPlayer: Player;
    let nextPlayer: Player;
    let globalArray: any;
    let unfoldeds: Array<Player>;

    //current PLayer
    this.store.select(selectDecidingPLayer).subscribe(res => currentPlayer = res);
    //Global Array
    this.store.select(selectPlayers).subscribe(res => globalArray = res);
    //
    currentIndex = globalArray.findIndex(function (player) {
      if (player.id == currentPlayer.id) {

        return player.id == currentPlayer.id
      }
    })


    this.store.select(selectUnfoldedPlayers).subscribe(res => unfoldeds = res)

    currentDecidingIndex = unfoldeds.findIndex(function (player) {
      if (player.id == currentPlayer.id) {
        return player.id == currentPlayer.id
      }
    })

    if (currentDecidingIndex == unfoldeds.length) {
      console.log("out of players");
    } else {
      nextPlayer = unfoldeds[currentDecidingIndex + 1];
      nextIndex = globalArray.findIndex(function (player) {
        if (player.id == nextPlayer.id) {
          return player.id == nextPlayer.id
        }
      })
    }
    console.log({ currentPlayer, nextPlayer, currentIndex, nextIndex });
    //Find index in Array 
    this.store.dispatch(shiftDecision({ currentPlayer, nextPlayer, currentIndex, nextIndex }));









  }

  test() {
    let random: any;
    this.store.select(selectDealer).subscribe((res) => { random = res });
    console.log(random);
    this.dealRandom(0);
  }




}















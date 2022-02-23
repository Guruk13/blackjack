import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './models/cards.model';

//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectUnfoldedPlayers, selectPlayerById, selectDealer, selectDecidingPLayer, selectPlayers, selectAllPlayers } from './state/player.selector';
import {
  createdPack,
  dealCard,
  createPlayers,
  shiftDecision,
  changeChipCount,
  splitPair,
  raiseInitialBet,
  createHands,
  emptyHand,
  isOut
} from './state/pack.actions';
import { Store } from '@ngrx/store';
import { Player } from './models/player.model';
import { PlayerHand } from './models/playerHand.model';
import { selectPlayerHandVanilla, selectPlayerHandCollections, selectPlayerHandByIds } from './state/playerHand.selector';
import { element } from 'protractor';
import { ReactiveFormsModule } from '@angular/forms';





@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private store: Store,) {
  }
  pack$ = this.store.select(selectCards);
  unfoldedplayers$: any;
  dealer$: Observable<Player>;
  decisionIndex: number;

  getDealer(): Observable<Player> {
    return this.dealer$;
  }

  indexCurrentPlayer = 0 ; 



  //deal a random card to a player's first hand 
  dealRandom(playerId: number, handId: string) {
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
      let tempPayload = { tempoplayer, cardToDeal: randomCard, handIdentifier: handId };
      this.store.dispatch(dealCard(tempPayload));
    }
    else {
      console.log("no cards left");
      this.createPack();
      this.dealRandom(playerId, handId);

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
            newcard.handValue = 11;
            break;
          case 10:
            newcard.title = "Jack";
            newcard.handValue = 10;
            break;
          case 11:
            newcard.title = "Queen";
            newcard.handValue = 10;
            break;
          case 12:
            newcard.title = "King";
            newcard.handValue = 10;
            break;
          default:
            newcard.handValue = i+1;
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
    this.emptyHands()

  }
  addPlayers() {
    //todo create pack generator + modify card ids 
    let imoney: number = 60;
    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney, isDeciding: false, isOut: false, }
    let You: Player = { id: 1, name: "You", chips: imoney, isDeciding: false, isOut: false, }
    let MissFortune: Player = { id: 2, name: "Miss Fortune", chips: imoney, isDeciding: false, isOut: false, }
    let some: Player = { id: 3, name: "Theubald", chips: imoney, isDeciding: true, isOut: false, }
    let somePlayers: ReadonlyArray<Player> = [dealer, You, MissFortune, some]
    this.store.dispatch(createPlayers({ somePlayers }));
  }
  dealFirstHand() {
    //dealing card to Mr.house
    let houseId: number;
    this.dealer$.subscribe((res) => { houseId = res.id })
    this.dealRandom(houseId, "firstHand");
    let players: any;
    //@todo check for no players
    this.unfoldedplayers$.subscribe((res) => {
      players = res
    })
    //Cards have to be dealt clockwise   
    players.forEach((x: Player,) => (
      this.dealRandom(x.id, "firstHand")
    ));
    //Cards have to be dealt clockwise   
    players.forEach((x: Player,) => (
      this.dealRandom(x.id, "firstHand")
    ));

  }
  emptyHands() {
    let players: any;
    let house: Player;
    this.unfoldedplayers$.subscribe((res) => {
      players = res
    })
    this.dealer$.subscribe(res => house = res)
    this.store.dispatch(emptyHand({ tempoplayer: house }))
    players.forEach((x: Player) => (
      this.store.dispatch(emptyHand({ tempoplayer: x }))
    ));
  }

  dealAll() {
    //dealing card to Mr.house
    let houseId: number;
    this.dealer$.subscribe((res) => { houseId = res.id })
    this.dealRandom(houseId, "tempo");
    let players: any;
    //@todo check for no players
    this.unfoldedplayers$.subscribe((res) => {
      players = res
    })
    //Cards have to be dealt clockwise   
    players.forEach((x: Player,) => (
      this.dealRandom(x.id, "tempo")
    ))
  }

  test() {
    let initialBet = 27;
    this.store.dispatch(raiseInitialBet({ initialBet }));
  }
  split(playerId, id) {
    let playerHand;
    this.store.select(selectPlayerHandByIds(playerId, id)).subscribe(
      (res) => {
        playerHand = res
      }
    )
    this.store.dispatch(splitPair({ hand: playerHand }))
  }
















}















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
  raiseInitialBet
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
  unfoldedplayers$: any;
  dealer$: Observable<Player>;
  decisionIndex: number;

  getDealer(): Observable<Player> {
    return this.dealer$;
  }



  //deal a random card to player's hand 
  dealRandom(playerId: number, seconds, handIndex:number) {
    setTimeout(() => {
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
        let tempPayload = { tempoplayer, cardToDeal: randomCard, handIndex }
        this.store.dispatch(dealCard(tempPayload));
      }
      else {
        console.log("no cards left");
        this.createPack();
      }
    }, seconds);
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
    this.dealFirstHand(23);
  }

  addPlayers() {
    //todo create pack generator + modify card ids 
    let imoney: number = 500;
    let iPlayerHand = {chipsraised: 0, cards: [] }
    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney, isDeciding: false, isOut: false, hands: [iPlayerHand] }
    let You: Player = { id: 1, name: "You", chips: imoney, isDeciding: false, isOut: false, hands: [iPlayerHand] }
    let MissFortune: Player = { id: 2, name: "Miss Fortune", chips: imoney, isDeciding: false, isOut: false, hands: [iPlayerHand]}
    let some: Player = { id: 3, name: "Theubald", chips: imoney, isDeciding: true, isOut: false, hands: [iPlayerHand]}
    let somePlayers: ReadonlyArray<Player> = [dealer, You, MissFortune, some]
    this.store.dispatch(createPlayers({ somePlayers }));
  }

  dealFirstHand(initialBet){
     //dealing card to Mr.house
     let houseId: number;
     this.dealer$.subscribe((res) => { houseId = res.id })
     this.dealRandom(houseId, 0,0 );
     let players: any;
     //@todo check for no players
     this.unfoldedplayers$.subscribe((res) => {
       players = res
     })
     //Cards have to be dealt clockwise   
     players.forEach((x: Player, seconds = 2) => (
       this.dealRandom(x.id, seconds * 1000, 0)
       ));
      //Cards have to be dealt clockwise   
     players.forEach((x: Player, seconds = 2) => (
      this.dealRandom(x.id, seconds * 1000, 0)
      ));
      this.store.dispatch(raiseInitialBet({initialBet}));

  }

  dealAll() {
    //dealing card to Mr.house
    let houseId: number;
    this.dealer$.subscribe((res) => { houseId = res.id })
    this.dealRandom(houseId, 0,0 );
    let players: any;
    //@todo check for no players
    this.unfoldedplayers$.subscribe((res) => {
      players = res
    })
    //Cards have to be dealt clockwise   
    players.forEach((x: Player, seconds = 2) => (
      this.dealRandom(x.id, seconds * 1000, 0)
      ))
  }
  //Excessively long function because I didnt use entities.
  // It resulted in the use in Immer and in global mess pf the code 
  // Could've used Angmat's stepper ? , yes makes total sense with disabling the aria 

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
    currentIndex = globalArray.findIndex(player => {
      return player.id == currentPlayer.id
    });
    this.store.select(selectUnfoldedPlayers).subscribe(res => unfoldeds = res)
    currentDecidingIndex = unfoldeds.findIndex(player => {
      return player.id == currentPlayer.id
    });
    if (currentDecidingIndex == unfoldeds.length - 1) {
      console.log("out of players");
      this.store.dispatch(shiftDecision({ currentPlayer, nextPlayer, currentIndex, nextIndex }));
    } else {
      nextPlayer = unfoldeds[currentDecidingIndex + 1];
      nextIndex = globalArray.findIndex(player => {
        return player.id == nextPlayer.id
      })
      //Find index in Array 
      this.store.dispatch(shiftDecision({ currentPlayer, nextPlayer, currentIndex, nextIndex }));
    }
  }

  chips() {
    let playerId = 3;
    let chips = 100;
    this.store.dispatch(changeChipCount({ playerId, chips }));
  }

  test() {
    let initialBet = 27 ; 
    this.store.dispatch(raiseInitialBet({initialBet}));
  }
  split(){
        //dealing card to Mr.house
        let house: Player;"'"
        let arrayplayers: Array<Player>;
        this.store.select(selectAllPlayers).subscribe((res)=> arrayplayers = res )
        if(arrayplayers){
          arrayplayers.forEach(element => {
            if(element.hands)
            this.store.dispatch(splitPair({tempoplayer: element, pairedHandIndex: 0}))
          });
          
        }

  }




}















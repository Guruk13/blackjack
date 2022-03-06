import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './models/cards.model';

//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectUnfoldedPlayers, selectPlayerById, selectDealer, selectAllPlayers, selectPwithhands, } from './state/player.selector';
import {
  createdPack,
  dealCard,
  createPlayers,
  emptyHand,
  isOut,
  trash,
  winChips,
  setWinloss,
  resetSplits,
  deleteAll,

} from './state/pack.actions';
import { Store } from '@ngrx/store';
import { Player } from './models/player.model';
import { PlayerHand } from './models/playerHand.model';
import {
  selectFirstHands, selectPHwithoutHouse, selectPlayerHandByIds,
} from './state/playerHand.selector';



@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private store: Store,) {
  }
  pack$ = this.store.select(selectCards);
  players$: any;
  dealer$: Observable<Player>;
  passIndex: number;


  getDealer(): Observable<Player> {
    return this.dealer$;
  }
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
        newcard.rank = i + 1;
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
            newcard.handValue = i + 1;
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
    this.players$ = this.store.select(selectAllPlayers);
    this.dealer$ = this.store.select(selectDealer);
    this.passIndex = 0;
    this.emptyHands()
  }


  resetGame(params){
    this.createPack();
    this.store.dispatch(deleteAll());

    console.log("he?");
    let imoney: number = params.chips;
    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney, isDeciding: false, isOut: false, splits: 0 }
    let myarray: Array<Player> = []; 
    myarray.push({ id: 1, name: "You", chips: imoney, isDeciding: false, isOut: false, splits: 0 });
    myarray.push({ id: 2, name: "Miss Fortune", chips: imoney, isDeciding: false, isOut: false, splits: 0 });
    myarray.push({ id: 3, name: "Theubald", chips: imoney, isDeciding: true, isOut: false, splits: 0 });
    console.log(myarray);
    let tempoarray  =[]; 

    tempoarray.push(dealer);


    for(let i = 0 ; i<params.numberPlayers -1 ; i++){
        tempoarray.push(myarray[i]);  
    }

    let somePlayers: ReadonlyArray<Player> = tempoarray;
    this.store.dispatch(createPlayers({ somePlayers }));
    this.passIndex = 0;
    this.emptyHands();
    
  }

  addPlayers() {
    //todo create pack generator + modify card ids 
    let imoney: number = 200;
    let dealer: Player = { id: 0, name: "Mr.House", chips: imoney, isDeciding: false, isOut: false, splits: 0 }
    let You: Player = { id: 1, name: "You", chips: imoney, isDeciding: false, isOut: false, splits: 0 }
    let MissFortune: Player = { id: 2, name: "Miss Fortune", chips: imoney, isDeciding: false, isOut: false, splits: 0 }
    let some: Player = { id: 3, name: "Theubald", chips: imoney, isDeciding: true, isOut: false, splits: 0 }
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
    this.store.select(selectPwithhands).subscribe(res => players = res);
    if (players) {
      players.forEach((x: Player,) => (
        this.dealRandom(x.id, "firstHand")
      ));
    }
    //Cards have to be dealt clockwise   
    players.forEach((x: Player,) => (
      this.dealRandom(x.id, "firstHand")
    ));
  }

  emptyHands() {
    let players: any;
    let house: Player;
    this.players$.subscribe((res) => {
      players = res;
    })
    this.dealer$.subscribe(res => house = res)

    this.store.dispatch(emptyHand({ tempoplayer: house }))
    players.forEach((x: Player) => {
      if (x.chips > 0) {
        this.store.dispatch(emptyHand({ tempoplayer: x }))
      }
    });
  }



  firstPass() {
    //check there's a value , fold them if they don't play 
    this.passIndex += 1;

    let firstPhs: Array<PlayerHand>;
    this.store.select(selectFirstHands()).subscribe((res) => { firstPhs = res });
    firstPhs.forEach(element => {
      if (element.chipsRaised == 0) {
        this.store.dispatch(isOut({ playerId: element.userId }))
        this.store.dispatch(trash({ playerId: element.userId }))
      } else {
        //this.store.dispatch(commitChips({ playerHand: element }));
      }
    });

    let unfold;
    this.store.select(selectPwithhands).subscribe(res => unfold = res)

    if (unfold.length > 0) {
      this.dealFirstHand()
    } else {
      //restart round
      this.store.dispatch(trash({ playerId: 0 }));
      this.emptyHands();
      //reset House hand
      this.passIndex = 0;
    }
  }

  secondPass() {
    //reveal house second card, display wins and losses 
    this.passIndex += 1;
    let allPHs;
    //dealing card to Mr.house
    let houseId: number;

    this.dealer$.subscribe((res) => { houseId = res.id })
    let houseHand;
    this.store.select(selectPlayerHandByIds(houseId, "firstHand")).subscribe(
      (res: PlayerHand) => { houseHand = res }
    )

    this.store.select(selectPHwithoutHouse(0)).subscribe(
      (res) => {
        allPHs = res;
      }
    )


    while (houseHand.cardsValue < 17) {
      this.dealRandom(houseId, "firstHand");
    }
    //Players are loosing against a  house blackjack 
    if (houseHand.status == "blackjack") {
      allPHs.forEach(element => {
        if (element.status != "blackjack") {
          this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "loss", chipGained: 1 }))
        }
        //a player has a blackjack too , that's a push 
        else {
          this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "push", chipGained: 1 }))
        }
      });
    }
    if (houseHand.status == "busted") {
      allPHs.forEach(element => {
        if (element.status == "blackjack") {
          this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "win", chipGained: 1.5 }))
        }
        else {
          if (element.status == "busted") {
            this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "loss", chipGained: 0 }))
          } else {

            this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "win", chipGained: 2 }))

          }
        }
      });
    }
    else {

      allPHs.forEach(element => {

        if (element.status == "blackjack") {
          this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "win", chipGained: 1.5 }))
        }
        else {
          if (element.status == "busted") {
            this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "loss", chipGained: 1 }))
          } else {
            if (element.cardsValue < houseHand.cardsValue) {
              this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "loss", chipGained: 1 }))
            }
            if (element.cardsValue > houseHand.cardsValue) {
              this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "win", chipGained: 2 }))
            }
            if (element.cardsValue == houseHand.cardsValue) {
              this.store.dispatch(setWinloss({ id: element.id, userId: element.userId, winlossString: "push", chipGained: 1 }))
            }
          }
        }
      });
    }
  }

  //deal chips , start a new turn,
  thirdPass() {
    let allPHs
    let players;

    this.store.select(selectPHwithoutHouse(0)).subscribe(
      (res) => {
        allPHs = res;
      }
    )

    allPHs.forEach(element => {
      //if that hand won , gain the chips 
      if (element.winloss == "win" || element.winloss == "push") {
        this.store.dispatch(winChips({ playerId: element.userId, pchips: Math.round(element.chipsRaised * element.chipsGainsRatio) }))
      }
      this.store.select(selectAllPlayers).subscribe((res) => {
        players = res
      })
      players.forEach(element => {
        this.store.dispatch(resetSplits({playerId:element.id}));
        this.store.dispatch(trash({ playerId: element.id }));
      });

      this.store.dispatch(trash({ playerId: 0 }));
      this.emptyHands();
      //reset House hand
      this.passIndex = 0;


    });



  }


  nextTurn() {
    if (this.passIndex == 0) {
      this.firstPass()
      return;
    }
    if (this.passIndex == 1) {
      this.secondPass();
      return;
    }
    if (this.passIndex == 2) {
      this.thirdPass();
      return;
    }
  }








}















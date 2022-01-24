import { Component, OnInit } from '@angular/core';

import { DealerService } from '../dealer.service';
import { Card } from '../cards.model';
//store related import 
import { selectCards, selectPickRandomOne } from '../state/cards.selector';
import { selectAllPlayers, selectPlayerById, selectDealer } from '../state/playerhands.selector';
import {
  createdPack,
  addCard,
  drawCard,
  dealCard,
  createPlayers
} from '../state/pack.actions';
import { Store } from '@ngrx/store';
import { PlayerHand } from '../playerHands.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  pack$ = this.store.select(selectCards);
  players$ = this.store.select(selectAllPlayers);

  dealer$ = this.store.select(selectDealer)

  onAdd(cardId: string) {
    this.store.dispatch(addCard({ cardId }));
  }

  dealrandom(playerId: number) {
    let randomCard!: Card;
    let tempoplayer!: PlayerHand;
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

  constructor(
    private dearlerService: DealerService,
    private store: Store
  ) { }

  ngOnInit() {

  }

  initGame() {
    //todo create pack generator + modify card ids 
    this.dearlerService
      .createPack()
      .subscribe((somepack) => this.store.dispatch(createdPack({ somepack })));

    let imoney: number = 500;
    let dealer: PlayerHand = { id: 0, name: "Mr.House", hand: [], money: imoney }
    let Youc: PlayerHand = { id: 1, hand: [], name: "You", money: imoney };
    let MissFortune: PlayerHand = { id: 2, hand: [], name: "Miss Fortune", money: imoney }
    let somePlayers: ReadonlyArray<PlayerHand> = [dealer, Youc, MissFortune]
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

}





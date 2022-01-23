import { Component, EventEmitter } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from './cards.model';
import { first } from 'rxjs/operators';
//store related import 
import { selectCards, selectPickRandomOne } from './state/cards.selector';
import { selectPlayerHand, selectPlayerHandState } from './state/playerhands.selector';
import {
  createdPack,
  addCard,
  drawCard,
  dealCard,
  createPlayers
} from './state/pack.actions';
import { Store } from '@ngrx/store';
import { PlayerHand } from './playerHands.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pack$ = this.store.select(selectCards);
  //hand$ = this.store.select(selectCardCollection);

  onAdd(cardId: string) {
    this.store.dispatch(addCard({ cardId }));
  }

  dealrandom() {
    let randomCard: Card ;
    let tempoplayer: PlayerHand ;
    this.store.select(selectPickRandomOne).subscribe(res => { randomCard = res })
    this.store.select(selectPlayerHand(0)).subscribe((res) => {tempoplayer = res});
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
    this.dearlerService
      .createPack()
      .subscribe((somepack) => this.store.dispatch(createdPack({ somepack })));
    
    let imoney: number = 500; 
    let dealer: PlayerHand = {id:0 , name:"Mr.House", hand:[], money:imoney}
    let aplayer:PlayerHand = {id: 1 , hand: [], name: "You", money: imoney};
    let aplayer2:PlayerHand = {id: 2 , hand: [], name:"Miss Fortune", money: imoney}
    let somePlayers: ReadonlyArray<PlayerHand> = [aplayer, aplayer2]
    this.store.dispatch(createPlayers({somePlayers}))
  }

  game(){

  }




}
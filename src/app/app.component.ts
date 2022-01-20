import { Component, EventEmitter } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from './cards.model';
import { first } from 'rxjs/operators';
//store related import 
import { selectCards, selectCardCollection, selectPickRandomOne } from './state/cards.selector';
import {
  createdPack,
  addCard,
  drawCard,
  dealCard
} from './state/pack.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pack$ = this.store.select(selectCards);
  hand$ = this.store.select(selectCardCollection);

  onAdd(cardId: string) {
    this.store.dispatch(addCard({ cardId }));
  }
  dealrandom(){
    let randomCard: Card ;
     this.store.select(selectPickRandomOne).subscribe(res => {randomCard = res});
    let tempPayload = {playerIdToDeal:0 , cardToDeal:  randomCard}
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
/*         let pack = this.dearlerService.createPack();
        console.log(pack);
        this.store.dispatch(createdPack({ pack }));  */
    this.dearlerService
      .createPack()
      .subscribe((somepack) => this.store.dispatch(createdPack({ somepack })));


  }

}
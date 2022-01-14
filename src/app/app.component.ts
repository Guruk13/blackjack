import { Component } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from './cards.model';

//store related import 
import { selectCards, selectCardCollection } from './state/cards.selector';
import {
  createdPack,
  addCard,
  drawCard
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
 
  onRemove(cardId: string) {
    this.store.dispatch(drawCard({ cardId }));
  }
 
  constructor(
    private dearlerService: DealerService,
    private store: Store
  ) {}
 
  ngOnInit() {
    let pack = this.dearlerService.createPack();
    this.store.dispatch(createdPack({ pack }));
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCards, selectDealer, selectPossessedCards } from 'app/state/player.selector';
import { PossessedCard } from 'app/models/possessedCards.model';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  public dealer$: Player;
  public cards$: PossessedCard[];


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectDealer()).subscribe(dealer => {
      this.dealer$ = dealer;
      if(dealer){
        this.store.select(selectPossessedCards(this.dealer$.id)).subscribe(cards => {
          this.cards$ = cards
        });
      }
    });


  }



}

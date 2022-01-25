import { Component, OnInit, Input } from '@angular/core';
import { PlayerHand } from 'app/playerHands.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCardsp, selectDealer } from 'app/state/player.selector';
import { PossessedCard } from 'app/possessedCards.model';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  public dealer$: PlayerHand;
  public cards$: any;


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectCardsp()).subscribe(cards => {
      this.cards$ = cards
    });


    this.store.select(selectDealer()).subscribe(dealere => {
      this.dealer$ = dealere
    });
  }

  get playerInfo ()  { return (this.dealer$) ? this.dealer$ : null }


}

import { Component, OnInit, Input } from '@angular/core';
import { PlayerHand } from 'app/playerHands.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDealer } from 'app/state/playerhands.selector';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
    public dealer$: PlayerHand; 


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectDealer()).subscribe(dealere => {
      this.dealer$ = dealere[0]
    })

  }

  lol(){
    console.log(this.dealer$)
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { selectCards, selectDealer, selectPossessedCards } from 'app/state/player.selector';
import { PossessedCard } from 'app/models/possessedCards.model';
import { DealerService } from 'app/dealer.service';

// RxJS v6+
import { of } from 'rxjs';
//emits any number of provided values in sequence



@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  public dealer$: Observable<Player>;
  public cards$: PossessedCard[] | undefined;


  constructor(private store: Store, private dealerService: DealerService) { }

  test() {

  }

  ngOnInit(): void {
    this.dealer$ = this.dealerService.getDealer()
  }



}

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

  ngOnChanges(changes) {

      // deal with asynchronous Observable result
      console.log("Observeable dealer$ changed, here is what happened");
      
    
  }


  ngOnInit(): void {
    this.dealer$ = this.dealerService.getDealer()
    //this.dealer = of(1, 2, 3, 4, 5)//);
    //console.log(this.dealer);
    //@TODO access dealer from dealerservice
    /*      this.dealerService.getDealer().subscribe(dealer => {
          this.dealer = dealer;
          console.log(dealer);
          if(dealer){
            this.store.select(selectPossessedCards(this.dealer.id)).subscribe(cards => {
              this.cards$ = cards
            });
          }
        });  */

  }



}

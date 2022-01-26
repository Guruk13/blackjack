import { Component, OnInit, Input} from '@angular/core';
import { Player } from 'app/models/player.model';
import { PossessedCard } from 'app/models/possessedCards.model';
import { Store } from '@ngrx/store';
import { selectPossessedCards } from 'app/state/player.selector';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() cards$: PossessedCard[] | undefined ; 

  constructor(
    private store:Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectPossessedCards(this.player.id)).subscribe(cards => {
      this.cards$ = cards
    });


  }

}

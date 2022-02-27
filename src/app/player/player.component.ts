import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { PossessedCard } from 'app/models/possessedCards.model';
import { Store } from '@ngrx/store';
import { selectPlayerById, selectPossessedCards, selectUnfoldedPlayers } from 'app/state/player.selector';
import { DealerService } from '../dealer.service'
import { selectPlayerHandCollections } from 'app/state/playerHand.selector';
import { acessor, isOut } from '../state/pack.actions'



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;


  constructor(
    private store: Store,
    private dealerService: DealerService
  ) { }

  ngOnInit(): void {
    this.store.select(selectUnfoldedPlayers).subscribe((res) => {
    })
  }

}






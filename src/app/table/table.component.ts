import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';
import { Player } from 'app/models/player.model';
import { selectAllPlayers,selectPlayers } from 'app/state/player.selector';
import { selectPlayerHand, selectPlayerHandCollections} from 'app/state/playerHand.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  players$;
  playerHandCards$;


  constructor(private store: Store, private dealerService: DealerService) { }

  ngOnInit() {
    this.dealerService.initGame();
    this.players$ = this.store.select(selectAllPlayers);

    
  }





}





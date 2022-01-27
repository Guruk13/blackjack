import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';
import { Player } from 'app/models/player.model';
import { selectAllPlayers } from 'app/state/player.selector';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public players$: Player[];

  constructor(private store: Store, private dealerService: DealerService) { }


  ngOnInit() {
    this.dealerService.initGame();
    this.store.select(selectAllPlayers()).subscribe(
      players => {
        this.players$ = players;

      }
    )
  }



}





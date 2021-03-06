import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';

import { DealerService } from '../dealer.service'



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

  }

}






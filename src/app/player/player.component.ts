import { Component, OnInit, Input} from '@angular/core';
import { Player } from 'app/models/player.model';
import { PossessedCard } from 'app/models/possessedCards.model';
import { Store } from '@ngrx/store';
import { selectPossessedCards } from 'app/state/player.selector';
import {DealerService} from '../dealer.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
 

  constructor(
    private store:Store,
    private dealerService:DealerService
  ) { }

  //could use effect 
  checkTurn(){
    
  }

  ngOnInit(): void { 
    
  }

  check(){
    this.dealerService.shiftDecision();
  }




}

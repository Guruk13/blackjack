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
 

  constructor(
    private store:Store
  ) { }

  //could use effect 
  checkTurn(){
    
  }

  ngOnInit(): void { 
    
  }
  playerChips(){
    return 30 ; 
  }


}

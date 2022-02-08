import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import {Card} from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { Playerhand } from 'app/models/playerHand';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() hands:Array<Playerhand>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    
  }

  playerChips(){
    return 30 ; 
  }


}

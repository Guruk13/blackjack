import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import { selectPossessedCards } from 'app/state/player.selector';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() playerId:number;
  cards$
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cards$ = this.store.select(selectPossessedCards(this.playerId));
  }


}

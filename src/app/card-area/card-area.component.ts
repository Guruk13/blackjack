import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import {Card} from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { selectPlayerHand, selectPlayerHandCollections} from 'app/state/playerHand.selector';
import { PlayerHand } from 'app/models/playerHand.model';


//Form related imports 
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() playerId:number;
  @Input() chipsSum:number ;
  playerHandState$

  handsFormGroup = this.fb.group({
    firstName: ['', ],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  

  constructor(private store: Store, private fb: FormBuilder) { }


  get aliases() {
    return this.handsFormGroup.get('aliases') as FormArray;
  }


  ngOnInit(): void {
    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
  }




}


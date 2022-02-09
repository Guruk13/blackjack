import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import {Card} from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { Playerhand } from 'app/models/playerHand';


//Form related imports 
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() hands:Array<Playerhand>;
  @Input() chipsSum:number ; 

  profileForm = this.fb.group({
    aliases: this.fb.array([

    ])
  });

  

  constructor(private store: Store, private fb: FormBuilder) { }


  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }


  ngOnInit(): void {
    
  }




}

import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import {Card} from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { selectPlayerHand, selectPlayerHandCollections} from 'app/state/playerHand.selector';
import { PlayerHand } from 'app/models/playerHand.model';
//rxjs 
//https://medium.com/bytelimes/truly-reactive-forms-in-angular-a-unique-approach-cae9be6d7459
import {filter } from 'rxjs/operators'
import { map } from "rxjs/operators"; 
import{Observable} from 'rxjs'
import 'rxjs/add/operator/map';


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
  //to help determine forms and such 
  handSubscription; 
  formArray$

  form:Observable<FormArray>

  handsFormGroup = this.fb.group({
    firstName: ['', ],
    aliases: this.fb.array([
    ])
  });

  

  constructor(private store: Store, private fb: FormBuilder) { }


  get aliases() {
    return this.handsFormGroup.get('aliases') as FormArray;
  }


  ngOnInit(): void {
    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips 

    this.formArray$ = this.playerHandState$.pipe(
      map(posts => this.fb.array(posts.map(post => this.fb.group(post))))
    );



  }




}


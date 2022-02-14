import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import {Card} from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { selectPlayerHand, selectPlayerHandCollections} from 'app/state/playerHand.selector';
import { PlayerHand} from 'app/models/playerHand.model';
//rxjs 
//https://medium.com/bytelimes/truly-reactive-forms-in-angular-a-unique-approach-cae9be6d7459
import {filter } from 'rxjs/operators'
import { map } from "rxjs/operators"; 
import{Observable} from 'rxjs/observable'
import { MatTableDataSource } from '@angular/material/table/table-data-source';




//Form related imports 
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { playerHandsReducer } from 'app/state/playerHandReducer';


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
 

  form: FormGroup;
  dataSource:MatTableDataSource<any>;


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

    //chain subscription is bad ima do it yes i am 
    this.playerHandState$.subscribe((res) => {return res}).pipe(map((ph : PlayerHand [] )=>{
      const fgs = ph.map( PlayerHand.asFormGroup)
      return new FormArray(fgs);
    }))
    //almuservice
    .subscribe(playerhands =>{
      this.form.setControl('playerhands',playerhands);
    })
    this.dataSource = new MatTableDataSource((this.form.get('playerhands') as FormArray).controls);

  }
  get playerhands():FormArray{
    return this.form.get('playerhands') as FormArray;
  }




}


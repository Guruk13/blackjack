import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Player } from 'app/models/player.model';
import { Store } from '@ngrx/store';
import { Card } from 'app/models/cards.model'
import { selectPossessedCards } from 'app/state/player.selector';
import { selectPlayerHand, selectPlayerHandCollections } from 'app/state/playerHand.selector';
import { PlayerHand } from 'app/models/playerHand.model';
//rxjs
//https://medium.com/bytelimes/truly-reactive-forms-in-angular-a-unique-approach-cae9be6d7459
import { filter } from 'rxjs/operators'
import { map, mergeMap } from "rxjs/operators";
import { Observable } from 'rxjs/observable'

import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {selectPlayerById} from '../state/player.selector'

import { DealerService } from '../dealer.service';




//Form related imports
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { playerHandsReducer } from 'app/state/playerHandReducer';
import { splitPair, setSplittable, changeChipCount } from 'app/state/pack.actions';
import { parseHostBindings } from '@angular/compiler';


@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() playerId: number;
  @ViewChild(MatTable) myTable!: MatTable<any>;
  playerHandState$
  //to help determine forms and such
  splitable = true;
  availableMoney:number;


  form: FormGroup;
  dataSource = new MatTableDataSource<PlayerHand>();
  displayedColumns = ['pcardsCol', 'chipsraised',  'raiseSplit', 'cardsValueCol' ]



  constructor(private store: Store, private fb: FormBuilder, private dealerService: DealerService) { }


  randomarray: Array<string>;

  ngOnInit(): void {
    this.form = this.fb.group({
      playerhands: this.fb.array([])
    });

    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips
    this.store.select(selectPlayerById(this.playerId)).subscribe(res => this.availableMoney = res.chips);
    //is it splitable ?
    this.playerHandState$.subscribe((phs)=>{
      this.dataSource.data = phs;
    })

  }

  get playerhands(): FormArray {
    return this.form.get('playerhnds') as FormArray;
  }

  lograndom(string: string) {

  }

  getCard(playerid, handId) {
    this.dealerService.dealRandom(playerid, handId);
  }

  split(pplayerId, pid) {
    this.dealerService.split(pplayerId, pid)
  }

  increaseRaise(playerId, chipsraised,phandId){
    if(this.availableMoney>0){
      let pchipsraised =  chipsraised +1 ;
      let newchips = this.availableMoney - 1 ;
      this.store.dispatch(changeChipCount({playerId: playerId,handId: phandId, pchips : newchips , newchipsraised: pchipsraised}))
    }
  }
  decreaseRaise(playerId, chipsraised,phandId){
    if(chipsraised>0){
      let pchipsraised =  chipsraised -1 ;
      let newchips = this.availableMoney + 1 ;
      this.store.dispatch(changeChipCount({playerId: playerId,handId: phandId, pchips : newchips , newchipsraised: pchipsraised}))
    }
  }












}


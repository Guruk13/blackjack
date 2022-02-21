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
import { splitPair } from 'app/state/pack.actions';
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
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['chipsraised', 'pcardsCol', 'raiseSplit']



  constructor(private store: Store, private fb: FormBuilder, private dealerService: DealerService) { }


  randomarray: Array<string>;

  ngOnInit(): void {
    this.form = this.fb.group({
      playerhands: this.fb.array([])
    });

    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips
    this.store.select(selectPlayerById(this.playerId)).subscribe(res => this.availableMoney = res.chips);


    this.playerHandState$.pipe(map((ph: PlayerHand[]) => {
      const fgs = ph.map(
        (phToFG) => {
          return new FormGroup({
            userId: new FormControl(phToFG.userId, Validators.required),
            id: new FormControl(phToFG.id, Validators.required),
            chipsraised: new FormControl(phToFG.chipsraised, [Validators.required, Validators.min(phToFG.chipsraised), Validators.max(this.availableMoney)]),
            playerhands: new FormArray(phToFG.possessedCardsCollection.map((card) => {
              return new FormControl(card)
            }))
          });
        })
      return fgs;
    }))




      //very inneficient : should handle new hands and add to form array instead of clearing all of them . then an observeable could be fed into the datasource or use ngrx effect ? 
      //what it does clear form , push every formgroup
      .subscribe(playerhands => {
        this.playerhands.clear()
        playerhands.map((playerhand) => {
          this.playerhands.push(playerhand);
        })

        this.playerhands.controls.forEach(
          control => {
            
            control.valueChanges.subscribe(
              () => {

                if( control.get('chipsraised').value > this.availableMoney){
                  control.get('chipsraised').setErrors({maxChips: true})
                }else{
                  control.get('chipsraised').setErrors({maxChips: false})
                }
              }
            )
          }
        )
      })


    
    this.dataSource = new MatTableDataSource((this.form.get('playerhands') as FormArray).controls);


  }

  get playerhands(): FormArray {
    return this.form.get('playerhands') as FormArray;
  }
  lograndom(string: string) {
    console.log(string)
  }

  getCard(playerid, handId) {
    this.dealerService.dealRandom(playerid, handId);
  }

  split(pplayerId, pid) {
    this.dealerService.split(pplayerId, pid)
  }










}


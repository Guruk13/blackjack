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



//Form related imports
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { playerHandsReducer } from 'app/state/playerHandReducer';


@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() playerId: number;
  @Input() chipsSum: number;
  @ViewChild(MatTable) myTable!: MatTable<any>;
  playerHandState$
  //to help determine forms and such


  form: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'chipsraised']



  constructor(private store: Store, private fb: FormBuilder) { }


  randomarray: Array<string>;

  ngOnInit(): void {
    this.form = this.fb.group({
      playerhands: this.fb.array([])
    });

    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips


this.playerHandState$.pipe(map((ph: PlayerHand[]) => {
      const fgs = ph.map(
        (phToFG) => {
          return new FormGroup({
            userId: new FormControl(phToFG.userId, Validators.required),
            id: new FormControl(phToFG.id, Validators.required),
            chipsraised: new FormControl(phToFG.chipsraised, Validators.required),
          });
        })
      return fgs;
    }))
    //very inneficient : should handle new hands and add to form array instead of clearing all of them . then an observeable could be fed into the datasource
    //what it does clear form , push every formgroup
    .subscribe(playerhands => {
      this.playerhands.clear()
      playerhands.map((playerhand) => {
        this.playerhands.push(playerhand);
      })
      if(this.myTable){this.myTable.renderRows();}
    })
    this.dataSource = new MatTableDataSource( (this.form.get('playerhands') as FormArray).controls
      );






  }
  get playerhands(): FormArray {
    return this.form.get('playerhands') as FormArray;
  }

  logForm() {
    this.myTable.renderRows();
    console.log((this.form.get('playerhands') as FormArray).controls);
  }




}


import { Component, OnInit, ViewChild} from '@angular/core';
import { Player } from 'app/models/player.model';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { DealerService } from 'app/dealer.service';


import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {selectPlayerById} from '../state/player.selector'

import {  selectPlayerHandByIds, selectPlayerHandCollections } from 'app/state/playerHand.selector';

// RxJS v6+
import { PlayerHand } from 'app/models/playerHand.model';
//emits any number of provided values in sequence



@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})


export class DealerComponent implements OnInit {
  public dealer$: Observable<Player>;
  public cards$: Array<PlayerHand>
  @ViewChild(MatTable) myTable!: MatTable<any>;
  playerHandState$
  playerId; 


  dataSource = new MatTableDataSource<PlayerHand>();
  displayedColumns = [  'cardsValueCol', 'pcardsCol', ]



  constructor(private store: Store,  private dealerService: DealerService) { }


  randomarray: Array<string>;

  ngOnInit(): void {
    
    this.dealer$ = this.dealerService.getDealer()
     this.dealer$.subscribe((res)=>{
      this.playerId = res.id
    })

    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips
    //is it splitable ?
    this.playerHandState$.subscribe((phs)=>{
      this.dataSource.data = phs;
    })

  }


  firstTurn(){
    this.dealerService.firstPass();
  }



}

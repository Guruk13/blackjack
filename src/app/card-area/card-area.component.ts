import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {  selectPlayerHandByIds, selectPlayerHandCollections } from 'app/state/playerHand.selector';
import { PlayerHand } from 'app/models/playerHand.model';
//rxjs
//https://medium.com/bytelimes/truly-reactive-forms-in-angular-a-unique-approach-cae9be6d7459


import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {selectPlayerById} from '../state/player.selector'

import { DealerService } from '../dealer.service';




//Form related imports
import { FormBuilder,  FormGroup,  } from '@angular/forms';

import { splitPair,  changeChipCount, setDoubleable } from 'app/state/pack.actions';



@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.scss']
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
  displayedColumns = [ 'chipsraised',  'raiseSplit', 'cardsValueCol', 'pcardsCol', ]



  constructor(private store: Store, private fb: FormBuilder, private dealerService: DealerService) { }


  randomarray: Array<string>;

  ngOnInit(): void {
    this.form = this.fb.group({
      playerhands: this.fb.array([])
    });

    this.playerHandState$ = this.store.select(selectPlayerHandCollections(this.playerId));
    //@TODO an observeable of hands.chips
    this.store.select(selectPlayerById(this.playerId)).subscribe(res => this.availableMoney = res.chips);
    this.playerHandState$.subscribe((phs)=>{
      this.dataSource.data = phs;
    })

  }


  isSplittable(pchips, puserId, psplittable){
    let player; 
    this.store.select(selectPlayerById(puserId)).subscribe((res)=>{
      player = res;
    })
    if(player.splits<2 && pchips <= this.availableMoney ){
      return true
    }
    return false;
    
  }



  getCard(playerid, handId) {
    this.dealerService.dealRandom(playerid, handId);
  }

  split(pplayerId, pid) {
    let theHand: PlayerHand ;
     this.store.select(selectPlayerHandByIds(pplayerId, pid)).subscribe((res)=>{
       theHand = res
     })
    this.store.dispatch(splitPair({hand: theHand} ))
  }

  increaseRaise(playerId, chipsraised, phandId){
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


  passIndex(){
    return this.dealerService.passIndex
  }


  isDoubleable(chipsRaised ,pplayerId, pid){


    let theHand: PlayerHand ;
    this.store.select(selectPlayerHandByIds(pplayerId, pid)).subscribe((res)=>{
      theHand = res
    })
    if( theHand.doubleable == true ){
      return true
    }
    return false; 

  }


  
  handRecap(situation, ratio, chips){
    let recap: string
    if(situation=="win"){
      recap = "This hand got you " + (Math.round(ratio * chips)).toString() + " chips"; 
    }
    if(situation=="loss"){
      recap = "You lost " + (Math.round(ratio * chips)).toString() + " chips with that hand"; 
    }
    if(situation=="push"){
      recap = "Tie, have your " + (Math.round(ratio * chips)).toString() + "chips back"; 
    }

    return recap


  }

  double(playerId, phandId,chipsCo){
    this.store.dispatch(setDoubleable({userId: playerId,id: phandId, doubleable: false}))
      this.store.dispatch(changeChipCount({playerId: playerId,handId: phandId,pchips: this.availableMoney-chipsCo , newchipsraised: chipsCo*2}));
      this.getCard(playerId, phandId);
    }
  }









import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DealerService } from '../dealer.service';
import { Card } from '../card';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  subscription: Subscription; 
  tablepack: Card[] = []


  constructor(private dealerService: DealerService) { }

  ngOnInit(): void {
    this.subscription =  this.dealerService.currentPack.subscribe(pack => this.tablepack = pack)
  }

  getSingleDeck(){
    return this.dealerService.getClassicDeck()
    }

}

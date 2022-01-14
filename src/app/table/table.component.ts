import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DealerService } from '../dealer.service';
import { Card } from '../cards.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  subscription!: Subscription; 
  tablepack: Card[] = []


  constructor(private dealerService: DealerService) { }

  ngOnInit(): void {

  }

  getSingleDeck(){

    }

}

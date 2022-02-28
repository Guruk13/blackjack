import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/cards.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  image?: string
  cardNumber?: string
  url: string

  constructor() { }

  ngOnInit(): void {
    this.cardNumber = this.card.id[0];
    if (this.card.title) {
      this.cardNumber = this.card.title[0];
    }


  }

}

import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Card } from '../cards.model';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() hand: ReadonlyArray<Card> = [];
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}

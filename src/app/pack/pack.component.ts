import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../cards.model';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {
  @Input() pack: ReadonlyArray<Card> = [];
  @Output() add = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  

}

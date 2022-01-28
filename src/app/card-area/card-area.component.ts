import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/player.model';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  @Input() player:number;
  constructor() { }

  ngOnInit(): void {
  }

}

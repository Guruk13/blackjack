import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.scss']
})
export class TechniqueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  codeString(){
    return                     "immerOn(dealCard, (state, { tempoplayer, cardToDeal, handIdentifier }) => { <br>" +
      "let firstHand = state.find((hand) => <br>"+
        "hand.userId === tempoplayer.id && handIdentifier === hand.id)<br> "+
      "firstHand.possessedCardsCollection.push(cardToDeal)<br>"+
      "...<br>"+
      "}";
  }

}

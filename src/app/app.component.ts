import { Component } from '@angular/core';
import { DealerService } from './dealer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dealerservice: DealerService ) {

  }
  title = 'blackprack';
  logDeck(){
    let singleDeck = this.dealerservice.getClassicDeck;
    console.log(singleDeck());
    console.log('hello');
  }


}

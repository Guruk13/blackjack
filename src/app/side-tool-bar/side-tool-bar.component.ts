import { Component, OnInit } from '@angular/core';
import { DealerService } from 'app/dealer.service';

@Component({
  selector: 'app-side-tool-bar',
  templateUrl: './side-tool-bar.component.html',
  styleUrls: ['./side-tool-bar.component.css']
})
export class SideToolBarComponent implements OnInit {

  constructor(private dealerService: DealerService) {

  }

  ngOnInit(): void {

  }
  game(){
    this.dealerService.game();
  }

  dealAll(){
    this.dealerService.dealAll();
  }

  test(){
    this.dealerService.test();
  }
  shiftDecision(){
    this.dealerService.shiftDecision();
  }
  

}

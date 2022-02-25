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

  firstPass()
  {
    this.dealerService.firstPass(); 
  }

  secondPass()
  {
    this.dealerService.secondPass(); 
  }




}

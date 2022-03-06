import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core'
import { UIService } from 'app/ui.service';
import { DealerService } from 'app/dealer.service';



@Component({
  selector: 'app-side-tool-bar',
  templateUrl: './side-tool-bar.component.html',
  styleUrls: ['./side-tool-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class SideToolBarComponent implements OnInit {
  paramsGame: FormGroup;
  
  numberPlayerControl = new FormControl(3, [Validators.min(1), Validators.max(3)],);
  chipsControl = new FormControl(150, [Validators.min(1), Validators.max(999)],);

  constructor(fb: FormBuilder, private uiservice:UIService, private dealerService: DealerService) {
    this.paramsGame = fb.group({
      chips: this.chipsControl,
      numberPlayers: this.numberPlayerControl,
    });
  }



  ngOnInit(): void {
    

  }

  onSubmit(): void {

    console.log( this.paramsGame.value);
    this.paramsGame.reset();
    this.dealerService.resetGame(this.paramsGame.value);

  }


  
}

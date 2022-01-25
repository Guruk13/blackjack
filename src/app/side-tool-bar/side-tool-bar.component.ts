import { Component, OnInit, ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';


@Component({
  selector: 'app-side-tool-bar',
  templateUrl: './side-tool-bar.component.html',
  styleUrls: ['./side-tool-bar.component.css']
})
export class SideToolBarComponent implements OnInit {

  event: Event; 

  constructor() {

  }
  openNav(event: Event){
    this.event = event;    
  }



  ngOnInit(): void {

  }

}

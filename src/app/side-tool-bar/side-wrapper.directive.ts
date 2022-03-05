import { Directive, ElementRef, Renderer2, Input,} from '@angular/core';
import {UIService} from '../ui.service'

@Directive({
  selector: '[SideWrapperDirective]',
  exportAs: 'openme'
})
export class SideBarWrapperDirective {

  constructor(private renderer: Renderer2, private el: ElementRef, private uiservice: UIService) { }

  open(){
    this.renderer.setStyle(this.el.nativeElement,"width", "100%" )
    this.uiservice.navbar.show();
  }


  close(){
    this.renderer.setStyle(this.el.nativeElement,"width", "0%" )
    this.uiservice.navbar.hide();
  }
  
  ngOnInit() {
    this.uiservice.navbar.hide()
    this.uiservice.side = this;
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.open();
    }
  }

}

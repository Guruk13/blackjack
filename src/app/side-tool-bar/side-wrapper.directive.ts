import { Directive, ElementRef, Renderer2, Input,} from '@angular/core';

@Directive({
  selector: '[SideWrapperDirective]',
  exportAs: 'openmedaddy'
})
export class SideBarWrapperDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  open(){
    this.renderer.setStyle(this.el.nativeElement,"width", "100%" )
  }

  close(){
    this.renderer.setStyle(this.el.nativeElement,"width", "0%" )
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.open();
    }
  }

}

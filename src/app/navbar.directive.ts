
import { Directive, ElementRef, Renderer2, Input,} from '@angular/core';
import {UIService} from './ui.service'


@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective {


  prevScrollpos = window.pageYOffset;
  route;
  boolean= false

  scroll = (event): void => {
    //handle your scroll here
    var currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.renderer.setStyle(this.el.nativeElement,"top", "0" )
    } else {
      this.renderer.setStyle(this.el.nativeElement,"top", "-50px" )
    }
   this.prevScrollpos = currentScrollPos;
  
  };


  show(){

    this.renderer.setStyle(this.el.nativeElement,"top", "0" )
  }

  hide(){
    this.renderer.setStyle(this.el.nativeElement,"top", "-50px" )
  }


  constructor(private renderer: Renderer2,
     private el: ElementRef ,
     private uisService: UIService,

) { }
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.uisService.navbar = this; 
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }









}


import { Directive, HostListener, Output, EventEmitter} from '@angular/core';
import { SideBarWrapperDirective } from './side-wrapper.directive';

@Directive({
  selector: '[SideOpener]'
})
export class SideOpenerDirective {

  constructor() { }

  @Output() eventChange = new EventEmitter<Event>();

  openingClick(event: Event) {
    this.eventChange.emit(event);
  }




}



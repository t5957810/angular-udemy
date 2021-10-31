import { Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
	exportAs: 'appDropdown' 

})
export class DropdownDirective {
  // dropdown 是否開啟
  @HostBinding('class.show') isDropdownOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') showDropdown() {
    if(this.isDropdownOpen != true) {
      this.isDropdownOpen = true;
      return;
    }
    this.isDropdownOpen = false; 
  }
}

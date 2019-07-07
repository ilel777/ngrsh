import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  private visible = false;

  @HostListener('click') onClick(){
    let dropDownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    if(this.visible){
      dropDownMenu.classList.remove('show');
      this.visible = !this.visible;
    }else{
      dropDownMenu.classList.add('show');
      this.visible = !this.visible;
    }
  }

  constructor(private elRef:ElementRef) { }

}

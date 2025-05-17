import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-filter-selectable',
  imports: [],
  template: `
    <div class="{{bg.color}} px-4 py-1 rounded-xl hover:opacity-80">
      <button (click)="handleButtonClick()" class="cursor-pointer">{{label()}}</button>
    </div>
  `,
  styles: ``
})
export class FilterSelectableComponent {
  label = input<string>()
  @Output() selected = new EventEmitter<string>();

  bgSelected = "bg-green-300 "
  bgUnselected = "bg-slate-300 "
  bg:{color: string, selected: boolean} = {color: this.bgUnselected, selected: false}
  
  handleButtonClick(){
    switch(this.bg.selected){
      case false:{
        this.bg = {color:this.bgSelected, selected: true}
        break
      }
      case true:{
        this.bg = {color: this.bgUnselected, selected: false}
        break
      }
    }
    this.selected.emit(this.label())
  }
}

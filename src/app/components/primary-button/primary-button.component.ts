import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button (click)="handleButtonClick()" class="bg-blue-500 text-white w-full border px-4 py-2 rounded-xl shadow-md hover:opacity-90 cursor-pointer active:bg-blue-900">
      {{label()}}
    </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {
  //Signal que le coloca el nombre al componente. Viene dada desde el componente que lo use
  label = input('Button');

  //Signal 
  btnClicked = output();

  handleButtonClick(){
    this.btnClicked.emit();
  }
}

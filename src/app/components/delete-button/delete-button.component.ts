import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  template: `
    <button (click)="btnClicked.emit()" class="bg-red-400 text-red-900 px-5 py-2 text-xl border rounded-xl"> Delete </button>
  `,
  styles: ``
})
export class DeleteButtonComponent {

  btnClicked = output()

}

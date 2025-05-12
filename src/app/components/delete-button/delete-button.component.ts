import { Component, output } from '@angular/core';

/*
      Botón de eliminar

    Es básicamente lo mismo que el primary button pero con otro color
*/
@Component({
  selector: 'app-delete-button',
  imports: [],
  template: `
    <button (click)="btnClicked.emit()" class="bg-red-400 text-red-900 px-5 py-2 text-xl border rounded-xl cursor-pointer active:bg-red-300"> Delete </button>
  `,
  styles: ``
})
export class DeleteButtonComponent {

  // Así se llamará el output del botón cuando sea clickeado
  btnClicked = output()

}

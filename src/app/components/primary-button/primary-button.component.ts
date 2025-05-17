import { Component, input, output } from '@angular/core';

/*
      Botón 
*/
@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
  <div class="{{bgChange()}} rounded-xl shadow-md hover:opacity-90 active:bg-blue-900">
    <button (click)="handleButtonClick()" class="px-4 py-2 text-white text-center w-full h-full cursor-pointer"> {{label()}} </button>
  </div>
  `,
  styles: ``
})
export class PrimaryButtonComponent {
  //Signal que le coloca label al botón. Viene dada desde el componente que lo use
  label = input('Button');

  // Para colocarle distintos colores de background. Por defecto es azul
  bgChange = input<string>("bg-blue-500")

  //Signal de salida del componente
  btnClicked = output();

  handleButtonClick(){
    this.btnClicked.emit();
  }
}

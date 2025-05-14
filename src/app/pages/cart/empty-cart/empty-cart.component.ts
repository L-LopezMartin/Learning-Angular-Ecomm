import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CurrentPageService } from '../../../services/current-page.service';

/*
      Muestra una pantalla si no hay productos en el carrito
*/
@Component({
  selector: 'app-empty-cart',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="border-1 rounded-xl sm:py-8 sm:px-8 p-4 bg-slate-200 flex flex-col items-center sm:w-[600px] w-[80vw] gap-4">
      <h1 class="sm:text-4xl text-2xl text-blue-800 font-bold"> The cart is empty</h1>
      <p class="sm:text-xl text-center"> Go back to the store and add some items! </p>
      <app-primary-button label="Store" class="w-[40%]" (btnClicked)="buttonHandler()"/>
    </div>
  `,
  styles: ``
})
export class EmptyCartComponent {

  pageService = inject(CurrentPageService)

  // El botón devuelve a la página principal (listado de productos)
  buttonHandler(){
    this.pageService.changePage("")
  }
}

import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="px-10 bg-slate-100 py-3 shadow-md flex justify-between items-center">
      <button class="text-xl" routerLink="/">{{title()}} </button>
      <app-primary-button [label]='"Cart(" + this.cart.cart().length + ")"' (btnClicked)="showButtonClicked()" routerLink="/cart"/>
    </div>
  `,
  styles: ` `
})
export class HeaderComponent {

  cart = inject(CartService)

  buttonLabel = signal<String>("Cart(" + this.cart.cart().length + ")")
  title = signal<String>("My Store");

  showButtonClicked(){
    console.log("claaank");
  }

}

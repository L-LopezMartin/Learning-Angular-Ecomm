import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrentPageService } from '../../services/current-page.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="px-10 bg-slate-100 shadow-md flex justify-between items-center h-[70px]">
      <button class="text-xl font-bold hover:cursor-pointer active:text-gray-500" routerLink="/" (click)="goMain()">{{title()}} </button>
      <span class="text-[32px] font-bold text-blue-800">{{pageService.currentPage()}}</span>
      <app-primary-button [label]='"Cart(" + this.cart.cart().length + ")"' (btnClicked)="goCart()" routerLink="/cart"/>
    </div>
  `,
  styles: ` `
})
export class HeaderComponent {

  cart = inject(CartService)

  pageService = inject(CurrentPageService)

  buttonLabel = signal<String>("Cart(" + this.cart.cart().length + ")")
  title = signal<String>("My Store");

  goCart(){
    this.pageService.changePage("Cart")
  }

  goMain(){
    this.pageService.changePage("Main")
  }

}

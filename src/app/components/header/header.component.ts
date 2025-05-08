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
      <app-primary-button [label]="buttonLabel()" (btnClicked)="buttonRoute()" [routerLink]="route()"/>
    </div>
  `,
  styles: ` `
})
export class HeaderComponent {

  cart = inject(CartService)

  pageService = inject(CurrentPageService)

  buttonLabel = signal<string>("Cart(" + this.cart.cart().length + ")")
  title = signal<String>("My Store");

  route = signal<string>("/cart")

  buttonRoute(){
    switch(this.pageService.currentPage()){

      case "Main":
        this.buttonLabel.set("Main")
        this.pageService.changePage("Cart")
        this.route.set("/")
        break

      case "Cart":
        this.buttonLabel.set("Cart(" + this.cart.cart().length + ")")
        this.pageService.changePage("Main")
        this.route.set("/cart")
        break
    }
  }

  goMain(){
    this.buttonLabel.set("Cart(" + this.cart.cart().length + ")")
    this.pageService.changePage("Main")
    this.route.set("/cart")
  }

}

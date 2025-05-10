import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { CurrentPageService } from '../../services/current-page.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="px-10 bg-slate-100 shadow-md flex justify-between items-center h-[70px] w-[100vw]">
      <button class="text-xl font-bold hover:cursor-pointer active:text-gray-500" (click)="goMain()">{{title()}} </button>
      <span class="text-[32px] font-bold text-blue-800">{{pageTitle()}}</span>
      <app-primary-button [label]="buttonLabel()" (btnClicked)="buttonRoute()" class="w-[90px]"/>
    </div>
  `,
  styles: ` `
})
export class HeaderComponent {

  cart = inject(CartService)

  pageService = inject(CurrentPageService)

  pageTitle = signal<string>("Main")

  buttonLabel = signal<string>("Cart(" + this.cart.cart().length + ")")

  title = signal<String>("My Store");
  

  buttonRoute(){
    switch(this.pageService.currentPage()){

      case "":
        this.pageService.changePage("cart")
        this.pageTitle.set("Cart")
        this.buttonLabel.set("Main")
        break

      case "cart":
        this.goMain()
        break
    }
  }

  goMain(){
    this.pageService.changePage("")
    this.pageTitle.set("Main")
    this.buttonLabel.set("Cart(" + this.cart.cart().length + ")")
  }

}

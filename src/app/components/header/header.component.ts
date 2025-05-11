import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { CurrentPageService } from '../../services/current-page.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="px-10 bg-slate-100 shadow-md flex justify-between items-center h-[70px] w-[100vw]">
      <button class="text-xl font-bold hover:cursor-pointer active:text-gray-500" (click)="handleMainButton()"> My Store </button>
      <span class="text-[32px] font-bold text-blue-800">{{pageTitle()}}</span>
      <app-primary-button [label]='"Cart(" + this.cartService.cart().length + ")"' (btnClicked)="handleCartButton()" class="w-[90px] {{hideCart()?'hidden':''}}"/>
      <app-primary-button [label]='"Main"' (btnClicked)="handleMainButton()" class="w-[90px] {{hideCart()?'':'hidden'}}"/>
    </div>
  `
})
export class HeaderComponent {

  cartService = inject(CartService)

  pageService = inject(CurrentPageService)

  pageTitle = signal<string>("Main")

  hideCart = signal<boolean>(true)

  ngAfterContentChecked(){
    this.buttonRoute()
  }

  handleCartButton(){
    this.pageService.changePage("cart")
  }
  handleMainButton(){
    this.pageService.changePage("")
  }

  buttonRoute(){
    switch(this.pageService.currentPage()){

      case "":
        this.pageTitle.set("Main")
        this.hideCart.set(false)
      break
        
      case "cart":
        this.pageTitle.set("Cart")
        this.hideCart.set(true)
      break
    }
  }
}

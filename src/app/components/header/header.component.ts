import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { CurrentPageService } from '../../services/current-page.service';

/*
      Header de la página

    Tiene 3 partes: El logo de la empresa, la página actual y un botón para ir al carrito o al listado de productos
*/
@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="flex flex-row justify-between items-center px-5 bg-slate-100 shadow-md h-[70px] w-[100vw] sm:px-10">
        <button class="text-base sm:text-xl font-bold hover:cursor-pointer active:text-gray-500" (click)="handleMainButton()"> My Store </button>
        <span class="text-[32px] font-bold text-blue-800 hidden sm:block">{{pageTitle()}}</span>
        <span class="text-[28px] font-bold text-blue-800 sm:hidden">{{pageTitle()}}</span>
        
        <!-- De estos dos botones, siempre hay 1 solo activo dependiendo de la página en la que nos encontremos -->
        <app-primary-button [label]='"Cart(" + this.cartService.cart().length + ")"' (btnClicked)="handleCartButton()" class="w-[80px] {{hideCart()?'hidden':''}} text-sm sm:text-base sm:w-[90px]"/>
        <app-primary-button [label]='"Main"' (btnClicked)="handleMainButton()" class="w-[80px] {{hideCart()?'':'hidden'}} text-sm sm:text-base sm:w-[90px]"/>
    </div>
  `,
})
export class HeaderComponent {

  cartService = inject(CartService)

  pageService = inject(CurrentPageService)

  pageTitle = signal<string>("Main")

  hideCart = signal<boolean>(true)


  // Cuando cambie alguna señal (cantidad de productos o página actual), se dispara
  ngAfterContentChecked(){
    this.buttonRoute()
  }


  // El botón que lleva al carrito
  handleCartButton(){
    this.pageService.changePage("cart")
  }
  // El botón que lleva al listado de productos
  handleMainButton(){
    this.pageService.changePage("")
  }

  // Actualiza el título y el botón dependiendo de la página actual
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

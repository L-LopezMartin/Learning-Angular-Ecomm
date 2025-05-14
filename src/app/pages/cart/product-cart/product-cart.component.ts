import { Component, inject, input } from '@angular/core';
import { DeleteButtonComponent } from "../../../components/delete-button/delete-button.component";
import { Cart } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";

/*
      Producto en el carrito de compra
*/
@Component({
  selector: 'app-product-cart',
  imports: [DeleteButtonComponent, PrimaryButtonComponent],
  template: `
    <div class="flex sm:flex-row flex-col justify-between items-center border rounded-xl py-5 px-5 bg shadow-xl">
      <div class="flex sm:flex-row flex-col w-full justify-between items-center mb-5 gap-5 sm:w-[85%]">
        <img [src]="product().product.image" class="sm:w-[25%] w-full h-[200px] object-contain" />
        <div class="flex flex-col justify-around sm:w-[70%] w-full">
          <span class="lg:text-[36px] text-[24px] mb-[20px] font-bold text-balance">{{product().product.title}}</span>
          <span class="lg:text-[24px] text-[18px]">Price for each: $ {{product().product.price}}</span>
          <span class="lg:text-[24px] text-[18px]">Amount {{product().amount}}</span>
          <span class="lg:text-[24px] text-[18px]">Total price: $ {{(product().product.price * product().amount).toFixed(2)}}</span>
        </div>
      </div>
      <div class="flex sm:flex-col flex-row items-center w-full sm:w-[15%]">
        <div class="md:w-[60%] w-full items-center flex sm:flex-col flex-row gap-2">
          <app-primary-button (btnClicked)="addItem()" label="▲"/>
          <app-primary-button (btnClicked)="reduceItem()" label="▼"/>
        </div>
        <app-delete-button (btnClicked)="handleDeleteButton()" class="m-0 sm:mt-7 !text-sm"/>
      </div>
    </div>
  `,
  styles: ``
})
export class ProductCartComponent {
  product = input.required<Cart>() // Es recibido desde el componente principal del carrito en un for

  cart = inject(CartService)

  // Botón de eliminar del carrito
  handleDeleteButton(){
    this.cart.removeFromCart(this.product())
  }

  // Botón de reducir canitdad de un producto
  reduceItem(){
    this.cart.reduceItem(this.product())
  }
  
  // Botón de agregar canitdad de un producto
  addItem(){
    this.cart.addItem(this.product())
  }
}

import { Component, inject, input } from '@angular/core';
import { DeleteButtonComponent } from "../delete-button/delete-button.component";
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-product-cart',
  imports: [DeleteButtonComponent, PrimaryButtonComponent],
  template: `
    <div class="flex justify-between items-center border rounded-xl py-5 px-5 bg shadow-xl">
      <div class="flex justify-between items-center mb-5 gap-5 w-[95%]">
        <img [src]="product().product.image" class="w-[25%] h-[200px] object-contain" />
        <div class="flex flex-col justify-around w-[70%]">
          <span class="text-[36px] mb-[20px] font-bold">{{product().product.title}}</span>
          <span class="text-[24px]">Price for each: $ {{product().product.price}}</span>
          <span class="text-[24px]">Amount {{product().amount}}</span>
          <span class="text-[24px]">Total price: $ {{(product().product.price * product().amount).toFixed(2)}}</span>
        </div>
      </div>
      <div class="flex flex-col items-center mr-10 mt-7 w-[7%]">
        <div class="w-[50%] items-center">
          <app-primary-button (btnClicked)="addItem()" label="▲"/>
          <app-primary-button (btnClicked)="reduceItem()" label="▼"/>
        </div>
        <app-delete-button (btnClicked)="handleDeleteButton()" class="mt-7"/>
      </div>
    </div>
  `,
  styles: ``
})
export class ProductCartComponent {
  product = input.required<Cart>()

  cart = inject(CartService)

  handleDeleteButton(){
    this.cart.removeFromCart(this.product().product)
  }

  reduceItem(){
    this.cart.reduceItem(this.product())
  }
  
  addItem(){
    this.cart.addItem(this.product())
  }
}

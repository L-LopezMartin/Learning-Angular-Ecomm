import { Component, inject, input } from '@angular/core';
import { DeleteButtonComponent } from "../delete-button/delete-button.component";
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-cart',
  imports: [DeleteButtonComponent],
  template: `
    <div class="flex justify-between items-center border rounded-xl py-5 px-15 bg">
      <div class="flex justify-between items-center mb-5">
        <div class="flex flex-col justify-around h-[150px] w-[300px]">
          <span class="text-[36px] mb-[20px] font-bold">{{product().product.title}}</span>
          <span class="text-[24px]">Price for each: $ {{product().product.price}}</span>
          <span class="text-[24px]">Amount {{product().amount}}</span>
          <span class="text-[24px]">Total price: $ {{(product().product.price * product().amount).toFixed(2)}}</span>
        </div>
        <img [src]="product().product.image" class="w-[300px] h-[200px] object-contain" />
      </div>
      <app-delete-button (btnClicked)="handleDeleteButton()"/>
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
}

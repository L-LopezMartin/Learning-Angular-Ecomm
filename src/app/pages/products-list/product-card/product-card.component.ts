import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
  {{checkAdded()}}
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img [src]="product().image" class="w-[200px] h-[100px] object-contain"/>
      </div>
      <div class="flex flex-col mt-2">
        <span class="text-md font-bold">{{product().title}}</span>
        <span class="text-sm">{{"$" + product().price}}</span>
        <app-primary-button [label]="buttonLabel" class="mt-3" [bgChange]="buttonBgChange" (btnClicked)="btnClickHandler()"/>
      </div>
      <span class="absolute top-2 right-3 text-sm font-bold" [class] = "
  product().stock ? 'text-green-500' : 'text-red-500'">
        @if (product().stock) {
          {{product().stock}} left
        } @else {
          Out of stock
        }
      </span>
    </div>
  `,
  styles: ``
})
export class ProductCardComponent {

  cart = inject(CartService)

  product = input.required<Product>();

  buttonLabel = "Add to cart"

  buttonBgChange = "bg-blue-500"

  checkAdded(){
    for(var item of this.cart.cart()){
      if (item.product === this.product()){
        this.buttonLabel = "Product added!"
        this.buttonBgChange = "bg-green-700"
      }
    }
  }

  btnClickHandler(){
    if (this.product().stock! > 0){
      this.cart.addToCart(this.product());
      this.buttonLabel = "Product added!"
      this.buttonBgChange = "bg-green-700"
    }
    else {
      this.buttonLabel = "Out of stock!"
      this.buttonBgChange = "bg-red-700"
    }
  }
}

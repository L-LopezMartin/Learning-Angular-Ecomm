import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent],
  template: `
    <div class="mx-[10%] my-[2rem] flex flex-col gap-5">
      @for (product of cart.cart(); track product.product.id) {
        <app-product-cart [product]="product"/>
      }
    </div>
  `,
  styles: ``
})
export class CartComponent {
  cart = inject(CartService)
}

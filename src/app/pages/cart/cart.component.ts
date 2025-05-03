import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent, OrderSummaryComponent],
  template: `
    <div class="mx-[10%] my-[2rem] flex flex-col gap-5">
      @for (product of cart.cart(); track product.product.id) {
        <app-product-cart [product]="product"/>
      }
      <app-order-summary/>
    </div>
  `,
  styles: ``
})
export class CartComponent {
  cart = inject(CartService)
}

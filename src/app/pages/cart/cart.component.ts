import { Component, inject} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { EmptyCartComponent } from "./empty-cart/empty-cart.component";

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent, OrderSummaryComponent, EmptyCartComponent],
  template: `
    <div class="mx-[10%] my-[2rem] flex flex-col gap-5 items-center">
      @for (product of cart.cart(); track product.product.id) {
        <app-product-cart [product]="product" class="w-[100%]"/>
      }
      @if(this.cart.cart().length == 0){
        <app-empty-cart/>
      }
      @else {
        <app-order-summary class="w-[100%]"/>
      }
    </div>
  `,
  styles: ``
})
export class CartComponent {

  cart = inject(CartService)

}

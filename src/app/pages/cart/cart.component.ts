import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { RouterLink } from '@angular/router';
import { CurrentPageService } from '../../services/current-page.service';

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent, OrderSummaryComponent, PrimaryButtonComponent],
  template: `
    <div class="mx-[10%] my-[2rem] flex flex-col gap-5">
      @if(this.cart.cart().length == 0){
        <div>
          <h1> The cart is empty</h1>
          <p> Go back to the store and add some items </p>
          <app-primary-button label="Store" (btnClicked)="buttonHandler()"/>
        </div>
      }
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

  pageService = inject(CurrentPageService)

  buttonHandler(){
    this.pageService.changePage("")
  }
}

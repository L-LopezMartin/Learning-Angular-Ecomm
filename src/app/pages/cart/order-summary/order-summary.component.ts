import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";

/*
      Total de compra del carrito
*/
@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-200 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 mt-2">
          <span class="text-lg">Total</span>
          <span class="font-semibold">{{"$" + total()}}</span>
        </div>
        <app-primary-button label="Proceed to checkout"/>
      </div>
    </div>
  `,
  styles: ``
})
export class OrderSummaryComponent {
  
  cartService = inject(CartService)

  //El total es un valor calculado según los cambios de las señales dentro (cart del CartService)
  total = computed(() => {
    let total = 0
    for(const item of this.cartService.cart()){
      total += item.product.price * item.amount
    }
    
    // Número con 2 decimales
    return total.toFixed(2)
  })
}

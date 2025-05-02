import { Component, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { DeleteButtonComponent } from "../delete-button/delete-button.component";

@Component({
  selector: 'app-product-cart',
  imports: [DeleteButtonComponent],
  template: `
    <div class="flex justify-between items-center border rounded-xl py-5 px-15 bg">
      <div class="flex flex-col justify-around h-[150px]">
        <span class="text-[32px]">{{product().title}}</span>
        <span class="text-[24px]">$ {{product().price}}</span>
      </div>
      <img [src]="product().image" class="w-[300px] h-[200px] object-contain" />
      <app-delete-button/>
    </div>
  `,
  styles: ``
})
export class ProductCartComponent {
  product = input.required<Product>()
}

import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product"/>
      }
    </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  productsService = inject(ProductsService)

  products = signal<Product[]>([])

  ngOnInit(){
    this.products = this.productsService.products
  }
  
}

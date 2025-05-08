import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductsService } from '../../services/products.service';
import { AppStore } from '../../app.store';
import { ErrorScreenComponent } from "../../components/error-screen/error-screen.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent, ErrorScreenComponent, SearchBarComponent],
  template: `
  <div class="flex flex-col items-center">
    @if (!appStore.failed()){
      <app-search-bar class=" w-[30%] mt-10" (inputText)="searchText()"/>
      <div class="p-8 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        @for (product of products(); track product.id) {
          <app-product-card [product]="product"/>
        }
      </div>
    }
    @else{
      <app-error-screen message="There was an error accesing the store's products. Reload the page and try again."/>
    }
  </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  searchText = signal<string>("")

  productsService = inject(ProductsService)

  appStore = inject(AppStore)

  products = signal<Product[]>([])

  ngOnInit(){
    this.products = this.productsService.products
  }
  
}

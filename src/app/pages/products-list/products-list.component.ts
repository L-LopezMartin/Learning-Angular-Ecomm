import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductsService } from '../../services/products.service';
import { AppStore } from '../../app.store';
import { ErrorScreenComponent } from "../../components/error-screen/error-screen.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TopButtonComponent } from "../../components/top-button/top-button.component";

/*
      Pantalla del catálogo de productos
*/
@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent, ErrorScreenComponent, SearchBarComponent, TopButtonComponent],
  template: `
  <div class="flex flex-col items-center">

    <!-- Detecta si hubo un fallo en cargar los productos -->
    @if (!appStore.failed()){
      <app-search-bar class="w-[70vw] md:w-[40%] mt-10"/>
      <div class="p-8 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        @for (product of products(); track product.id) {
          <app-product-card [product]="product"/>
        }
      </div>
      <app-top-button class="fixed right-4 bottom-4 md:right-8 md:bottom-8 h-[60px] w-[65px]" bgChange="bg-green-800"/>
    }
    @else{
      <app-error-screen message="There was an error accesing the store's products. Reload the page and try again."/>
    }
  </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  productsService = inject(ProductsService) //De donde obtenemos los productos

  appStore = inject(AppStore)

  products = signal<Product[]>([]) // Array de productos

  constructor(){
    this.products = this.productsService.products
  }
  
}

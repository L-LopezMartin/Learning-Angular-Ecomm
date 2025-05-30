import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductsService } from '../../services/products.service';
import { AppStore } from '../../app.store';
import { ErrorScreenComponent } from "../../components/error-screen/error-screen.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TopButtonComponent } from "../../components/top-button/top-button.component";
import { FilterSelectableComponent } from "../../components/filter-selectable/filter-selectable.component";

/*
      Pantalla del catálogo de productos
*/
@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent, ErrorScreenComponent, SearchBarComponent, TopButtonComponent, FilterSelectableComponent],
  template: `
  <div class="flex flex-col items-center">
    <!-- Detecta si hubo un fallo en cargar los productos -->
    @if (!appStore.failed()){

      <!-- Categories -->
      <div class="flex mt-5 gap-2 md:w-[600px] flex-wrap w-[70%] items-center justify-center">
        @for (cat of categories();track $index){
          <app-filter-selectable label="{{cat}}" (selected)="selectCategories($event)"/>
        }
      </div>
      
      <!-- Search bar -->
      <app-search-bar class="w-[70vw] md:w-[40%] mt-5" (search)="searchBarHandling($event)"/>
      <span class="text-red-700 mt-2 w-[80%] text-center">{{searchError}}</span>
      
      <!-- Product cards -->
      <div class="p-8 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        @if (showedProducts().length == 0){
          @for (product of products(); track product.id) {
            <app-product-card [product]="product"/>
          }
        }
        @else{
          @for (product of showedProducts(); track product.id) {
            <app-product-card [product]="product"/>
          }
        }
      </div>

      <!-- Top button -->
      <app-top-button class="fixed right-4 bottom-4 md:right-8 md:bottom-8 h-[60px] w-[65px]" bgChange="bg-green-800"/>
    }
    <!-- Error screen -->
    @else{
      <app-error-screen message="There was an error accesing the store's products. Reload the page and try again."/>
    }
  </div>
  `
})
export class ProductsListComponent {

  productsService = inject(ProductsService) //De donde obtenemos los productos

  appStore = inject(AppStore)

  products = signal<Product[]>([]) // Array de productos totales

  showedProducts = signal<Product[]>([])

  searchError = ""

  categories = () => {return this.defineCategories()} //Array de todas las categorías

  selectedCategories = signal<string[]>([])
  
  constructor(){
    this.products = this.productsService.products //products de acá y products del service son el mismo. Cambiar uno cambia el otro
  }
  
  // Llena el array de las categorías
  defineCategories(){
    var cats: string[] =[]
    for(var prod of this.products()){
      var cat = prod.category
      if(!cats.includes(cat)){
        cats.push(cat)
      }
    }
    return cats
  }

  // Handle de los botones de categoría. Togglean las categorías seleccionadas
  selectCategories(cat: string){
    //Si está entre las categorías seleccionadas, deseleccionar
    if (this.selectedCategories().includes(cat)){
      this.selectedCategories.set(this.selectedCategories().filter((category) => category !== cat))
    } 
    //Si no lo está, agregarlo a las categorías seleccionadas
    else{
      this.selectedCategories().push(cat)
    }

    //Filtrar los productos a mostrar para que sean sólo los que corresponden con la categoría
    this.showedProducts.set(this.products().filter(prod => this.selectedCategories().includes(prod.category)))
  }

  // Settea que se muestren los productos cuyo título 
  searchBarHandling(searchQuery: string){

    if(this.showedProducts().length == 0)
      this.showedProducts.set(this.products().filter(prod => prod.title.toLowerCase().includes(searchQuery.toLowerCase())))
    else
      this.showedProducts.set(this.showedProducts().filter(prod => prod.title.toLowerCase().includes(searchQuery.toLowerCase())))

    this.searchError = "" //Reset del search error message

    // Si no hay productos como los buscados
    if(this.showedProducts().length == 0)
      this.searchError = `No items found with title: ${searchQuery}`
  }
}

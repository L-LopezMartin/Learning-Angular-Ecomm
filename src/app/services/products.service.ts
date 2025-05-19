import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { AppStore } from '../app.store';


/*
      Service que carga y contiene todos los productos
*/
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<Product[]>([])

  appStore = inject(AppStore) // AppStore es necesaria para guardar el estado de si los productos ya se obtuvieron o hubo un fallo de fetch
  

  url = "https://fakestoreapi.com/products" //Donde buscamos los productos

  constructor() {
    this.fetchProducts(this.url)
  }


  // Busca los productos en la URL ingresada
  async fetchProducts(url: string){
    try{
      // Fetch from API
      this.appStore.startLoading()
      const res = await fetch(url)
      const data = await res.json()
  
      //Set product array
      this.products.set(data)
      
      //Randomize stock
      for (var prod of this.products()){
        prod.stock = Math.floor(Math.random() * 10)
      }
      
      this.appStore.stopLoading()

    } catch{  //Cualquier tipo de error en el proceso
      this.appStore.fail()
    }
  }
}

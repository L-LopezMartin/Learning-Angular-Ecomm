import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { AppStore } from '../app.store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {
    this.fetchProducts(this.url)
  }

  products = signal<Product[]>([])

  appStore = inject(AppStore)

  url = "https://fakestoreapi.com/products"

  async fetchProducts(url: string){
    try{
      //Fetch from API
      this.appStore.startLoading()
      console.log("Fetching");
      const res = await fetch(url)
      const data = await res.json()
  
      //Set product array
      this.products.set(data)
      
      //Randomize stock
      for (var prod of this.products()){
        prod.stock = Math.floor(Math.random() * 10)
      }
      console.log("Done fetching and setting");
      this.appStore.stopLoading()}
    catch{
      this.appStore.fail()
    }
  }
}

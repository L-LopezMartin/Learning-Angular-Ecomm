import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    var foundProduct = this.cart().find(prod => prod.id === product.id)

    if (!foundProduct){
      this.cart.set([...this.cart(), product])
    }
  }

  constructor() { }
}

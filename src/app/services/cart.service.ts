import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Cart[]>([]);

  addToCart(product: Product) {
    var foundProduct = this.cart().find(prod => prod.product.id === product.id)

    if (!foundProduct){
      this.cart.set([...this.cart(), {product: product, amount : 1}])
    } else{
      foundProduct.amount++
    }
  }

  reduceItem(product: Cart){
    if(product.amount > 1)
    product.amount --
    this.cart.set(this.cart().filter(prod => prod === product))
  }
  
  addItem(product: Cart){
    product.amount ++
    this.cart.set(this.cart().filter(prod => prod === product))
  }

  removeFromCart(product: Product){
    this.cart.set(this.cart().filter(prod => prod.product !== product))
  }

  constructor() { }
}

import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Cart[]>([]);
  productsService = inject(ProductsService)

  addToCart(product: Product) {
    var foundProduct = this.cart().find(prod => prod.product.id === product.id)

    if (!foundProduct && product.stock!! > 0){
      this.cart.set([...this.cart(), {product: product, amount : 1}])
    }
  }

  reduceItem(product: Cart){
    if(product.amount > 1)
    product.amount --
    this.cart.set(this.cart().filter(prod => prod === product))
  }
  
  addItem(product: Cart){
    for(var prod of this.productsService.products()){
      if(prod === product.product && prod.stock == product.amount){
        return
      }
    }
    product.amount ++
    this.cart.set(this.cart().filter(prod => prod === product))
  }

  removeFromCart(product: Product){
    this.cart.set(this.cart().filter(prod => prod.product !== product))
  }

  constructor() { }
}

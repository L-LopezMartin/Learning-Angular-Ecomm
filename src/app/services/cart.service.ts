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
    if(product.amount > 1){  
      product.amount--
    }

    //Hay que hacer un SET para que se actualice la signal. Cambiar algo de dentro sin un SET no actualiza en tiempo real
    this.cart.set(this.cart().filter(prod => prod))
  }
  
  addItem(product: Cart){

    for(var prodp of this.productsService.products()){
      if(prodp === product.product && prodp.stock == product.amount){
        return
      }
    }

    product.amount++

    //Hay que hacer un SET para que se actualice la signal. Cambiar algo de dentro sin un SET no actualiza en tiempo real
    this.cart.set(this.cart().filter(prod => prod))
  }

  removeFromCart(product: Cart){
    this.cart.set(this.cart().filter(prod => prod !== product))
  }

  constructor() { }
}

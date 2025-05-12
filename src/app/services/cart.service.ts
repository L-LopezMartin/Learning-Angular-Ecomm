import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';


/*
      Service que mantiene los productos cargados en carrito
*/
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Cart[]>([]);

  // Agregar un artículo al carro
  addToCart(product: Product) {
    var foundProduct = this.cart().find(prod => prod.product.id === product.id)

    //Agregarlo siempre que no esté en el carrito y que su stock sea mayor a 0
    if (!foundProduct && product.stock!! > 0){
      this.cart.set([...this.cart(), {product: product, amount : 1}])
    }
  }

  // Disminuir la cantidad del artíuclo en el carro
  reduceItem(product: Cart){
    if(product.amount > 1){  
      product.amount--
    }

    this.updateItems()
  }
  
  // Aumentar la cantidad del artíuclo en el carro
  addItem(product: Cart){

    //Siempre y no pasemos el stock
    if(product.amount < product.product.stock!)
      product.amount++

    this.updateItems()
  }

  // Eliminar un artíuclo del carro
  removeFromCart(product: Cart){
    this.cart.set(this.cart().filter(prod => prod !== product))
  }

  // SET para que se actualice la señal del cart.
  // En realidad, sin el set se actualiza en todos lados menos el total del order-summary
  updateItems(){
    this.cart.set(this.cart().filter(prod => prod))
  }
}

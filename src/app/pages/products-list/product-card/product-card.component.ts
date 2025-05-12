import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

/*
      Card de un producto
*/
@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img [src]="product().image" class="w-[200px] h-[100px] object-contain"/>
      </div>
      <div class="flex flex-col mt-2">
        <span class="text-md font-bold">{{product().title}}</span>
        <span class="text-sm">{{"$" + product().price}}</span>
        <app-primary-button [label]="buttonLabel" class="mt-3" [bgChange]="buttonBgChange" (btnClicked)="btnClickHandler()"/>
      </div>

      <!-- Este span tiene lógica para mostrar el stock en verde o "out of stock" en rojo -->
      <span class="absolute top-2 right-3 text-sm font-bold" [class] = "
  product().stock ? 'text-green-500' : 'text-red-500'">
        @if (product().stock) {
          {{product().stock}} left
        } @else {
          Out of stock
        }
      </span>
    </div>
  `,
  styles: ``
})
export class ProductCardComponent {

  cartService = inject(CartService)

  product = input.required<Product>();

  buttonLabel = "Add to cart" //Por defecto el botón tiene esta label

  buttonBgChange = "bg-blue-500" // Por defecto el botón tiene este color

  // Cuando cargamos el componente se busca si el producto está sin stock o si ya ha sido añadido
  ngOnInit(){

    // Sin stock
    if(this.product().stock === 0){
      this.outOfStock()
    }

    // Ya añadido
    for(var item of this.cartService.cart()){
      if (item.product === this.product()){
        this.productAdded()
      }
    }
  }


  // Clickear el botón de añadir al carrito
  btnClickHandler(){
    if (this.product().stock! > 0){
      this.cartService.addToCart(this.product());
      this.productAdded()
    }
    else {
      this.outOfStock()
    }
  }

  // Cambia el botón al estilo de sin stock
  outOfStock(){
    this.buttonLabel = "Out of stock!"
    this.buttonBgChange = "bg-red-700"
  }

  // Cambia el botón al estilo de producto añadido
  productAdded(){
    this.buttonLabel = "Product added!"
    this.buttonBgChange = "bg-green-700"
  }
}

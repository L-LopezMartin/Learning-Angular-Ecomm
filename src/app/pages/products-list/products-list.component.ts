import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product"/>
      }
    </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  async ngOnInit(){
    const res = await fetch('https://fakestoreapi.com/products/category/electronics')
    const data = await res.json()
    this.products.set(data)
  }

  products = signal<Product[]>([
    // {
    //   id: 1,
    //   title: "Vetu",
    //   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //   price: 100.50,
    //   stock: 10,
    // },
    // {
    //   id: 2,
    //   title: "Nivea",
    //   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //   price: 40.20,
    //   stock: 0,
    // },
    // {
    //   id: 3,
    //   title: "Marrón",
    //   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //   price: 83.70,
    //   stock: 5,
    // }
  ])
}

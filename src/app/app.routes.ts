import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';


/*
        Designación de rutas

    Acá desginamos las rutas de la página
*/
export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: ProductsListComponent
    },
    {
        path: "cart",
        component: CartComponent
    }
];

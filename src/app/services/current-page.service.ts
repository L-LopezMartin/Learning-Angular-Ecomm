import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';


/*
      Servicio para saber la página en la que estamos parados

    Probablemente exista una solución mejor a esto, pero es lo que se me ocurrió sin ver videos sobre esto
*/
@Injectable({
  providedIn: 'root'
})

export class CurrentPageService {

  currentPage = signal<String>("")

  router = inject(Router) //El router es necesario para hacer los cambios de página


  // Función para cambiar de página. Usada por los componentes que tienen links a distintas partes de la página
  changePage(page: String){
    this.currentPage.set(page)
    this.router.navigate([page])
  }
}

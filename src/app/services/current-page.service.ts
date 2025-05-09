import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  currentPage = signal<String>("")

  router = inject(Router)


  changePage(page: String){
    this.currentPage.set(page)
    this.router.navigate([page])
  }

  constructor() { }
}

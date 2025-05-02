import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  currentPage = signal<String>("Main")

  changePage(page: String){
    this.currentPage.set(page)
  }

  constructor() { }
}

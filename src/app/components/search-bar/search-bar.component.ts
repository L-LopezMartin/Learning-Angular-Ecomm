import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon'
import { FormBuilder, ReactiveFormsModule }from '@angular/forms'

/*
      Una simple search bar

    No tiene funcionalidad por lo pronto
*/
@Component({
  selector: 'app-search-bar',
  imports: [MatIcon, ReactiveFormsModule],
  template: `
      <form class="flex flex-row" (ngSubmit)="doSearch()" [formGroup]="searchForm">
        <input formControlName="search" id='search' type="text" placeholder="Search an item" maxlength="30" class="w-[100%] py-2 px-4 border-blue-800 border-2 rounded-l-xl placeholder-gray-500">
        <button type="submit">
          <mat-icon class="!w-auto !h-[100%] bottom-[35px] right-[20px] hover:opacity-90 text-xl hover:bg-blue-200 py-2 px-2 border-2 border-l-0 rounded-r-xl border-blue-800"> search </mat-icon>
        </button>          
      </form>
  `,
  styles: ``
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>()
  
  formBuilder = new FormBuilder() //Necesario para crear el searchForm

  // Form group del formulario, necesario para manejarlo
  searchForm = this.formBuilder.group({
    search: ''
  })

  // Handle del submit. Envía el string ingresado en el input
  doSearch(){
    // Si se introduce un valor, devolver el valor ingresado
    if(this.searchForm.value.search)
      this.search.emit(this.searchForm.value.search)
    // Si no se ingresa un valor, devolver vació
    else
      this.search.emit("")
    this.searchForm.reset()
  }

}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AppStore } from './app.store';
import { MatProgressBar } from "@angular/material/progress-bar"


/*
      El componente principal de la app
*/
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, MatProgressBar],
  template: `

    <!-- El header se va a mostrar en todas las rutas -->
    <app-header/>


    <!-- Este if es para que se muestre la progress bar mientras esté fetcheando -->
    @if (appStore.loading()){
      <!-- El ! hace que se overridee la ubicación normal del progress bar (dada en materials) por la que le doy yo, absolute -->
      <mat-progress-bar class="!absolute top-[70px] z-10" mode="indeterminate"/>
    }


    <!-- Se carga la ruta específica -->
    <router-outlet/>
  `,
})
export class AppComponent {
  appStore = inject(AppStore)
}
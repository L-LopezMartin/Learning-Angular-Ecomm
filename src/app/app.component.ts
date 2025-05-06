import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AppStore } from './app.store';
import { MatProgressBar } from "@angular/material/progress-bar"

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, MatProgressBar],
  template: `
    <app-header/>
    @if (appStore.loading()){
      <!-- El !abosulte hace que se overridee la ubicación normal del progress bar -->
      <mat-progress-bar class="!absolute top-[70px] z-10" mode="indeterminate"/>
    }
    @if (appStore.failed()){
      
    }
    <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-ecomm';
  appStore = inject(AppStore)
}
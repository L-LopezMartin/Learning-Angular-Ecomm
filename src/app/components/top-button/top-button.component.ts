import { Component, HostListener, input } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

/*
      Botón para ir a la parte superior de la pantalla
*/
@Component({
  selector: 'app-top-button',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="rounded-full overflow-clip">
      <app-primary-button label="↑" class="text-center text-5xl" [class]="(showButton) ? 'block' : 'hidden'" [bgChange]="bgChange()" (btnClicked)="scrollTop()"/>
    </div>
  `,
  styles: ``
})
export class TopButtonComponent {

  bgChange = input<string>("bg-blue-500")

  showButton = false

  // Vamos a escuchar a la ventana. Con cada scroll se va a correr OnWindowScroll
  @HostListener('window:scroll')
  onWindowScroll(){
    this.showButton = window.scrollY > 80
  }

  // Handle del button
  scrollTop(){
    window.scrollTo({top:0, behavior: 'smooth'})
  }

}

import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CurrentPageService } from '../../../services/current-page.service';

@Component({
  selector: 'app-empty-cart',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="border-1 rounded-xl py-8 px-8 bg-slate-200 flex flex-col items-center w-[600px] gap-4">
      <h1 class="text-4xl text-blue-800 font-bold"> The cart is empty</h1>
      <p class="text-xl"> Go back to the store and add some items! </p>
      <app-primary-button label="Store" class="w-[40%]" (btnClicked)="buttonHandler()"/>
    </div>
  `,
  styles: ``
})
export class EmptyCartComponent {

  pageService = inject(CurrentPageService)

  buttonHandler(){
    this.pageService.changePage("")
  }
}

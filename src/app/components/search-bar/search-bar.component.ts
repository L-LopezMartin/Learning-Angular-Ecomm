import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  template: `
      <div class="flex flex-row">
        <input type="text" placeholder="Search an item" maxlength="30" class="w-[100%] py-2 px-4 border-blue-800 border-2 rounded-l-xl placeholder-gray-500">
        <button class=" bottom-[35px] right-[20px] hover:text-blue-800 text-xl hover:font-bold py-2 px-4 border-2 border-l-0 rounded-r-xl border-blue-800" (click)="buttonHandler()"> Search! </button>
      </div>
  `,
  styles: ``
})
export class SearchBarComponent {

  buttonHandler(){
    
  }
}

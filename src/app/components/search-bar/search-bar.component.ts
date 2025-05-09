import { Component, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-search-bar',
  imports: [MatIcon],
  template: `
      <div class="flex flex-row" id="2">
        <input type="text" placeholder="Search an item" maxlength="30" class="w-[100%] py-2 px-4 border-blue-800 border-2 rounded-l-xl placeholder-gray-500" >
        <mat-icon class="!w-auto !h-[100%] bottom-[35px] right-[20px] hover:opacity-90 text-xl hover:bg-blue-200 py-2 px-2 border-2 border-l-0 rounded-r-xl border-blue-800"> search </mat-icon>
      </div>
  `,
  styles: ``
})
export class SearchBarComponent {
}

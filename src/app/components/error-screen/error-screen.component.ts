import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  imports: [],
  template: `
    <div class="flex flex-col items-center w-[50vw] h-[310px] py-[64px] gap-4 mt-16">
      <h1 class="font-bold text-8xl"> ERORR </h1>
      <p class="text-2xl"> Something went wrong:</p>
      <p> {{ message() }} </p>
    </div>
    <div class="w-[50vw] h-[310px] bg-blue-300 relative top-[-300px] -z-10 -skew-4 border-2 rounded-2xl"></div>
  `,
  styles: ``
})
export class ErrorScreenComponent {

  message = input<string>()

}

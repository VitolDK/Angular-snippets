import { Directive, ElementRef } from '@angular/core';

declare let $: any;

@Directive({selector: '[ellipsis]'})

export class EllipsisDirective {

  constructor(el: ElementRef) {
    setTimeout(() => $(el.nativeElement).dotdotdot({watch: true}));
  }

}

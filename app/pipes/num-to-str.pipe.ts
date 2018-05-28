import { Pipe, PipeTransform } from '@angular/core';

import { NumbToStr } from '../static-func';

@Pipe({
  name: 'myNumToStr'
})

export class NumToStrPipe implements PipeTransform {
  public transform = NumbToStr;
}

import { Pipe, PipeTransform } from '@angular/core';

import { Capitalize } from '../static-func';

@Pipe({
  name: 'myCapitalize'
})

export class CapitalizePipe implements PipeTransform {
  public transform = Capitalize;
}

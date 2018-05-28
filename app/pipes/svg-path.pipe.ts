import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../service';

@Pipe({name: 'mySVGPath'})
export class SvgPathPipe implements PipeTransform {
  constructor(private utils: UtilsService) {
  }
  public transform(src: string): string {
    return this.utils.pathSVG(src);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../service';

@Pipe({name: 'myStaticImg'})
export class StaticImgPipe implements PipeTransform {
  constructor(private utils: UtilsService) {
  }
  public transform(src: string): string {
    return this.utils.pathAssets(`img/${src}`);
  }
}

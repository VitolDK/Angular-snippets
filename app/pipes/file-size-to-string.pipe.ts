import { PipeTransform, Pipe } from '@angular/core';
import { UtilsService } from '../service';

@Pipe({name: 'myFileSize'})

export class FileSizeToStringPipe implements PipeTransform {
  constructor(private utils: UtilsService) {
  }

  public transform(value: number): string {
    return this.utils.fileSizeToString(value);
  }
}

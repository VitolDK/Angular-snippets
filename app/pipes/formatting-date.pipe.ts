import { PipeTransform, Pipe } from '@angular/core';
import { UtilsService } from '../service/';

@Pipe({name: 'myFormattingDate'})

export class FormattingDatePipe implements PipeTransform {
  constructor(private utils: UtilsService) {
  }

  public transform(date: string, format: string): any {
    return this.utils.formattingDate(date, format);
  }
}

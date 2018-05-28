import { NgModule } from '@angular/core';

// pipes
import { NumToStrPipe } from './num-to-str.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { StaticImgPipe } from './static-img.pipe';
import { SvgPathPipe } from './svg-path.pipe';
import { FileSizeToStringPipe } from './file-size-to-string.pipe';
import { FormattingDatePipe } from './formatting-date.pipe';

const LIST = [
  NumToStrPipe,
  CapitalizePipe,
  StaticImgPipe,
  SvgPathPipe,
  FileSizeToStringPipe,
  FormattingDatePipe
];

@NgModule({
  declarations: [LIST],
  exports: [LIST]
})

export class MyPipesModule {
}

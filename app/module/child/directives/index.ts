import { NgModule } from '@angular/core';

// directive
import { NgxCropperJsDirective } from './ngx-cropper';

const listDirectives = [
  NgxCropperJsDirective
];

@NgModule({
  declarations: [ listDirectives ],
  exports: [ listDirectives ]
})

export class MyChildDirectiveModule {}

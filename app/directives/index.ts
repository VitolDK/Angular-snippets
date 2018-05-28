import { NgModule } from '@angular/core';

// directive
import { StaticImageDirective } from './static-image';
import { ClickStopPropagationDirective } from './click-stop-propagation';
import { EllipsisDirective } from './ellipsis';

const listDirectives = [
  StaticImageDirective,
  ClickStopPropagationDirective,
  EllipsisDirective
];

@NgModule({
  declarations: [ listDirectives ],
  exports: [ listDirectives ]
})

export class MyDirectiveModule {}

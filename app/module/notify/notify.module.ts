import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AlertModule } from 'ngx-bootstrap/alert';

import { NotifyComponent } from './notify.component';
import { NotifyService } from './notify.service';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    AngularSvgIconModule
  ],
  declarations: [
    NotifyComponent
  ],
  exports: [
    NotifyComponent
  ]
})

export class MyNotifyModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyNotifyModule,
      providers: [NotifyService]
    };
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { MyPipesModule } from '../pipes';

import { IconComponent } from './icon';
import { FormGroupInputComponent } from './form-group-input';

const LIST = [
  IconComponent,
  FormGroupInputComponent,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    RouterModule,
    MyPipesModule
  ],
  declarations: [LIST],
  exports: [LIST]
})

export class MyComponentsModule {
}

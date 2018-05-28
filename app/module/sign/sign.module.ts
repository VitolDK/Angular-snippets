import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ROUTES, VIEWS } from './sign.router';

import { MyComponentsModule } from '../../components';
import { MyDirectiveModule } from '../../directives';

const MODULE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild(ROUTES),
  TranslateModule,
  MyComponentsModule,
  MyDirectiveModule
];

const COMPONENTS = [
];

@NgModule({
  imports: [
    MODULE
  ],
  declarations: [
    VIEWS,
    COMPONENTS
  ]
})

export class SignParticleModule {
}

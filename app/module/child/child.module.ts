import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';

import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { MyComponentsModule } from '../../components';
import { MyDirectiveModule } from '../../directives';
import { MyChildDirectiveModule } from './directives';
import { MyPipesModule } from '../../pipes';
import { MyNotifyModule } from '../notify';

import { COMPONENTS } from './components';

import { MODALS } from './modals';

import { ROUTES, VIEWS, GUARDS, RESOLVES } from './child.routes';

import { AppInterceptor } from '../../app.service';

import {
  HeaderAsideService,
  UnSaveService,
  OrdersService,
  WorkerService,
  HelpService
} from './service';

import { Config } from '../../config';

const MODULE = [
  FormsModule,
  CommonModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot(Config.googleMapKey),
  TranslateModule.forChild(),
  RouterModule.forChild(ROUTES),
  ModalModule.forRoot(),
  BsDropdownModule.forRoot(),
  TooltipModule.forRoot(),
  NgxPaginationModule,
  ColorPickerModule,
  SwiperModule,
  MyDirectiveModule,
  MyChildDirectiveModule,
  MyComponentsModule,
  MyPipesModule,
  MyNotifyModule
];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  freeMode: true,
  grabCursor: true,
  slidesPerView: 'auto'
};

const PROVIDERS = [
  AppInterceptor,
  HeaderAsideService,
  UnSaveService,
  OrdersService,
  WorkerService,
  HelpService,
  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }
];

@NgModule({
  imports: [
    MODULE
  ],
  declarations: [
    VIEWS,
    COMPONENTS,
    MODALS
  ],
  providers: [
    PROVIDERS,
    RESOLVES,
    GUARDS
  ],
  entryComponents: [
    MODALS
  ]
})

export class AppChildParticleModule {
}

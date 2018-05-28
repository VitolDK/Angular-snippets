import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieModule } from 'ngx-cookie';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import 'dotdotdot/src/js/jquery.dotdotdot.min.js';

import { GUARDS, ROUTES, ROUTES_CONFIG } from './app.routes';
import { AppInterceptor } from './app.service';
import { AppComponent } from './app.component';
import { ROOT_CONF_TRANSLATE } from './app.translate';
import { environment } from 'environments/environment';

import { MyNotifyModule } from './module/notify';

import { Config } from './config';

import '../styles/styles.scss';

import { APP_SERVICES } from './service';

const APP_PROVIDERS = [
  GUARDS,
  APP_SERVICES,
  environment.ENV_PROVIDERS,
  {provide: APP_BASE_HREF, useValue: Config.baseHref},
  {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(Config.cookieOptions),
    TranslateModule.forRoot(ROOT_CONF_TRANSLATE),
    RouterModule.forRoot(ROUTES, ROUTES_CONFIG),
    MyNotifyModule.forRoot()
  ],
  providers: [APP_PROVIDERS]
})

export class AppModule {
  constructor(private translate: TranslateService) {
    window['AIL'] = true;
    moment.locale(Config.locale);
    translate.setDefaultLang('en');
    translate.addLangs(['ru', 'en']);
    translate.use(Config.locale.match(/ru|en/) ? Config.locale : 'en');
  }
}

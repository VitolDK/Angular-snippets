import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Config } from './config';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `${Config.assets}/i18n/`, '.json');
}

export class MissingTranslationHandlerFactory implements MissingTranslationHandler {
  public handle(params: MissingTranslationHandlerParams) {
    return params.key;
  }
}

export const ROOT_CONF_TRANSLATE: TranslateModuleConfig = {
  loader: {provide: TranslateLoader, useFactory: (HttpLoaderFactory), deps: [HttpClient]},
  missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationHandlerFactory},
  useDefaultLang: true
};

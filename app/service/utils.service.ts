import { Injectable, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import sweetAlert from 'sweetalert2';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Notify, NotifyService } from '../module/notify';

import { Config } from '../config';
import {
  PathAssets,
  PathSVG,
  IOSFix,
  UndoIOSFix,
  NumbToStr,
  Capitalize
} from '../static-func';

@Injectable()
export class UtilsService {

  private static scrollToTop() {
    let scrollStep = -window.scrollY / (300 / 15);
    let scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  private static char = (): string => ' — ';

  private static dummyFunc(callBack: any) {
    /* callBack */
  };

  private static handleError = (data: any): Promise<any> => Promise.reject(data && data.error && data.error.error || data);

  private static goToBack = () => window.history.back();

  private static counts = (variable: any): number => variable ? (variable instanceof Array) ? variable.length : Object.keys(variable).length : undefined;

  private static isOldDate = (date: string): boolean => date.toString().indexOf('1969') !== -1;

  private static daysSuffixKey = (count: number): string => 'COMMON.DAY.' + NumbToStr(count, [0, 1, 2]);

  private static currencyChar = (type: string): string => _.find(Config.currency, {id: type}).char;

  private static currencyIsFirst = (currencyType: string): boolean => currencyType !== 'RUR';

  private static numberFormat(numSrt: string, delimiter: string, hideDecimal: boolean = false): string {
    let shot = delimiter === ',' ? '.' : ',';
    if (numSrt !== undefined) {
      let n = ('' + numSrt).split('.');
      if (n[0].length > 3) {
        n[0] = n[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, delimiter);
      }
      if (Number(n[1]) > 0) {
        if (n[1].length > 2) {
          n[1] = shot + n[1].substring(0, 2);
        } else {
          n[1] = shot + n[1];
        }
      } else {
        n[1] = shot + '00';
      }
      return n[0] + (hideDecimal ? '' : n[1]);
    }
    return numSrt;
  };

  private static fileSizeToString(fileSize: number): string {
    let i = -1;
    let byteUnits: string[] = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let size: number = /*1024*/ 999;
    do {
      fileSize = fileSize / size;
      i++;
    } while (fileSize > size);

    return Math.max(fileSize, 0.1).toFixed(0) + byteUnits[i];
  };

  private static ifFieldValueZero(form: FormGroup, field: string, action: boolean): void {
    let setValue = action ? null : '0';
    let currentValue = !action ? null : '0';
    let control = form.controls[field];
    let value = _.cloneWith(control.value);
    if (value === currentValue || value === '') {
      control.setValue(setValue);
    }
  }

  public dummyFunc = UtilsService.dummyFunc;
  public scrollToTop = UtilsService.scrollToTop;
  public handleError = UtilsService.handleError;
  public pathSVG = PathSVG;
  public numbToStr = NumbToStr;
  public pathAssets = PathAssets;
  public capitalize = Capitalize;
  public counts = UtilsService.counts;
  public goToBack = UtilsService.goToBack;
  public isOldDate = UtilsService.isOldDate;
  public numberFormat = UtilsService.numberFormat;
  public currencyChar = UtilsService.currencyChar;
  public daysSuffixKey = UtilsService.daysSuffixKey;
  public currencyIsFirst = UtilsService.currencyIsFirst;
  public ifFieldValueZero = UtilsService.ifFieldValueZero;
  public fileSizeToString = UtilsService.fileSizeToString;
  @Output() public loadingGlobalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private translateService: TranslateService,
              private notifyService: NotifyService) {
  }

  public changeLang(): void {
    let lang: string = this.translateService.currentLang === 'ru' ? 'en' : 'ru';
    moment.locale(lang);
    this.translateService.use(lang);
  }

  public currentLocale(): string {
    return this.translateService.currentLang;
  }

  public translate(translateKey: string, translateParams?: Object): string {
    return this.translateService.instant(translateKey, translateParams);
  }

  public alert(params: any): Promise<any> {
    return sweetAlert(Object.assign({
      buttonsStyling: false,
      showCancelButton: true,
      cancelButtonClass: 'ui-btn ui-btn--outline',
      confirmButtonClass: 'ui-btn ui-btn--primary',
      cancelButtonText: this.translate('COMMON.CANCEL')
    }, params));
  }

  public addNotify(newNotify: Notify): void {
    this.notifyService.addNotify(newNotify);
  }
}

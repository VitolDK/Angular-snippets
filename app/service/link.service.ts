import { Injectable } from '@angular/core';

import {
  Sign,
  SignIn,
  SignResetPassword,
  SignForgotPassword,
  Main,
  SettingAccountDetail,
  SettingAccountGeneral,
  SettingAccountEmail,
  SettingAccountPassword
} from '../app.link.const';

import { ListLinks } from '../model';

import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class LinkService {

  public list: ListLinks = {
    sign: Sign,
    signIn: SignIn,
    signResetPassword: SignResetPassword,
    signForgotPassword: SignForgotPassword,
    main: Main,
    settingAccountDetail: SettingAccountDetail,
    settingAccountGeneral: SettingAccountGeneral,
    settingAccountEmail: SettingAccountEmail,
    settingAccountPassword: SettingAccountPassword
  };

  constructor(private router: Router) {
  }

  public main(): void {
    this.routerNavigate(this.list.main.routerLink());
  }

  public setting(): void {
    this.routerNavigate(this.list.setting.routerLink());
  }

  public account(): void {
    this.routerNavigate(this.list.account.routerLink());
  }

  public routerNavigate(commands: any[], extras?: NavigationExtras): void {
    this.router.navigate(commands, extras);
  }
}

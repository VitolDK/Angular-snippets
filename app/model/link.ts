import { NavigationExtras } from '@angular/router/src/router';

export interface Link {
  route: string;
  name: string;
  routerLink: (...strings) => string[];
  extras?: NavigationExtras;
}

export interface ListLinks {
  /* SIGN MODULE */
  sign: Link;
  signIn: Link;
  signResetPassword: Link;
  signForgotPassword: Link;
  /* CHILD MODULE */
  main: Link;
  settingAccountDetail: Link;
  settingAccountGeneral: Link;
  settingAccountEmail: Link;
  settingAccountPassword: Link;
  /* ACCOUNT MODULE */
  account: Link;
}

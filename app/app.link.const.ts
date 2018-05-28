import { Link } from './model';

/* SIGN MODULE */

export function SignRouterLink() {
  return ['/sign'];
}

export function SignInRouterLink() {
  return [].concat(SignRouterLink(), ['in']);
}

export function SignForgotPasswordRouterLink() {
  return [].concat(SignRouterLink(), ['forgot-password']);
}

export function SignResetPasswordRouterLink(hash: string) {
  return [].concat(SignRouterLink(), ['reset-password', hash]);
}

export const Sign: Link = {
  name: 'PAGE_NAME.SIGN',
  route: 'sign',
  routerLink: SignRouterLink
};

export const SignIn: Link = {
  name: 'PAGE_NAME.SIGN_IN',
  route: 'in',
  routerLink: SignInRouterLink
};

export const SignForgotPassword: Link = {
  name: 'PAGE_NAME.FORGOT_PASSWORD',
  route: 'forgot-password',
  routerLink: SignForgotPasswordRouterLink
};

export const SignResetPassword: Link = {
  name: 'PAGE_NAME.FORGOT_PASSWORD',
  route: 'reset-password/:hash',
  routerLink: SignResetPasswordRouterLink
};

/* CHILD MODULE */

export function MainRouterLink() {
  return ['/'];
}

export function SettingAccountDetailRouterLink() {
  return ['/setting/account/detail'];
}

export function SettingAccountGeneralRouterLink() {
  return SettingAccountDetailRouterLink();
}

export function SettingAccountEmailRouterLink() {
  return [].concat(SettingAccountDetailRouterLink(), ['email']);
}

export function SettingAccountPasswordRouterLink() {
  return [].concat(SettingAccountDetailRouterLink(), ['password']);
}

export const Main: Link = {
  name: 'PAGE_NAME.HOME',
  route: '',
  routerLink: MainRouterLink
};

export const SettingAccountDetail: Link = {
  name: 'COMMON.ACCOUNT_DETAIL',
  route: 'setting/account/detail',
  routerLink: SettingAccountDetailRouterLink
};

export const SettingAccountGeneral: Link = {
  name: 'PAGE_NAME.ACCOUNT_GENERAL',
  route: '',
  routerLink: SettingAccountGeneralRouterLink
};

export const SettingAccountEmail: Link = {
  name: 'PAGE_NAME.ACCOUNT_EMAIL',
  route: 'email',
  routerLink: SettingAccountEmailRouterLink
};

export const SettingAccountPassword: Link = {
  name: 'PAGE_NAME.ACCOUNT_PASSWORD',
  route: 'password',
  routerLink: SettingAccountPasswordRouterLink
};

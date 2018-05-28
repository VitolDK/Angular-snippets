import { Routes } from '@angular/router';

import {
  SignIn,
  SignForgotPassword,
  SignResetPassword
} from '../../app.link.const';

import { SignComponent } from './sign';
import { SignInComponent } from './in';
import { ResetComponent } from './reset';
import { RecoverComponent } from './recover';

export const ROUTES: Routes = [
  {
    path: '',
    component: SignComponent,
    children: [
      {path: '', redirectTo: SignIn.route, pathMatch: 'full'},
      {path: SignIn.route, component: SignInComponent},
      {path: SignResetPassword.route, component: ResetComponent},
      {path: SignForgotPassword.route, component: RecoverComponent}
    ]
  }
];

export const VIEWS = [
  SignComponent,
  SignInComponent,
  ResetComponent,
  RecoverComponent
];

import { Routes, PreloadAllModules } from '@angular/router';

import {
  GoToAuthGuard,
  GoToChildGuard,
  UserSetupInChildGuard,
  CheckSubscribeInChildGuard
} from './guards';

import {
  Account,
  Sign,
  Main
} from './app.link.const';

export const GUARDS = [
  GoToAuthGuard,
  GoToChildGuard,
  UserSetupInChildGuard,
  CheckSubscribeInChildGuard
];

export const ROUTES: Routes = [
  {
    path: Main.route,
    loadChildren: './module/child/child.module#AppChildParticleModule',
    canActivate: [
      GoToAuthGuard,
      UserSetupInChildGuard,
      CheckSubscribeInChildGuard
    ]
  },
  {
    path: Sign.route,
    loadChildren: './module/sign/sign.module#SignParticleModule',
    canActivate: [
      GoToChildGuard
    ]
  },
  {
    path: Account.route,
    loadChildren: './module/account/account.module#AccountParticleModule',
    canActivate: [
      GoToAuthGuard
    ]
  },
  {path: '**', redirectTo: '/'}
];

export const ROUTES_CONFIG = {
  useHash: Boolean(history.pushState) === false,
  preloadingStrategy: PreloadAllModules
};

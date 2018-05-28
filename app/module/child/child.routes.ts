import { Routes } from '@angular/router';



export const VIEWS = [
];

import {
  UnSavedGuard
} from './guards';

import {} from './resolves';

export const GUARDS = [
  UnSavedGuard
];

export const RESOLVES = [
];

export const ROUTES: Routes = [
  {
    path: '',
    component: ChildComponent,
    children: [
      {
        path: Main.route,
        component: HomeComponent
      },
      {
        path: SettingAccountDetail.route,
        component: AccountDetailComponent,
        children: [
          {
            path: SettingAccountGeneral.route,
            component: AccountGeneralComponent,
            canDeactivate: [UnSavedGuard]
          },
          {
            path: SettingAccountEmail.route,
            component: AccountEmailComponent,
            canDeactivate: [UnSavedGuard]
          },
          {
            path: SettingAccountPassword.route,
            component: AccountPasswordComponent,
            canDeactivate: [UnSavedGuard]
          }
        ]
      },
      {
        path: SettingAccountSubscription.route,
        component: SubscriptionComponent
      },
    ]
  }
];

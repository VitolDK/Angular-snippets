import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LinkService, UserService } from '../service';

@Injectable()
export class UserSetupInChildGuard implements CanActivate {

  constructor(private userService: UserService,
              private linkService: LinkService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.userService.userData(this.userService.get().id)
      .map(({registration_completed}: any) => {
        if (!registration_completed) {
          this.linkService.routerNavigate(this.linkService.list.accountSetupCompleteRegistration.routerLink(), {replaceUrl: true});
          return false;
        }
        return true;
      })
      .catch(() => {
        this.userService.logout();
        this.linkService.routerNavigate(this.linkService.list.signIn.routerLink(), {replaceUrl: true});
        return Observable.of(false);
      })
      .first();
  }
}

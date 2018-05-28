import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LinkService, ProjectService } from '../service';
import { Project } from '../model';

@Injectable()
export class CheckSubscribeInChildGuard implements CanActivate {

  constructor(private projectService: ProjectService,
              private linkService: LinkService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.projectService.init()
      .map(({binding_card, subscription}: Project) => {
        if (!binding_card) {
          this.linkService.routerNavigate(this.linkService.list.accountSetupBindingCard.routerLink(), {replaceUrl: true});
          return false;
        }
        if (subscription && subscription.trial_expired) {
          this.linkService.routerNavigate(this.linkService.list.accountPlan.routerLink(), {replaceUrl: true});
          return false;
        }
        return true;
      })
      .catch((error: any) => Observable.of(true))
      .first();
  }
}

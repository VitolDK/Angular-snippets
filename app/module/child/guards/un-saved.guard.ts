import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UnSaveService } from '../service';
import { Observable } from 'rxjs';

@Injectable()
export class UnSavedGuard implements CanDeactivate<any> {

  constructor(private unSaveService: UnSaveService) {
  }

  public canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
    return !this.unSaveService.checkChanges() ? true : this.unSaveService.windowUnSavedData().map((data: any) => data === true);
  }
}

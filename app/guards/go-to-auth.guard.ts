import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LinkService, UserService } from '../service';

@Injectable()
export class GoToAuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private linkService: LinkService) {
  }

  public canActivate() {
    if (this.userService.isAuth()) {
      return true;
    }
    this.linkService.routerNavigate(this.linkService.list.signIn.routerLink(),  {replaceUrl: true});
    return false;
  }
}

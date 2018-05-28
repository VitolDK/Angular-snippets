import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie';

import { UtilsService } from './utils.service';
import { LinkService } from './link.service';

import { Config } from '../config';

@Injectable()
export class UserService {
  @Output()
  public userIsAuth: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public userInfoEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private utils: UtilsService,
              private linkService: LinkService) {
  }

  public get(): any {
    let { cookieStoreName } = Config;
    const user: string = this.cookie.get(cookieStoreName);
    return user && JSON.parse(user);
  }

  public set(user: any): void {
    let { cookieStoreName, cookieOptions } = Config;
    this.cookie.putObject(cookieStoreName, {token: user.access_token, id: user.user_id}, cookieOptions);
    setTimeout(() => this.userIsAuth.emit(this.isAuth()));
  }

  public isAuth(): boolean {
    return !!this.get();
  }

  public login(model: any): Promise<any> {
    return this.http.post()
      .toPromise()
      .then(({results}: any) => this.set(results))
      .catch(this.utils.handleError);
  }

  public logout(): void {
    let { cookieStoreName, cookieOptions: {path, domain} } = Config;
    this.cookie.remove(cookieStoreName, {path, domain});
    this.userIsAuth.emit(this.isAuth());
  }

  public logoutAlert(): void {
    this.utils.alert({
      type: 'warning',
      title: this.utils.translate('LOGOUT.TITLE'),
      text: this.utils.translate('LOGOUT.TEXT'),
    })
      .then((event: any) => {
        if (event && event.value) {
          this.logout();
        }
      }, this.utils.dummyFunc);
  }
}

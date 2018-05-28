import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { CookieService } from 'ngx-cookie';

import { Config } from './config';
import { UserService } from './service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
              private cookie: CookieService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let {host, subDomain, cookieStoreName} = Config;
    if (req.url.indexOf(host) !== -1) {
      let data: string = this.cookie.get(cookieStoreName);
      let token: string = data && JSON.parse(data).token;
      if (token) {
        req = req.clone({headers: req.headers.set('Authorization', `Token ${token}`)});
      }
      let store: string = subDomain || this.cookie.get('last_store') || null;
      if (store) {
        req = req.clone({headers: req.headers.set('X-SUB-DOMAIN', store)});
      }
    }
    return next.handle(req)
      .catch((error, caught) => {
        if (error.status === 401) {
          this.injector.get(UserService).logout();
        }
        return Observable.throw(error);
      }) as any;
  }
}

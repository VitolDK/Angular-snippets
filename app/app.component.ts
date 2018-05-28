import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';

import { UtilsService, MixPanelService, UserService } from './service';

@Component({
  selector: 'app',
  moduleId: module.id.toString(),
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor(private router: Router,
              private utils: UtilsService,
              private userService: UserService,
              private mixPanelService: MixPanelService) {
    router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => (currRouteEvent instanceof NavigationEnd) && utils.scrollToTop());
    mixPanelService.setSessionEvent.subscribe(() => this.addUserData());
    userService.userIsAuth.subscribe(() => this.addUserData());
  }

  public ngOnInit(): void {
    this.mixPanelService.init();
  }

  private addUserData(): void {
    let isAuth: boolean = this.userService.isAuth();
    this.mixPanelService.registerParams({'IS AUTH': isAuth});
    if (isAuth) {
      this.userService.userData(this.userService.get().id)
        .subscribe(({id, username}: any) => this.mixPanelService.registerParams({'USER ID': id, 'USER NAME': username}), this.utils.dummyFunc);
    } else {
      this.mixPanelService.unregisterParams(['USER ID', 'USER NAME']);
    }
  }
}

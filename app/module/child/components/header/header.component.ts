import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ListLinks } from '../../../../model';
import { OpacityAnimation } from '../../../../animation';
import { HeaderAsideService, MixPanelService, UnSaveService } from '../../service';
import { LinkService, UserService, UtilsService } from '../../../../service';

@Component({
  selector: 'header-cmp',
  styleUrls: ['./header.scss'],
  moduleId: module.id.toString(),
  animations: [OpacityAnimation],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  public user: any = null;
  public links: ListLinks;

  constructor(public unSave: UnSaveService,
              private translateService: TranslateService,
              private linkService: LinkService,
              private utils: UtilsService,
              private userService: UserService,
              private mixPanelService: MixPanelService,
              private headerAsideService: HeaderAsideService) {
    this.links = linkService.list;
    userService.userInfoEvent.subscribe((user: any) => this.user = user);
  }

  public ngOnInit(): void {
    this.user = this.userService.getUserDataVariable();
  }

  public toggleAside(): void {
    this.mixEvent('MOBILE-MENU');
    this.headerAsideService.toggleAside();
  };

  public main(): void {
    this.mixEvent('MAIN');
    this.linkService.routerNavigate(this.links.main.routerLink());
  }

  public profile(): void {
    this.mixEvent('PROFILE');
    this.linkService.routerNavigate(this.links.settingAccountDetail.routerLink());
  }

  public logout(): void {
    this.mixEvent('LOGOUT');
    this.userService.logoutAlert();
  }

  public mixEvent(event: string): void {
    this.mixPanelService.activePageEvent(event);
  }
}

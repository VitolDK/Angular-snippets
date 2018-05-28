import { Component, OnDestroy, OnInit } from '@angular/core';

import { UtilsService, UserService, LinkService } from '../../../../service';
import { ListLinks } from '../../../../../../model';

@Component({
  selector: 'account-detail-cmp',
  moduleId: module.id.toString(),
  templateUrl: './account-detail.component.html'
})

export class AccountDetailComponent implements OnInit, OnDestroy {
  public user: any;
  public links: ListLinks;

  constructor(private utils: UtilsService,
              private linkService: LinkService,
              private mixPanelService: MixPanelService,
              private userService: UserService) {
    this.links = linkService.list;
  }

  public ngOnInit(): void {
    this.user = this.userService.getUserDataVariable();
  }

  public ngOnDestroy(): void {
  }
}

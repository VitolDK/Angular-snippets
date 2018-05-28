import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from '../../../../model';
import { CollapseAnimation } from '../../../../animation';
import {  } from '../../service';
import { ListLinks } from '../../../../model';

@Component({
  selector: 'main-cmp',
  styleUrls: ['./main.scss'],
  moduleId: module.id.toString(),
  animations: [CollapseAnimation],
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit, OnDestroy {
  public links: ListLinks;
  public isLarge: boolean = false;
  public trial: { status: boolean; show: boolean; left: { days: string } };
  private subscriptions: Subscription[] = [];
  constructor(private router: Router,
              private translateService: TranslateService,
              private utils: UtilsService,
              private projectService: ProjectService,
              private mainLayoutService: MainLayoutService,
              private mixPanelService: MixPanelService,
              private linkService: LinkService) {
    this.links = linkService.list;
    mainLayoutService.mainLayoutEvent.subscribe((isLarge: boolean) => this.isLarge = isLarge);
    projectService.updateDataEvent.subscribe(() => this.updateTrial());
  }

  public ngOnInit(): void {
    this.updateTrial();
    this.subscriptions.push(
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (currRouteEvent instanceof NavigationEnd) {
          this.updateTrial();
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}

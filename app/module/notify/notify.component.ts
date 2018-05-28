import { Component, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Notify, NotifyService } from './notify.service';

import { PathSVG } from '../../static-func';
import { CollapseAnimation } from '../../animation';

@Component({
  selector: 'notify-cmp',
  styleUrls: ['./notify.scss'],
  moduleId: module.id.toString(),
  animations: [CollapseAnimation],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './notify.component.html'
})

export class NotifyComponent implements OnDestroy {

  @Input() public items: number = 5;
  public pathSVG = PathSVG;
  public list: Notify[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private sanitizer: DomSanitizer,
              private notifyService: NotifyService) {
    this.subscriptions.push(this.notifyService.newNotifyEvent.subscribe((notify: Notify) => {
      if (this.list.length >= this.items) {
        this.close(this.list[0]);
      }
      this.list.push(notify);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscribe: Subscription) => subscribe.unsubscribe());
  }

  public toHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  public close(closeNotify: Notify): void {
    this.list = this.list.filter((notify: Notify) => notify !== closeNotify);
  }
}

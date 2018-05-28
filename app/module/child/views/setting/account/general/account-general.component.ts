import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { UtilsService, UserService, LinkService, UnSaveService } from '../../../../service';
import { ListLinks } from '../../../../../../model';

@Component({
  selector: 'account-general-cmp',
  moduleId: module.id.toString(),
  templateUrl: './account-general.component.html'
})

export class AccountGeneralComponent implements OnInit, OnDestroy {
  public user: any;
  public links: ListLinks;
  public form: FormGroup;
  public loading: boolean = true;

  private formOldValue: any;
  private subscriptions: { [key: string]: Subscription } = {};

  constructor(public unSaveService: UnSaveService,
              private formBuilder: FormBuilder,
              private utils: UtilsService,
              private linkService: LinkService,
              private userService: UserService) {
    this.links = linkService.list;
    this.user = userService.getUserDataVariable();
    this.subscriptions.saveEvent = this.unSaveService.saveEvent.subscribe(() => this.save());
    this.subscriptions.leaveEvent = this.unSaveService.leaveEvent.subscribe(() => linkService.main());
    this.subscriptions.discardEvent = this.unSaveService.discardEvent.subscribe((data: any) => data && this.updateFormData(data, true));
  }

  public ngOnInit(): void {
    this.loading = true;
    this.userService.profileData({method: 'get'})
      .then((data: any) => this.updateFormData(data, true))
      .catch(this.utils.handleError);
  }

  public ngOnDestroy(): void {
    _.each(this.subscriptions, (subscription: any) => subscription.unsubscribe());
    this.unSaveService.reset();
  }

  public save(): void {
    let {value} = this.form;
    this.userService.profileData({method: 'put', body: value})
      .then((data: any) => {
        this.utils.scrollToTop();
        this.utils.addNotify({
          timeout: 0,
          icon: 'save',
          type: 'success',
          text: `<h2>${this.utils.translate('ACCOUNT_DETAIL.GENERAL.CHANGED')}</h2>`
        });
        this.unSaveService.reset();
        this.updateFormData(data, true);
      })
      .catch(this.utils.handleError);
  }

  private updateFormData(info: any, updateFormEvent: boolean = false): void {
    let empty: string = '';
    this.form = this.formBuilder.group({
      first_name: [(info.first_name || empty).toString(), [Validators.minLength(2), Validators.maxLength(30)]],
      last_name: [(info.last_name || empty).toString(), [Validators.minLength(2), Validators.maxLength(30)]]
    });
    this.formOldValue = _.cloneWith(this.form.value);
    this.unSaveService.setOldValueForm((updateFormEvent && this.form), this.formOldValue, false);
    this.subscriptions.valueChanges = this.form.valueChanges.subscribe(() => this.unSaveService.update(this.form, false));
    setTimeout(() => this.loading = false);
  }
}

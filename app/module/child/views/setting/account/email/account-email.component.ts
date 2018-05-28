import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from 'ngx-validators';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { UtilsService, UserService, LinkService, UnSaveService } from '../../../../service';
import { ListLinks } from '../../../../../../model';

@Component({
  selector: 'account-email-cmp',
  moduleId: module.id.toString(),
  templateUrl: './account-email.component.html'
})

export class AccountEmailComponent implements OnInit, OnDestroy {
  public user: any;
  public links: ListLinks;
  public form: FormGroup;

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
    this.updateFormData({}, true);
  }

  public ngOnDestroy(): void {
    _.each(this.subscriptions, (subscription: any) => subscription.unsubscribe());
    this.unSaveService.reset();
  }

  public save(): void {
    let {value} = this.form;
    let {id} = this.userService.getUserDataVariable();
    this.userService.changeEmail({url: {userId: id}, body: value})
      .then(() => {
        this.utils.scrollToTop();
        this.utils.addNotify({
          timeout: 0,
          icon: 'save',
          type: 'success',
          text: `<h2>${this.utils.translate('ACCOUNT_DETAIL.EMAIL.CHANGED')}</h2>`
        });
        this.unSaveService.reset();
        this.updateFormData({}, true);
      })
      .catch((error: any) => this.utils.addNotify({
        timeout: 0,
        icon: 'error',
        type: 'danger',
        text: `<h2>${error.message}</h2>`
      }));
  }

  private updateFormData(info: any, updateFormEvent: boolean = false): void {
    let empty: string = '';
    this.form = this.formBuilder.group({
      email: [(empty).toString(), [Validators.required, EmailValidators.simple]],
      password: [(empty).toString(), [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
    this.formOldValue = _.cloneWith(this.form.value);
    this.unSaveService.setOldValueForm((updateFormEvent && this.form), this.formOldValue, false);
    this.subscriptions.valueChanges = this.form.valueChanges.subscribe(() => this.unSaveService.update(this.form, false));
  }
}

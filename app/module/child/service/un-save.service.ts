import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

import { UtilsService } from '../../../service';
import { BoolResultModalComponent } from '../modals';
import { Observable } from 'rxjs/Observable';

interface UnSaveState {
  save: boolean;
  isNew: boolean;
  change: boolean;
}

@Injectable()
export class UnSaveService {
  public view: boolean = false;
  public saveButtonName: string = '';
  public state: UnSaveState = {
    save: false,
    change: false,
    isNew: false
  };
  public saveEvent: EventEmitter<null> = new EventEmitter<null>();
  public leaveEvent: EventEmitter<null> = new EventEmitter<null>();
  public discardEvent: EventEmitter<any> = new EventEmitter<any>();
  public changeEvent: EventEmitter<UnSaveState> = new EventEmitter<UnSaveState>();
  private oldValuesForm: any = null;

  constructor(private utils: UtilsService,
              private bsModalService: BsModalService,
              private mixPanelService: MixPanelService) {
  }

  public setSaveButtonName(name: string): void {
    this.saveButtonName = name;
  }

  public setOldValueForm(currentForm: FormGroup, oldValues: any, isNewForm: boolean = false): void {
    this.oldValuesForm = oldValues;
    this.state.isNew = isNewForm;
    if (currentForm) {
      setTimeout(() => this.update(currentForm, isNewForm));
    }
  }

  public update(form: FormGroup, isNewForm: boolean = false): void {
    let change: boolean = JSON.stringify(this.oldValuesForm) !== JSON.stringify(form.value);
    let view: boolean = isNewForm || change;
    let save: boolean = form.valid;
    this.status(view);
    this.change(change, save);
  }

  public reset(): void {
    this.status(false);
    this.change(false, false);
    this.setSaveButtonName('');
    this.setOldValueForm(null, null);
  }

  public checkChanges(): boolean {
    return this.state.change;
  }

  public windowUnSavedData(): Observable<any> {
    let modal = this.bsModalService.onHidden;
    this.mixPanelService.onPageEvent(SCREEN, true);
    this.bsModalService.show(BoolResultModalComponent, {
      initialState: {
        text: {
          header: this.utils.translate('UNSAVED_DATA.LEAVE.TITLE'),
          message: this.utils.translate('UNSAVED_DATA.LEAVE.TEXT'),
          cancel: this.utils.translate('COMMON.CANCEL'),
          confirm: this.utils.translate('UNSAVED_DATA.LEAVE.CONFIRM_BUTTON_TEXT')
        }
      }
    });

    return modal;
  }

  public windowDiscardData(): Observable<any> {
    let modal = this.bsModalService.onHidden;
    this.mixPanelService.onPageEvent(SCREEN, true);
    this.bsModalService.show(BoolResultModalComponent, {
      initialState: {
        text: {
          header: this.utils.translate('UNSAVED_DATA.DISCARD.TITLE'),
          message: this.utils.translate('UNSAVED_DATA.DISCARD.TEXT'),
          cancel: this.utils.translate('UNSAVED_DATA.DISCARD.CANCEL_BUTTON_TEXT'),
          confirm: this.utils.translate('UNSAVED_DATA.DISCARD.CONFIRM_BUTTON_TEXT')
        }
      }
    });

    modal.subscribe((state: any) => {
      if (modal && modal.unsubscribe) {
        modal.unsubscribe();
      }
    });
    return modal;
  }

  public status(status: boolean): void {
    this.view = status;
  }

  public change(change: boolean, save: boolean): void {
    this.state = {...this.state, change, save};
    this.changeEvent.emit(this.state);
  }

  public leave(): void {
    if (this.state.change) {
      let modal = this.windowDiscardData()
        .subscribe((state: any) => {
          if (state === true) {
            this.reset();
            this.leaveEvent.emit();
          }
          if (modal && modal.unsubscribe) {
            modal.unsubscribe();
          }
        });
    } else {
      this.leaveEvent.emit();
    }
  }

  public discard(): void {
    if (this.state.change) {
      let modal = this.windowDiscardData()
      .subscribe((state: any) => {
        if (state === true) {
          this.discardEvent.emit(this.oldValuesForm);
        }
        if (modal && modal.unsubscribe) {
          modal.unsubscribe();
        }
      });

    }
  }

  public save(): void {
    this.saveEvent.emit();
  }
}

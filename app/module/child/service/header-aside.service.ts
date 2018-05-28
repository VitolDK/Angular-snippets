import { Injectable, EventEmitter } from '@angular/core';

import { IOSFix, UndoIOSFix } from '../../../static-func';

@Injectable()
export class HeaderAsideService {
  public toggleAsideEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isOpen: boolean = false;

  public toggleAside(state: boolean = !this.isOpen): void {
    if (state) {
      IOSFix();
    } else {
      UndoIOSFix();
    }
    this.isOpen = state;
    this.toggleAsideEvent.emit(this.isOpen);
  }
}

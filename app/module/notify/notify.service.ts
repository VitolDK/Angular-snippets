import { Injectable, EventEmitter, Output } from '@angular/core';

export interface Notify {
  id?: string;
  text: string;
  icon?: string;
  timeout?: number;
  dismissible?: boolean;
  type: 'danger' | 'success' | 'warning' | 'info';
}

@Injectable()
export class NotifyService {
  @Output() public newNotifyEvent: EventEmitter<Notify> = new EventEmitter<Notify>();

  public addNotify(newNotify: Notify): void {
    this.newNotifyEvent.emit(Object.assign({
      text: '',
      icon: '',
      timeout: 0,
      type: 'success',
      dismissible: false,
      id: (new Date()).toDateString()
    }, newNotify));
  }
}

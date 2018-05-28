import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { CollapseAnimation } from '../../animation';

@Component({
  moduleId: module.id.toString(),
  animations: [CollapseAnimation],
  selector: 'form-group-input-cmp',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-group-input.scss'],
  templateUrl: './form-group-input.component.html'
})

export class FormGroupInputComponent implements OnInit {

  private static isRequired(control: any): { [key: string]: boolean } {
    let validator = control['validator'];
    return validator && validator(Validators.required);
  }

  @Input() public form: FormGroup = null;
  @Input() public name: string = null;
  @Input() public type: string = null;
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public isReverse: boolean = false;
  @Input() public icon: { type: 'svg' | 'char', name: string, action: boolean } = null;
  @Input() public messages: Array<{ type: string, text: string }> = [];
  @Output() public iconActionEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() public isFocusEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public focus: boolean = false;
  public isRequired: boolean = false;

  public ngOnInit(): void {
    let validator = FormGroupInputComponent.isRequired(this.form.controls[this.name]);
    this.isRequired = validator && validator.required || false;
  }

  public isFocus(state: boolean): void {
    this.focus = state;
    this.isFocusEvent.emit(state);
  }

  public iconAction(): void {
    this.iconActionEvent.emit();
  }
}

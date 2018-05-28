import { AbstractControl } from '@angular/forms';

export function OnlyLengthMinMax(min: number, max: number) {
  return (control: AbstractControl) => {
    let controlValue = control.value && control.value || '';
    let valueLength = controlValue.replace(/\D/g, '').length;
    return valueLength && (valueLength !== min && valueLength !== max) ? {errorLengthString: true} : null;
  }
}
export function OnlyLength(length: number) {
  return (control: AbstractControl) => {
    let controlValue = control.value && control.value || '';
    let valueLength = controlValue.replace(/\D/g, '').length;
    return valueLength && (valueLength !== length) ? {errorLengthString: true} : null;
  }
}

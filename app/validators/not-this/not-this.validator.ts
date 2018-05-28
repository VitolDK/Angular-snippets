import { AbstractControl } from '@angular/forms';

export function NotThisWords(not: string[]) {
  return (control: AbstractControl) => {
    let controlValue = control.value && control.value || '';
    return not['includes'](controlValue) ? {notThisWordsFoundIncludes: true} : null;
  };
}

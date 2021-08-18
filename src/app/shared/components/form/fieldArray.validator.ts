import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export class FieldArrayValidators {
  public static minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) {
        return;
      }
      return control.length < min ? { minLength: true } : null;
    };
  }
}

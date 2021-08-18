import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FieldArrayValidators } from '../components/form/fieldArray.validator';
import { Field, Fields } from '../components/form/fieldType';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  flat(list: Field<any>[]): Field<any>[] {
    let arr: Field<any>[] = [];
    list.forEach((item) => {
      if (item.controlType === 'card') {
        arr = arr.concat(item.value);
      } else {
        arr.push(item);
      }
    });

    return arr;
  }

  createControl(
    field: Field<any>,
    disabled: boolean,
    value?: any
  ): FormControl {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    return new FormControl(
      {
        value: value !== undefined ? value : field.value,
        disabled: field.disabled || disabled,
      },
      {
        validators,
        // updateOn: 'blur',
      }
    );
  }

  createArray(
    field: Field<any[]>,
    disabled: boolean,
    value?: any[]
  ): FormArray {
    const controls = value?.map((item: any) =>
      field.children.length
        ? this.createGroup(field.children, disabled, item)
        : new FormControl({
            value: item,
            disabled: field.disabled || disabled,
          })
    );

    return new FormArray(
      controls || [],
      FieldArrayValidators.minLength(field.required ? 1 : 0)
    );
  }

  createGroup(fields: Field<any>[], disabled: boolean, data?: any): FormGroup {
    const group: any = {};

    fields.forEach((field) => {
      const oldValue =
        data && data.hasOwnProperty(field.key) ? data[field.key] : field.value;

      if (field.controlType === 'group') {
        group[field.key] = this.createGroup(field.value, disabled, oldValue);
      } else if (field.controlType === 'dynamic') {
        field.value = Object.keys(oldValue)
          .sort()
          .map((key) =>
            field.multiple
              ? Fields.array({
                  key,
                  children: field.children,
                })
              : Fields.group({
                  key,
                  value: field.children,
                })
          );

        group[field.key] = this.createGroup(field.value, disabled, oldValue);
      } else if (
        field.controlType === 'array' ||
        field.controlType === 'file' ||
        field.multiple
      ) {
        group[field.key] = this.createArray(
          field,
          disabled,
          Array.isArray(oldValue) ? oldValue : field.value
        );
      } else {
        group[field.key] = this.createControl(field, disabled, oldValue);
      }
    });
    return new FormGroup(group);
  }
}

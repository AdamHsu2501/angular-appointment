import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Field } from '../../fieldType';

export function escapeRegExp(v: string): string {
  return v.trim().replace(/[-[/\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  inputControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }

  get isValid(): boolean {
    return this.control.valid;
  }

  ngOnInit(): void {
    this.inputControl.patchValue(this.control.value);
    if (this.control.disabled) {
      this.inputControl.disable();
    }

    if (!this.field.hidden && !this.field.disabled) {
      this.field.options.subscribe((options) => {
        this.filteredOptions = this.inputControl.valueChanges.pipe(
          debounceTime(300),
          startWith(this.field.value),
          map((value) => {
            if (!value) {
              return options;
            }

            if (typeof value === 'object') {
              return options.filter((option) =>
                Object.keys(value).every((key) => value[key] === option[key])
              );
            } else {
              const reg = new RegExp(escapeRegExp(value as string), 'i');

              return options.filter((option) =>
                this.field.filterFn
                  ? this.field.filterFn(reg, option)
                  : reg.test(option)
              );
            }
          })
        );
      });
    }
  }

  markAsDirty(): void {
    this.control.markAsDirty();
  }

  clear(event: Event): void {
    event.preventDefault();
    this.control.setValue('');
    this.inputControl.setValue('');
    this.markAsDirty();
  }

  add(event: MatAutocompleteSelectedEvent): void {
    this.control.patchValue(event.option.value);
    this.markAsDirty();
  }

  blur(event: Event): void {
    event.preventDefault();
    this.inputControl.patchValue(this.control.value);
    this.markAsDirty();
  }
}

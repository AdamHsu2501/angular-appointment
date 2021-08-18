import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { escapeRegExp } from '../autocomplete/autocomplete.component';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-multi-autocomplete',
  templateUrl: './multi-autocomplete.component.html',
  styleUrls: ['./multi-autocomplete.component.css'],
})
export class MultiAutocompleteComponent implements OnInit {
  inputControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() field!: Field<any[]>;
  @Input() form!: FormGroup;
  @ViewChild('queryInput') queryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  constructor() {}

  get controls(): FormArray {
    return this.form.controls[this.field.key] as FormArray;
  }

  get isValid(): boolean {
    return this.field.required && !this.controls.length ? false : true;
  }

  ngOnInit(): void {
    this.field.options.subscribe((options) => {
      this.filteredOptions = this.inputControl.valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value: string) => {
          const reg = new RegExp(escapeRegExp(value as string), 'i');

          return !this.field.filterFn
            ? options.filter(
                (option: string) =>
                  !this.controls.value.includes(option) && reg.test(option)
              )
            : options.filter(
                (option: any) =>
                  !this.controls.value.includes(option) &&
                  this.field.filterFn(reg, option)
              );
        })
      );
    });
  }

  markAsDirty(): void {
    this.controls.markAsDirty();
  }

  reset(): void {
    this.queryInput.nativeElement.value = '';
    this.inputControl.setValue('');
  }

  addItem(value: any): void {
    this.markAsDirty();
    this.reset();
    if (!this.controls.value.includes(value)) {
      this.controls.push(new FormControl(value));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addItem(event.option.value);
  }

  add(event: MatChipInputEvent): void {
    const { value } = event;
    if ((value || '').trim() && this.matAutocomplete.options.length) {
      this.addItem(this.matAutocomplete.options.first.value);
    } else {
      this.reset();
    }
  }

  removeAt(key: number): void {
    this.markAsDirty();
    this.controls.removeAt(key);
  }

  clear(): void {
    this.markAsDirty();
    this.controls.clear();
  }
}

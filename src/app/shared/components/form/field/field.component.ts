import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { Field } from '../fieldType';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: AbstractControl;

  constructor() {}

  get group(): FormGroup {
    return this.form as FormGroup;
  }

  get array(): FormArray {
    return this.form as FormArray;
  }
  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css'],
})
export class NumberComponent implements OnInit {
  @Input() field!: Field<number>;
  @Input() form!: FormGroup;

  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }
  get isValid(): boolean {
    return this.form.controls[this.field.key].valid;
  }

  get isCurrency(): boolean {
    return this.field.type === 'currency';
  }
  ngOnInit(): void {}
}

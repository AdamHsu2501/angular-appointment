import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
export class TextboxComponent implements OnInit {
  @Input() field!: Field<string>;
  @Input() form!: FormGroup;

  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }
  get isValid(): boolean {
    return this.form.controls[this.field.key].valid;
  }

  get isCount(): boolean {
    return !!this.field.maxlength;
  }

  ngOnInit(): void {}
}

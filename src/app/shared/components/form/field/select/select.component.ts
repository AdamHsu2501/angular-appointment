import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;

  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }
  get isValid(): boolean {
    return this.control.valid;
  }

  get options(): Observable<any> {
    return this.field.options;
  }

  ngOnInit(): void {}
}

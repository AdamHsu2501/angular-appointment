import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  @Input() field!: Field<string>;
  @Input() form!: FormGroup;
  public customPatterns = { '0': { pattern: new RegExp('[a-zA-Z]') } };
  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }
  get isValid(): boolean {
    return this.form.controls[this.field.key].valid;
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onValueChanged(event: any): void {
    const value = event.target.value;
    console.log('onValueChanged', value);
    let val = value.replace(/[^\d]+|^0+(?!$)/g, '').slice(0, 4);
    let min = ('00' + val.slice(-2)).slice(-2);
    min = min > '59' && val.length > 3 ? '00' : min;
    let hour = ('00' + val.slice(-4, -2)).slice(-2);
    hour = hour > '23' ? '00' : hour;
    const newVal = [hour, min].join(':');
    this.control.patchValue(newVal);
  }
}

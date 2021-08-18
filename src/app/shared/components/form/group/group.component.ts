import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Field } from '../fieldType';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;
  constructor() {}

  get control(): FormGroup {
    return this.form.controls[this.field.key] as FormGroup;
  }

  ngOnInit(): void {}
}

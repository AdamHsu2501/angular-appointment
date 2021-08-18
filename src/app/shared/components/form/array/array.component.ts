import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { Field } from '../fieldType';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css'],
})
export class ArrayComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;

  constructor(private formService: FormService) {}

  get array(): FormArray {
    return this.form.controls[this.field.key] as FormArray;
  }

  get hasChild(): boolean {
    return !!this.array.controls.length;
  }

  ngOnInit(): void {}
  markAsDirty(): void {
    this.form.markAsDirty();
  }

  add(): void {
    const group = this.formService.createGroup(
      this.field.children,
      this.form.disabled
    );

    this.array.push(group);
    this.markAsDirty();
  }

  removeAt(index: number): void {
    this.array.removeAt(index);
    this.markAsDirty();
  }
}

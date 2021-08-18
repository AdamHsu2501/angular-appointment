import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Field } from './fieldType';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  isSticky: boolean = false;

  @Input() fields!: Field<any>[];
  @Input() form!: FormGroup;

  @Input() submitBtn: boolean = true;
  @Input() submitText: string = 'update';
  @Output() submitAction = new EventEmitter();

  @Input() cancelBtn: boolean = true;
  @Input() cancelText: string = 'cancel';
  @Output() cancelAction = new EventEmitter();

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 150;
  }

  constructor() {}

  get valid(): boolean {
    return this.form ? this.form.valid && this.form.dirty : false;
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    this.submitAction.emit(form.getRawValue());
  }

  onCancel() {
    this.cancelAction.emit();
  }
}

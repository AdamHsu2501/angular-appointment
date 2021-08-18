import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { Field, Fields } from '../fieldType';
import { MatDialog } from '@angular/material/dialog';
import { DateComponent } from '../field/date/date.component';
import { IMyDateModel } from 'angular-mydatepicker';
import moment from 'moment';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;
  constructor(private formService: FormService, private dialog: MatDialog) {}

  get control(): FormGroup {
    return this.form.controls[this.field.key] as FormGroup;
  }

  ngOnInit(): void {}

  remove(key: string): void {
    this.control.removeControl(key);

    const index = this.field.value.findIndex((item: any) => item.key === key);
    if (index >= 0) {
      this.field.value.splice(index, 1);
    }
  }

  openDialog() {
    const ref = this.dialog.open(DateComponent);

    ref.afterClosed().subscribe((res: IMyDateModel) => {
      if (res && res.singleDate && res.singleDate.formatted) {
        const id = res.singleDate.formatted.slice(5);
        if (!this.isInclude(id)) {
          this.add(id);
        }
      }
    });
  }

  isInclude(id: string): boolean {
    const list: Field<any>[] = this.field.value;
    return !!list.find((f) => f.key === id);
  }

  add(id: string): void {
    let group: AbstractControl;
    if (this.field.multiple) {
      group = this.formService.createArray(this.field, this.form.disabled);

      this.field.value.push(
        Fields.array({
          key: id,
          children: this.field.children,
        })
      );
    } else {
      group = this.formService.createGroup(
        this.field.children,
        this.form.disabled
      );

      this.field.value.push(
        Fields.group({
          key: id,
          value: this.field.children,
        })
      );
    }

    this.control.addControl(id, group);
    this.control.markAsDirty();
  }
}

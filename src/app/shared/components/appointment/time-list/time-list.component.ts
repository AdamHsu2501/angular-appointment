import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ISelectedDate } from 'src/app/appointments/appointments.service';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css'],
})
export class TimeListComponent implements OnInit {
  @Input() list!: ISelectedDate[];
  @Input() timeZone!: string;
  @Input() value!: ISelectedDate;
  @Output() valueChange = new EventEmitter();
  @Output() submitAction = new EventEmitter();

  change(newValue: ISelectedDate) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  constructor() {}

  get empty(): boolean {
    return !this.list.length;
  }

  ngOnInit(): void {}

  getTime(date: moment.Moment): string {
    return date.tz(this.timeZone).format('HH:mm');
  }

  onClick(value: ISelectedDate): void {
    if (!this.compare(this.value, value)) {
      this.valueChange.emit(value);
    }
  }

  compare(a: ISelectedDate, b: ISelectedDate): boolean {
    return a && b ? a.begin === b.begin && a.end === b.end : false;
  }

  onSubmit(): void {
    this.submitAction.emit();
  }
}

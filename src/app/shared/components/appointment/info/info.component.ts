import { Component, Input, OnInit } from '@angular/core';
import {
  faGlobeAmericas,
  faCircle,
  faCalendarCheck,
  faClock,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import {
  AppointmentsService,
  ISelectedDate,
} from 'src/app/appointments/appointments.service';
import { IAppointment, IEvent } from 'src/app/shared/IConfig';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  globe = faGlobeAmericas;
  circle = faCircle;
  calendar = faCalendarCheck;
  clock = faClock;
  dollar = faDollarSign;

  @Input() event?: IEvent;
  @Input() timeZone?: string;
  @Input() date?: ISelectedDate;
  @Input() oldData?: IAppointment;
  constructor(public aps: AppointmentsService) {}

  getTimeZone(data: IAppointment): string {
    return data.timeZone;
  }

  getDate(data: IAppointment | ISelectedDate, timeZone: string): string {
    return this.aps.getDateFormat(data, timeZone);
  }

  ngOnInit(): void {}
}

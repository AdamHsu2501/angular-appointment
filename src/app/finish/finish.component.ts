import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/app/shared/IConfig';
import { AppointmentsService } from '../appointments/appointments.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css'],
})
export class FinishComponent implements OnInit {
  @Input() text!: string;
  @Input() data!: IAppointment;
  constructor(
    private router: Router,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    const { data, text } = history.state;

    if (!data || !text) {
      this.router.navigateByUrl('404');
    }

    this.data = data;
    this.text = text;
  }

  getDate(data: IAppointment): string {
    return this.appointmentsService.getDateFormat(data, data.timeZone);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { IAppointment } from 'src/app/shared/IConfig';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() data!: IAppointment;

  constructor(
    private appointmentsService: AppointmentsService,
    private diaplog: DialogService
  ) {}

  get past(): boolean {
    return this.data.begin <= Date.now();
  }

  ngOnInit(): void {}

  getDateForm(data: IAppointment): string {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.appointmentsService.getDateFormat(data, timeZone);
  }

  onDelete(data: IAppointment): void {
    const ref = this.diaplog.alert();

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.appointmentsService.delete(data);
      }
    });
  }
}

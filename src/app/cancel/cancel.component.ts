import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Fields } from 'src/app/shared/components/form/fieldType';
import { IAppointment, IEvent } from 'src/app/shared/IConfig';
import { DeviceService } from 'src/app/shared/services/device.service';
import { FormService } from 'src/app/shared/services/form.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css'],
})
export class CancelComponent implements OnInit {
  isHandset!: boolean;
  event!: IEvent;
  oldData!: IAppointment;
  form!: FormGroup;
  fields = [
    Fields.hidden({ key: 'status', value: 'canceled' }),
    Fields.textarea({ key: 'reason' }),
  ];

  constructor(
    private eventsService: EventsService,
    private appointmentsService: AppointmentsService,
    private formService: FormService,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deviceService.isHandset$.subscribe((value) => {
      this.isHandset = value;
    });

    this.getAppointment()
      .pipe(first())
      .subscribe((oldData) => {
        if (!oldData || oldData.status === 'canceled') {
          this.router.navigateByUrl('404');
        } else {
          this.eventsService.getDoc(oldData.event).subscribe((event) => {
            if (event) {
              this.event = event;
            }
          });
          this.oldData = oldData;
          this.form = this.formService.createGroup(this.fields, false);
        }
      });
  }

  update(form: FormGroup): void {
    const data = {
      ...this.oldData,
      ...form.getRawValue(),
    };

    this.appointmentsService.update(data);

    this.router.navigateByUrl('finish', {
      state: { data, text: 'canceled' },
    });
  }

  getAppointment(): Observable<IAppointment | undefined> {
    const { data } = history.state;
    if (!!data) {
      return of(data);
    }
    const docId = this.route.snapshot.params['id'];
    return this.appointmentsService.getDoc(docId);
  }
}

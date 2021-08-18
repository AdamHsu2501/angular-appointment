import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Fields } from 'src/app/shared/components/form/fieldType';
import { IAppointment, IEvent } from 'src/app/shared/IConfig';
import { DeviceService } from 'src/app/shared/services/device.service';
import { FormService } from 'src/app/shared/services/form.service';
import {
  AppointmentsService,
  ISelectedDate,
} from '../appointments/appointments.service';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css'],
})
export class RescheduleComponent implements OnInit {
  isHandset!: boolean;
  event!: IEvent;
  timeZone!: string;
  myDpOptions!: IAngularMyDpOptions;
  displayTimeOptions: boolean = false;
  timeOptions!: ISelectedDate[];
  selectedTime!: ISelectedDate;
  oldData!: IAppointment;
  form!: FormGroup;
  fields = [
    Fields.hidden({ key: 'status', value: 'activated' }),
    Fields.hidden({
      key: 'name',
    }),
    Fields.hidden({
      key: 'email',
      type: 'email',
    }),
    Fields.hidden({
      key: 'tel',
      type: 'tel',
    }),
    Fields.textarea({
      key: 'remark',
      label: 'details',
    }),
    Fields.textarea({
      key: 'reason',
    }),
  ];
  constructor(
    private eventsService: EventsService,
    private appointmentsService: AppointmentsService,
    private formService: FormService,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  get valid(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.deviceService.isHandset$.subscribe((value) => {
      this.isHandset = value;
    });

    this.getAppointment()
      .pipe(first())
      .subscribe((oldData) => {
        if (!oldData) {
          this.router.navigateByUrl('404');
        }
        this.oldData = oldData!;
        console.log('oldData', oldData);
        combineLatest([
          this.eventsService.getDoc(oldData!.event),
          this.appointmentsService.data$,
          this.appointmentsService.timeZone$,
          this.appointmentsService.selectedDay$,
        ])
          .pipe(
            map((arr) => ({
              event: arr[0],
              scheduled: arr[1],
              timeZone: arr[2],
              selectedDay: arr[3],
            }))
          )
          .subscribe(({ event, scheduled, timeZone, selectedDay }) => {
            if (event) {
              this.myDpOptions = this.appointmentsService.getDpOptions(event);
              this.event = event;
              this.timeZone = timeZone;

              this.form = this.formService.createGroup(
                this.fields,
                false,
                oldData
              );

              if (selectedDay) {
                this.timeOptions = this.appointmentsService.getTimes(
                  event,
                  timeZone,
                  selectedDay,
                  scheduled
                );
              }
            }
          });
      });
  }

  onTimeChanged(time: ISelectedDate): void {
    this.selectedTime = time;
  }

  onDayChanged(event: IMyDateModel): void {
    if (event.singleDate?.jsDate) {
      this.displayTimeOptions = true;
      this.appointmentsService.onDayChanged(event.singleDate.jsDate);
    }
  }

  onTimeZoneChanged(value: string): void {
    this.appointmentsService.onTimeZoneChanged(value);
  }

  getAppointment(): Observable<IAppointment | undefined> {
    const { data } = history.state;
    if (!!data) {
      return of(data);
    }
    const docId = this.route.snapshot.params['id'];
    return this.appointmentsService.getDoc(docId);
  }

  update(form: FormGroup): void {
    const data = this.appointmentsService.createAppointment(
      this.event,
      this.timeZone,
      this.selectedTime,
      form.getRawValue()
    );

    this.appointmentsService.delete(this.oldData);
    this.appointmentsService.update(data);

    this.router.navigateByUrl('finish', {
      state: { data, text: 'confirmed' },
    });
  }
}

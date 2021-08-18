import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppointment, IEvent } from '../shared/IConfig';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import moment from 'moment';

export interface ISelectedDate {
  begin: moment.Moment;
  end: moment.Moment;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  data$ = new BehaviorSubject<IAppointment[]>([
    {
      begin: 1629248400000,
      email: '',
      end: 1629249300000,
      interval: 10,
      event: 'default',
      id: '39fd58ce-5ffc-4595-892f-f0027aee7cfd',
      name: 'asdf',
      reason: '',
      remark: '',
      status: 'activated',
      tel: '',
      timeZone: 'Asia/Taipei',
    },
  ]);

  timeZone$ = new BehaviorSubject<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  selectedDay$ = new BehaviorSubject<Date | undefined>(undefined);

  constructor() {}

  createId(): string {
    return uuidv4();
  }

  getDoc(id: string): Observable<IAppointment | undefined> {
    return this.data$.pipe(map((res) => res.find((item) => item.id === id)));
  }

  update(data: IAppointment): void {
    let arr = this.data$.getValue();
    const index = arr.findIndex((i) => i.id === data.id);

    if (index >= 0) {
      arr[index] = data;
    } else {
      arr = arr.concat(data);
    }
    console.log('arr', arr);
    this.data$.next(arr);
  }

  delete(data: IAppointment): void {
    const arr = this.data$.getValue();

    arr.forEach((item, index) => {
      if (item === data) {
        arr.splice(index, 1);
      }
    });
    console.log('arr', arr);
    this.data$.next(arr);
  }

  onDayChanged(date: Date): void {
    this.selectedDay$.next(date);
  }

  onTimeZoneChanged(value: string): void {
    this.timeZone$.next(value);
  }

  private getTimeOptions(
    list: ISelectedDate[],
    interval: number,
    duration: number,
    userTimeZone: string
  ): ISelectedDate[] {
    const arr: ISelectedDate[] = [];
    list.forEach((item) => {
      let begin = item.begin;
      const end = item.end.clone().set('minute', item.end.minutes() - duration);

      while (begin <= end) {
        arr.push({
          begin: begin.clone().tz(userTimeZone),
          end: begin
            .clone()
            .set('minute', begin.minutes() + duration)
            .tz(userTimeZone),
        });
        begin = begin.set('minute', begin.minutes() + interval);
      }
    });
    return arr;
  }

  private calculateAvailableList(
    rangeList: ISelectedDate[],
    begin: moment.Moment,
    end: moment.Moment,
    schedules: IAppointment[]
  ): ISelectedDate[] {
    let raIndex = 0;
    let apIndex = 0;
    const arr: ISelectedDate[] = [];

    while (raIndex < rangeList.length) {
      let curRa = rangeList[raIndex];

      while (curRa.end <= begin) {
        raIndex += 1;
      }

      curRa.begin = begin < curRa.begin ? curRa.begin : begin;
      curRa.end = curRa.end < end ? curRa.end : end;

      while (apIndex < schedules.length) {
        const curAp = schedules[apIndex];
        const left = moment(curAp.begin);
        const right = moment(curAp.end).add(curAp.interval, 'minute');
        if (curRa.end <= left) {
          break;
        }

        if (curRa.begin < left) {
          arr.push({
            begin: curRa.begin,
            end: left < curRa.end ? left : curRa.end,
          });
        }
        curRa.begin = curRa.begin < right ? right : curRa.begin;
        apIndex += 1;
      }

      if (curRa.begin < curRa.end) {
        arr.push(curRa);
      }
      raIndex += 1;
    }
    return arr;
  }

  private getSettingRange(event: IEvent, date: moment.Moment): ISelectedDate[] {
    const arr =
      event.dates[date.format('MM/DD')] || event.weekly[date.format('d')];

    return arr.map((item) => {
      const [sHour, sMin] = item.begin.split(':').map((i) => Number(i));
      const [eHour, eMin] = item.end.split(':').map((i) => Number(i));

      const begin = date.clone().set('hour', sHour).set('minute', sMin);
      const end = date.clone().set('hour', eHour).set('minute', eMin);
      return { begin, end };
    });
  }

  getTimes(
    event: IEvent,
    userTimeZone: string,
    day: Date,
    schedules: IAppointment[]
  ): ISelectedDate[] {
    const serviceTimeZone = event.timeZone;
    const day1 = moment(day).tz(serviceTimeZone);
    const end = day1.clone().add(1, 'day');
    const day2 = end.clone().subtract(1, 'second');

    let serviceRangeList = this.getSettingRange(event, day1);

    if (day1.format('MM/DD') !== day2.format('MM/DD')) {
      serviceRangeList = serviceRangeList.concat(
        this.getSettingRange(event, day2)
      );
    }

    const availableList = this.calculateAvailableList(
      serviceRangeList,
      day1,
      end,
      schedules
    );

    return this.getTimeOptions(
      availableList,
      Math.min(event.duration, event.interval),
      event.duration,
      userTimeZone
    );
  }

  createAppointment(
    event: IEvent,
    timeZone: string,
    date: ISelectedDate,
    data?: IAppointment
  ): IAppointment {
    return {
      id: uuidv4(),
      name: data?.name || '',
      email: data?.email || '',
      tel: data?.tel || '',
      remark: data?.remark || '',
      reason: data?.reason || '',
      status: data?.status || 'activated',
      begin: date.begin.valueOf(),
      end: date.end.valueOf(),
      interval: event.interval,
      event: event.id,
      timeZone,
    };
  }

  getTimeZone(value?: IAppointment): string {
    return value?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getDateFormat(data: IAppointment | ISelectedDate, timeZone: string): string {
    const begin = moment(data.begin).tz(timeZone).format('HH:mm');
    const end = moment(data.end).tz(timeZone).format('HH:mm');
    return `${begin} - ${end}, ${moment(data.begin)
      .tz(timeZone)
      .format('dddd, MMM DD, YYYY')}`;
  }

  getDpOptions(event: IEvent): IAngularMyDpOptions {
    const d = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + event.max);

    return {
      inline: true,
      dateRange: false,
      dateFormat: 'yyyy.mm.dd',
      sunHighlight: false,
      disableUntil: {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() - 1,
      },
      disableSince: {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      },
      firstDayOfWeek: 'su',
      stylesData: {
        selector: 'dp',
        styles: `
            .dp .myDpSelector{
              width: 100% !important;
              height: auto !important;
              border: none;
            }
            .myDpDaycell{
              border-radius: 100%;
              color: var(--primary-color, rgb(0, 107, 255));
              font-weight: bold;
              background-color: var(--primary-color-level4, rgba(0, 107, 255, 0.065));
            }
            .myDpDisabled{
              cursor: default;
              color: lightgray;
              background:none;
            }
            .myDpDayValue{
              display: block;
              width: 100%;
              height: 0;
              padding-top: 35%;
              padding-bottom: 65%;
            }
            .myDpSelectedDay{
              border-radius: 100%;
              color: var(--primary-text-color, #ffffff);
              font-weight: bold;
              background-color: var(--primary-color, rgb(0, 107, 255));
            }
            .myDpMarkCurrDay{
              text-decoration: underline solid var(--primary-color, rgb(0, 107, 255)) 3px;
              border-bottom: none;
            }
            .myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:last-child, .myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:last-child, .myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:last-child {
              border-bottom-right-radius: 100% !important;
            }
            .myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:first-child, .myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:first-child, .myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:first-child {
              border-bottom-left-radius: 100% !important;
            }
        `,
      },
    };
  }
}

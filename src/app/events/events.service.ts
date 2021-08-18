import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEvent, ITimeString } from '../shared/IConfig';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  defaultTimes: ITimeString[] = [{ begin: '09:00', end: '17:00' }];
  data$ = new BehaviorSubject<IEvent[]>([
    {
      id: 'default',
      displayName: 'default',
      text: 'template',
      location: 'home',
      max: 60,
      duration: 15,
      interval: 15,
      display: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekly: {
        0: [],
        1: this.defaultTimes,
        2: this.defaultTimes,
        3: this.defaultTimes,
        4: this.defaultTimes,
        5: this.defaultTimes,
        6: [],
      },
      dates: {},
    },
  ]);

  constructor() {}

  createId(): string {
    return uuidv4();
  }

  getDoc(id: string): Observable<IEvent | undefined> {
    return this.data$.pipe(map((res) => res.find((item) => item.id === id)));
  }

  update(data: IEvent): void {
    let arr = this.data$.getValue();
    const index = arr.findIndex((i) => i.id === data.id);
    if (index >= 0) {
      arr[index] = data;
    } else {
      arr = arr.concat(data);
    }
    this.data$.next(arr);
  }

  delete(data: IEvent): void {
    const arr = this.data$.getValue();

    arr.forEach((item, index) => {
      if (item === data) {
        arr.splice(index, 1);
      }
    });

    this.data$.next(arr);
  }
}

import { Component, OnInit } from '@angular/core';
import { IMyDateModel, IAngularMyDpOptions } from 'angular-mydatepicker';
import { ITimeNumber } from 'src/app/shared/IConfig';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
})
export class DateRangeComponent implements OnInit {
  model!: IMyDateModel;
  myDpOptions: IAngularMyDpOptions = {
    inline: true,
    dateRange: true,
    firstDayOfWeek: 'su',
  };
  constructor() {}

  ngOnInit(): void {}

  getToday(): ITimeNumber {
    const curr = new Date();
    const begin = curr.setHours(0, 0, 0, 0).valueOf();
    const end = curr.setDate(curr.getDate() + 1).valueOf();
    return { begin, end };
  }

  getWeek(): ITimeNumber {
    const curr = new Date();
    const begin = new Date(
      curr.getFullYear(),
      curr.getMonth(),
      curr.getDate() - curr.getDay()
    ).valueOf();
    const end = new Date(
      curr.getFullYear(),
      curr.getMonth(),
      curr.getDate() - curr.getDay() + 7
    ).valueOf();
    return { begin, end };
  }

  getMonth(): ITimeNumber {
    const curr = new Date();
    const begin = new Date(curr.getFullYear(), curr.getMonth(), 1).valueOf();
    const end = new Date(curr.getFullYear(), curr.getMonth() + 1, 1).valueOf();
    return { begin, end };
  }

  getYear(): ITimeNumber {
    const curr = new Date();
    const begin = new Date(curr.getFullYear(), 0, 1).valueOf();
    const end = new Date(curr.getFullYear() + 1, 0, 1).valueOf();
    return { begin, end };
  }

  getSelected(model: IMyDateModel): ITimeNumber | undefined {
    return model &&
      model.dateRange &&
      model.dateRange.beginJsDate &&
      model.dateRange.endJsDate
      ? {
          begin: model.dateRange.beginJsDate.valueOf(),
          end: model.dateRange.endJsDate.valueOf(),
        }
      : undefined;
  }
}

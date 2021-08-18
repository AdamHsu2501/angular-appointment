import { Component, OnInit } from '@angular/core';

import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    inline: true,
    dateRange: false,
    dateFormat: 'yyyy/mm/dd',
    firstDayOfWeek: 'su',
    // other options are here...
  };

  model!: IMyDateModel;

  constructor() {}

  ngOnInit(): void {}

  onDateChanged(event: any): void {
    console.log('Date selected: ', event);
  }
}

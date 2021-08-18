import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppointment, ITimeNumber } from 'src/app/shared/IConfig';
import { AppointmentsService } from './appointments.service';
import { DateRangeComponent } from './date-range/date-range.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  prevIndex!: number;
  selectedIndex: number = 0;
  list: string[] = ['all', 'dateRange'];
  path = 'appointments';
  docs$ = new BehaviorSubject<IAppointment[]>([]);
  range$ = new BehaviorSubject<ITimeNumber | null>(null);
  constructor(
    private dialog: MatDialog,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    combineLatest([this.appointmentsService.data$, this.range$])
      .pipe(
        map((arr) => ({
          docs: arr[0],
          range: arr[1],
        }))
      )
      .subscribe(({ docs, range }) => {
        const arr = !range
          ? docs
          : docs.filter(
              (doc) => doc.begin >= range.begin && doc.begin <= range.end
            );
        this.docs$.next(arr);
      });
  }

  onChange(event: MatTabChangeEvent): void {
    this.prevIndex = this.selectedIndex;
    this.selectedIndex = event.index;

    if (this.prevIndex !== this.selectedIndex) {
      const textLabel = this.list[event.index];
      if (textLabel === 'all') {
        this.range$.next(null);
      } else {
        const dialogRef = this.dialog.open(DateRangeComponent, {
          disableClose: false,
        });

        dialogRef.afterClosed().subscribe((result: ITimeNumber | undefined) => {
          if (!result) {
            this.selectedIndex = this.prevIndex;
          } else {
            this.range$.next(result);
          }
        });
      }
    }
  }
}

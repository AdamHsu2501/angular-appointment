import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import moment from 'moment-timezone';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ISelectedDate } from 'src/app/appointments/appointments.service';

@Component({
  selector: 'app-time-zone-button',
  templateUrl: './time-zone-button.component.html',
  styleUrls: ['./time-zone-button.component.css'],
})
export class TimeZoneButtonComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;
  myControl = new FormControl();
  options: string[] = moment.tz.names();
  filteredOptions!: Observable<string[]>;

  @Input() selected!: any;
  @Output() selectedChange = new EventEmitter();
  change(newValue: ISelectedDate) {
    this.selected = newValue;
    this.selectedChange.emit(newValue);
  }
  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onClick(value: any): void {
    this.menu.closeMenu();
    this.selectedChange.emit(value);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'src/app/shared/IConfig';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() data!: IEvent;

  constructor(private events: EventsService, private dialog: DialogService) {}

  ngOnInit(): void {}

  onClone(data: IEvent): void {
    const newData = {
      ...data,
      id: this.events.createId(),
    };
    this.events.update(newData);
  }

  onDelete(data: IEvent): void {
    const ref = this.dialog.alert();

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.events.delete(data);
      }
    });
  }
}

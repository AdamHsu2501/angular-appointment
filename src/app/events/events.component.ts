import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/shared/IConfig';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  path: string = 'events';
  data$!: Observable<IEvent[]>;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.data$ = this.eventsService.data$;
  }
}

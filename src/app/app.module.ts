import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'ngx-sortablejs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppointmentCardComponent } from './appointments/appointment-card/appointment-card.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DateRangeComponent } from './appointments/date-range/date-range.component';
import { EventCardComponent } from './events/event-card/event-card.component';
import { EventItemComponent } from './events/event-item/event-item.component';
import { EventsComponent } from './events/events.component';
import { CancelComponent } from './cancel/cancel.component';
import { FinishComponent } from './finish/finish.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { ScheduleComponent } from './schedule/schedule.component';

// AOT compilation support
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    AppointmentCardComponent,
    DateRangeComponent,
    EventsComponent,
    EventItemComponent,
    EventCardComponent,
    CancelComponent,
    ScheduleComponent,
    FinishComponent,
    RescheduleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    FlexLayoutModule,
    SortablejsModule.forRoot({ animation: 250 }),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}

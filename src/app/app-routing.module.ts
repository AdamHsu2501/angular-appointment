import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CancelComponent } from './cancel/cancel.component';
import { EventItemComponent } from './events/event-item/event-item.component';
import { EventsComponent } from './events/events.component';
import { FinishComponent } from './finish/finish.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'events', component: EventsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'events' },

  { path: 'events/:id', component: EventItemComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'reschedule/:id', component: RescheduleComponent },
  { path: 'cancel/:id', component: CancelComponent },
  { path: 'finish', component: FinishComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

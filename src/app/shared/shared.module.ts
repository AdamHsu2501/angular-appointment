import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormModule } from './components/form/form.module';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';
import { CollectionComponent } from './components/collection/collection.component';
import { InfoComponent } from './components/appointment/info/info.component';
import { TimeListComponent } from './components/appointment/time-list/time-list.component';
import { TimeZoneButtonComponent } from './components/appointment/time-zone-button/time-zone-button.component';

const components = [
  InfoComponent,
  TimeListComponent,
  TimeZoneButtonComponent,
  CollectionComponent,
  PageNotFoundComponent,
  LoadingComponent,
  AlertComponent,
];

const modules = [
  CommonModule,
  RouterModule,
  TranslateModule,
  MaterialModule,
  FlexLayoutModule,
  MatMomentDateModule,
  FormModule,
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { SortablejsModule } from 'ngx-sortablejs';
import { MaterialModule } from '../../modules/material.module';
import { AutocompleteComponent } from './field/autocomplete/autocomplete.component';

import { FormComponent } from './form.component';
import { HiddenFieldPipe } from './hidden-field.pipe';
import { ArrayComponent } from './array/array.component';
import { CardComponent } from './card/card.component';
import { GroupComponent } from './group/group.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { DynamicComponent } from './dynamic/dynamic.component';
import { FieldComponent } from './field/field.component';
import { EditorComponent } from './field/editor/editor.component';
import { MultiAutocompleteComponent } from './field/multi-autocomplete/multi-autocomplete.component';
import { NumberComponent } from './field/number/number.component';
import { SelectComponent } from './field/select/select.component';
import { TextareaComponent } from './field/textarea/textarea.component';
import { TextboxComponent } from './field/textbox/textbox.component';
import { UploadComponent } from './field/upload/upload.component';
import { DateComponent } from './field/date/date.component';
import { TelMaskDirective } from './field/textbox/tel-mask.directive';
import { TimeComponent } from './field/time/time.component';
const components = [
  FormComponent,
  AutocompleteComponent,
  MultiAutocompleteComponent,
  TextboxComponent,
  TextareaComponent,
  EditorComponent,
  NumberComponent,
  SelectComponent,
  UploadComponent,
  DateComponent,
  HiddenFieldPipe,
  ArrayComponent,
  CardComponent,
  GroupComponent,
  DynamicComponent,
  FieldComponent,
  TelMaskDirective,
  TimeComponent,
];

const modules = [
  CommonModule,
  ReactiveFormsModule,
  TranslateModule,
  MaterialModule,
  SortablejsModule,
  FlexLayoutModule,
  FormsModule,
  HttpClientModule,
  AngularEditorModule,
  AngularMyDatePickerModule,
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class FormModule {}

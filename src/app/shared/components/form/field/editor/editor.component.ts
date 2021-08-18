import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15em',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => {},
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
      ['insertImage', 'insertHorizontalRule', 'toggleEditorMode'],
    ],
  };

  @Input() field!: Field<string>;
  @Input() form!: FormGroup;
  constructor() {}

  get control(): FormControl {
    return this.form.controls[this.field.key] as FormControl;
  }
  get isValid(): boolean {
    return this.form.controls[this.field.key].valid;
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}

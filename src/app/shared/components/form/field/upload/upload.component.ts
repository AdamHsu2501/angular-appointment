import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Field } from '../../fieldType';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  options: any = {
    swapThreshold: 1,
    invertSwap: true,
    animation: 250,
    ghostClass: 'grid-preview',
    direction: 'horizontal',
  };

  @Input() field!: Field<any[]>;
  @Input() form!: FormGroup;

  constructor(private sanitizer: DomSanitizer) {}

  get controls(): FormArray {
    return this.form.controls[this.field.key] as FormArray;
  }

  get isValid(): boolean {
    return this.field.required ? !!this.controls.controls.length : true;
  }

  ngOnInit(): void {}

  markAsDirty(): void {
    this.controls.markAsDirty();
  }

  handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);
    if (!this.field.multiple) {
      this.controls.clear();
    }

    if (this.field.accept.startsWith('image')) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.controls.push(
            new FormControl({
              file,
              url: this.sanitizer.bypassSecurityTrustResourceUrl(
                e.target.result
              ),
              name: file.name,
            })
          );
        };
        reader.readAsDataURL(file);
      });
    } else {
      files.forEach((file) => {
        this.controls.push(new FormControl({ file, name: file.name }));
      });
    }
    this.markAsDirty();
  }

  removeAt(key: number): void {
    this.controls.removeAt(key);
    this.markAsDirty();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../fieldType';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}

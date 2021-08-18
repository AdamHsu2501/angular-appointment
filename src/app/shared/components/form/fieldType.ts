import { Observable, of } from 'rxjs';

export class Size<T> {
  constructor(public xs: T, public sm: T) {}
}

export interface IField<T> {
  key?: string;
  controlType?: string;
  value?: T;
  label?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  type?: string;
  prefix?: string;
  suffix?: string;
  accept?: string;
  width?: Size<number>;
  maxlength?: string;
  options?: Observable<any[]>;
  displayFn?: (args?: any) => any;
  filterFn?: (reg: RegExp, ...args: any) => boolean;
  children?: Field<any>[];
}

export class Field<T> {
  key: string;
  value: T | string;
  controlType?: string;
  label: string;
  hint: string;
  required: boolean;
  disabled: boolean;
  hidden: boolean;
  multiple: boolean;
  type: string;
  prefix: string;
  suffix: string;
  accept: string;
  children: Field<any>[];
  width: Size<number>;
  maxlength: string;
  options: Observable<any[]>;
  displayFn: (args?: any) => string;
  filterFn: (reg: RegExp, args: any) => boolean;
  constructor(obj: IField<T>) {
    this.key = obj.key || '';
    this.controlType = obj.controlType || '';
    this.value = obj.value === undefined ? '' : obj.value;
    this.label = obj.label || this.key;
    this.hint = obj.hint || '';
    this.required = obj.required || false;
    this.disabled = obj.disabled || false;
    this.hidden = obj.hidden || false;
    this.multiple = obj.multiple || false;
    this.type = obj.type || '';
    this.prefix = obj.prefix || '';
    this.suffix = obj.suffix || '';
    this.accept = obj.accept || '';
    this.children = obj.children || [];
    this.width = obj.width || new Size(50, 100);
    this.maxlength = obj.maxlength || '';
    this.options = obj.options || of([]);
    this.displayFn = obj.displayFn ? obj.displayFn : () => 'unknown';
    this.filterFn = obj.filterFn ? obj.filterFn : () => true;
  }
}

export const Fields = {
  hidden: (obj: IField<any>) =>
    new Field<any>({
      ...obj,
      controlType: 'hidden',
      value: obj.value !== undefined ? obj.value : null,
      hidden: true,
    }),
  textbox: (obj: IField<string>) =>
    new Field<string>({
      ...obj,
      controlType: 'textbox',
      value: obj.value || '',
    }),
  time: (obj: IField<string>) =>
    new Field<string>({
      ...obj,
      controlType: 'time',
      value: obj.value || '',
      type: 'tel',
    }),
  textarea: (obj: IField<string>) =>
    new Field<string>({
      ...obj,
      controlType: 'textarea',
      value: obj.value || '',
    }),
  editor: (obj: IField<string>) =>
    new Field<string>({
      ...obj,
      controlType: 'editor',
      value: obj.value || '',
    }),
  number: (obj: IField<number>) =>
    new Field<number>({
      ...obj,
      controlType: 'number',
      value: obj.value || 0,
    }),
  sort: (obj: { value: number }) =>
    new Field<number>({
      controlType: 'number',
      key: 'sort',
      value: obj.value,
      required: true,
    }),
  discount: (obj: IField<number>) =>
    new Field<number>({
      ...obj,
      controlType: 'number',
      key: 'discount',
      value: obj.value || 0,
      required: true,
      prefix: '-',
      suffix: '%',
    }),
  select: (obj: IField<any>) =>
    new Field<any>({
      ...obj,
      controlType: 'select',
      value: obj.value === undefined ? '' : obj.value,
      options: obj.options || of([]),
    }),
  boolean: (obj: IField<boolean>) =>
    new Field<boolean>({
      ...obj,
      controlType: 'select',
      value: obj.value !== undefined ? obj.value : true,
      options: of([false, true]),
      displayFn: (opt: boolean) => String(opt),
    }),
  enable: () => Fields.boolean({ key: 'enable', width: new Size(100, 100) }),
  autocomplete: (obj: IField<string>) =>
    new Field<string>({
      ...obj,
      controlType: 'autocomplete',
      value: obj.value || '',
    }),
  chips: (obj: IField<any[]>) =>
    new Field<any[]>({
      ...obj,
      controlType: 'chips',
      value: obj.value || [],
      multiple: true,
    }),
  array: (obj: IField<any[]>) =>
    new Field<any[]>({
      ...obj,
      controlType: 'array',
      value: obj.value || [],
      multiple: true,
      width: obj.width || new Size(100, 50),
    }),
  dynamicArray: (obj: IField<any[]>) =>
    new Field<any[]>({
      ...obj,
      controlType: 'dynamicArray',
      value: obj.value || [],
      multiple: true,
      width: obj.width || new Size(100, 50),
    }),
  date: (obj: IField<number>) =>
    new Field<number>({
      ...obj,
      controlType: 'date',
      key: obj.key || 'date',
      value: obj.value || Date.now(),
      required: true,
    }),
  card: (obj: IField<Field<any>[]>) =>
    new Field<any>({
      ...obj,
      controlType: 'card',
      width: obj.width || new Size(100, 50),
    }),
  group: (obj: IField<Field<any>[]>) =>
    new Field<any>({
      ...obj,
      controlType: 'group',
      key: obj.key,
      label: obj.label || obj.key,
      value: obj.value,
      width: obj.width || new Size(100, 50),
    }),
  dynamic: (obj: IField<Field<any>[]>) =>
    new Field<any>({
      ...obj,
      controlType: 'dynamic',
      key: obj.key,
      label: obj.label || obj.key,
      value: obj.value,
      width: obj.width || new Size(100, 50),
    }),
};

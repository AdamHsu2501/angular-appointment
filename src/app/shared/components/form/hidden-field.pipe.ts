import { Pipe, PipeTransform } from '@angular/core';
import { Field } from './fieldType';

@Pipe({
  name: 'hiddenField',
})
export class HiddenFieldPipe implements PipeTransform {
  transform(Fields: Field<any>[]): Field<any>[] {
    return Fields.filter((i) => !i.hidden);
  }
}

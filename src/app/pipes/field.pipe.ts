import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'field'
})
export class FieldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== '') {
      return value;
    }
    return ' ';
  }

}

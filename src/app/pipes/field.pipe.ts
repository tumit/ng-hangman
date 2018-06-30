import { Pipe, PipeTransform } from '@angular/core';
import { HangmanService } from '../services/hangman.service';

@Pipe({
  name: 'field',
  pure: false
})
export class FieldPipe implements PipeTransform {
  constructor(private hangman: HangmanService) {

  }

  transform(value: any, index: any): any {
    if (value !== '') {
      return value;
    }
    // if (this.hangman.isOver()) {
    //   return this.hangman.getSolvedAt(index);
    // }
    return ' ';
  }

}

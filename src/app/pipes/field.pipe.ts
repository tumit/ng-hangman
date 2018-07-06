import { Pipe, PipeTransform } from '@angular/core';
import { PuzzleState } from '../services/hangman.service';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'field',
  pure: false
})
export class FieldPipe implements PipeTransform {

  private puzzleState: PuzzleState;

  constructor(private store: Store<PuzzleState>) {
    store
      .select('puzz')
      .subscribe(puzzleState => this.puzzleState = puzzleState);
  }

  transform(value: string, index: number): string {
    if (value !== '') {
      return value;
    }

    if (this.puzzleState.isOver) {
      return this.puzzleState.word.charAt(index);
    }

    return ' ';
  }

}

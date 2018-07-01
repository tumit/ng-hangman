import { Pipe, PipeTransform } from '@angular/core';
import { HangmanService, PuzzleState } from '../services/hangman.service';

@Pipe({
  name: 'field',
  pure: false
})
export class FieldPipe implements PipeTransform {

  private puzzleState: PuzzleState;

  constructor(private hangman: HangmanService) {
    hangman
      .puzzleChanges()
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

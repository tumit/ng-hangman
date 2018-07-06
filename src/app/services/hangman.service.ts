import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { WordService } from './word.service';
import { Actions, Effect, ofType } from '@ngrx/effects';

export interface PuzzleState {
  puzzle: string[];
  selectedKeys: string[];
  triesRemain: number;
  word: string;
  isOver: boolean;
}

export const initialState: PuzzleState = {
  puzzle: [],
  selectedKeys: [],
  triesRemain: 6,
  word: '',
  isOver: true
};

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  private _puzzleState: PuzzleState;
  private _source: BehaviorSubject<PuzzleState>;

  constructor(
    private wordService: WordService) {
    this._puzzleState = initialState;
    this._source = new BehaviorSubject<PuzzleState>(this._puzzleState);
  }

  public puzzleChanges(): Observable<PuzzleState> {
    return this._source.asObservable();
  }

  private emitChanges() {
    this._source.next(this._puzzleState);
  }

  private reset() {
    this._puzzleState = initialState;
    this.emitChanges();
  }

  public start() {
    this.reset();
    this.wordService
      .get()
      .subscribe(data => {
        this._puzzleState = {
          ...initialState,
          word: data.word,
          puzzle: Array.apply('', Array(data.word.length)).map(_ => ''),
          isOver: false,
        };
        this.emitChanges();
      });
  }

  private isSelected(k: string): boolean {
    return this._puzzleState.selectedKeys.indexOf(k) >= 0;
  }

  private isWrong(letter: string) {
    return this._puzzleState.word.indexOf(letter) < 0;
  }

  public guess(letter: string) {

    if (this.isSelected(letter)) {
      return;
    }

    this._puzzleState = {
      ...this._puzzleState,
      selectedKeys: [...this._puzzleState.selectedKeys, letter]
    };

    if (this.isWrong(letter)) {
      const triesRemain = this._puzzleState.triesRemain - 1;
      this._puzzleState = { ...this._puzzleState, triesRemain, isOver: triesRemain <= 0 };
      this.emitChanges();
      return;
    }

    let pos = this._puzzleState.word.indexOf(letter);
    const puzzle = [...this._puzzleState.puzzle];
    puzzle[pos] = letter;

    pos = this._puzzleState.word.indexOf(letter, pos + 1);
    while (pos >= 0) {
      puzzle[pos] = letter;
      pos = this._puzzleState.word.indexOf(letter, pos + 1);
    }
    this._puzzleState = { ...this._puzzleState, puzzle };

    if (puzzle.join('') === this._puzzleState.word) {
      this._puzzleState = { ...this._puzzleState, isOver: true };
    }

    this.emitChanges();
  }
}

export function hangmanReducer(state = initialState, action: Action) {
  return state;
}

@Injectable()
export class HangmanEffect {
  @Effect()
  start$: Observable<Action> = this.actions$.pipe();
  constructor(private wordService: WordService, private actions$: Actions) {}
}

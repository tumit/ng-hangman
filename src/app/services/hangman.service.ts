import { Injectable } from '@angular/core';
import { WordService } from './word.service';
import { Observable, BehaviorSubject } from 'rxjs';

export interface PuzzleState {
  puzzle: string[];
  selectedKeys: string[];
  triesRemain: number;
  loading: boolean;
  word: string;
  isOver: boolean;
}

const initialState: PuzzleState = {
  puzzle: [],
  selectedKeys: [],
  triesRemain: 6,
  loading: true,
  word: '',
  isOver: true
};

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  private puzzleState = initialState;

  private _word: string;
  private _triesRemain: number;
  private _isOver: boolean;
  private _puzzle: string[];
  private _source: BehaviorSubject<PuzzleState>;
  private _selectedKeys: string[];
  private _isLoading: boolean;

  constructor(private wordService: WordService) {
    this._source = new BehaviorSubject<PuzzleState>(this.puzzleState);
  }

  public puzzleChanges(): Observable<PuzzleState> {
    return this._source.asObservable();
  }

  private emitChanges() {
    this._source.next(this.puzzleState);
  }

  private reset() {
    this.puzzleState = initialState;
    this.emitChanges();
  }

  public start() {
    this.reset();
    this.wordService
      .get()
      .subscribe(data => {
        this.puzzleState = {
          ...initialState,
          word: data.word,
          puzzle: Array.apply('', Array(data.word.length)).map(_ => ''),
          loading: false,
          isOver: false,
        };
        this.emitChanges();
      });
  }

  public over() {
    this.puzzleState = { ...this.puzzleState, isOver: true };
    this.emitChanges();
  }

  public isSelected(k: string): boolean {
    return this.puzzleState.selectedKeys.indexOf(k) >= 0;
    // return this._selectedKeys.indexOf(k) >= 0;
  }

  private isNotMatch(letter: string) {
    return this.puzzleState.word.indexOf(letter) < 0;
  }

  public guess(letter: string): boolean {

    if (this.isSelected(letter)) {
      return;
    }

    this.puzzleState = {
      ...this.puzzleState,
      selectedKeys: [...this.puzzleState.selectedKeys, letter]
    };

    if (this.isNotMatch(letter)) {
      const triesRemain = this.puzzleState.triesRemain - 1;
      this.puzzleState = { ...this.puzzleState, triesRemain, isOver: triesRemain <= 0 };
      this.emitChanges();
      return;
    }

    let pos = this.puzzleState.word.indexOf(letter);
    const puzzle = [...this.puzzleState.puzzle];
    puzzle[pos] = letter;

    pos = this.puzzleState.word.indexOf(letter, pos + 1);
    while (pos >= 0) {
      puzzle[pos] = letter;
      pos = this.puzzleState.word.indexOf(letter, pos + 1);
    }
    this.puzzleState = { ...this.puzzleState, puzzle };

    if (puzzle.join('') === this.puzzleState.word) {
      this.puzzleState = { ...this.puzzleState, isOver: true };
    }

    this.emitChanges();
  }

  public getSolvedAt(i: number): string {
    return this._word.split('')[i];
  }
}

import { Injectable } from '@angular/core';
import { WordService } from './word.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  private _word: string;
  private _triesRemain: number;
  private _isOver: boolean;
  private _puzzle: string[];
  private _source: BehaviorSubject<any>;
  private _selectedKeys: string[];

  constructor(private wordService: WordService) {
    this._source = new BehaviorSubject<any>({
      'puzzle': this._puzzle
    });
    this.reset();
  }

  private emitChanges() {
    this._source.next({
      'puzzle': this._puzzle,
      'selectedKeys': this._selectedKeys
    });
  }

  public puzzleChanges(): Observable<any> {
    return this._source.asObservable();
  }

  private reset() {
    this._word = '';
    this._puzzle = [];
    this._triesRemain = 6;
    this._isOver = false;
    this._selectedKeys = [];
    this.emitChanges();
  }

  public start() {
    this.reset();
    this.wordService.get().subscribe(data => {
      this._word = data.word;
      this._puzzle = Array.apply('', Array(this._word.length)).map(_ => '');
      this.emitChanges();
    });
  }

  public word() {
    return this._word;
  }

  public triesRemain(): number {
    return this._triesRemain;
  }

  public isSelected(k: string): boolean {
    return this._selectedKeys.indexOf(k) >= 0;
  }

  public guess(letter: string): boolean {
    if (this.isSelected(letter)) {
      return false;
    }
    this._selectedKeys.push(letter);
    let pos = this._word.indexOf(letter);
    if (pos < 0) {
      if ((--this._triesRemain) <= 0) {
        this._isOver = true;
      }
      this.emitChanges();
      return false;
    }
    this._puzzle[pos] = letter;

    pos = this._word.indexOf(letter, pos + 1);
    while (pos >= 0) {
      this._puzzle[pos] = letter;
      pos = this._word.indexOf(letter, pos + 1);
    }

    if (this._puzzle.join('') === this._word) {
      this._isOver = true;
    }
    this.emitChanges();
    return true;
  }

  public isOver(): boolean {
    return this._isOver;
  }

  public puzzle(): string[] {
    return this._puzzle;
  }
}

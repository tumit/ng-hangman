import { Injectable } from '@angular/core';
import { WordService } from './word.service';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  private _word: string;
  private _triesRemain: number;
  private _isOver: boolean;
  private _puzzle: string[];

  constructor(private wordService: WordService) {
    this.reset();
  }

  private reset() {
    this._word = '';
    this._triesRemain = 6;
    this._isOver = false;
  }

  public start() {
    this.reset();
    this.wordService.get().subscribe(data => {
      this._word = data.word;
      this._puzzle = Array.apply('', Array(this._word.length)).map(_ => '');
    });
  }

  public word() {
    return this._word;
  }

  public triesRemain(): number {
    return this._triesRemain;
  }

  public guess(letter: string): boolean {
    let pos = this._word.indexOf(letter);
    if (pos < 0) {
      if ((--this._triesRemain) <= 0) {
        this._isOver = true;
      }
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
    return true;
  }

  public isOver(): boolean {
    return this._isOver;
  }

  public puzzle(): string[] {
    return this._puzzle;
  }
}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PuzzleState, PUZZLE_START } from './services/hangman.service';
import { WordService } from './services/word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public puzz$: Observable<PuzzleState>;

  constructor(
    private store: Store<PuzzleState>,
    private wordService: WordService) {
  }

  ngOnInit() {
    this.puzz$ = this.store.pipe(select('puzz'));
  }

  start() {
    this.wordService
      .get()
      .subscribe(data =>
        this.store.dispatch({ type: PUZZLE_START, word: data.word })
      );
  }

  guess(k: string) {
    //
  }

}

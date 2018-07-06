import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PuzzleState } from './services/hangman.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public puzz$: Observable<PuzzleState>;

  constructor(private store: Store<PuzzleState>) {
  }

  ngOnInit() {
    this.puzz$ = this.store.pipe(select('puzz'));
  }

  start() {
    // this.hangman.start();
  }

  guess(k: string) {
    // this.hangman.guess(k);
  }

}

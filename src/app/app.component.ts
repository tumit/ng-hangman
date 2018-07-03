import { Component, OnInit } from '@angular/core';
import { HangmanService, PuzzleState } from './services/hangman.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public puzz$: Observable<PuzzleState>;

  constructor(private hangman: HangmanService) {
  }

  ngOnInit() {
    this.puzz$ = this.hangman.puzzleChanges();
  }

  start() {
    this.hangman.start();
  }

  guess(k: string) {
    this.hangman.guess(k);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HangmanService, PuzzleState } from '../../services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

  public puzz$: Observable<PuzzleState>;

  constructor(private hangman: HangmanService) {
  }

  ngOnInit() {
    this.puzz$ = this.hangman.puzzleChanges();
  }
}

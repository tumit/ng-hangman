import { Component, OnInit, OnDestroy } from '@angular/core';
import { HangmanService, PuzzleState } from '../../services/hangman.service';
import { Subscription, Observable } from 'rxjs';

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

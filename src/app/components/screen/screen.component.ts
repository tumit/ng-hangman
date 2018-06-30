import { Component, OnInit, OnDestroy } from '@angular/core';
import { HangmanService, PuzzleState } from '../../services/hangman.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  public puzz$: Observable<PuzzleState>;

  constructor(private hangman: HangmanService) {
  }

  ngOnInit() {
    this.puzz$ = this.hangman.puzzleChanges();
  }
}

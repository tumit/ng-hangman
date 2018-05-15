import { Component, OnInit, OnDestroy } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit, OnDestroy {

  public puzzle: string[];
  public puzz$: Subscription;

  constructor(private hangman: HangmanService) {
    this.puzz$ = hangman.puzzleChanges().subscribe(data => {
      this.puzzle = data.puzzle;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.puzz$) {
      this.puzz$.unsubscribe();
    }
  }

  public isOver(): boolean {
    return this.hangman.isOver();
  }

}

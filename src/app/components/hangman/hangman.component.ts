import { Component, OnInit, OnDestroy } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit, OnDestroy {

  public puzz$: Subscription;
  public triesRemain: number;

  constructor(private hangman: HangmanService) {
    this.puzz$ = hangman.puzzleChanges().subscribe(data => {
      this.triesRemain = data.triesRemain;
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

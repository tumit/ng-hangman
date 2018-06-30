import { Component, OnInit } from '@angular/core';
import { HangmanService, PuzzleState } from '../../services/hangman.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  public keyList1: string[];
  public keyList2: string[];

  public puzz$: Observable<PuzzleState>;

  constructor(private hangman: HangmanService) {
    this.keyList1 = 'abcdefghijklm'.split('');
    this.keyList2 = 'nopqrstuvwxyz'.split('');
  }

  ngOnInit() {
    this.puzz$ = this.hangman.puzzleChanges();
  }

  select(k: string) {
    this.hangman.guess(k);
  }
}

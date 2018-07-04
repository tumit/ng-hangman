import { Component, Input } from '@angular/core';

import { PuzzleState } from '../../services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent {
  @Input()
  public puzz: PuzzleState;
}

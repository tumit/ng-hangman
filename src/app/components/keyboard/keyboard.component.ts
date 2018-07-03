import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HangmanService, PuzzleState } from '../../services/hangman.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {

  @Input()
  public puzz: PuzzleState;

  @Output()
  public activatedGuess = new EventEmitter();

  public keyList1: string[];
  public keyList2: string[];

  constructor() {
    this.keyList1 = 'abcdefghijklm'.split('');
    this.keyList2 = 'nopqrstuvwxyz'.split('');
  }

  select(k: string) {
    this.activatedGuess.emit(k);
  }
}

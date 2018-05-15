import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  public keyList: string[];

  constructor(private hangman: HangmanService) {
    this.keyList = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }

  ngOnInit() {
  }

  isSelected(k: string): boolean {
    return this.hangman.isSelected(k);
  }

  isSelectable(k: string): boolean {
    return this.hangman.isSelected(k) || this.hangman.isOver();
  }

  select(k: string) {
    this.hangman.guess(k);
  }
}

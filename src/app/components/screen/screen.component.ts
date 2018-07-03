import { Component, Input } from '@angular/core';

import { PuzzleState } from '../../services/hangman.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {

  @Input()
  public puzz: PuzzleState;
}

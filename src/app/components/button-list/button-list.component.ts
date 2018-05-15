import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent implements OnInit {

  constructor(private hangman: HangmanService) { }

  ngOnInit() {
  }

  public start() {
    this.hangman.start();
  }

}

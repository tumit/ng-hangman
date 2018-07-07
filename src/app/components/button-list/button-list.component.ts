import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { PuzzleState } from '../../services/hangman.service';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent {

  @Input()
  public puzz: PuzzleState;

  @Output()
  public activatedStart = new EventEmitter();

  public start() {
    this.activatedStart.emit();
  }
}

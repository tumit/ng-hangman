import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { initialState } from '../../services/hangman.service';
import { HangmanComponent } from './hangman.component';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HangmanComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
    component.puzz = initialState;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

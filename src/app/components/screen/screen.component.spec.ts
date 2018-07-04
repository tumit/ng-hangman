import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPipe } from '../../pipes/field.pipe';
import { HangmanService, initialState } from '../../services/hangman.service';
import { ScreenComponent } from './screen.component';

describe('ScreenComponent', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<ScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenComponent, FieldPipe],
      providers: [HangmanService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenComponent);
    component = fixture.componentInstance;
    component.puzz = initialState;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

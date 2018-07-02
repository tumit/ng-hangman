import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListComponent } from './button-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HangmanService } from '../../services/hangman.service';

describe('ButtonListComponent', () => {
  let hangmanService: HangmanService;
  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonListComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    hangmanService = TestBed.get(HangmanService);
    fixture = TestBed.createComponent(ButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to start game when activate start', () => {
    // arrange
    const startFn = spyOn(hangmanService, 'start');
    // act
    component.start();
    // assert
    expect(startFn).toHaveBeenCalled();
  });
});

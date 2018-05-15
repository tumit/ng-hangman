import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenComponent } from './screen.component';
import { HangmanService } from '../../services/hangman.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FieldPipe } from '../../pipes/field.pipe';

describe('ScreenComponent', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<ScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenComponent, FieldPipe],
      providers: [HangmanService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

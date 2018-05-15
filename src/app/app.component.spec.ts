import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenComponent } from './components/screen/screen.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { FieldPipe } from './pipes/field.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        KeyboardComponent,
        ScreenComponent,
        ButtonListComponent,
        FieldPipe
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

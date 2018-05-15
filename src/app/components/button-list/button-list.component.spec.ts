import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListComponent } from './button-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ButtonListComponent', () => {
  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

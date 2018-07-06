import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ScreenComponent } from './components/screen/screen.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { FieldPipe } from './pipes/field.pipe';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GithubComponent } from './components/github/github.component';
import { hangmanReducer } from './services/hangman.service';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    ScreenComponent,
    ButtonListComponent,
    FieldPipe,
    HangmanComponent,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ puzz: hangmanReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

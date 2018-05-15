import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ScreenComponent } from './components/screen/screen.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { FieldPipe } from './pipes/field.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    ScreenComponent,
    ButtonListComponent,
    FieldPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

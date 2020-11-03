import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoInteractiveComponent } from './photo-interactive/photo-interactive.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoInteractiveComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

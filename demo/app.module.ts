import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DaterangePickerModule } from 'ng2-daterange-picker'; //../src/datepicker.module
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DaterangePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

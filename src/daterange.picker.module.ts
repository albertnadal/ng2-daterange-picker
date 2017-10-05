import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MdInputModule, MdCardModule } from '@angular/material';

import { DaterangePickerComponent } from './ang.daterange.picker.component';
import { DatePickerComponent } from './ang.datepicker.component';

export * from './ang.daterange.picker.component';

@NgModule({
  declarations: [ DaterangePickerComponent, DatePickerComponent ],
  exports: [ DaterangePickerComponent ],
  imports: [ CommonModule, FormsModule, HttpModule, ReactiveFormsModule, MdCardModule, MdInputModule ]
})
export class DaterangePickerModule { }

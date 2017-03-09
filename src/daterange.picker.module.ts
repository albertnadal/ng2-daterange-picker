import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { DaterangePickerComponent } from './ang.daterange.picker.component';
import { DatePickerComponent } from './ang.datepicker.component';

export * from './ang.daterange.picker.component';

@NgModule({
  declarations: [ DaterangePickerComponent, DatePickerComponent ],
  exports: [ DaterangePickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterialModule ]
})
export class DaterangePickerModule { }

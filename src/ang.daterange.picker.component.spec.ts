import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule }   from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DaterangePickerComponent } from './ang.daterange.picker.component';


describe('DaterangePickerComponent', () => {
  let comp: DaterangePickerComponent;
  let fixture: ComponentFixture<DaterangePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DaterangePickerComponent ],
      imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
    });
    fixture = TestBed.createComponent(DaterangePickerComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());

});

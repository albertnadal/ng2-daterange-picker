import {
  animate, Component, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, Renderer, SimpleChange, state, style, transition, trigger
} from '@angular/core';
import { Calendar } from './ang.calendar';
import * as moment from 'moment';

interface DateFormatFunction {
  (date: Date): string;
}

interface ValidationResult {
  [key: string]: boolean;
}

@Component({
  selector: 'ang-datepicker',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  templateUrl: './ang.datepicker.component.html',
  styleUrls: ['./ang.datepicker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {

  private readonly DEFAULT_FORMAT = 'YYYY-MM-DD';
  private dateVal: Date;

  @Output() dateChange = new EventEmitter<Date>();
  @Input() get date(): Date { return this.dateVal; };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
    this.setCurrentYear(val.getFullYear());
  }
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() disabled: boolean;
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() dateFormat: string | DateFormatFunction;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  @Input() inputText: string;
  @Input() weekStart: number = 0;
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Default order: firstDayOfTheWeek = 0
  @Input() hoveredDay: Date;
  @Input() months: Array<string>;

  @Output() onSelect = new EventEmitter<any>();

  dayNamesOrdered: Array<String>;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  animate: string;
  colors: { [id: string]: string };
  clickListener: Function;

  constructor(private renderer: Renderer, private elementRef: ElementRef) {

    this.dateFormat = this.DEFAULT_FORMAT;
    this.colors = {
      'black': '#333333',
      'blue': '#1285bf',
      'lightBlue': '#daedf7',
      'lightGrey': '#f1f1f1',
      'white': '#ffffff'
    };
    this.accentColor = this.colors['blue'];
    this.altInputStyle = false;
    this.updateDayNames();

    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', ' December'
    ];

    this.clickListener = renderer.listenGlobal(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
  }

  ngOnInit() {
    this.updateDayNames();
    this.syncVisualsWithDate();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ((changes['date'] || changes['dateFormat'])) {
      this.syncVisualsWithDate();
    }
    if (changes['firstDayOfTheWeek'] || changes['dayNames']) {
      this.updateDayNames();
    }
  }

  ngOnDestroy() {
    this.clickListener();
  }

  closeCalendar(): void {
    this.syncVisualsWithDate();
  }

  private setCurrentValues(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];

    this.currentYear = date.getFullYear();

    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  private updateDayNames() {
    this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
    if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
      // Out of range
      throw Error(`The weekStart is not in range between ${0} and ${this.dayNamesOrdered.length - 1}`)
    } else {
      this.calendar = new Calendar(this.weekStart);
      this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
        .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
    }
  }

  syncVisualsWithDate(): void {
    if(this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  setCurrentYear(year: number): void {
    this.currentYear = year;
  }

  setInputText(date: Date): void {
    let inputText = "";
    const dateFormat: string | DateFormatFunction = this.dateFormat;
    if (dateFormat === undefined || dateFormat === null) {
      inputText = moment(date).format(this.DEFAULT_FORMAT);
    } else if (typeof dateFormat === 'string') {
      inputText = moment(date).format(dateFormat);
    } else if (typeof dateFormat === 'function') {
      inputText = dateFormat(date);
    }
    this.inputText = inputText;
  }

  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    let newDate = new Date(newYear, newMonth);
    let newDateValid: boolean;
    if (direction === 'left') {
      newDateValid = !this.rangeStart || newDate.getTime() >= this.rangeStart.getTime();
    } else if (direction === 'right') {
      newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
    }

    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
  }

  filterInvalidDays(calendarDays: Array<number>): Array<number> {
    let newCalendarDays = [];
    calendarDays.forEach((day: number | Date) => {
      if (day === 0) {
        newCalendarDays.push(0)
      } else {
        newCalendarDays.push(day)
      }
    });
    return newCalendarDays;
  }

  onSelectDay(day: Date): void {
    this.date = day;
    this.syncVisualsWithDate();
    this.onSelect.emit({date: day, dateText: this.inputText});
  }

  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeCalendar();
    }
  }

  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    } else if (this.isBetweenSelectedDateRange(day)) {
      color = this.colors['lightBlue'];
    }
    return color;
  }

  getDayFontColor(day: Date): string {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    }
    return color;
  }

  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() === this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }

  isBetweenSelectedDateRange(day: Date): boolean {

    if(!day) {
      return false;
    }

    if(this.startDate instanceof Date && this.startDate != undefined && (this.startDate.getTime() > day.getTime())) {
      return false;
    }

    if(this.endDate instanceof Date && this.endDate != undefined && (this.endDate.getTime() < day.getTime())) {
      return false;
    }

    if( (this.startDate instanceof Date) && (this.endDate instanceof Date) &&
        (this.startDate == undefined && this.endDate == undefined)) {
      return false;
    }

    return true;
  }

  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
  }

  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }

}

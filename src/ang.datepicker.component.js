import { animate, Component, ElementRef, EventEmitter, Input, keyframes, Output, Renderer, style, transition, trigger } from '@angular/core';
import { Calendar } from './ang.calendar';
import * as moment from 'moment';
var DatePickerComponent = (function () {
    function DatePickerComponent(renderer, elementRef) {
        var _this = this;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.DEFAULT_FORMAT = 'YYYY-MM-DD';
        this.dateChange = new EventEmitter();
        this.weekStart = 0;
        this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.onSelect = new EventEmitter();
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
        this.clickListener = renderer.listenGlobal('document', 'click', function (event) { return _this.handleGlobalClick(event); });
    }
    Object.defineProperty(DatePickerComponent.prototype, "date", {
        get: function () { return this.dateVal; },
        set: function (val) {
            this.dateVal = val;
            this.dateChange.emit(val);
            this.setCurrentYear(val.getFullYear());
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePickerComponent.prototype.ngOnInit = function () {
        this.updateDayNames();
        this.syncVisualsWithDate();
    };
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        if ((changes['date'] || changes['dateFormat'])) {
            this.syncVisualsWithDate();
        }
        if (changes['firstDayOfTheWeek'] || changes['dayNames']) {
            this.updateDayNames();
        }
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.clickListener();
    };
    DatePickerComponent.prototype.closeCalendar = function () {
        this.syncVisualsWithDate();
    };
    DatePickerComponent.prototype.setCurrentValues = function (date) {
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
        this.calendarDays = this.filterInvalidDays(this.calendarDays);
    };
    DatePickerComponent.prototype.updateDayNames = function () {
        this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
        if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
            // Out of range
            throw Error("The weekStart is not in range between " + 0 + " and " + (this.dayNamesOrdered.length - 1));
        }
        else {
            this.calendar = new Calendar(this.weekStart);
            this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
                .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
        }
    };
    DatePickerComponent.prototype.syncVisualsWithDate = function () {
        if (this.date) {
            this.setInputText(this.date);
            this.setCurrentValues(this.date);
        }
        else {
            this.inputText = '';
            this.setCurrentValues(new Date());
        }
    };
    DatePickerComponent.prototype.setCurrentMonth = function (monthNumber) {
        this.currentMonth = this.months[monthNumber];
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
        this.calendarDays = this.filterInvalidDays(this.calendarDays);
    };
    DatePickerComponent.prototype.setCurrentYear = function (year) {
        this.currentYear = year;
    };
    DatePickerComponent.prototype.setInputText = function (date) {
        var inputText = "";
        var dateFormat = this.dateFormat;
        if (dateFormat === undefined || dateFormat === null) {
            inputText = moment(date).format(this.DEFAULT_FORMAT);
        }
        else if (typeof dateFormat === 'string') {
            inputText = moment(date).format(dateFormat);
        }
        else if (typeof dateFormat === 'function') {
            inputText = dateFormat(date);
        }
        this.inputText = inputText;
    };
    DatePickerComponent.prototype.onArrowClick = function (direction) {
        var currentMonth = this.currentMonthNumber;
        var newYear = this.currentYear;
        var newMonth;
        // sets the newMonth
        // changes newYear is necessary
        if (direction === 'left') {
            if (currentMonth === 0) {
                newYear = this.currentYear - 1;
                newMonth = 11;
            }
            else {
                newMonth = currentMonth - 1;
            }
        }
        else if (direction === 'right') {
            if (currentMonth === 11) {
                newYear = this.currentYear + 1;
                newMonth = 0;
            }
            else {
                newMonth = currentMonth + 1;
            }
        }
        // check if new date would be within range
        var newDate = new Date(newYear, newMonth);
        var newDateValid;
        if (direction === 'left') {
            newDateValid = !this.rangeStart || newDate.getTime() >= this.rangeStart.getTime();
        }
        else if (direction === 'right') {
            newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
        }
        if (newDateValid) {
            this.setCurrentYear(newYear);
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.triggerAnimation(direction);
        }
    };
    DatePickerComponent.prototype.filterInvalidDays = function (calendarDays) {
        var newCalendarDays = [];
        calendarDays.forEach(function (day) {
            if (day === 0) {
                newCalendarDays.push(0);
            }
            else {
                newCalendarDays.push(day);
            }
        });
        return newCalendarDays;
    };
    DatePickerComponent.prototype.onSelectDay = function (day) {
        this.date = day;
        this.syncVisualsWithDate();
        this.onSelect.emit({ date: day, dateText: this.inputText });
    };
    DatePickerComponent.prototype.handleGlobalClick = function (event) {
        var withinElement = this.elementRef.nativeElement.contains(event.target);
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeCalendar();
        }
    };
    DatePickerComponent.prototype.getDayBackgroundColor = function (day) {
        var color = this.colors['white'];
        if (this.isChosenDay(day)) {
            color = this.accentColor;
        }
        else if (this.isCurrentDay(day)) {
            color = this.colors['lightGrey'];
        }
        else if (this.isBetweenSelectedDateRange(day)) {
            color = this.colors['lightBlue'];
        }
        return color;
    };
    DatePickerComponent.prototype.getDayFontColor = function (day) {
        var color = this.colors['black'];
        if (this.isChosenDay(day)) {
            color = this.colors['white'];
        }
        return color;
    };
    DatePickerComponent.prototype.isChosenDay = function (day) {
        if (day) {
            return this.date ? day.toDateString() === this.date.toDateString() : false;
        }
        else {
            return false;
        }
    };
    DatePickerComponent.prototype.isCurrentDay = function (day) {
        if (day) {
            return day.toDateString() === new Date().toDateString();
        }
        else {
            return false;
        }
    };
    DatePickerComponent.prototype.isBetweenSelectedDateRange = function (day) {
        if (!day) {
            return false;
        }
        if (this.startDate instanceof Date && this.startDate != undefined && (this.startDate.getTime() > day.getTime())) {
            return false;
        }
        if (this.endDate instanceof Date && this.endDate != undefined && (this.endDate.getTime() < day.getTime())) {
            return false;
        }
        if ((this.startDate instanceof Date) && (this.endDate instanceof Date) &&
            (this.startDate == undefined && this.endDate == undefined)) {
            return false;
        }
        return true;
    };
    DatePickerComponent.prototype.isHoveredDay = function (day) {
        return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
    };
    DatePickerComponent.prototype.triggerAnimation = function (direction) {
        var _this = this;
        this.animate = direction;
        setTimeout(function () { return _this.animate = 'reset'; }, 185);
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
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
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: Renderer, },
        { type: ElementRef, },
    ]; };
    DatePickerComponent.propDecorators = {
        "dateChange": [{ type: Output },],
        "date": [{ type: Input },],
        "startDate": [{ type: Input },],
        "endDate": [{ type: Input },],
        "disabled": [{ type: Input },],
        "accentColor": [{ type: Input },],
        "altInputStyle": [{ type: Input },],
        "dateFormat": [{ type: Input },],
        "fontFamily": [{ type: Input },],
        "rangeStart": [{ type: Input },],
        "rangeEnd": [{ type: Input },],
        "inputText": [{ type: Input },],
        "weekStart": [{ type: Input },],
        "calendarDays": [{ type: Input },],
        "currentMonth": [{ type: Input },],
        "dayNames": [{ type: Input },],
        "hoveredDay": [{ type: Input },],
        "months": [{ type: Input },],
        "onSelect": [{ type: Output },],
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
//# sourceMappingURL=ang.datepicker.component.js.map
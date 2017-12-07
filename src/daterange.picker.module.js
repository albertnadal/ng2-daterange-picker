import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { DaterangePickerComponent } from './ang.daterange.picker.component';
import { DatePickerComponent } from './ang.datepicker.component';
export * from './ang.daterange.picker.component';
var DaterangePickerModule = /** @class */ (function () {
    function DaterangePickerModule() {
    }
    DaterangePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DaterangePickerComponent, DatePickerComponent],
                    exports: [DaterangePickerComponent],
                    imports: [CommonModule, FormsModule, HttpModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule]
                },] },
    ];
    /** @nocollapse */
    DaterangePickerModule.ctorParameters = function () { return []; };
    return DaterangePickerModule;
}());
export { DaterangePickerModule };
//# sourceMappingURL=daterange.picker.module.js.map
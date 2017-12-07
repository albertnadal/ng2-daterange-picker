"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_daterange_picker_1 = require("ng2-daterange-picker");
var AppComponent = (function () {
    function AppComponent(componentFactory) {
        this.componentFactory = componentFactory;
    }
    AppComponent.prototype.showDaterangePickerSelector = function () {
        var _this = this;
        var daterangePickerComponentFactory = this.componentFactory.resolveComponentFactory(ng2_daterange_picker_1.DaterangePickerComponent);
        var daterangePickerComponent = ng2_daterange_picker_1.DaterangePickerComponent.initWithData(this.daterangePickerParentViewContainer, daterangePickerComponentFactory);
        daterangePickerComponent.onSelectedDaterange.subscribe(function (data) {
            _this.showSelectedDaterange(data.startDate, data.endDate);
        });
    };
    AppComponent.prototype.showSelectedDaterange = function (startDate, endDate) {
        alert("FROM: " + startDate.toString());
        alert("TO: " + endDate.toString());
    };
    __decorate([
        core_1.ViewChild('daterangePicker', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], AppComponent.prototype, "daterangePickerParentViewContainer", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            entryComponents: [ng2_daterange_picker_1.DaterangePickerComponent],
            template: '<button #daterangePicker type="button" (click)="showDaterangePickerSelector()">Select a range</button>'
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
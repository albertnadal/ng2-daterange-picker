import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
var DaterangePickerComponent = /** @class */ (function () {
    function DaterangePickerComponent(_el) {
        this.startDateText = '';
        this.endDateText = '';
        this.onCloseDaterangePicker = new EventEmitter();
        this.onSelectedDaterange = new EventEmitter();
        this.el = _el;
        this.el.nativeElement.style.position = 'absolute';
        this.startDate = new Date();
        this.endDate = new Date();
    }
    DaterangePickerComponent.prototype.ngOnInit = function () {
    };
    DaterangePickerComponent.prototype.onSelectStartDate = function ($event) {
        this.startDate = $event.date;
        this.startDateText = $event.dateText;
    };
    DaterangePickerComponent.prototype.onSelectEndDate = function ($event) {
        this.endDate = $event.date;
        this.endDateText = $event.dateText;
    };
    DaterangePickerComponent.prototype.onApplySelectedDateRange = function () {
        this.onSelectedDaterange.emit({ startDate: this.startDate, endDate: this.endDate });
        this.destroyComponentRef();
    };
    DaterangePickerComponent.prototype.onCloseContextualMenu = function () {
        this.onCloseDaterangePicker.emit();
        this.destroyComponentRef();
    };
    DaterangePickerComponent.prototype.destroyComponentRef = function () {
        if (this.selfComponentRef)
            this.selfComponentRef.destroy();
    };
    DaterangePickerComponent.prototype.setComponentRef = function (_componentRef) {
        this.selfComponentRef = _componentRef;
    };
    DaterangePickerComponent.initWithData = function (_viewContainer, _componentFactory) {
        var daterangePickerComponentRef = _viewContainer.createComponent(_componentFactory);
        var instance = daterangePickerComponentRef.instance;
        instance.setComponentRef(daterangePickerComponentRef);
        var targetLeftOffset = instance.getViewContainerSpaceOffset(_viewContainer, "left");
        var targetTopOffset = instance.getViewContainerSpaceOffset(_viewContainer, "top");
        instance.setStyleSpaceProperty("left", targetLeftOffset);
        var height = instance.getViewContainerDOMSpaceProperty(_viewContainer, "clientHeight");
        instance.setStyleSpaceProperty("top", targetTopOffset + height + 4);
        return instance;
    };
    DaterangePickerComponent.prototype.getViewContainerDOMSpaceProperty = function (_viewContainer, _property) {
        if (_property === void 0) { _property = ''; }
        return parseInt(_viewContainer.element.nativeElement[_property]);
    };
    DaterangePickerComponent.prototype.setStyleSpaceProperty = function (property, pixels) {
        if (property === void 0) { property = ''; }
        if (pixels === void 0) { pixels = 0; }
        this.el.nativeElement.style[property] = pixels.toString() + "px";
    };
    DaterangePickerComponent.prototype.getViewContainerSpaceOffset = function (_viewContainer, _property) {
        if (_property === void 0) { _property = ''; }
        var targetMargin = _viewContainer.element.nativeElement.style['margin-' + _property];
        if (!targetMargin) {
            targetMargin = 0;
        }
        else {
            targetMargin = parseInt(targetMargin.replace(/^\D+/g, '')); // Remove non-number characters like 'px'
        }
        switch (_property) {
            case 'left': return _viewContainer.element.nativeElement.offsetLeft;
            case 'top': return _viewContainer.element.nativeElement.offsetTop;
            default: return 0;
        }
    };
    DaterangePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ang-daterange-picker',
                    templateUrl: './ang.daterange.picker.component.html',
                    styleUrls: ['./ang.daterange.picker.component.css']
                },] },
    ];
    /** @nocollapse */
    DaterangePickerComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    DaterangePickerComponent.propDecorators = {
        "onCloseDaterangePicker": [{ type: Output },],
        "onSelectedDaterange": [{ type: Output },],
    };
    return DaterangePickerComponent;
}());
export { DaterangePickerComponent };
//# sourceMappingURL=ang.daterange.picker.component.js.map
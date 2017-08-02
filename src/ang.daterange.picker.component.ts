import { Component, ComponentRef, ElementRef, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DatePickerComponent } from './ang.datepicker.component'

@Component({
  selector: 'ang-daterange-picker',
  templateUrl: './ang.daterange.picker.component.html',
  styleUrls: ['./ang.daterange.picker.component.css']
})
export class DaterangePickerComponent implements OnInit {

  public startDate: Date;
  public endDate: Date;
  private el: ElementRef;
  public startDateText: string = '';
  public endDateText: string = '';
  private selfComponentRef: ComponentRef<any>;

  @Output() onCloseDaterangePicker: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedDaterange: EventEmitter<any> = new EventEmitter<any>();

  constructor(_el: ElementRef) {
    this.el = _el;
    this.el.nativeElement.style.position = 'absolute';
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit() {

  }

  onSelectStartDate($event) {
    this.startDate = $event.date;
    this.startDateText = $event.dateText;
  }

  onSelectEndDate($event) {
    this.endDate = $event.date;
    this.endDateText = $event.dateText;
  }

  onApplySelectedDateRange() {
    this.onSelectedDaterange.emit({startDate: this.startDate, endDate: this.endDate});
    this.destroyComponentRef();
  }

  onCloseContextualMenu() {
    this.onCloseDaterangePicker.emit();
    this.destroyComponentRef();
  }

  destroyComponentRef() {
    if (this.selfComponentRef) this.selfComponentRef.destroy();
  }

  setComponentRef(_componentRef: ComponentRef<any>) {
    this.selfComponentRef = _componentRef;
  }

  static initWithData(_viewContainer: ViewContainerRef, _componentFactory: any): any {

    let daterangePickerComponentRef: ComponentRef<any> = _viewContainer.createComponent(_componentFactory);
    let instance: DaterangePickerComponent = daterangePickerComponentRef.instance;
    instance.setComponentRef(daterangePickerComponentRef);

    let targetLeftOffset: number = instance.getViewContainerSpaceOffset(_viewContainer, "left");
    let targetTopOffset: number = instance.getViewContainerSpaceOffset(_viewContainer, "top");

    instance.setStyleSpaceProperty("left", targetLeftOffset);
    let height: number = instance.getViewContainerDOMSpaceProperty(_viewContainer, "clientHeight");
    instance.setStyleSpaceProperty("top", targetTopOffset + height + 4);

    return instance;
  }

  getViewContainerDOMSpaceProperty(_viewContainer: ViewContainerRef, _property: string = ''): number {
    return parseInt(_viewContainer.element.nativeElement[_property]);
  }

  setStyleSpaceProperty(property: string = '', pixels: number = 0) {
    this.el.nativeElement.style[property] = pixels.toString()+"px";
  }

  getViewContainerSpaceOffset(_viewContainer: ViewContainerRef, _property: string = ''): number {
    let targetMargin = _viewContainer.element.nativeElement.style['margin-'+_property];

    if(!targetMargin) {
      targetMargin = 0;
    } else {
      targetMargin = parseInt(targetMargin.replace( /^\D+/g, '')); // Remove non-number characters like 'px'
    }

    switch(_property) {
      case 'left':  return _viewContainer.element.nativeElement.offsetLeft;

      case 'top':   return _viewContainer.element.nativeElement.offsetTop;

      default:      return 0;
    }

  }

}

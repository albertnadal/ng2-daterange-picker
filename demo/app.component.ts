import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterange-picker';

@Component({
  selector: 'app-root',
  entryComponents: [DaterangePickerComponent],
  template: '<button #daterangePicker type="button" (click)="showDaterangePickerSelector()">Select a range</button>'
})
export class AppComponent {

  @ViewChild('daterangePicker', { read: ViewContainerRef }) daterangePickerParentViewContainer: ViewContainerRef;

  constructor(private componentFactory: ComponentFactoryResolver) { }

  showDaterangePickerSelector() {
    let daterangePickerComponentFactory = this.componentFactory.resolveComponentFactory(DaterangePickerComponent);
    let daterangePickerComponent: DaterangePickerComponent = DaterangePickerComponent.initWithData(this.daterangePickerParentViewContainer, daterangePickerComponentFactory);

    daterangePickerComponent.onSelectedDaterange.subscribe(
          data => {
                    this.showSelectedDaterange(data.startDate, data.endDate);
          }
    );
  }

  showSelectedDaterange(startDate: Date, endDate: Date) {
    alert("FROM: "+startDate.toString());
    alert("TO: "+endDate.toString());
  }

}

# Angular 2 Material Daterange picker

[![Version](http://img.shields.io/npm/v/ng2-daterange-picker.svg)](https://www.npmjs.org/package/ng2-daterange-picker)

A minimalist daterange picker component for Angular 2 based on Material.
No jQuery dependent. No Bootstrap CSS dependent.

![](http://www.lafruitera.com/ng2-daterange-picker.gif)

### Installation
```
npm install ng2-daterange-picker
```
### Usage
Import the DaterangePicker Module and add it to the `imports` of your module
```
import { DaterangePickerModule } from 'ng2-daterange-picker'

@NgModule({
  imports: [ DaterangePickerModule ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class YourModule { }
```
Use dinamically the ng2-daterange-picker selector as described in the sample component below
```
import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterange-picker';

@Component({
  selector: 'my-component-selector',
  entryComponents: [DaterangePickerComponent],
  template: '<button #daterangePicker type="button" (click)="showDaterangePickerSelector()">Select a range</button>'
})
export class MyComponent {

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

  this.showSelectedDaterange(startDate: Date, endDate: Date) {
    console.log(startDate);
    console.log(endDate);
  }

}
```

### License
MIT

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ang_daterange_picker_component_1 = require("./ang.daterange.picker.component");
describe('DaterangePickerComponent', function () {
    var comp;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [ang_daterange_picker_component_1.DaterangePickerComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        });
        fixture = testing_1.TestBed.createComponent(ang_daterange_picker_component_1.DaterangePickerComponent);
        comp = fixture.componentInstance;
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
});
//# sourceMappingURL=ang.daterange.picker.component.spec.js.map
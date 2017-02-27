import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  OnInit,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let fontAwesomeCheckboxComponentNextId = 0;

@Component({
  moduleId: module.id,
  selector: 'ng2-font-awesome-checkbox',
  template: `<input #checkbox [attr.id]="id" type="checkbox" (change)="onChange()" /><label [attr.for]="id"></label>`,
  styleUrls: ['font-awesome-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2FontAwesomeCheckboxComponent),
      multi: true
    }
  ]
})
export class Ng2FontAwesomeCheckboxComponent implements OnChanges, OnInit, ControlValueAccessor {

  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this._checkbox.nativeElement.checked = this.value;
    this.onChangeCallback(this._value);
  }

  @Input() public checked: boolean;
  @Input() public content: string;

  @Input() private _value: boolean = null;
  @ViewChild('checkbox') private _checkbox: ElementRef;

  private id = `ng2_font_awesome_checkbox_${fontAwesomeCheckboxComponentNextId++}`;

  public ngOnChanges(): void {
    this.value = this.checked;
  }

  public ngOnInit(): void {
    this.setContent();
  }

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public registerOnChange(fn): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouchedCallback = fn;
  }

  public onChange(): void {
    this.value = this._checkbox.nativeElement.checked;
    this.onTouchedCallback();
  }

  private onChangeCallback = (_: any) => { };
  private onTouchedCallback = () => { };

  private setContent(): void {
    // The view hasn't been rendered yet, therefore the DOM only
    // contains an input field without ID and a label without FOR
    // attribute. Its rendering is in the callback queue however,
    // se we call setTimeout to make sure the following code is
    // executed after the view is fully generated.
    setTimeout(() => {
      let label = jQuery('label[for="' + this.id + '"]');
      label.attr('data-content', this.content);
    }, 0);
  }
}

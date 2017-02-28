// angular
import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let fontAwesomeCheckboxComponentNextId = 0;

@Component({
  selector: 'ng2-font-awesome-checkbox',
  template: `<input #checkbox [attr.id]="id" type="checkbox" (change)="onChange()" /><label [attr.for]="id"></label>`,
  styleUrls: ['./ng2-font-awesome-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2FontAwesomeCheckboxComponent),
      multi: true
    }
  ]
})
export class Ng2FontAwesomeCheckboxComponent implements AfterViewInit, ControlValueAccessor {

  get checked() {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = this._checkbox.nativeElement.checked = checked;
    this.onChangeCallback(this._checked);
  }

  @Input() public content: string;

  @ViewChild('checkbox') private _checkbox: ElementRef;
  private _checked: boolean = null;

  private id = `ng2_font_awesome_checkbox_${fontAwesomeCheckboxComponentNextId++}`;

  public ngAfterViewInit(): void {
    this.setContent();
  }

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.checked = value;
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  public onChange(): void {
    this.checked = this._checkbox.nativeElement.checked;
    this.onTouchedCallback();
  }

  private onChangeCallback = (_: any) => { }
  private onTouchedCallback = () => { }

  private setContent(): void {
    let label = document.querySelector('label[for="' + this.id + '"]');
    label.setAttribute('data-content', this.content);
  }
}

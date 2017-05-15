// angular
import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let fontAwesomeCheckboxComponentNextId = 0;

@Component({
  selector: 'ng2-font-awesome-checkbox',
  template: `<input #checkbox
                    [attr.id]="id"
                    type="checkbox"
                    (change)="onChange()" />
             <label [attr.for]="id">
               <i class="fa {{ icon }}"
                  [style.color]="color"
                  [style.font-size]="size"
                  aria-hidden="true"> 
               </i>
             </label>`,
  styleUrls: ['./ng2-font-awesome-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2FontAwesomeCheckboxComponent),
      multi: true
    }
  ]
})
export class Ng2FontAwesomeCheckboxComponent implements ControlValueAccessor {

  get checked() {
    return this._checked;
  }
  
  set checked(checked: boolean) {
    this._checked = this._checkbox.nativeElement.checked = checked;

    if (!this._isValueSetFromWriteValue)
      this.onChangeCallback(this._checked);

    this._isValueSetFromWriteValue = false;
  }
    
  get color(): string {
    if(this._checked) {
      return this._color;
    } else {
      return 'lightgrey';
    }
  }
  
  @Input() set color(value) {
    this._color = value;
  }

  @Input() public icon: string = 'fa-font-awesome';
  @Input() public size: string = '1.33333333em';

  @ViewChild('checkbox') private _checkbox: ElementRef;
  private _checked: boolean                  = null;
  private _color: string                     = '#000';
  private _isValueSetFromWriteValue: boolean = false;

  private id = `ng2_font_awesome_checkbox_${fontAwesomeCheckboxComponentNextId++}`;

  public writeValue(value: any): void {
    if (value !== undefined) {
      this._isValueSetFromWriteValue = true;
      this.checked = value;
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._checkbox.nativeElement.disabled = isDisabled;
  }

  public onChange(): void {
    this.checked = this._checkbox.nativeElement.checked;
    this.onTouchedCallback();
  }

  private onChangeCallback = (_: any) => { }
  private onTouchedCallback = () => { }
}

import { Component, OnInit, Input, OnChanges, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input() public error: string = '';
  @Input() public label: string = '';

  uniqueNameControl: FormControl = new FormControl('');

  public onChange: Function = (val: string) => {};
  public onTouched: Function = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    // Setting the value accessor directly (instead of using
    // the providers) to avoid running into a circular import.
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.uniqueNameControl.valueChanges.pipe(distinctUntilChanged()).subscribe(
      val => this.setInputValue(val)
    );
   }

  ngOnInit() {
    if (this.ngControl && this.ngControl.control) {
      const validators = this.ngControl.control.validator;
      this.uniqueNameControl.setValidators(validators ? validators : null);
      this.uniqueNameControl.updateValueAndValidity();
    }
  }

  public writeValue(value: string): void {
    this.uniqueNameControl.patchValue(value);
  }

  setInputValue(value: string = '') {
    this.uniqueNameControl.patchValue(value);
    this.onTouched();
  }

  valueUpdate(value: string) {
    this.uniqueNameControl.patchValue(value);
    this.onTouched();
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.uniqueNameControl.disable();
    } else {
      this.uniqueNameControl.enable();
    }
  }

  public onBlur(event: any) {
    this.onTouched();
    if (!this.uniqueNameControl.value) {
      this.onChange('');
    }
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  get required() {
    if (this.uniqueNameControl && this.uniqueNameControl.validator) {
      const validator = this.uniqueNameControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }
}

import { Component, OnInit, Input, OnChanges, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() value: string;
  @Input() placeholder: string;
  @Input() error: string;
  @Input() disabled: boolean;
  @Output() valueChanged = new EventEmitter<string>();

  onChange = (val: string) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string) {
    this.value = value;
    this.onChange(this.value);
    this.valueChanged.emit(this.value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}

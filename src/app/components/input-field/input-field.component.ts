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
  @Input() public id: string = '';
  @Input() public type: string = 'text';
  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public error: string = '';
  @Input() public disabled: boolean = false;
  @Output() private valueChanged = new EventEmitter<string>();

  public onChange: Function = (val: string) => {};
  public onTouched: Function = () => {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.onChange(this.value);
    this.onTouched();
  }

  public writeValue(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element) {
      this.value = element.value;
      this.onChange(this.value);
      this.valueChanged.emit(this.value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

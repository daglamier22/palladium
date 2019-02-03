import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() submit: boolean;
  @Input() parentFunction: Function;
  @Input() text: string;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  callParentFunction() {
    if (this.parentFunction) {
      this.parentFunction();
    }
  }
}

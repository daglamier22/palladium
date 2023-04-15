import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-circle',
  templateUrl: './button-circle.component.html',
  styleUrls: ['./button-circle.component.scss']
})
export class ButtonCircleComponent implements OnInit {
  @Input() public submit: boolean = false;
  @Input() private parentFunction: Function = () => {};
  @Input() public text: string = '';
  @Input() public disabled: boolean = false;
  @Input() public color: string = ''; // 'primary', 'accent', or 'warn'

  constructor() { }

  ngOnInit() {
  }

  public callParentFunction(): void {
    if (this.parentFunction) {
      this.parentFunction();
    }
  }
}

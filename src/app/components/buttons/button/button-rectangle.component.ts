import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-rectangle',
  templateUrl: './button-rectangle.component.html',
  styleUrls: ['./button-rectangle.component.scss']
})
export class ButtonRectangleComponent implements OnInit {
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

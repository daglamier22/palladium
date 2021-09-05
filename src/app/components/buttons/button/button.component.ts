import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public submit: boolean = false;
  @Input() private parentFunction: Function = () => {};
  @Input() public text: string = '';
  @Input() public disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public callParentFunction(): void {
    if (this.parentFunction) {
      this.parentFunction();
    }
  }
}

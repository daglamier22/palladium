import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { HelloWorldService } from '../../services/helloworld.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  message = 'hi';
  loading: boolean;

  constructor(
    private helloWorldService: HelloWorldService
  ) { }

  ngOnInit() {
    this.helloWorldService.call();
    this.helloWorldService.getLoadingChanged().pipe(take(1)).subscribe(
      (loading: boolean) => {
        this.loading = loading;
        this.message = this.helloWorldService.getServerResponse();
      }
    );
  }
}

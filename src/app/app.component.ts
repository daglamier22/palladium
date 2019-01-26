import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { HelloWorldService } from './services/helloworld.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'budget-frontend';
  loading: boolean;

  constructor(private helloWorldService: HelloWorldService) {}

  ngOnInit() {
    this.helloWorldService.call();
    this.helloWorldService.getLoadingChanged().pipe(take(1)).subscribe(
      (loading: boolean) => {
        console.log('test');
        this.loading = loading;
        this.title = this.helloWorldService.getServerResponse();
      }
    );
  }
}

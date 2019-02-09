import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  versionBackend: string;
  versionFrontend: string;
  loading: boolean;

  constructor(
    private versionService: VersionService
  ) { }

  ngOnInit() {
    this.versionService.call();
    this.versionService.getLoadingChanged().pipe(take(1)).subscribe(
      (loading: boolean) => {
        this.loading = loading;
        this.versionBackend = this.versionService.getServerResponse();
      }
    );
  }
}

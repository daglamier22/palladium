import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';

import { VersionService } from '../../services/version.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  versionBackend: string;
  versionFrontend: string;
  loading: boolean;
  loadingVersionSubscription: Subscription;

  constructor(
    private versionService: VersionService
  ) { }

  ngOnInit() {
    this.versionFrontend = this.versionService.getVersionFrontend();
    this.versionBackend = this.versionService.getVersionBackend();
    this.loadingVersionSubscription = this.versionService.getLoadingChanged().subscribe(
      (loading: boolean) => {
        this.loading = loading;
        if (!loading) {
          this.versionFrontend = this.versionService.getVersionFrontend();
          this.versionBackend = this.versionService.getVersionBackend();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingVersionSubscription) {
      this.loadingVersionSubscription.unsubscribe();
    }
  }
}

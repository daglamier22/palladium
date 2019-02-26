import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';

import { VersionService } from '../../services/version.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage-view.component.html',
  styleUrls: ['./homepage-view.component.scss']
})
export class HomepageViewComponent implements OnInit, OnDestroy {
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

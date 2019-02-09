import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import * as util from './util';

const versionURL = '/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private versionBackend: string;
  private versionFrontend: string = environment.VERSION;
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {}

  getVersionBackend(): string {
    if (this.versionBackend) {
      return this.versionBackend;
    } else {
      this.call();
      return '';
    }
  }

  getVersionFrontend(): string {
    return this.versionFrontend;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingChanged(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }

  private call() {
      if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    const fullURL = util.determineServerURL() + versionURL;
    this.http.get(
      fullURL,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).subscribe((response: any) => {
      try {
        this.versionBackend = response.message;
      } catch (err) {
        this.versionBackend = 'Parsing Error';
      }
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('VersionService', error);
      this.versionBackend = 'Server Error';
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

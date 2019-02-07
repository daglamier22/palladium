import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

import * as util from './util';

const versionURL = '/tests/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: string;

  constructor(
    private http: HttpClient
  ) {}

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingChanged(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }

  getServerResponse(): string {
    return this.serverResponse;
  }

  call() {
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
        this.serverResponse = response.message;
      } catch (err) {
        this.serverResponse = 'Parsing Error';
      }
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('VersionService', error);
      this.serverResponse = 'Server Error';
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

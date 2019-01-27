import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from './util';
import { Observable } from 'rxjs';

const helloWorldURL = '/tests/helloworld';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
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

    const fullURL = util.determineServerURL() + helloWorldURL;
    this.http.post(
      fullURL,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true
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
      console.log('HelloWorldService', error);
      this.serverResponse = 'Server Error';
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

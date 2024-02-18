import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import * as util from '../../util';
import { CreateLinkTokenResponse } from './create-link-token.model';
import { AuthService } from '../../auth/auth.service';

const serverURL = '/item/createLinkToken';

@Injectable({
  providedIn: 'root'
})
export class CreateLinkTokenService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: CreateLinkTokenResponse;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getLoading(): boolean {
    return this.loading;
  }

  public getLoadingChanged(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }

  public getServerResponse(): CreateLinkTokenResponse {
    return this.serverResponse;
  }

  public call(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    const fullURL = util.determineServerURL() + serverURL;
    this.http.get<CreateLinkTokenResponse>(
      fullURL,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: CreateLinkTokenResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('CreateLinkTokenService call:', error);
      this.serverResponse = {
        apiMessage: error,
        apiStatus: 'FAILURE',
        errorCode: 999,
        values: {
          expiration: '',
          linkToken: ''
        }
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

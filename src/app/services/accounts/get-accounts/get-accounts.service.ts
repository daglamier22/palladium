import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { GetAccountResponse } from './get-accounts.model';

const signupURL = '/get-accounts';

@Injectable({
  providedIn: 'root'
})
export class GetAccountsService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: GetAccountResponse;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingChanged(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }

  getServerResponse(): GetAccountResponse {
    return this.serverResponse;
  }

  call() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    const fullURL = util.determineServerURL() + signupURL;
    this.http.get<GetAccountResponse>(
      fullURL,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: GetAccountResponse) => {
      this.serverResponse = { ...response };
      console.log(this.serverResponse);
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('GetAccountsService call:', error);
      this.serverResponse = {
        message: error,
        status: 'FAILURE',
        values: {
          accounts: []
        }
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }

  getAccount(id: string) {
    if (this.serverResponse) {
      for (const account of this.serverResponse.values.accounts) {
        console.log(account);
        if (account._id === id) {
          return account;
        }
      }
    }
    return undefined;
  }
}

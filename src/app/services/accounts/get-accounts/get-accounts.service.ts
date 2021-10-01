import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { Account, GetAccountResponse } from './get-accounts.model';

const signupURL = '/get-accounts';

@Injectable({
  providedIn: 'root'
})
export class GetAccountsService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: GetAccountResponse;

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

  public getServerResponse(): GetAccountResponse {
    return this.serverResponse;
  }

  public call(): void {
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
        apiMessage: error,
        apiStatus: 'FAILURE',
        errorCode: 999,
        values: {
          accounts: []
        }
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }

  public getAccount(id: string): Account | null {
    if (this.serverResponse) {
      for (const account of this.serverResponse.values.accounts) {
        console.log(account);
        if (account._id === id) {
          return account;
        }
      }
    }
    return null;
  }
}

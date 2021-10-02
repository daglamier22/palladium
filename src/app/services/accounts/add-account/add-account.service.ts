import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { AddAccountResponse, AddAccountPayload } from './add-account.model';

const serverURL = '/addAccount';

@Injectable({
  providedIn: 'root'
})
export class AddAccountService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: AddAccountResponse;

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

  public getServerResponse(): AddAccountResponse {
    return this.serverResponse;
  }

  public call(firmName: string, accountName: string, accountType: string, originalBalance: string, currentBalance: string, interestRate: string, creditLimit: string, loanTerm: string, loanOriginationDate: string): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    let payload: AddAccountPayload;
    payload = {
      firmName: firmName,
      accountName: accountName,
      accountType: accountType,
      originalBalance: originalBalance,
      currentBalance: currentBalance,
      interestRate: interestRate,
      creditLimit: creditLimit,
      loanTerm: loanTerm,
      loanOriginationDate: loanOriginationDate
    };

    const fullURL = util.determineServerURL() + serverURL;
    this.http.post<AddAccountResponse>(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: AddAccountResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('AddAccountsService call: ', error);
      this.serverResponse = {
        apiMessage: error,
        apiStatus: 'FAILURE',
        errorCode: 999
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

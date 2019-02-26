import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { EditAccountResponse, EditAccountPayload } from './edit-accounts.model';

const serverURL = '/edit-account';

@Injectable({
  providedIn: 'root'
})
export class EditAccountsService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: EditAccountResponse;

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

  getServerResponse(): EditAccountResponse {
    return this.serverResponse;
  }

  call(_id: string, firmName: string, accountName: string, accountType: string, originalBalance: string,
        currentBalance: string, interestRate: string, creditLimit: string, loanTerm: string, loanOriginationDate: string) {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    let payload: EditAccountPayload;
    payload = {
      _id: _id,
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
    this.http.post<EditAccountResponse>(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: EditAccountResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('EditAccountsService call: ', error);
      if (error.error) {
        this.serverResponse = {
          message: error.error.message,
          status: error.error.status
        };
      } else {
        this.serverResponse = {
          message: error,
          status: 'FAILURE'
        };
      }
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

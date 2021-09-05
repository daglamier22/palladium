import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { EditAccountResponse, EditAccountPayload } from './edit-account.model';

const serverURL = '/edit-account';

@Injectable({
  providedIn: 'root'
})
export class EditAccountService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: EditAccountResponse;

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

  public getServerResponse(): EditAccountResponse {
    return this.serverResponse;
  }

  public call(_id: string, firmName: string, accountName: string, accountType: string, originalBalance: string, currentBalance: string, interestRate: string, creditLimit: string, loanTerm: string, loanOriginationDate: string): void {
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
      this.serverResponse = {
        message: error,
        status: 'FAILURE'
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

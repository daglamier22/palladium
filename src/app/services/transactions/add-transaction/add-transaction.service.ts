import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { AddTransactionResponse, AddTransactionPayload } from './add-transaction.model';

const serverURL = '/add-transaction';

@Injectable({
  providedIn: 'root'
})
export class AddTransactionService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: AddTransactionResponse;

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

  getServerResponse(): AddTransactionResponse {
    return this.serverResponse;
  }

  call(date: string, accountName: string, description: string, categoryParent: string,
    categoryChild: string, amount: string, transactionType: string, note: string) {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    let payload: AddTransactionPayload;
    payload = {
      date: date,
      accountName: accountName,
      description: description,
      categoryParent: categoryParent,
      categoryChild: categoryChild,
      amount: amount,
      transactionType: transactionType,
      note: note,
    };

    const fullURL = util.determineServerURL() + serverURL;
    this.http.post<AddTransactionResponse>(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: AddTransactionResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('AddTransactionService call: ', error);
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

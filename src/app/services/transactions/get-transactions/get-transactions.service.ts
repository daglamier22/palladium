import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { GetTransactionsResponse } from './get-transactions.model';

const signupURL = '/get-all-transactions';

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: GetTransactionsResponse;

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

  getServerResponse(): GetTransactionsResponse {
    return this.serverResponse;
  }

  call() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    const fullURL = util.determineServerURL() + signupURL;
    this.http.get<GetTransactionsResponse>(
      fullURL,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: GetTransactionsResponse) => {
      this.serverResponse = { ...response };
      console.log(this.serverResponse);
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('GetTransactionsService call: ', error);
      this.serverResponse = {
        message: error,
        status: 'FAILURE',
        values: {
          transactions: []
        }
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }

  getTransaction(id: string) {
    if (this.serverResponse) {
      for (const transaction of this.serverResponse.values.transactions) {
        console.log(transaction);
        if (transaction._id === id) {
          return transaction;
        }
      }
    }
    return undefined;
  }
}

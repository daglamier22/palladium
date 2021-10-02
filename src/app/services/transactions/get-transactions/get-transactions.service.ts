import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { GetTransactionsResponse, Transaction } from './get-transactions.model';

const serverURL = '/getTransactionsByUserId';

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: GetTransactionsResponse;

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

  public getServerResponse(): GetTransactionsResponse {
    return this.serverResponse;
  }

  public call(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    const fullURL = util.determineServerURL() + serverURL;
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

  public getTransaction(id: string): Transaction | null {
    if (this.serverResponse) {
      for (const transaction of this.serverResponse.values.transactions) {
        console.log(transaction);
        if (transaction._id === id) {
          return transaction;
        }
      }
    }
    return null;
  }
}

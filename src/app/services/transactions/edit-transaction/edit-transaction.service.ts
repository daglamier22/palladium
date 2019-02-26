import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as util from '../../util';
import { AuthService } from '../../auth/auth.service';
import { EditTransactionResponse, EditTransactionPayload } from './edit-transaction.model';

const serverURL = '/edit-transaction';

@Injectable({
  providedIn: 'root'
})
export class EditTransactionService {
  private loading: boolean;
  private loadingChanged = new Subject<boolean>();
  private serverResponse: EditTransactionResponse;

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

  getServerResponse(): EditTransactionResponse {
    return this.serverResponse;
  }

  call(_id: string, date: string, accountName: string, description: string, categoryParent: string,
    categoryChild: string, amount: string, transactionType: string, note: string) {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    let payload: EditTransactionPayload;
    payload = {
      _id: _id,
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
    this.http.post<EditTransactionResponse>(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: EditTransactionResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('EditTransactionResponse call: ', error);
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

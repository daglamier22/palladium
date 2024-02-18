import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as util from '../../util';
import { CreateItemResponse } from './create-item.model';
import { AuthService } from '../../auth/auth.service';

const serverURL = '/item/createItem';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {
  private loading: boolean = false;
  private loadingChanged = new Subject<boolean>();
  private serverResponse!: CreateItemResponse;

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

  public getServerResponse(): CreateItemResponse {
    return this.serverResponse;
  }

  public call(publicToken: string, institutionId: string, institutionName: string): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingChanged.next(this.loading);

    let requestBody = {
      publicToken: publicToken,
      institutionId: institutionId,
      institutionName: institutionName
    }

    const fullURL = util.determineServerURL() + serverURL;
    this.http.post<CreateItemResponse>(
      fullURL,
      requestBody,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`}) }
    ).subscribe((response: CreateItemResponse) => {
      this.serverResponse = { ...response };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    }, (error) => {
      console.log('CreateItemService call:', error);
      this.serverResponse = {
        apiMessage: error,
        apiStatus: 'FAILURE',
        errorCode: 999,
        values: {
          item_id: ''
        }
      };
      this.loading = false;
      this.loadingChanged.next(this.loading);
    });
  }
}

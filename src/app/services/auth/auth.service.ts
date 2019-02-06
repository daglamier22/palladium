import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import * as util from '../util';
import { SignupPayload, LoginPayload, AuthResponse } from './auth.model';

const signupURL = '/signup';
const loginURL = '/login';
const logoutURL = '/logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loadingSignup: boolean;
  private loadingLogin: boolean;
  private loadingLogout: boolean;
  private loadingChangedSignup = new Subject<boolean>();
  private loadingChangedLogin = new Subject<boolean>();
  private loadingChangedLogout = new Subject<boolean>();
  private serverResponseSignup: AuthResponse;
  private serverResponseLogin: AuthResponse;
  private serverResponseLogout: AuthResponse;

  loggedIn: boolean;

  constructor(
    private http: HttpClient
  ) { }

  getLoadingSignup(): boolean {
    return this.loadingSignup;
  }

  getLoadingLogin(): boolean {
    return this.loadingLogin;
  }

  getLoadingLogout(): boolean {
    return this.loadingLogout;
  }

  getLoadingChangedSignup(): Observable<boolean> {
    return this.loadingChangedSignup.asObservable();
  }

  getLoadingChangedLogin(): Observable<boolean> {
    return this.loadingChangedLogin.asObservable();
  }

  getLoadingChangedLogout(): Observable<boolean> {
    return this.loadingChangedLogout.asObservable();
  }

  getServerResponseSignup(): AuthResponse {
    return this.serverResponseSignup;
  }

  getServerResponseLogin(): AuthResponse {
    return this.serverResponseLogin;
  }

  getServerResponseLogout(): AuthResponse {
    return this.serverResponseLogout;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  signup(username: string, password: string, confirmPassword: string) {
    if (this.loadingSignup) {
      return;
    }

    this.loadingSignup = true;
    this.loadingChangedSignup.next(this.loadingSignup);

    let payload: SignupPayload;
    try {
      payload = new SignupPayload(username, password, confirmPassword);
    } catch (error) {
      console.log('AuthService signup: ', error);
      payload = new SignupPayload('', '', '');
    }

    const fullURL = util.determineServerURL() + signupURL;
    this.http.post<AuthResponse>(
      fullURL,
      payload,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true,
      }
    ).subscribe((response: AuthResponse) => {
      try {
        this.serverResponseSignup = new AuthResponse(response.message, response.status);
      } catch (err) {
        this.serverResponseSignup = new AuthResponse('Parsing Error', 'FAILURE');
      }
      this.loadingSignup = false;
      this.loadingChangedSignup.next(this.loadingSignup);
    }, (error) => {
      console.log('AuthService signup: ', error);
      this.serverResponseSignup = new AuthResponse(error.error.message, error.error.status);
      this.loadingSignup = false;
      this.loadingChangedSignup.next(this.loadingSignup);
    });
  }

  login(username: string, password: string) {
    if (this.loadingLogin) {
      return;
    }

    this.loadingLogin = true;
    this.loadingChangedLogin.next(this.loadingLogin);

    let payload: LoginPayload;
    try {
      payload = new LoginPayload(username, password);
    } catch (error) {
      console.log('AuthService login: ', error);
      payload = new LoginPayload('', '');
    }

    const fullURL = util.determineServerURL() + loginURL;
    this.http.post(
      fullURL,
      payload,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true,
      }
    ).subscribe((response: any) => {
      try {
        this.serverResponseLogin = new AuthResponse(response.message, response.status);
      } catch (err) {
        this.serverResponseLogin = new AuthResponse('Parsing Error', 'FAILURE');
      }
      if (this.serverResponseLogin.status === 'SUCCESS') {
        this.loggedIn = true;
      }
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    }, (error) => {
      console.log('AuthService login: ', error);
      this.serverResponseLogin = new AuthResponse('Server Error', 'FAILURE');
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    });
  }

  logout() {
    if (this.loadingLogout) {
      return;
    }

    this.loadingLogout = true;
    this.loadingChangedLogout.next(this.loadingLogout);


    const fullURL = util.determineServerURL() + logoutURL;
    this.http.post(
      fullURL,
      {},
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true,
      }
    ).subscribe((response: any) => {
      try {
        this.serverResponseLogout = new AuthResponse(response.message, response.status);
      } catch (err) {
        this.serverResponseLogout = new AuthResponse('Parsing Error', 'FAILURE');
      }
      if (this.serverResponseLogout.status === 'SUCCESS') {
        this.loggedIn = false;
      }
      this.loadingLogout = false;
      this.loadingChangedLogout.next(this.loadingLogout);
    }, (error) => {
      console.log('AuthService logout: ', error);
      this.serverResponseLogout = new AuthResponse('Server Error', 'FAILURE');
      this.loadingLogout = false;
      this.loadingChangedLogout.next(this.loadingLogout);
    });
  }
}

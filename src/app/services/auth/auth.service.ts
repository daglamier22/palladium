import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

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
  private loadingChangedSignup = new Subject<boolean>();
  private serverResponseSignup: AuthResponse;
  private loadingLogin: boolean;
  private loadingChangedLogin = new Subject<boolean>();
  private serverResponseLogin: AuthResponse;
  private loggedIn: boolean;
  private loggedInChanged = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  getLoadingSignup(): boolean {
    return this.loadingSignup;
  }

  getLoadingChangedSignup(): Observable<boolean> {
    return this.loadingChangedSignup.asObservable();
  }

  getServerResponseSignup(): AuthResponse {
    return this.serverResponseSignup;
  }

  getLoadingLogin(): boolean {
    return this.loadingLogin;
  }

  getLoadingChangedLogin(): Observable<boolean> {
    return this.loadingChangedLogin.asObservable();
  }

  getServerResponseLogin(): AuthResponse {
    return this.serverResponseLogin;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getLoggedInChanged(): Observable<boolean> {
    return this.loggedInChanged.asObservable();
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
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    ).subscribe((response: AuthResponse) => {
      try {
        this.serverResponseSignup = new AuthResponse(response.message, response.status, response.token);
      } catch (err) {
        this.serverResponseSignup = new AuthResponse('Parsing Error', 'FAILURE', undefined);
      }
      this.loadingSignup = false;
      this.loadingChangedSignup.next(this.loadingSignup);
    }, (error) => {
      console.log('AuthService signup: ', error);
      this.serverResponseSignup = new AuthResponse(error.error.message, error.error.status, error.error.token);
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
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    ).subscribe((response: any) => {
      try {
        this.serverResponseLogin = new AuthResponse(response.message, response.status, response.token);
      } catch (err) {
        this.serverResponseLogin = new AuthResponse('Parsing Error', 'FAILURE', undefined);
      }
      if (this.serverResponseLogin.status === 'SUCCESS') {
        this.loggedIn = true;
        this.loggedInChanged.next(this.loggedIn);
        localStorage.setItem('token', this.serverResponseLogin.token);
      }
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    }, (error) => {
      console.log('AuthService login: ', error);
      this.serverResponseLogin = new AuthResponse('Server Error', 'FAILURE', undefined);
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    });
  }

  logout() {
    this.loggedIn = false;
    this.loggedInChanged.next(this.loggedIn);
    localStorage.removeItem('token');
  }
}

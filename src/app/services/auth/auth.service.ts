import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import * as util from '../util';
import { SignupPayload, LoginPayload, AuthResponse } from './auth.model';

const signupURL = '/signup';
const loginURL = '/login';

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
  private token: string;

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

  checkForToken() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      this.loggedInChanged.next(this.loggedIn);
      this.token = localStorage.getItem('token');
    }
  }

  getToken(): string {
    return this.token;
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private deleteToken() {
    localStorage.removeItem('token');
  }

  signup(username: string, password: string, confirmPassword: string) {
    if (this.loadingSignup) {
      return;
    }

    this.loadingSignup = true;
    this.loadingChangedSignup.next(this.loadingSignup);

    const payload: SignupPayload =  {
      email: username,
      password: password,
      confirmPassword: confirmPassword
    };

    const fullURL = util.determineServerURL() + signupURL;
    this.http.post<AuthResponse>(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    ).subscribe((response: AuthResponse) => {
      this.serverResponseSignup = { ...response };
      this.loadingSignup = false;
      this.loadingChangedSignup.next(this.loadingSignup);
    }, (error) => {
      console.log('AuthService signup: ', error);
      this.serverResponseSignup = {
        message: error,
        status: 'FAILURE',
        values: {
          id: undefined,
          token: undefined,
          userId: undefined
        }
      };
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

    const payload: LoginPayload = {
      email: username,
      password: password
    };

    const fullURL = util.determineServerURL() + loginURL;
    this.http.post(
      fullURL,
      payload,
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    ).subscribe((response: any) => {
      this.serverResponseLogin = { ... response };
      if (this.serverResponseLogin.status === 'SUCCESS') {
        this.loggedIn = true;
        this.loggedInChanged.next(this.loggedIn);
        this.setToken(this.serverResponseLogin.values.token);
      }
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    }, (error) => {
      console.log('AuthService login: ', error);
      this.serverResponseLogin = {
        message: error,
        status: 'FAILURE',
        values: {
          id: undefined,
          token: undefined,
          userId: undefined
        }
      };
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    });
  }

  logout() {
    this.loggedIn = false;
    this.loggedInChanged.next(this.loggedIn);
    this.deleteToken();
  }
}

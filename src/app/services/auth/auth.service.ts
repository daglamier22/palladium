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
  private loadingSignup: boolean = false;
  private loadingChangedSignup = new Subject<boolean>();
  private serverResponseSignup!: AuthResponse;
  private loadingLogin: boolean = false;
  private loadingChangedLogin = new Subject<boolean>();
  private serverResponseLogin!: AuthResponse;

  private loggedIn: boolean = false;
  private loggedInChanged = new BehaviorSubject<boolean>(false);
  private token: string | null = '';

  constructor(
    private http: HttpClient
  ) { }

  public getLoadingSignup(): boolean {
    return this.loadingSignup;
  }

  public getLoadingChangedSignup(): Observable<boolean> {
    return this.loadingChangedSignup.asObservable();
  }

  public getServerResponseSignup(): AuthResponse {
    return this.serverResponseSignup;
  }

  public getLoadingLogin(): boolean {
    return this.loadingLogin;
  }

  public getLoadingChangedLogin(): Observable<boolean> {
    return this.loadingChangedLogin.asObservable();
  }

  public getServerResponseLogin(): AuthResponse {
    return this.serverResponseLogin;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getLoggedInChanged(): Observable<boolean> {
    return this.loggedInChanged.asObservable();
  }

  public checkForToken(): void {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      this.loggedInChanged.next(this.loggedIn);
      this.token = localStorage.getItem('token');
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private deleteToken(): void {
    localStorage.removeItem('token');
  }

  public signup(username: string, password: string, confirmPassword: string): void {
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
        apiMessage: error,
        apiStatus: 'FAILURE',
        values: {
          id: '',
          token: '',
          userId: ''
        }
      };
      this.loadingSignup = false;
      this.loadingChangedSignup.next(this.loadingSignup);
    });
  }

  public login(username: string, password: string): void {
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
      if (this.serverResponseLogin.apiStatus === 'SUCCESS') {
        this.loggedIn = true;
        this.loggedInChanged.next(this.loggedIn);
        this.setToken(this.serverResponseLogin.values.token);
      }
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    }, (error) => {
      console.log('AuthService login: ', error);
      this.serverResponseLogin = {
        apiMessage: error,
        apiStatus: 'FAILURE',
        values: {
          id: '',
          token: '',
          userId: ''
        }
      };
      this.loadingLogin = false;
      this.loadingChangedLogin.next(this.loadingLogin);
    });
  }

  public logout(): void {
    this.loggedIn = false;
    this.loggedInChanged.next(this.loggedIn);
    this.deleteToken();
  }
}

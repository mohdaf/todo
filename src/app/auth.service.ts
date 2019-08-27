import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private _registerUrl = "https://todo-backend.modaf.xyz/api/user/register/";
  private _loginUrl = "https://todo-backend.modaf.xyz/api/user/token/";
  private _refreshUrl = "https://todo-backend.modaf.xyz/api/user/token/refresh/";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  refreshToken() {
    return this.http.post<any>(this._refreshUrl, {
      'refresh': this.getRefreshToken()
      }).pipe(tap((tokens: {
          access: string;
          refresh: string;
        }) => {
          localStorage.setItem('token', tokens.access);
        }));
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  loggedIn() {
    return !!localStorage.getItem('token');  
  }
}
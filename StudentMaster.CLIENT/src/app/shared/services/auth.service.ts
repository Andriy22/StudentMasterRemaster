import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CURRENT_USER, API, JWT_TOKEN, REFRESH_TOKEN, SELECTED_SERVER } from '@shared/config';
import { AuthUserModel } from '@shared/models/auth-user.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthUserModel>;
  public currentUser: Observable<AuthUserModel>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthUserModel>(
      JSON.parse(localStorage.getItem(CURRENT_USER))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  refresh() {
    return this.http
      .post<AuthUserModel>(`${API}/api/Auth/Refresh`, {
        token: this.currentUserSubject.value.access_token,
        refresh: this.currentUserSubject.value.refresh_token,
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.access_token) {
            if (user && user.access_token) {
              localStorage.setItem(CURRENT_USER, JSON.stringify(user));
              localStorage.setItem(JWT_TOKEN, user.access_token);
              localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
              this.currentUserSubject.next(user);
            }
          }

          return user;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUserModel>(`${API}/api/Auth/Authorize`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.access_token) {
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            localStorage.setItem(JWT_TOKEN, user.access_token);
            localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(SELECTED_SERVER);
    this.router.navigate(['/auth/login']);

    return new Observable<any>();
  }

  loggedIn() {
    if (localStorage.getItem(JWT_TOKEN)) {
      return true;
    }
    return false;
  }

  checkAuth() {
    return this.http.get(`${API}/api/Account/check-auch`);
  }

  isTokenExpired() {
    if (localStorage.getItem(JWT_TOKEN)) {
      const token = localStorage.getItem(JWT_TOKEN);
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }
  getUserRole(): string[] {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } else {
      return [];
    }
  }

  getUserId(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    } else {
      return null;
    }
  }
  getEmail(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['email'];
    }
  }
  getFullName(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['fullname'];
    }
  }
  getLogin(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['login'];
    }
  }
  getTokenPayload(): string {
    return this.jwtHelper.decodeToken(localStorage.getItem(JWT_TOKEN));
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  hasRole(role: string): boolean {
    if (this.currentUserSubject.value) {
      if (Array.isArray(this.getUserRole())) {
        return !!this.getUserRole().find(x => x.toLocaleLowerCase() === role.toLocaleLowerCase());
      } else {
        return this.getUserRole().toString() === role;
      }
    } else {
      return false;
    }
  }
}

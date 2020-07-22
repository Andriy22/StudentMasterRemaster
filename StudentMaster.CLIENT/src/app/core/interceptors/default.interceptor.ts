import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { mergeMap, catchError, tap, finalize, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CURRENT_USER, JWT_TOKEN, REFRESH_TOKEN } from '@shared/config';
import { AuthUserModel } from '@shared/models/auth-user.model';
import { AuthService } from '@shared/services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private AuthService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is logging in for the first time
    return next.handle(this.attachTokenToRequest(request)).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Success');
        }
      }),
      catchError(
        (error): Observable<any> => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case 401:
                console.log('Token expired. Attempting refresh ...');
                return this.handleHttpResponseError(request, next);
            }
            return throwError(this.handleError(error as HttpErrorResponse));
          }
        }
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorString = 'Unknown error...';

    if (error.status === 0) {
      errorString = 'Server is offline...';
    }
    if (error.status === 400) {
      errorString = error.error.message;
    }
    if (error.status === 403) {
      this.router.navigate(['/sessions/403']);
    }
    if (error.error !== null) {
      if (error.error.action === 'relogin') {
        errorString = 'Please relogin!!!';
        this.AuthService.logout();
      }
    }
    // SHOW ERROR
    console.log(errorString);

    return throwError(error);
  }

  // Method to handle http error response
  private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
    // First thing to check if the token is in process of refreshing
    if (!this.isTokenRefreshing) {
      // If the Token Refresheing is not true
      this.isTokenRefreshing = true;

      // Any existing value is set to null
      // Reset here so that the following requests wait until the token comes back from the refresh token API call
      this.tokenSubject.next(null);

      /// call the API to refresh the token
      return this.AuthService.refresh().pipe(
        switchMap((user: AuthUserModel) => {
          if (user) {
            return next.handle(this.attachTokenToRequest(request));
          }
          return this.AuthService.logout() as any;
        }),
        catchError(err => {
          this.AuthService.logout();
          return this.handleError(err);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        })
      );
    } else {
      this.isTokenRefreshing = false;
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.attachTokenToRequest(request));
        })
      );
    }
  }

  private attachTokenToRequest(request: HttpRequest<any>) {
    if (localStorage.getItem(JWT_TOKEN) && !this.AuthService.isTokenExpired()) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}` },
      });
    }
    return request;
  }
}

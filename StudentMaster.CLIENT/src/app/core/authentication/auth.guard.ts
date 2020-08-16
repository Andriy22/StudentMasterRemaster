import { Injectable, Inject, Optional } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment,
  Router,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TokenService } from './token.service';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _router: Router,
    private _token: TokenService,
    private _auth: AuthService,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {}

  // lazy loading
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true;
  }
  // route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.loggedIn()) {
      return true;
    }
    this._router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  // all children route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.loggedIn()) {
      return true;
    }
    this._router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

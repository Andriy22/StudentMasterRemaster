import { Injectable, Optional, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from '@shared/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { adminRole, teacherRole, userRole } from '@shared/config';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _token: TokenService,
    private _auth: AuthService,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._auth.loggedIn()) {
      this._router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    if (this._auth.hasRole(userRole)) {
      this._router.navigate(['dashboard']);
      return true;
    }
    if (this._auth.hasRole(adminRole)) {
      this._router.navigate(['admin/classes']);
      return true;
    }
    if (this._auth.hasRole(teacherRole)) {
      this._router.navigate(['teacher/dashboard']);
      return true;
    }

    this._router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

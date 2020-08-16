import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, TokenService, MenuService } from '@core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <!-- <img
        class="matero-avatar"
        src="https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png"
        width="32"
        alt="avatar"
      /> -->
      <span class="matero-username" fxHide.lt-sm>{{ this.auth.getFullName() }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  constructor(
    private _router: Router,
    private _settings: SettingsService,
    private _menu: MenuService,
    public auth: AuthService
  ) {}

  logout() {
    this.auth.logout();
    this._settings.removeUser();
    this._router.navigateByUrl('/auth/login');
  }
}

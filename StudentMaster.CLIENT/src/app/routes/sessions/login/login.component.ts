import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService, StartupService, SettingsService } from '@core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _auth: AuthService,
    private _startup: StartupService,
    private _settings: SettingsService
  ) {
    this.loginForm = this._fb.group({
      username: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.isLoading = true;

    this._auth.login(this.username.value, this.password.value).subscribe(
      _ => {
        this.isLoading = false;
        this._router.navigate(['/']);
      },
      _ => (this.isLoading = false)
    );
  }
}

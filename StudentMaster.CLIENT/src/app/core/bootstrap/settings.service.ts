import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppSettings, defaults } from '../settings';
import { LocalStorageService } from '@shared/services/storage.service';

export const USER_KEY = 'usr';

export interface User {
  name: string;
  id: number;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _options = defaults;
  private _isUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _notify$ = new BehaviorSubject<any>({});

  get notify(): Observable<any> {
    return this._notify$.asObservable();
  }

  get isSettingsUpdate(): Observable<any> {
    return this._isUpdate$.asObservable();
  }
  constructor(private _store: LocalStorageService) {}

  setLayout(options?: AppSettings): AppSettings {
    this._options = Object.assign(defaults, options);
    return this._options;
  }

  setNavState(type: string, value: boolean) {
    this._notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this._options;
  }
  updateOptions(options: AppSettings) {
    this._options = options;
    this._isUpdate$.next(true);
  }

  setUser(value: User) {
    this._store.set(USER_KEY, value);
  }

  removeUser() {
    this._store.remove(USER_KEY);
  }

  setLanguage(lang: string) {
    this._options.language = lang;
    this._notify$.next({ lang });
  }
}

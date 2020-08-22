import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private notify: MatSnackBar, private _settings: SettingsService) {}
  public getBase64(event): string {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return reader.result;
    };
    reader.onerror = error => {
      console.log('Error: ', error);
      return error;
    };
    return 'unknown error';
  }

  showDetails(status: string, detail: any, color = 'yellow', bg = 'white') {
    if (this._settings.getOptions()?.debugMode) {
      console.log('%c=========================', 'color: yellow ');
      console.log('%cDEBUG MODE: ENABLED', 'text-align: center; color: red');
      console.log(`%cSTATUS: ${status}`, `color: ${color};`);
      console.log(`%cDETAILS: ${detail} `, `color: ${color};`);
      console.log('%c=========================', 'color: yellow ');
    }
  }

  showNotification(error = 'Невідома помилка!') {
    this.notify.open(error, null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

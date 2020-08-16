import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private notify: MatSnackBar) {}
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

  showNotification(error = 'Невідома помилка!') {
    this.notify.open(error, null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

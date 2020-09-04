import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-version',
  templateUrl: './update-version.component.html',
  styleUrls: ['./update-version.component.scss'],
})
export class UpdateVersionComponent implements OnInit {
  progress = 0;
  constructor(public dialogRef: MatDialogRef<UpdateVersionComponent>) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.progress += 0.1;
      console.log(this.progress);
      if (this.progress >= 100) {
        clearInterval(interval);
        this.dialogRef.close();
        window.location.reload();
      }
    }, 10);
  }
}

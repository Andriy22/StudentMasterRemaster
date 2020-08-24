import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@shared/services/auth.service';
import { NewsModel } from '@shared/models/news-model';
import { AdminService } from '@shared/services/admin.service';
import { adminRole } from '@shared/config';

@Component({
  selector: 'app-show-new',
  templateUrl: './show-new.component.html',
  styleUrls: ['./show-new.component.css'],
})
export class ShowNewComponent {
  isAdmin = false;
  constructor(
    public dialogRef: MatDialogRef<ShowNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsModel,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.isAdmin = this.authService.hasRole(adminRole);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteNew(id) {
    this.adminService.removeNew(id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}

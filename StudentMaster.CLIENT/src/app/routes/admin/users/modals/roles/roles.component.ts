import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { SubjectModel } from '@shared/models/subject-model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;

  rolesCtl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  allRoles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<RolesComponent>,
    private _adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.update();
  }
  userEmail = '';
  isLoading = false;

  ngOnInit(): void {}
  cancel() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(event);

    this.rolesCtl.setValue(null);
  }

  remove(role: SubjectModel): void {
    this._adminService.changeRolesInUser(this.data.uid, role).subscribe(() => {
      this.update();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this._adminService.changeRolesInUser(this.data.uid, event.option.value).subscribe(() => {
      this.update();
    });
  }

  update() {
    this.isLoading = true;
    this._adminService.getAllRoles().subscribe(data => {
      this.allRoles = data;
      this._adminService.getRolesByUID(this.data.uid).subscribe(roles => {
        this.roles = roles;
        this.isLoading = false;
        this.roles.forEach(element => {
          if (this.allRoles.find(x => x === element)) {
            this.allRoles = this.allRoles.filter(x => x !== element);
          }
        });
      });
    });
  }
  close() {
    this.dialogRef.close();
  }
}

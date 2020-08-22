import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '@shared/models/student-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { AuthService } from '@shared/services/auth.service';
import { RolesComponent } from './modals/roles/roles.component';
import { CreateUserComponent } from './modals/create-user/create-user.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MtxDialog } from '@ng-matero/extensions';
import { ToolsService } from '@shared/services/tools.service';
import { ChangeClassInStudentComponent } from '../classes/modals/change-class-in-student/change-class-in-student.component';
import { EditSubjectsInTeacherComponent } from './modals/edit-subjects-in-teacher/edit-subjects-in-teacher.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = ['pib', 'roles'];
  dataSource: MatTableDataSource<StudentModel>;
  pageSize = 10;
  pageIndex = 0;
  myUID = '';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private authService: AuthService,
    private _admin: AdminService,
    private _spinner: NgxSpinnerService,
    private _mtxDialog: MtxDialog,
    private _tools: ToolsService
  ) {}
  LoadUsers() {
    this.adminService.getAllUsers(1, 999).subscribe(x => {
      this.dataSource = new MatTableDataSource(x.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.LoadUsers();
    this.myUID = this.authService.getUserId();
  }
  onChangeRoles(id) {
    const dialogRef = this.dialog.open(RolesComponent, {
      width: '90%',
      data: { uid: id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.LoadUsers();
    });
  }

  addUser() {
    this._mtxDialog
      .originalOpen(CreateUserComponent, {
        data: { classId: 0 },
      })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this._admin.registerUser(data).subscribe(() => {
            this._tools.showNotification('Користувача створено!');
          });
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editClass(uid) {
    const dialogRef = this.dialog.open(ChangeClassInStudentComponent, {
      width: '90%',
      data: { uid },
    });
    dialogRef.afterClosed();
  }

  editSubjects(uid) {
    const dialogRef = this.dialog.open(EditSubjectsInTeacherComponent, {
      width: '90%',
      data: { teacherId: uid },
    });
    dialogRef.afterClosed();
  }
}

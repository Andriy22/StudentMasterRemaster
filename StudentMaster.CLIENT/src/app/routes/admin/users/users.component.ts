import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '@shared/models/student-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { AuthService } from '@shared/services/auth.service';
import { RolesComponent } from './modals/roles/roles.component';

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
    private authService: AuthService
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
  // addUser() {
  //   const dialogRef = this.dialog.open(InviteUserComponent, {
  //     width: '90%',
  //     data: { classId: 0 },
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.adminService.getAllUsers(1, 999).subscribe(x => {
  //       this.dataSource = new MatTableDataSource(x.data);
  //       this.dataSource.paginator = this.paginator;
  //     });
  //   });
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // editClass(uid) {
  //   const dialogRef = this.dialog.open(ChangeClassInStudentComponent, {
  //     width: '90%',
  //     data: { uid },
  //   });
  //   dialogRef.afterClosed();
  // }
  // editSubjects(uid) {
  //   const dialogRef = this.dialog.open(EditSubjectsInTeacherComponent, {
  //     width: '90%',
  //     data: { teacherId: uid },
  //   });
  //   dialogRef.afterClosed();
  // }
}

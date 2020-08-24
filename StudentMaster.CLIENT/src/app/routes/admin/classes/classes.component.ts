import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { ClassModel } from '@shared/models/classes-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MtxDialog } from '@ng-matero/extensions';
import { InputModalComponent } from './modals/input-modal/input-modal.component';
import { CreateUserComponent } from '../users/modals/create-user/create-user.component';
import { ToolsService } from '@shared/services/tools.service';
import { EditSubjectsInClassComponent } from './modals/edit-subjects-in-class/edit-subjects-in-class.component';
import { EditTeachersInClassComponent } from './modals/edit-teachers-in-class/edit-teachers-in-class.component';
import { ClassesService } from '@shared/services/classes.service';
import { EditScheduleComponent } from './modals/edit-schedule/edit-schedule.component';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class AdminClassesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _admin: AdminService,
    private _spinner: NgxSpinnerService,
    private _mtxDialog: MtxDialog,
    private _tools: ToolsService,
    private _class: ClassesService
  ) {}

  displayedColumns: string[] = ['position', 'PIB', 'Marks'];
  dataSource: any;
  selectedClass = 0;
  selectedClassId = 0;
  classes = [];

  ngOnInit() {
    this.loadClasses();
  }

  removeFromClass(id: string) {
    this._admin.removeStudentFromClass(id).subscribe(() => {
      this.getClassStudents();
    });
  }

  onChange(event: number) {
    this.selectedClass = event;
    if (event !== 0) {
      this.selectedClassId = this.classes[event - 1].id;
      this.getClassStudents();
    } else {
      this.createClass();
    }
  }

  editSchedule() {
    this._mtxDialog
      .originalOpen(EditScheduleComponent, {
        width: '50%',
        data: { classId: this.selectedClassId },
      })
      .afterClosed();
  }

  addUser(classID) {
    this._mtxDialog
      .originalOpen(CreateUserComponent, {
        data: { classId: classID },
      })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this._admin.registerUser(data).subscribe(() => {
            this.getClassStudents();
            this._tools.showNotification('Користувача створено!');
          });
        }
      });
  }

  loadClasses() {
    this._spinner.show();
    this._admin.getAllClasses().subscribe(
      (data: ClassModel[]) => {
        this._spinner.hide();
        this.classes = data;
        if (data.length !== 0) {
          this.selectedClass = 1;
        }
      },
      _ => this._spinner.hide()
    );
  }

  createClass() {
    const dialogRef = this._mtxDialog.originalOpen(InputModalComponent, {
      data: { class: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.classes.length > 0) {
        this.selectedClass = 1;
      }

      if (result) {
        this._spinner.show();
        this._admin.createClass(result).subscribe(
          _ => {
            this._spinner.hide();
            this.loadClasses();
          },
          _ => {
            this._spinner.hide();
          }
        );
      }
    });
  }

  delete(className) {
    this._mtxDialog.confirm('Дійсно видалити?', () => {
      this._admin.deleteClass(className).subscribe(_ => {
        this.loadClasses();
      });
    });
  }

  editSubjects() {
    const dialogRef = this.dialog.open(EditSubjectsInClassComponent, {
      width: '90%',
      data: { classId: this.selectedClassId },
    });
    dialogRef.afterClosed();
  }
  editTeachers() {
    const dialogRef = this.dialog.open(EditTeachersInClassComponent, {
      width: '90%',
      data: { classId: this.selectedClassId },
    });
    dialogRef.afterClosed();
  }

  getClassStudents() {
    this._class.getStudentsByClassId(this.selectedClassId).subscribe(x => {
      this.dataSource = x;
    });
  }

  editName(className) {
    const dialogRef = this._mtxDialog.originalOpen(InputModalComponent, {
      data: { class: className },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.classes.length > 0) {
        this.selectedClass = 1;
      }

      if (result) {
        this._spinner.show();
        this._admin.changeClassName(className, result).subscribe(
          _ => {
            this._spinner.hide();
            this.loadClasses();
          },
          _ => {
            this._spinner.hide();
          }
        );
      }
    });
  }
}

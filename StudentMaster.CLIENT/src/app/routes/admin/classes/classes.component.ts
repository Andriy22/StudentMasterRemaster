import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { ClassModel } from '@shared/models/classes-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MtxDialog } from '@ng-matero/extensions';
import { InputModalComponent } from './modals/input-modal/input-modal.component';

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
    private _mtxDialog: MtxDialog
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
    this._admin.removeStudentFromClass(id).subscribe(() => {});
  }

  onChange(event: number) {
    this.selectedClass = event;
    if (event !== 0) {
      this.selectedClassId = this.classes[event - 1].id;
    } else {
      this.createClass();
    }
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
      data: { class: 'demo' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.classes.length > 0) {
        this.selectedClass = 1;
      }

      if (result) {
        this._spinner.show();
        this._admin.createClass(result).subscribe(
          _ => {
            console.log('class was created');
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

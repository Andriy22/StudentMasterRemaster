import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { ClassModel } from '@shared/models/classes-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class AdminClassesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private admin: AdminService,
    private spinner: NgxSpinnerService
  ) {}
  displayedColumns: string[] = ['position', 'PIB', 'Marks'];
  dataSource: any;
  selectedClass = 0;
  classes = [];
  ngOnInit() {
    this.spinner.show();

    this.admin.getAllClasses().subscribe(
      (data: ClassModel[]) => {
        this.spinner.hide();
        this.classes = data;
        if (data.length !== 0) {
          this.selectedClass = data[0].id;
        }
      },
      _ => this.spinner.hide()
    );
  }

  removeFromClass(id: string) {
    this.admin.removeStudentFromClass(id).subscribe(() => {});
  }
  onChange(event: any) {
    console.log(event);
    this.selectedClass = this.classes[event].id;
  }
}

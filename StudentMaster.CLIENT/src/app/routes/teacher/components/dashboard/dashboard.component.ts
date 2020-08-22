import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesService } from '@shared/services/classes.service';
import { ClassModel } from '@shared/models/classes-model';
import { AddHomeworkComponent } from '../add-homework/add-homework.component';
import { SubjectModel } from '@shared/models/subject-model';
import { AdminService } from '@shared/services/admin.service';
import { MatSelectChange } from '@angular/material/select';
import { MarksService } from '@shared/services/marks.service';
import { ToolsService } from '@shared/services/tools.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { StudentModel } from '@shared/models/student-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _classService: ClassesService,
    private _adminService: AdminService,
    private _markService: MarksService,
    private _toolsService: ToolsService
  ) {}
  displayedColumns: string[] = ['position', 'PIB', 'Marks'];
  dataSource: MatTableDataSource<StudentModel>;
  maxDate = new Date();
  minDate = new Date();

  subjects: SubjectModel[] = [];
  selectedClass = 0;
  selectedSubject = -1;
  selectedDate = new Date();

  classes = [];
  ngOnInit() {
    this.minDate.setDate(this.maxDate.getDate() - 7);
    this._classService.getClasses().subscribe((data: ClassModel[]) => {
      this.classes = data;
      if (data.length !== 0) {
        this.selectedClass = data[0].id;
        this.loadData();
      }
    });
  }

  loadData() {
    this._classService.getTeacherClassSubjects(this.selectedClass).subscribe(subjects => {
      this.subjects = subjects;
    });
    this._classService.getStudentsByClassId(this.selectedClass).subscribe(students => {
      this.dataSource = new MatTableDataSource(students);
    });
  }

  onSettingsChange(event) {
    this.dataSource.data.forEach(el => {
      this.getUserMark(el.id);
    });
  }

  getUserMark(uid) {
    this._classService
      .getStudentMarkByDateAndSubject(this.selectedSubject, uid, this.selectedDate.toDateString())
      .subscribe(x => {
        this.dataSource.data[this.dataSource.data.findIndex(x => x.id == uid)].mark = x;
      });
  }

  onClassMarkChange(event: MatSelectChange, uid) {
    this._classService
      .addMarkForStudentAsync(
        uid,
        'Класна робота',
        this.selectedSubject,
        event.value,
        this.selectedDate.toDateString()
      )
      .subscribe(x => {
        this._toolsService.showNotification('Оцінку виставлено!');
      });
  }

  addHomeWork(): void {
    const dialogRef = this.dialog.open(AddHomeworkComponent, {
      width: '90%',
      data: { classId: this.selectedClass },
    });
    dialogRef.afterClosed();
  }
  onChange(event: any) {
    this.selectedClass = this.classes[event].id;
    this.loadData();
  }
}

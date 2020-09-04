import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectModel } from '@shared/models/subject-model';
import { AdminService } from '@shared/services/admin.service';
import { MatSelectChange } from '@angular/material/select';

export interface EditShedule {
  id: number;
  subject: number;
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
})
export class EditScheduleComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _adminService: AdminService) {}
  displayedColumns: string[] = ['id', 'subject'];
  classSubjects: SubjectModel[] = [];
  selectedDay = 1;

  dataSource = new MatTableDataSource<EditShedule>([
    { id: 1, subject: 0 },
    { id: 2, subject: 0 },
    { id: 3, subject: 0 },
    { id: 4, subject: 0 },
    { id: 5, subject: 0 },
    { id: 6, subject: 0 },
    { id: 7, subject: 0 },
    { id: 8, subject: 0 },
  ]);

  ngOnInit(): void {
    this._adminService.getClassSubjects(this.data.classId).subscribe(subjects => {
      this.classSubjects = subjects;
      this.onDayChange(new MatSelectChange(null, 1));
    });
  }

  onDayChange(event: MatSelectChange) {
    this.selectedDay = event.value;
    this.getClassSchedule(this.data.classId, event.value);
  }

  getClassSchedule(classId, dayId) {
    this.resetClassSchedule();
    this._adminService.getClassScheduleByDay(classId, dayId).subscribe(x => {
      x.forEach(el => {
        this.dataSource.data[el.pos - 1].subject = el.id;
      });
    });
  }

  resetClassSchedule() {
    this.dataSource.data.map(el => {
      el.subject = 0;
    });
  }

  editSchedule(event: MatSelectChange, pos) {
    this._adminService
      .editClassScheduleByDay(this.data.classId, this.selectedDay, event.value, pos)
      .subscribe(_ => {
        this.getClassSchedule(this.data.classId, this.selectedDay);
      });
  }
}

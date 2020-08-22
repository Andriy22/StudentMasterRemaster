import { ClassesService } from '@shared/services/classes.service';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentModel } from '@shared/models/student-model';

@Component({
  selector: 'app-classmates',
  templateUrl: './classmates.component.html',
  styleUrls: ['./classmates.component.scss'],
})
export class ClassmatesComponent implements OnInit {
  students: StudentModel[] = [];
  constructor(private classService: ClassesService) {}

  ngOnInit() {
    this.classService.getClassmates().subscribe(students => {
      this.students = students;
    });
  }
}

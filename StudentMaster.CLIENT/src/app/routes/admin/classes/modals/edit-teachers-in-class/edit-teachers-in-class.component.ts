import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TeacherModel } from '@shared/models/teacher-model';
import { ToolsService } from '@shared/services/tools.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-edit-teachers-in-class',
  templateUrl: './edit-teachers-in-class.component.html',
  styleUrls: ['./edit-teachers-in-class.component.scss'],
})
export class EditTeachersInClassComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;

  teacherCtrl = new FormControl();
  filteredTeachers: Observable<string[]>;
  teachers: TeacherModel[] = [];
  allTeachers: TeacherModel[] = [];

  constructor(
    private tools: ToolsService,
    public dialogRef: MatDialogRef<EditTeachersInClassComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.update();
    //   this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
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

    this.teacherCtrl.setValue(null);
  }

  remove(teacher: TeacherModel): void {
    this.adminService.editTeachersInClass(this.data.classId, teacher.id).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.adminService
      .editTeachersInClass(this.data.classId, event.option.value.id)
      .subscribe(() => {
        this.tools.showNotification('Success');
        this.update();
      });
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }

  update() {
    this.isLoading = true;
    this.adminService.getAllTeachers().subscribe(data => {
      this.allTeachers = data;
      this.adminService.getClassTeachers(this.data.classId).subscribe(teachers => {
        this.teachers = teachers;
        this.isLoading = false;
        this.teachers.forEach(element => {
          if (this.allTeachers.find(x => x.id === element.id)) {
            this.allTeachers = this.allTeachers.filter(x => x.id !== element.id);
          }
        });
      });
    });
  }
  close() {
    this.dialogRef.close();
  }
}

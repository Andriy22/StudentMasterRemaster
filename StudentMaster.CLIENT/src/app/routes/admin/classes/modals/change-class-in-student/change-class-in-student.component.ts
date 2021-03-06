import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { StudentClass } from '@shared/models/student-class.model';
import { ToolsService } from '@shared/services/tools.service';
import { AdminService } from '@shared/services/admin.service';

@Component({
  selector: 'app-change-class-in-student',
  templateUrl: './change-class-in-student.component.html',
  styleUrls: ['./change-class-in-student.component.scss'],
})
export class ChangeClassInStudentComponent implements OnInit {
  classes: StudentClass[] = [];
  selectedClass = '';

  constructor(
    private tools: ToolsService,
    public dialogRef: MatDialogRef<ChangeClassInStudentComponent>,
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

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.adminService.changeRolesInUser(this.data.uid, event.option.value).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }
  onChange(event: MatSelectChange) {
    this.isLoading = true;
    this.adminService.changeClassInStudent(event.value, this.data.uid).subscribe(
      () => {
        this.isLoading = false;
        this.tools.showNotification('Success');
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  update() {
    this.isLoading = true;
    this.adminService.getStudentClasses(this.data.uid).subscribe(
      data => {
        this.classes = data;
        if (this.classes.findIndex(x => x.active === true) !== -1) {
          this.selectedClass = this.classes.find(x => x.active === true).id;
        }
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  close() {
    this.dialogRef.close();
  }
}

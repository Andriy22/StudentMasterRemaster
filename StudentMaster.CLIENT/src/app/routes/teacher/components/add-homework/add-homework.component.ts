import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectModel } from '@shared/models/subject-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '@shared/services/tools.service';
import { HomeworksService } from '@shared/services/homeworks.service';
import { MatStepper } from '@angular/material/stepper';
import { AddHomeWorkModel } from '@shared/models/add-homework';
import { ClassesService } from '@shared/services/classes.service';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css'],
})
export class AddHomeworkComponent implements OnInit {
  isLinear = true;
  isLoading = false;
  infoForm: FormGroup;
  dataForm: FormGroup;
  error = '';
  done = '';
  maxDate = new Date();
  minDate = new Date();

  public subjects: SubjectModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddHomeworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _tools: ToolsService,
    private _hS: HomeworksService,
    private _cS: ClassesService
  ) {}

  ngOnInit() {
    this.maxDate.setDate(this.minDate.getDate() + 7);
    this.infoForm = this.fb.group({
      theme: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });
    this.dataForm = this.fb.group({
      homework: ['', [Validators.required]],
    });

    this._cS.getTeacherClassSubjects(this.data.classId).subscribe(x => {
      if (x) {
        this.subjects = x;
      } else {
        this.dialogRef.close();
        this._tools.getBase64('Схоже у вас немає предметів в цьому класі!');
      }
    });
  }
  onSubmitInfoForm(stepper: MatStepper) {
    stepper.next();
  }
  onSubmitDataForm(stepper: MatStepper) {
    const dataInfoForm = this.infoForm.value;
    const dataDataForm = this.dataForm.value;
    console.log(dataDataForm);
    const data = new AddHomeWorkModel();
    this.isLoading = true;
    data.classId = this.data.classId;
    (data.file = dataDataForm.homework as File),
      (data.subjectId = dataInfoForm.subject),
      (data.theme = dataInfoForm.theme),
      (data.toTime = dataInfoForm.date);

    console.log('data: ', data);

    const formdata = new FormData();
    formdata.append('classId', data.classId);
    formdata.append('Theme', data.theme);
    formdata.append('subjectId', data.subjectId);
    formdata.append('file', data.file);
    formdata.append('toTime', new Date(data.toTime).toDateString());

    this._hS.AddHomeWorkAsync(formdata).subscribe(
      _ => {
        this.isLoading = false;
        this._tools.showNotification('Homework added');
        stepper.reset();
        this.dialogRef.close();
      },
      _ => {
        this.isLoading = false;
        this.dialogRef.close();
      }
    );
  }
  onPickImage() {
    const selector = document.getElementById('fileSelector') as HTMLInputElement;
    selector.click();
    selector.onchange = (event: any) => {
      console.log(event.target.files[0].type);
      if (
        !event.target.files[0].type.indexOf('image') ||
        !event.target.files[0].type.indexOf('text/plain')
      ) {
        this.dataForm.controls.homework.setValue(event.target.files[0]);
      } else {
        this._tools.showNotification('Please select valid file');
        this.dialogRef.close();
      }
    };
  }
  close() {
    this.dialogRef.close();
  }
}

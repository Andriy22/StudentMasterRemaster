import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterModel } from '@shared/models/register.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterModel
  ) {
    this.registerForm = this._fb.group({
      classId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['@demo.loc', [Validators.required]],
      //  password: ['', [Validators.required]],
      //  confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {
    this.registerForm.controls.username.disable();
    this.registerForm.controls.classId.setValue(this.data.classId);
    this.registerForm.controls.classId.disable();
  }

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.data.classId = this.registerForm.controls.classId.value;
    this.data.email = this.registerForm.controls.email.value;
    this.data.firstName = this.registerForm.controls.firstname.value;
    this.data.name = this.registerForm.controls.name.value;
    this.data.lastname = this.registerForm.controls.lastname.value;
    this.data.username = this.registerForm.controls.username.value;
    this.dialogRef.close(this.data);
  }
}

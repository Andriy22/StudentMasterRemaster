import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminClassesComponent } from './classes/classes.component';
import { InputModalComponent } from './classes/modals/input-modal/input-modal.component';
import { AdminUsersComponent } from './users/users.component';
import { RolesComponent } from './users/modals/roles/roles.component';
import { CreateUserComponent } from './users/modals/create-user/create-user.component';
import { ChangeClassInStudentComponent } from './classes/modals/change-class-in-student/change-class-in-student.component';
import { EditSubjectsInClassComponent } from './classes/modals/edit-subjects-in-class/edit-subjects-in-class.component';
import { EditTeachersInClassComponent } from './classes/modals/edit-teachers-in-class/edit-teachers-in-class.component';
import { EditSubjectsInTeacherComponent } from './users/modals/edit-subjects-in-teacher/edit-subjects-in-teacher.component';
import { ConsoleComponent } from './console/console.component';

const COMPONENTS = [
  AdminClassesComponent,
  InputModalComponent,
  AdminUsersComponent,
  RolesComponent,
  ChangeClassInStudentComponent,
  EditSubjectsInClassComponent,
  EditTeachersInClassComponent,
  EditSubjectsInTeacherComponent,
  ConsoleComponent,
];
const COMPONENTS_DYNAMIC = [
  InputModalComponent,
  RolesComponent,
  ChangeClassInStudentComponent,
  EditSubjectsInClassComponent,
  EditTeachersInClassComponent,
  EditSubjectsInTeacherComponent,
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, CreateUserComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class AdminModule {}

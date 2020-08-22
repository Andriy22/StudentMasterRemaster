import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '@shared';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { RoutesModule } from '../routes.module';

@NgModule({
  declarations: [DashboardComponent, AddHomeworkComponent, HomeworksComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModule],
  entryComponents: [AddHomeworkComponent],
})
export class TeacherModule {}

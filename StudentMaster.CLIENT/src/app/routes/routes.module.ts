import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AvarageMarksComponent } from './dashboard/components/avarage-marks/avarage-marks.component';
import { ClassmatesComponent } from './dashboard/components/classmates/classmates.component';
import { MarksChartComponent } from './dashboard/components/marks-chart/marks-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ProgressChartComponent } from './dashboard/components/progress-chart/progress-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
const COMPONENTS = [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  AvarageMarksComponent,
  ClassmatesComponent,
  MarksChartComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ChartsModule, RoutesRoutingModule, NgApexchartsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ProgressChartComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}

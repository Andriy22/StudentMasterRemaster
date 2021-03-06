import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';
import { RedirectGuard } from '@core/authentication/redirect.guard';
import { HomeworksComponent } from './homeworks/homeworks.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsComponent } from './news/news.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { CheckBrowserComponent } from './check-browser/check-browser.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'check-data', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'homeworks',
        component: HomeworksComponent,
        data: { title: 'homeworks', titleI18n: 'homeworks', roleCode: 'User' },
      },
      {
        path: 'news',
        component: NewsComponent,
        data: { title: 'news', titleI18n: 'news' },
      },
      {
        path: 'check-data',
        component: CheckBrowserComponent,
        data: { title: 'check', titleI18n: 'check' },
      },
      {
        path: 'report',
        component: BugReportComponent,
        data: { title: 'report', titleI18n: 'report' },
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        data: { title: 'schedule', titleI18n: 'schedule', roleCode: 'User' },
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'profile', titleI18n: 'profile' },
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { roleCode: 'Admin' },
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
        data: { roleCode: 'Teacher' },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: 'homeworks', component: HomeworksComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminClassesComponent } from './classes/classes.component';
import { AdminUsersComponent } from './users/users.component';
import { ConsoleComponent } from './console/console.component';

const routes: Routes = [
  { path: 'classes', component: AdminClassesComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'console', component: ConsoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

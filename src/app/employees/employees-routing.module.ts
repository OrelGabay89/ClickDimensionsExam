import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EmployeesComponent } from '@app/employees/employees.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employees', component: EmployeesComponent, data: { title: extract('employees') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmployeesRoutingModule {}

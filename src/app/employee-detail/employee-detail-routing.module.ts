import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EmployeeDetailsComponent } from '@app/employee-detail/employee-detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'detail/:id', component: EmployeeDetailsComponent, data: { title: extract('detail') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmployeeDetailsRoutingModule {}

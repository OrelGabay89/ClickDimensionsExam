import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EmployeesRoutingModule } from '@app/employees/employees-routing.module';
import { EmployeesComponent } from '@app/employees/employees.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table'
import { CoreModule } from '@app/core';

@NgModule({
  imports: [CoreModule,CommonModule, TranslateModule, EmployeesRoutingModule,FormsModule,ReactiveFormsModule,DataTableModule,TableModule],

  declarations: [EmployeesComponent],
})
export class EmployeesModule {}


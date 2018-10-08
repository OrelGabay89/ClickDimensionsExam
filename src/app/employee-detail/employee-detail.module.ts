import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EmployeeDetailsRoutingModule } from '@app/employee-detail/employee-detail-routing.module';
import { EmployeeDetailsComponent } from '@app/employee-detail/employee-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';

@NgModule({
  imports: [CoreModule,CommonModule, TranslateModule, FormsModule,ReactiveFormsModule  ,EmployeeDetailsRoutingModule],

  declarations: [EmployeeDetailsComponent],
})
export class EmployeeDeatilsModule {}


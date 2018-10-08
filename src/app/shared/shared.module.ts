import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '@app/shared/loader/loader.component';
import { GetDepartmentNamePipe } from '@app/_pipes/getDepartmentName.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
  ],
  exports: [
    LoaderComponent
  ]

})
export class SharedModule { }

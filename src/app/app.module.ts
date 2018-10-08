import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from '@app/home/home.module';
import { ShellModule } from '@app/shell/shell.module';
import { AboutModule } from '@app/about/about.module';
import {EmployeesModule} from '@app/employees/employees.module';
import { LoginModule } from '@app/login/login.module';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemEmployeesService } from '@app/_services/InMemEmployeesService';
import { EmployeeDeatilsModule } from '@app/employee-detail/employee-detail.module';
import { DataTableModule } from 'primeng/primeng';
import { DepartmentsListProviderService } from '@app/_services/department.service';
import { GetDepartmentNamePipe } from '@app/_pipes/getDepartmentName.pipe';
import { CustomFormsModule } from '../../node_modules/ng4-validators';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,CustomFormsModule,ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemEmployeesService),
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    LoginModule,
    EmployeesModule,
    EmployeeDeatilsModule,
    AppRoutingModule ,
    DataTableModule// must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [DepartmentsListProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

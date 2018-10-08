import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from '@app/shell/shell.component';
import { HeaderComponent } from '@app/shell/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent
  ]
})
export class ShellModule {
}

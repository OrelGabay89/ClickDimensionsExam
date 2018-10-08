import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AboutRoutingModule } from '@app/about/about-routing.module';
import { AboutComponent } from '@app/about/about.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }

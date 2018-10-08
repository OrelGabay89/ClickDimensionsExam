import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { I18nService } from '@app/core/i18n.service';
import { HttpService } from '@app/core/http/http.service';
import { HttpCacheService } from '@app/core/http/http-cache.service';
import { ApiPrefixInterceptor } from '@app/core/http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from '@app/core/http/error-handler.interceptor';
import { CacheInterceptor } from '@app/core/http/cache.interceptor';
import { GetDepartmentNamePipe } from '@app/_pipes/getDepartmentName.pipe';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    GetDepartmentNamePipe
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ],
  declarations: [GetDepartmentNamePipe],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}

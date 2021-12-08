import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoaderModule } from './base/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { APIInterceptor } from './utils/interceptors/api.interceptor';
import { AuthGuard } from './utils/interceptors/auth.guard';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        HttpClientModule,
        LoaderModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        CookieService,
        AuthGuard,
        LoaderService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

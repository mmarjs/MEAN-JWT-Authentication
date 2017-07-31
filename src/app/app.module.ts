import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';
import { routing } from './app.routes';

import { AppComponent } from './app.component';

export function AuthHttpFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}]
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LocalStorageModule,
    LoginModule,
    BrowserModule,
    SignupModule,
    RegisterModule,
    HomeModule,
    HttpModule,
    routing,
    LocalStorageModule.withConfig({
      prefix: 'my-pro',
      storageType: 'localStorage'
    })
  ],
  providers: [
    LocalStorageService,
    {
      provide: AuthHttp,
      useFactory: AuthHttpFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

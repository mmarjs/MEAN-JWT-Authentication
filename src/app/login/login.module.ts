import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { FormsModule } from '@angular/forms';

import { routing } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class LoginModule { }

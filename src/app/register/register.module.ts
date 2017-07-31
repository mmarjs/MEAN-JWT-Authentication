import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';

import { UserService } from '../services/user.service';
import { routing } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RegisterComponent],
  providers: [
    UserService
  ]
})
export class RegisterModule { }

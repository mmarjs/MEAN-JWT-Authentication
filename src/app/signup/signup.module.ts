import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

import { routing } from './signup.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [SignupComponent],
  providers: [
    UserService,
  ]
})
export class SignupModule { }

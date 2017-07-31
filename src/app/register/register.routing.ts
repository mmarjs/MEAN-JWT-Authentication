import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../services/auth-guard.service';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

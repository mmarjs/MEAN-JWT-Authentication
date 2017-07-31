import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', redirectTo: 'login' },
  { path: 'signup', redirectTo: 'signup' },
  { path: '**', redirectTo: 'register' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

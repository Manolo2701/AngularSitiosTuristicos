import { Routes } from '@angular/router';
import { ListaSitiosComponent } from './components/lista-sitios/lista-sitios.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: ListaSitiosComponent }, 
  { path: 'detalle/:id', loadComponent: () => import('./components/detalle/detalle.component').then(m => m.DetalleComponent) },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard]
  },
  { path: 'add-site', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];

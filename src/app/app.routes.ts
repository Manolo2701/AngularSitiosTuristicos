import { Routes } from '@angular/router';
import { ListaSitiosComponent } from './components/lista-sitios/lista-sitios.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: ListaSitiosComponent 
  },
  { 
    path: 'detalle/:id', 
    loadComponent: () => import('./components/detalle/detalle.component').then(m => m.DetalleComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'add-site',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: '**', 
    redirectTo: '' // Redirige a la página principal en vez de a login
  }
];
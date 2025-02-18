import { Routes } from '@angular/router';
import { ListaSitiosComponent } from './components/lista-sitios/lista-sitios.component';

export const routes: Routes = [
  { path: '', component: ListaSitiosComponent },
  { path: 'detalle/:id', loadComponent: () => import('./components/detalle/detalle.component').then(m => m.DetalleComponent) },
  { path: '**', redirectTo: '' }
];

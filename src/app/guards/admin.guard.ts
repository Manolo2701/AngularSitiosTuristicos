import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  //Para ver si es administrador
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuthenticated() && this.authService.getRole() === 'administrador') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatCardModule,MatSnackBarModule, MatToolbarModule, CommonModule]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  //Comprueba que está autenticado
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  //Comprueba el rol porque se mete en el payload del token (aunqeu sea falso)
  get role(): string | null {
    return this.authService.getRole();
  }

  //Para desloguear
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  //Redirecciona a login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  //Redirecciona a registrar
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  //SI eres admin te lleva a la pantalla de añadir sitios.
  addNewSite(): void {
    this.router.navigate(['/add-site']); 
  }
}


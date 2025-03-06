import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatButtonModule, MatToolbarModule, CommonModule, RouterModule]
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get role(): string | null {
    return this.authService.getRole();
  }

  logout(): void {
    console.log('Logout clicked');
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    console.log('Register clicked');
    this.router.navigate(['/register']);
  }

  administrateSite(): void {
    console.log('Administrate site clicked');
    this.router.navigate(['/add-site']);
  }

  onLogoClick(): void {
    console.log('Logo clicked');
    window.open('https://www.juntaex.es', '_blank');
  }
}

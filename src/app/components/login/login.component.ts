import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SitiosService } from '../../services/sitios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private authService: AuthService,
    private router: Router,
    private sitiosService: SitiosService
  ) {}

  onSubmit(): void {
    this.sitiosService.getUsers().subscribe((users) => {
      const user = users.find(
        (user) => user.email === this.email && user.password === this.password
      );

      if (user) {
        const token = `fake-jwt-token.${btoa(JSON.stringify({ role: user.role, exp: Math.floor(Date.now() / 1000) + 3600 }))}.signature`;

        this.authService.login(token, user);


        this.router.navigate([user.role === 'administrador' ? '/admin' : '/']);
      } else {

        this.errorMessage = 'Usuario o contraseña incorrectos';
        alert(this.errorMessage);
      }
    });
  }
}

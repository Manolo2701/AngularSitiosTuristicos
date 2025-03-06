import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SitiosService } from '../../services/sitios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card'; // Cambiar de 'MatCard' a 'MatCardModule'
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { RouterModule } from '@angular/router';
import { BcryptService } from '../../services/bcrypt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Si usas SCSS, aquí es donde se debe aplicar
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ], // Asegurarse de importar los módulos necesarios
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sitiosService: SitiosService,
    private bcryptService: BcryptService
  ) {}
  

  onSubmit(): void {
    this.loading = true;
  
    this.sitiosService.getUsers().subscribe(
      (users) => {
        const user = users.find((user) => user.email === this.email);
  
        if (user && this.bcryptService.comparePasswords(this.password, user.password)) {
          // El resto del código de login permanece igual
          const token = `fake-jwt-token.${btoa(
            JSON.stringify({
              role: user.role,
              exp: Math.floor(Date.now() / 1000) + 3600,
            })
          )}.signature`;
          this.authService.login(token, user);
  
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (user.role === 'usuario') {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
  
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage =
          'Ocurrió un error al intentar iniciar sesión. Intenta nuevamente.';
      }
    );
  }
  
}

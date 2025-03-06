import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NavbarComponent,
    RouterModule
  ]
})
export class RegisterComponent {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender: string;
    role: string;
    comunidad: string;
  } = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
    role: 'usuario',  // Por defecto, el rol es 'usuario'
    comunidad: ''
  };

  private apiUrl: string = 'http://localhost:3000/users';  // API base para el registro de usuario

  constructor(private http: HttpClient) { }

  // Función de registro de usuario
  register(): void {
    if (!this.validateInputs()) {
      return;  // Si la validación de inputs falla, no se continúa
    }

    // Cifra la contraseña antes de enviarla al backend
    const saltRounds = 10;
    bcrypt.hash(this.user.password, saltRounds, (err, hashedPassword) => {
      if (err || !hashedPassword) {
        console.error('Error al cifrar la contraseña', err);
        alert('Error al cifrar la contraseña. Intenta de nuevo.');
        return;
      }

      this.user.password = hashedPassword;  // Asignamos la contraseña cifrada

      // Realizamos la solicitud HTTP POST para registrar al usuario
      this.http.post(this.apiUrl, this.user).subscribe(
        response => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente.');
        },
        error => {
          console.error('Error en el registro', error);
          alert('Error en el registro. Inténtalo de nuevo.');
        }
      );
    });
  }

  // Función de validación de inputs
  private validateInputs(): boolean {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }

    // Validación del formato del correo
    if (!this.validateEmail(this.user.email)) {
      alert('El formato del correo electrónico no es válido.');
      return false;
    }

    // Validación de la longitud de la contraseña
    if (this.user.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    return true;  // Si pasa todas las validaciones
  }

  // Función para validar el formato del correo electrónico
  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);  // Devuelve si el correo tiene un formato válido
  }
}

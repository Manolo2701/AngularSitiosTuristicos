import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../navbar/navbar.component';
import * as bcrypt from 'bcryptjs'; //COmo no me ha funcionado con crypto-js he probado con bcrypt

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
    HttpClientModule,
    MatSelectModule,
    NavbarComponent
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
      role: 'usuario',
      comunidad: ''
    };

  private apiUrl: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  register(): void {
    if (!this.validateInputs()) {
      return;
    }


    if (!this.user.password) {
      alert('La contraseña no puede estar vacía.');
      return;
    }


    const saltRounds = 10;
    bcrypt.hash(this.user.password!, saltRounds, (err: Error | null, hashedPassword: string | undefined) => {
      if (err) {
        console.error('Error al cifrar la contraseña', err);
        alert('Error al cifrar la contraseña. Inténtalo de nuevo.');
        return;
      }

      if (!hashedPassword) {
        console.error('No se pudo generar el hash de la contraseña');
        alert('Error al generar el hash de la contraseña. Inténtalo de nuevo.');
        return;
      }


      this.user.password = hashedPassword as string;


      this.http.post(this.apiUrl, this.user).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente.');
        },
        (error: any) => {
          console.error('Error en el registro', error);
          alert('Error en el registro. Inténtalo de nuevo.');
        }
      );
    });
  }

  //Valida los datos del formulario:
  private validateInputs(): boolean {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password) {
      alert('Completa todos los campos obligatorios.');
      return false;
    }
    if (!this.validateEmail(this.user.email)) {
      alert('El formato del correo no es válido.');
      return false;
    }
    if (this.user.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  }

  //Valida el email con el regex típico de los emails:
  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}

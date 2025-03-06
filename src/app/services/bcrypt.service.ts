import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class BcryptService {
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);  // Generar un salt con 10 rondas
    const hash = bcrypt.hashSync(password, salt);  // Hash la contraseña
    return hash;
  }

  comparePasswords(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);  // Comparar la contraseña con el hash
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})

//Secciones de autenticación y registro de usuarios:
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  login(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

 
  registerUser(user: any): void {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    const token = this.generateToken(user);
    this.login(token, user);
  }

  private generateToken(user: any): string {
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, 
    };

    return btoa(JSON.stringify(payload)); 
  }
}

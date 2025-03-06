import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// Crear un objeto simulado para localStorage
const localStorageMock = {
  getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
    return null; // Simula que no hay elementos por defecto
  }),
  setItem: jasmine.createSpy('setItem').and.callFake((key: string, value: string) => {}),
  removeItem: jasmine.createSpy('removeItem').and.callFake((key: string) => {}),
};

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    // Reemplazar el objeto global `localStorage` con el mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    // Limpiar los mocks después de cada prueba
    localStorageMock.getItem.calls.reset();
    localStorageMock.setItem.calls.reset();
    localStorageMock.removeItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if token is not available', () => {
    localStorageMock.getItem.and.returnValue(null); // Simula que no hay token
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return true if token is valid', () => {
    const validToken = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })); // Token válido
    localStorageMock.getItem.and.returnValue(validToken);
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false if token is expired', () => {
    const expiredToken = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 3600 })); // Token expirado
    localStorageMock.getItem.and.returnValue(expiredToken);
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return role from token', () => {
    const role = 'admin';
    const token = btoa(JSON.stringify({ role }));
    localStorageMock.getItem.and.returnValue(token);
    expect(service.getRole()).toBe(role);
  });

  it('should set token and user data on login', () => {
    const user = { id: 1, firstName: 'John', lastName: 'Doe', role: 'user' };
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + 3600 }));

    service.login(token, user);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
  });

  it('should remove token and user data on logout', () => {
    service.logout();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should register new user', () => {
    const newUser = { id: 2, firstName: 'Jane', lastName: 'Doe', role: 'user' };
    service.registerUser(newUser);

    // Verificar que el nuevo usuario se agregó a localStorage
    const users = JSON.parse(localStorageMock.getItem('users') || '[]');
    expect(users.length).toBeGreaterThan(0);
    expect(users[users.length - 1]).toEqual(newUser);
  });

  it('should return user data', () => {
    const userData = { id: 1, firstName: 'John', lastName: 'Doe', role: 'user' };
    localStorageMock.getItem.and.returnValue(JSON.stringify(userData));
    expect(service.getUserData()).toEqual(userData);
  });
});

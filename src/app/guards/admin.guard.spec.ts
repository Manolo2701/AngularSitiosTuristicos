import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';  // Para simular el retorno de un observable

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Creamos un espía de AuthService con la propiedad isAdmin espiada
    authService = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Creamos un espía de Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is admin', (done) => {
    // Simula que el usuario es admin
    authService.isAdmin.and.returnValue(of(true));  // Devuelve un Observable que emite true

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should redirect to login if user is not admin', (done) => {
    // Simula que el usuario NO es admin
    authService.isAdmin.and.returnValue(of(false));  // Devuelve un Observable que emite false

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});

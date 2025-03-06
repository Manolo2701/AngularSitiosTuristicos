import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { SitiosService } from '../../services/sitios.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Crear mocks para los servicios
class MockAuthService {
  login(token: string, user: any) {}  // Ahora acepta los parámetros correctos
}

class MockSitiosService {
  getUsers() {
    // Devolver un Observable con un array de usuarios simulado
    return of([{ email: 'test@example.com', password: 'password', role: 'user' }]);  // Devuelve un array válido
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let sitiosService: MockSitiosService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: SitiosService, useClass: MockSitiosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sitiosService = TestBed.inject(SitiosService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit and navigate to user page if login is successful', () => {
    spyOn(authService, 'login');  // Espiar el método login
    spyOn(router, 'navigate');  // Espiar el método navigate

    component.email = 'test@example.com';
    component.password = 'password';

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();  // Verificar si login fue llamado
    expect(router.navigate).toHaveBeenCalledWith(['/']);  // Verificar si se hizo la navegación
  });

  it('should display error message if login fails', () => {
    spyOn(authService, 'login');
    spyOn(router, 'navigate');
    
    component.email = 'wrongemail@example.com';  // Usuario incorrecto
    component.password = 'wrongpassword';  // Contraseña incorrecta

    component.onSubmit();
    
    expect(authService.login).not.toHaveBeenCalled();  // No se debe llamar al login
    expect(router.navigate).not.toHaveBeenCalled();  // No se debe navegar
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');  // El mensaje de error debe ser el esperado
  });

  it('should set loading to true when onSubmit is called', () => {
    component.email = 'test@example.com';
    component.password = 'password';

    component.onSubmit();

    expect(component.loading).toBeTrue();  // Verificar que loading se establezca en true
  });

  it('should set loading to false after successful login', () => {
    component.email = 'test@example.com';
    component.password = 'password';

    component.onSubmit();

    expect(component.loading).toBeFalse();  // Verificar que loading se establezca en false después del login exitoso
  });

  it('should handle errors during user fetch gracefully', () => {
    // Simular un error en el servicio getUsers devolviendo un observable con un error (throwError)
    spyOn(sitiosService, 'getUsers').and.returnValue(throwError(() => new Error('Error al cargar usuarios')));

    component.email = 'test@example.com';
    component.password = 'password';

    component.onSubmit();

    expect(component.errorMessage).toBe('Ocurrió un error al intentar iniciar sesión. Intenta nuevamente.');  // El mensaje de error debe ser el esperado
  });
});

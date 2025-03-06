import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('JwtInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  // Mock del servicio AuthService para que devuelva un token predefinido
  const mockAuthService = {
    getToken: () => 'mocked-jwt-token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Se necesita para las pruebas HTTP
      providers: [
        { provide: AuthService, useValue: mockAuthService }, // Mock de AuthService
        JwtInterceptor, // Proveedor del interceptor
      ],
    });

    httpMock = TestBed.inject(HttpTestingController); // Controlador HTTP mockeado
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no queden peticiones pendientes
  });

  it('should add Authorization header with token', () => {
    const testUrl = 'http://test.com/data';

    httpClient.get(testUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(testUrl);
    // Verificar que la cabecera Authorization esté presente
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-jwt-token');

    req.flush({}); // Responder con una respuesta vacía para completar la petición
  });

  it('should not add Authorization header if no token is present', () => {
    const testUrl = 'http://test.com/data';

    // Mock del AuthService para simular que no hay token
    const mockAuthServiceNoToken = { getToken: () => null };
    TestBed.overrideProvider(AuthService, { useValue: mockAuthServiceNoToken });

    httpClient.get(testUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(testUrl);
    // Verificar que la cabecera Authorization NO esté presente
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({}); // Responder con una respuesta vacía para completar la petición
  });
});

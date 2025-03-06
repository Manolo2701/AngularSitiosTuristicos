import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Para pruebas HTTP
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms'; // Necesario para usar ngModel
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import * as bcrypt from 'bcryptjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent, 
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register the user when the form is valid', () => {
    // Set the user details
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.email = 'john.doe@example.com';
    component.user.password = 'password123';
    component.user.phone = '1234567890';
    component.user.birthday = '2000-01-01';
    component.user.gender = 'masculino';
    component.user.comunidad = 'Comunidad Test';

    // Simulate form submission
    component.register();

    // Expect the HTTP POST request to be made
    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Usuario registrado correctamente' });

    // Expect an alert with success message
    // Since alert isn't real in the test, we can spy on it to check if it's called
    spyOn(window, 'alert');
    expect(window.alert).toHaveBeenCalledWith('Usuario registrado correctamente.');
  });

  it('should show an error if registration fails', () => {
    // Simulate form submission with valid details
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.email = 'john.doe@example.com';
    component.user.password = 'password123';
    component.user.phone = '1234567890';
    component.user.birthday = '2000-01-01';
    component.user.gender = 'masculino';
    component.user.comunidad = 'Comunidad Test';

    component.register();

    // Simulate HTTP error response
    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    // Expect an alert with error message
    spyOn(window, 'alert');
    expect(window.alert).toHaveBeenCalledWith('Error en el registro. Inténtalo de nuevo.');
  });

  it('should validate the form inputs correctly', () => {
    // Set invalid email
    component.user.email = 'invalid-email';
    component.user.password = 'short';

    // Trigger form validation
    spyOn(window, 'alert');
    component.register();

    // Check if validation errors show up
    expect(window.alert).toHaveBeenCalledWith('El formato del correo no es válido.');
    expect(window.alert).toHaveBeenCalledWith('La contraseña debe tener al menos 6 caracteres.');
  });

  afterEach(() => {
    // Ensure that no unmatched HTTP requests remain after each test
    httpMock.verify();
  });
});

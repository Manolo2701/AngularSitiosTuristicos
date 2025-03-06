import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { SitiosService } from '../../services/sitios.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  // Mock de servicios
  let sitiosServiceMock: jasmine.SpyObj<SitiosService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let activatedRouteMock: { snapshot: { paramMap: Map<string, string> } };

  beforeEach(async () => {
    // Mock de SitiosService
    sitiosServiceMock = jasmine.createSpyObj('SitiosService', ['getSitioById', 'addCommentToSite']);
    // Mock de AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserData', 'isAuthenticated']);
    // Mock de ActivatedRoute
    activatedRouteMock = {
      snapshot: { paramMap: new Map([['id', '1']]) }
    };

    // Definir valores por defecto para los mocks
    sitiosServiceMock.getSitioById.and.returnValue(of({
      id: '1',
      name: 'Sitio 1',
      description: 'Descripción del sitio 1',
      parrafo1: 'Parrafo 1',
      parrafo2: 'Parrafo 2',
      imageUrl: 'image.jpg',
      imageGallery: [],
      rating: [5],
      comments: ['Excelente'],
      commentUser: ['Usuario 1']
    }));
    authServiceMock.getUserData.and.returnValue({ firstName: 'Juan', lastName: 'Perez' });
    authServiceMock.isAuthenticated.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [DetalleComponent, MatCardModule, CommonModule, FormsModule, NavbarComponent],
      providers: [
        { provide: SitiosService, useValue: sitiosServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sitio data on init', () => {
    expect(component.sitio).toBeDefined();
    expect(component.sitio.id).toBe('1');
    expect(component.sitio.name).toBe('Sitio 1');
  });

  it('should add a comment successfully', () => {
    component.newComment = 'Nuevo comentario';
    component.newRating = 5;
    component.addComment();

    // Verificar que el método de añadir comentario fue llamado
    expect(sitiosServiceMock.addCommentToSite).toHaveBeenCalled();
    expect(sitiosServiceMock.addCommentToSite).toHaveBeenCalledWith('1', 'Nuevo comentario', 5, 'Juan Perez');
  });

  it('should not add a comment if not authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(false);
    component.addComment();

    // Verificar que no se llama al servicio si el usuario no está autenticado
    expect(sitiosServiceMock.addCommentToSite).not.toHaveBeenCalled();
  });

  it('should handle invalid rating when adding a comment', () => {
    component.newComment = 'Comentario con rating inválido';
    component.newRating = NaN; // Puntuación inválida
    const alertSpy = spyOn(window, 'alert');

    component.addComment();

    expect(alertSpy).toHaveBeenCalledWith('La puntuación debe ser un número válido entre 1 y 5.');
  });

  it('should update sitio data after adding a comment', () => {
    const updatedSitio = {
      id: '1',
      name: 'Sitio 1',
      description: 'Descripción actualizada',
      parrafo1: 'Parrafo 1',
      parrafo2: 'Parrafo 2',
      imageUrl: 'image.jpg',
      imageGallery: [],
      rating: [5, 4],
      comments: ['Excelente', 'Comentario adicional'],
      commentUser: ['Usuario 1', 'Juan Perez']
    };

    sitiosServiceMock.addCommentToSite.and.returnValue(of(updatedSitio));
    component.newComment = 'Comentario adicional';
    component.newRating = 4;
    component.addComment();

    // Verificar que el componente se actualiza con los datos del sitio actualizado
    expect(component.sitio.rating.length).toBe(2);
    expect(component.sitio.comments.length).toBe(2);
    expect(component.sitio.commentUser.length).toBe(2);
  });
});

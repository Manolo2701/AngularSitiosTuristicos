import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosComponent } from './comentarios.component';
import { SitiosService } from '../../services/sitios.service';
import { of } from 'rxjs';

// Mock del servicio SitiosService
class MockSitiosService {
  getRandomComments() {
    return of([
      { comment: 'Comentario 1', user: 'Usuario 1' },
      { comment: 'Comentario 2', user: 'Usuario 2' },
      { comment: 'Comentario 3', user: 'Usuario 3' },
    ]);
  }
}

describe('ComentariosComponent', () => {
  let component: ComentariosComponent;
  let fixture: ComponentFixture<ComentariosComponent>;
  let sitiosService: SitiosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosComponent],
      providers: [{ provide: SitiosService, useClass: MockSitiosService }]  // Aquí estamos usando el mock
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosComponent);
    component = fixture.componentInstance;
    sitiosService = TestBed.inject(SitiosService); // Inyectamos el mock del servicio
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load random comments on init', () => {
    component.ngOnInit(); // Forzamos la ejecución del ngOnInit
    expect(component.comentarios.length).toBe(3); // Aseguramos que los comentarios se hayan cargado
    expect(component.comentarios[0].comment).toBe('Comentario 1'); // Verificamos el primer comentario
  });

  it('should rotate comments every 5 seconds', (done) => {
    component.ngOnInit(); // Iniciamos la lógica del componente

    // Establecemos un intervalo para verificar la rotación
    setTimeout(() => {
      expect(component.currentCommentIndex).toBe(1); // Aseguramos que el índice de los comentarios haya cambiado
      done(); // Indicamos que la prueba ha terminado
    }, 5000); // Esperamos 5 segundos (el tiempo de rotación)
  });

  it('should unsubscribe from subscription on destroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled(); // Verificamos que se haya cancelado la suscripción
  });
});
